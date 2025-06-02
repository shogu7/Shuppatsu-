const { scheduleDailyMessages } = require('./dailyScheduler');
const { sendDailyRelease } = require('./sendDailyRelease');

module.exports = {
  scheduleDailyMessages,
  sendDailyRelease,
};
