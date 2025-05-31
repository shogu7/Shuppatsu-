const { EmbedBuilder } = require('discord.js');
const { GIF_SHUTDOWN } = require('../../../config');

function shutdownEmbeds() {
  return [
    new EmbedBuilder()
      .setColor('#ff5555')
      .setTitle('🛑 Bot éteint')
      .setDescription('Le bot est hors ligne, ce message ne répond plus.')
      .setImage(GIF_SHUTDOWN)
  ];
}

module.exports = { shutdownEmbeds };
