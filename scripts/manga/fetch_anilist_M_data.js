const fs = require('fs');
const axios = require('axios');
const { enqueueRequest } = require('../../utils/helpers/ratelimiter');
const path = require('path');

const currentDate = new Date();
let currentYear = currentDate.getFullYear();
let currentMonth = currentDate.getMonth() + 2; // +1 each month
if (currentMonth > 12) {
  currentMonth = 1;
  currentYear++;
}


const startDateStr = `${currentYear}-${String(currentMonth).padStart(2, '0')}-01`;

let nextYear = currentYear;
let nextMonth = currentMonth + 1;
if (nextMonth > 12) {
  nextMonth = 1;
  nextYear++;
}
const endDateStr = `${nextYear}-${String(nextMonth).padStart(2, '0')}-01`;

const dataDir = path.join(__dirname, 'data');
const dataPath = path.join(dataDir, `dataM-${currentYear}-${currentMonth}.json`);

const ANILIST_URL = 'https://graphql.anilist.co';

const query = `
  query ($page: Int, $startDateGreater: FuzzyDateInt, $startDateLesser: FuzzyDateInt) {
    Page(page: $page, perPage: 50) {
      media(
        type: MANGA,
        countryOfOrigin: JP,              # only jp manga
        sort: POPULARITY_DESC,
        status: RELEASING,
        startDate_greater: $startDateGreater,
        startDate_lesser: $startDateLesser
      ) {
        id
        countryOfOrigin
        format
        title {
          romaji
          english
          native
        }
        startDate {
          year
          month
          day
        }
        coverImage {
          large
          medium
        }
        siteUrl
      }
      pageInfo {
        hasNextPage
      }
    }
  }
`;

function dateToFuzzyInt(dateStr) {
  return parseInt(dateStr.replace(/-/g, ''), 10);
}

async function fetchAnilistPage(pageNumber) {
  const variables = {
    page: pageNumber,
    startDateGreater: dateToFuzzyInt(startDateStr),
    startDateLesser: dateToFuzzyInt(endDateStr),
  };

  const response = await enqueueRequest(() =>
    axios.post(ANILIST_URL, {
      query,
      variables,
    })
  );

  return response.data.data.Page;
}

(async () => {
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }

  let allMangas = [];
  let page = 1;
  let hasNextPage = true;

  while (hasNextPage) {
    try {
      const pageData = await fetchAnilistPage(page);
      allMangas.push(...pageData.media);

      hasNextPage = pageData.pageInfo.hasNextPage;
      page++;
    } catch (err) {
      console.error(`Erreur Anilist API (page ${page}):`, err.message);
      break;
    }
  }

const filteredMangas = allMangas.filter(manga => {
  const { year, month } = manga.startDate || {};
  return (
    year === currentYear &&
    month === currentMonth &&
    manga.format === 'MANGA'
  );
});

  fs.writeFileSync(dataPath, JSON.stringify(filteredMangas, null, 2));
  console.log(`✅ ${filteredMangas.length} mangas enregistrés dans ${dataPath}`);
})();
