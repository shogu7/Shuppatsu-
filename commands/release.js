const { createHomeEmbeds } = require('../components/embeds/basic/navigation/homeEmbeds');
const { createReleaseButtons } = require('../components/buttons/releaseButtons');
const { sendWithExpiry } = require('../utils/sendWithExpiry');

module.exports = {
  name: 'release',
  aliases: ['r', 'manga', 'anime', 'manwha'],
  description: 'Displays the different navigation buttons on the works pages',
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
