const { EmbedBuilder } = require('discord.js');
const { GIF_ERROR } = require('../../../../config');

function errorEmbeds() {
  return new EmbedBuilder()
    .setColor('#E74C3C')
    .setTitle('Error')
    .setDescription('An error occurred, please try again later.')
    .setImage(GIF_ERROR);
}

module.exports = { errorEmbeds };