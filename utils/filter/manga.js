const fs = require('fs');
const path = require('path');

/**
 * @param {string} centerDate 
 * @param {string} dataPath 
 * @returns {Array} 
 */
function filteredManga(centerDate, [year, month]) {
  try {
    const dataPath = path.join(__dirname, 'scripts', 'manga', 'data', `dataM-${year}-${month}.json`);
    const rawData = fs.readFileSync(dataPath, 'utf-8');
    const allMangas = JSON.parse(rawData);

    const center = new Date(centerDate);
    const startRange = new Date(center);
    startRange.setDate(center.getDate() - 5);
    const endRange = new Date(center);
    endRange.setDate(center.getDate() + 5);

    function toDate(sd) {
      if (!sd.year || !sd.month || !sd.day) return null;
      return new Date(sd.year, sd.month - 1, sd.day);
    }

    const filteredMangas = allMangas.filter(manga => {
      const sd = manga.startDate || {};
      const mangaDate = toDate(sd);
      if (!mangaDate) return false;
      return mangaDate >= startRange && mangaDate <= endRange;
    });

    return filteredMangas;
  } catch (err) {
    console.error('Erreur lors de la lecture JSON ou du filtrage :', err);
    return [];
  }
}

module.exports = { filteredManga };
