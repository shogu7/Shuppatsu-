const { EmbedBuilder } = require('discord.js');
const { GIF_ERROR } = require('../../config');

function errorEmbeds() {
  return new EmbedBuilder()
    .setColor('#E74C3C')
    .setTitle('Erreur')
    .setDescription('Une erreur est survenue, veuillez réessayer plus tard.')
    .setImage(GIF_ERROR);
}

module.exports = { errorEmbeds };