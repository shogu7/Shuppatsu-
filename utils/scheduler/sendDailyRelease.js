const { DailyAnimeEmbed } = require('../../components/embeds/daily/todayAnime');
const { DailyMangaEmbed } = require('../../components/embeds/daily/todayManga');
const { DailyManwhaEmbed } = require('../../components/embeds/daily/todayManwha');
const { getForDate } = require('../helpers/getReleaseData');

/**
 * @param {TextChannel} channel
 * @param {string} [date]
 */
async function sendDailyRelease(channel) {
  const targetDate = new Date().toISOString().split('T')[0];

  try {
    const animeList  = await getForDate(targetDate, 'anime');
    const mangaList  = await getForDate(targetDate, 'manga');
    const manwhaList = await getForDate(targetDate, 'manwha');

    const animeEmbed  = DailyAnimeEmbed(animeList,  targetDate);
    const mangaEmbed  = DailyMangaEmbed(mangaList,  targetDate);
    const manwhaEmbed = DailyManwhaEmbed(manwhaList, targetDate);

    await channel.send({
      embeds: [animeEmbed, mangaEmbed, manwhaEmbed]
    });

    console.log(`[sendDailyRelease] ✅ Releases sent for date ${new Date().toLocaleString()}`);
  } catch (error) {
    console.error('[sendDailyRelease] ❌ Error during fetch or send:', error);
    throw error;
  }
}

module.exports = { sendDailyRelease };
