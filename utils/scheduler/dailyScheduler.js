const cron = require('node-cron');
const { sendDailyRelease } = require('./sendDailyRelease');

/**
 * @param {Client} client
 */
function scheduleDailyMessages(client) {
  cron.schedule(
    '45 10 * * *',
    async () => {
      try {
        const channel = await client.channels.fetch(process.env.CHANNEL_ID_DAILY);
        if (!channel) {
          console.error('[scheduleDailyMessages] Channel non trouvé pour envoi quotidien');
          return;
        }

        await sendDailyRelease(channel);
      } catch (error) {
        console.error('[scheduleDailyMessages] ❌ Erreur lors du cron quotidien :', error);
      }
    },
    {
      timezone: 'Europe/Paris'
    }
  );
}

module.exports = { scheduleDailyMessages };