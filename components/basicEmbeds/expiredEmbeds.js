const { EmbedBuilder } = require('discord.js');
const { GIF_EXPIRED } = require('../../config');

function expiredEmbeds() {
  return [
    new EmbedBuilder()
      .setColor('#95A5A6')
      .setTitle('⏱️ Session expirée')
      .setDescription('Ce menu est expiré ! Relancez la commande si nécessaire.')
      .setImage(GIF_EXPIRED)
  ];
}

module.exports = { expiredEmbeds };
