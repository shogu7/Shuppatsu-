const axios = require('axios');
const fs = require('fs').promises;

const YEAR = 2025;
const MONTH = 5; 

const OUTPUT_FILE = 'mangas.json';
const RATE_LIMIT = 3; 
const DELAY_MS = 1000 / RATE_LIMIT;

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function formatDate(date) {
  return date.toISOString().split('T')[0];
}

function getMonthRange(year, month) {
  const start = new Date(year, month - 1, 1);
  const end = new Date(year, month, 0);
  return {
    start: formatDate(start),
    end: formatDate(end)
  };
}

async function fetchMangaPage(page, startDate, endDate) {
  const url = `https://api.jikan.moe/v4/manga?page=${page}&start_date=${startDate}&end_date=${endDate}`;
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (err) {
    console.error(`Erreur page ${page}:`, err.message);
    return null;
  }
}

async function fetchAllMangaForMonth(year, month) {
  const { start, end } = getMonthRange(year, month);
  let page = 1;
  let allManga = [];

  while (true) {
    const data = await fetchMangaPage(page, start, end);
    if (!data || !data.data.length) break;

    const formatted = data.data.map(manga => ({
      title: manga.title,
      url: manga.url,
      image_url: manga.images?.jpg?.image_url || null,
      published_date: manga.published?.from || null,
      score: manga.score ?? null
    }));

    allManga.push(...formatted);

    if (!data.pagination.has_next_page) break;
    page++;
    await sleep(DELAY_MS);
  }

  return allManga;
}

async function main() {
  console.log(`Récupération des mangas pour ${MONTH}/${YEAR}...`);
  const mangas = await fetchAllMangaForMonth(YEAR, MONTH);
  await fs.writeFile(OUTPUT_FILE, JSON.stringify(mangas, null, 2), 'utf-8');
  console.log(`${mangas.length} mangas enregistrés dans ${OUTPUT_FILE}`);
}

main();
