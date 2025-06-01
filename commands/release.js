const { createHomeEmbeds } = require('../components/basicEmbeds/home/homeEmbeds');
const { createReleaseButtons } = require('../components/buttons');
const { sendWithExpiry } = require('../utils/sendWithExpiry');

module.exports = {
  name: 'release',
  aliases: ['r', 'manga', 'anime', 'manwha'],
  description: 'Affiche les différent boutons de redirection sur les pages d\'oeuvres',
  execute: async (message) => {
    const embeds = createHomeEmbeds();
    const row = createReleaseButtons();

    await sendWithExpiry(
      message.channel,
      embeds,
      [row],
      90_000,
      message.author.id
    );
  },
};
