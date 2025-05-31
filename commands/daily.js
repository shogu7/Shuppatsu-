const { sendDailyRelease } = require('../utils/scheduler/sendDailyRelease');

module.exports = {
  name: 'daily',
  aliases: ['d'],
  description: 'Affiche manuellement les sorties quotidiennes (manga, anime, manwha)',
  execute: async (message, args) => {
    try {
      await sendDailyRelease(message.channel);
    } catch (err) {
      console.error('Erreur dans la commande daily :', err);
      await message.reply('❌ Une erreur est survenue lors de l’envoi des sorties quotidiennes.');
    }
  },
};
