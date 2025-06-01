const { EmbedBuilder } = require('discord.js');
const { GIF_EXPIRED } = require('../../../../config');

function expiredEmbeds() {
  return [
    new EmbedBuilder()
      .setColor('#95A5A6')
      .setTitle('⏱️ Session expired')
      .setDescription('This menu has expired! Please run the command again if needed.')
      .setImage(GIF_EXPIRED)
  ];
}

module.exports = { expiredEmbeds };
