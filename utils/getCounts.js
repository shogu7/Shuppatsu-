const fs = require('fs');
const path = require('path');

/**
 * @param {string} centerDate
 * @returns {Promise<Array>}
 */
async function getCounts(centerDate, type) {
  try {
    const [year, month] = centerDate.split('-').map(Number);
    let dataType;
    switch (type) {
      case 'anime_release':
      case 'anime':
        dataType = 'anime';
        break;
      case 'manwha_release':
      case 'manwha':
        dataType = 'manwha';
        break;
      case 'manga_release':
      case 'manga':
        dataType = 'manga';
        break;
      default:
        console.warn(`getCounts: type inconnu « ${type} », renvoi null`);
        return null;
    }
    const dataPath = path.join(__dirname, '..', 'scripts', dataType, 'data', `dataM-${year}-${month}.json`);

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

module.exports = { getCounts };
