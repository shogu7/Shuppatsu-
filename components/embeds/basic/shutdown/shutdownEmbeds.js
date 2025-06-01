const { EmbedBuilder } = require('discord.js');
const { GIF_SHUTDOWN } = require('../../../../config');

function shutdownEmbeds() {
  return [
    new EmbedBuilder()
      .setColor('#ff5555')
      .setTitle('🛑 Bot Offline')
      .setDescription('The bot is offline, this message will no longer respond.')
      .setImage(GIF_SHUTDOWN)
  ];
}

module.exports = { shutdownEmbeds };
