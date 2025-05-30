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
    let typeIndince;
    switch (type) {
      case 'anime_release':
      case 'anime':
        dataType = 'anime';
        typeIndince = 'A';
        break;
      case 'manwha_release':
      case 'manwha':
        dataType = 'manwha';
        typeIndince = 'M';
        break;
      case 'manga_release':
      case 'manga':
        dataType = 'manga';
        typeIndince = 'W';
        break;
      default:
        console.warn(`getCounts: type inconnu « ${type} », renvoi null`);
        return null;
    }
    const dataPath = path.join(__dirname, '..', 'scripts', dataType, 'data', `data${typeIndince}-${year}-${month}.json`);

    if (!fs.existsSync(dataPath)) {
      console.warn(`Fichier JSON introuvable : ${dataPath}`);
      return [];
    }

    const rawData = fs.readFileSync(dataPath, 'utf-8');
    const allData = JSON.parse(rawData);

    const center = new Date(centerDate);
    const startRange = new Date(center);
    startRange.setDate(center.getDate() - 6);
    const endRange = new Date(center);
    endRange.setDate(center.getDate() + 5);

    const filteredData = allData.filter(object => {
      const sd = object.startDate || {};
      if (sd.year && sd.month && sd.day) {
        const dataDate = new Date(sd.year, sd.month - 1, sd.day);
        return dataDate >= startRange && dataDate <= endRange;
      }
      return false;
    });

    return filteredData;
  } catch (err) {
    console.error('Erreur lors de la lecture JSON ou du filtrage :', err);
    return [];
  }
}

module.exports = { getCounts };
