const cron = require('node-cron');
const { sendDailyRelease } = require('./sendDailyRelease');

/**
 * @param {Client} client
 */
function scheduleDailyMessages(client) {
  cron.schedule('00 10 * * *', { timezone: 'Europe/Paris' }, async () => { //*Add timeZone for better implement on other system than EU
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
  });
}

module.exports = { scheduleDailyMessages };
