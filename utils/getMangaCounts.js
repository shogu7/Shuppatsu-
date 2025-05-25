const fs = require('fs');
const path = require('path');

/**
 * Retourne les mangas sortis entre centerDate -5 jours et +5 jours
 * @param {string} centerDate - format 'YYYY-MM-DD'
 * @returns {Promise<Array>}
 */
async function getMangaCounts(centerDate) {
  try {
    const [year, month] = centerDate.split('-').map(Number);

    const dataPath = path.join(__dirname, '..', 'scripts', 'manga', 'data', `dataM-${year}-${month}.json`);

    if (!fs.existsSync(dataPath)) {
      console.warn(`Fichier JSON introuvable : ${dataPath}`);
      return [];
    }

    const rawData = fs.readFileSync(dataPath, 'utf-8');
    const allMangas = JSON.parse(rawData);

    const center = new Date(centerDate);
    const startRange = new Date(center);
    startRange.setDate(center.getDate() - 6);
    const endRange = new Date(center);
    endRange.setDate(center.getDate() + 5);

    const filteredMangas = allMangas.filter(manga => {
      const sd = manga.startDate || {};
      if (sd.year && sd.month && sd.day) {
        const mangaDate = new Date(sd.year, sd.month - 1, sd.day);
        return mangaDate >= startRange && mangaDate <= endRange;
      }
      return false;
    });

    return filteredMangas;
  } catch (err) {
    console.error('Erreur lors de la lecture JSON ou du filtrage :', err);
    return [];
  }
}

module.exports = { getMangaCounts };
