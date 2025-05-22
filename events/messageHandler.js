const { EmbedBuilder } = require('discord.js');
const { createInitialButtons } = require('../components/buttons'); 
const { GIF_START } = require('../config');

async function handleMessageCreate(message) {
  if (message.content === '!manga') {
    const gifEmbed = new EmbedBuilder()
      .setColor('#74B9FF')
      .setTitle('Shuppatsu! ;~;')
      .setDescription('Utilisez les boutons ci-dessous pour naviguer.')
      .setImage(GIF_START);
    const row = createInitialButtons();
    await message.channel.send({ embeds: [gifEmbed], components: [row] });
  }
}

module.exports = { handleMessageCreate };
