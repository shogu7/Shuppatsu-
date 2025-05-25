const fs = require('fs');
const axios = require('axios');
const { enqueueRequest } = require('../../utils/ratelimiter');
const path = require('path');

const currentDate = new Date();
const currentYear = currentDate.getFullYear();
const currentMonth = currentDate.getMonth() + 1;

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
        countryOfOrigin: KR,           # only South Korean
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
    startDateLesser:  dateToFuzzyInt(endDateStr),
  };

  const res = await enqueueRequest(() =>
    axios.post(
      ANILIST_URL,
      { query, variables },
      { headers: { 'Content-Type': 'application/json' } }
    )
  );

  if (res.data.errors) {
    console.error('GraphQL errors:', res.data.errors);
    throw new Error(res.data.errors.map(e => e.message).join('; '));
  }

  return res.data.data.Page;
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
      console.error(`Erreur AniList API (page ${page}):`, err.message);
      break;
    }
  }

  const filteredMangas = allMangas.filter(manga => {
    const sd = manga.startDate || {};
    return (
      manga.format === 'MANGA' &&
      sd.year === currentYear &&
      sd.month === currentMonth
    );
  });

  fs.writeFileSync(dataPath, JSON.stringify(filteredMangas, null, 2));
  console.log(`✅ ${filteredMangas.length} manwha enregistrés dans ${dataPath}`);
})();
