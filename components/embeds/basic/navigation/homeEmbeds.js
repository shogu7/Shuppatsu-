const { EmbedBuilder } = require('discord.js');
const { GIF_START } = require('../../../../config');

function createHomeEmbeds() {
  const embed = new EmbedBuilder()
    .setColor('#74B9FF')
    .setTitle('Shuppatsu! ;~;')
    .setDescription('Use the buttons below to navigate.')
    .setImage(GIF_START);

  return [embed];
}

module.exports = { createHomeEmbeds };