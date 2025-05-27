const { EmbedBuilder } = require('discord.js');
const { GIF_START } = require('../../config');

function createHomeEmbeds() {
  const embed = new EmbedBuilder()
    .setColor('#74B9FF')
    .setTitle('Shuppatsu! ;~;')
    .setDescription('Utilisez les boutons ci-dessous pour naviguer.')
    .setImage(GIF_START);

  return [embed];
}

module.exports = { createHomeEmbeds };