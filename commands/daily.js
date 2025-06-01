const { sendDailyRelease } = require('../utils/scheduler/sendDailyRelease');

module.exports = {
  name: 'daily',
  aliases: ['d'],
  description: 'Manually displays the daily releases (manga, anime, manhwa)',
  execute: async (message, args) => {
    try {
      await sendDailyRelease(message.channel);
    } catch (err) {
      console.error('Error in the help command:', error);
      message.reply('An error occurred while executing the command.');
    }
  },
};
