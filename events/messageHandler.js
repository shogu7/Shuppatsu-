const { createInitialButtons } = require('../components/buttons'); 
const { createHomeEmbeds } = require('../components/basicEmbeds/homeEmbeds');

async function handleMessageCreate(message) {
  if (message.content === '!manga') {
    const embeds = createHomeEmbeds();
    const row = createInitialButtons();
    await message.channel.send({ embeds: embeds, components: [row] });
  }
}

module.exports = { handleMessageCreate };