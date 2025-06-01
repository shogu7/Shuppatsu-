const fs = require('fs');
const path = require('path');

/**
 * @param {string} centerDate
 * @returns {Promise<Array>}
 */
async function getForDate(centerDate, type) {
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
        typeIndince = 'W';
        break;
      case 'manga_release':
      case 'manga':
        dataType = 'manga';
        typeIndince = 'M';
        break;
      default:
        console.warn(`getCounts: unknown type « ${type} », returning null`);
        return null;
    }
    const dataPath = path.join(__dirname, '..', '..', 'scripts', dataType, 'data', `data${typeIndince}-${year}-${month}.json`);
    // console.log('From aniListAPI.js -->', dataPath);

    if (!fs.existsSync(dataPath)) {
      console.warn(`[getReleaseData.js] JSON file not found: ${dataPath}`);
      return [];
    }

    const rawData = fs.readFileSync(dataPath, 'utf-8');
    const allData = JSON.parse(rawData);

    const center = new Date(centerDate);
    const startRange = new Date(center);
    startRange.setDate(center.getDate() - 5);
    const endRange = new Date(center);
    endRange.setDate(center.getDate() + 5);

    const filteredData = allData.filter(data => {
      const sd = data.startDate || {};
      if (sd.year && sd.month && sd.day) {
        const dataDateStr = `${sd.year}-${String(sd.month).padStart(2, '0')}-${String(sd.day).padStart(2, '0')}`;
        return dataDateStr === centerDate;
      }
      return false;
    });
    return filteredData;
  } catch (err) {
    console.error('Error reading or filtering JSON:', err);
    return [];
  }
}

module.exports = { getForDate };