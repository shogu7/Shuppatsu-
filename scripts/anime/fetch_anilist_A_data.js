const fs = require('fs');
const axios = require('axios');
const { enqueueRequest } = require('../../utils/ratelimiter');
const path = require('path');

const currentDate   = new Date();
const currentYear   = currentDate.getFullYear();
const currentMonth  = currentDate.getMonth() + 1;

const startTimestamp = Math.floor(new Date(currentYear, currentMonth - 1, 1).getTime() / 1000);
const endTimestamp   = Math.floor(new Date(currentYear, currentMonth,      1).getTime() / 1000);

const dataDir  = path.join(__dirname, 'data');
const dataPath = path.join(dataDir, `dataA-${currentYear}-${currentMonth}.json`);

const ANILIST_URL = 'https://graphql.anilist.co';

const query = `
  query ($page: Int, $from: Int, $to: Int) {
    Page(page: $page, perPage: 50) {
      airingSchedules(
        airingAt_greater: $from,
        airingAt_lesser: $to,
        sort: TIME
      ) {
        episode
        airingAt
        media {
          id
          title {
            romaji
            english
          }
          coverImage { medium }
          streamingEpisodes {
            site
            url
          }
        }
      }
      pageInfo { hasNextPage }
    }
  }
`;

async function fetchPage(pageNumber) {
  const variables = { page: pageNumber, from: startTimestamp, to: endTimestamp };
  const res = await enqueueRequest(() =>
    axios.post(ANILIST_URL, { query, variables }, { headers: { 'Content-Type': 'application/json' } })
  );

  if (res.data.errors) {
    console.error('GraphQL errors:', res.data.errors);
    throw new Error(res.data.errors.map(e => e.message).join('; '));
  }

  return res.data.data.Page;
}

;(async () => {
  if (!fs.existsSync(dataDir)) fs.mkdirSync(dataDir, { recursive: true });

  let allEpisodes = [];
  let page        = 1;
  let hasNext     = true;

  while (hasNext) {
    try {
      const pageData = await fetchPage(page);
      allEpisodes.push(...pageData.airingSchedules);
      hasNext = pageData.pageInfo.hasNextPage;
      page++;
    } catch (err) {
      console.error(`Erreur AniList API page ${page}:`, err.message);
      break;
    }
  }

  const allowedSites   = new Set(['CRUNCHYROLL','NETFLIX','DISNEY_PLUS','AMAZON_PRIME_VIDEO']);
  const allowedDomains = ['crunchyroll.com','netflix.com','disneyplus.com','primevideo.com'];

  const validEpisodes = allEpisodes.filter(ep => {
    const streams = ep.media.streamingEpisodes || [];
    return streams.some(s =>
      allowedSites.has(s.site) ||
      (typeof s.url === 'string' && allowedDomains.some(d => s.url.includes(d)))
    );
  });

  const episodesWithStreamLink = validEpisodes.map(ep => {
    const streams = ep.media.streamingEpisodes || [];
    const stream = streams.find(s =>
      allowedSites.has(s.site) ||
      (typeof s.url === 'string' && allowedDomains.some(d => s.url.includes(d)))
    );
    return {
      episode:   ep.episode + 1,
      airingAt:  ep.airingAt,
      title:     ep.media.title,
      streamSite: stream.site,
      streamUrl:  stream.url
    };
  });

  fs.writeFileSync(dataPath, JSON.stringify(episodesWithStreamLink, null, 2));
  console.log(`✅ ${episodesWithStreamLink.length} épisodes enregistrés avec leur lien de streaming dans ${dataPath}`);
})();
