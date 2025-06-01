const cron = require('node-cron');
const { sendDailyRelease } = require('./sendDailyRelease');

/**
 * @param {Client} client
 */
function scheduleDailyMessages(client) {
  cron.schedule(
    '00 10 * * *',
    async () => {
      try {
        const channel = await client.channels.fetch(process.env.CHANNEL_ID_DAILY);
        if (!channel) {
          console.error('[scheduleDailyMessages] Channel not found for daily sending');
          return;
        }

        await sendDailyRelease(channel);
      } catch (error) {
        console.error('[scheduleDailyMessages] ❌ Error during daily cron job:', error);
      }
    },
    {
      timezone: 'Europe/Paris' //*adapt your own time zone
    }
  );
}

module.exports = { scheduleDailyMessages };