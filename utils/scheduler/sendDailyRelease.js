const { DailyAnimeEmbed } = require('../../components/dailyEmbeds/todayAnime');
const { DailyMangaEmbed } = require('../../components/dailyEmbeds/todayManga');
const { DailyManwhaEmbed } = require('../../components/dailyEmbeds/todayManwha');
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

    console.log(`[sendDailyRelease] ✅ Sorties envoyées pour la date ${new Date().toLocaleString()}`);
  } catch (error) {
    console.error('[sendDailyRelease] ❌ Erreur lors de la récupération ou de l’envoi :', error);
    throw error;
  }
}

module.exports = { sendDailyRelease };
