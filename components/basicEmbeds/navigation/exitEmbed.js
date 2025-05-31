const { EmbedBuilder } = require('discord.js');
const { GIF_EXIT } = require('../../../config');

function createExitEmbeds() {
  const embed = new EmbedBuilder()
    .setColor('#74B9FF')
    .setTitle('Shuppatsu! ;~;')
    .setDescription('See ya soon...')
    .setImage(GIF_EXIT);

  return [embed];
};

module.exports = { createExitEmbeds };