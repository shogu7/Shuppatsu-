const cron = require('node-cron');
const { DailyAnimeEmbed } = require('../components/dailyEmbeds/todayAnime');
const { DailyMangaEmbed } = require('../components/dailyEmbeds/todayManga');
const { DailyManwhaEmbed } = require('../components/dailyEmbeds/todayManwha');
const { getForDate } = require('../aniListAPI');

async function scheduleDailyMessages(client) {
  cron.schedule('00 10 * * *', async () => {
    const today = new Date().toISOString().split('T')[0];
    try {
      const channel = await client.channels.fetch(process.env.CHANNEL_ID_DAILY); //! Channel ID for daily schedule only ! ! ! 
      if (!channel) return console.error('Channel non trouvé pour envoi quotidien');

      const anime = await getForDate(today, 'anime');
      const manga = await getForDate(today, 'manga');
      const manwha = await getForDate(today, 'manwha');

      const animeEmbed = DailyAnimeEmbed(anime, today);
      const mangaEmbed = DailyMangaEmbed(manga, today);
      const manwhaEmbed = DailyManwhaEmbed(manwha, today);

      await channel.send({ embeds: [animeEmbed, mangaEmbed, manwhaEmbed] });
      console.log('Message quotidien envoyé le ', today, ' à 14:00h');
    } catch (error) {
      console.error('Erreur lors de l’envoi du message quotidien:', error, 'date : ', today);
    }
  });
}

module.exports = { scheduleDailyMessages };
