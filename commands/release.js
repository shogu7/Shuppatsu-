const { createHomeEmbeds } = require('../components/basicEmbeds/homeEmbeds');
const { createInitialButtons } = require('../components/buttons');
const { sendWithExpiry } = require('../utils/sendWithExpiry');

module.exports = {
  name: 'r',
  description: 'Affiche les différent boutons de redirection sur les pages d\'oeuvres',
  execute: async (message) => {
    const embeds = createHomeEmbeds();
    const row = createInitialButtons();

    await sendWithExpiry(
      message.channel,
      embeds,
      [row],
      90_000,
      message.author.id
    );
  },
};
