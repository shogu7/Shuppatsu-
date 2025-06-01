const { ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');

function createReleaseButtons() {
  return new ActionRowBuilder().addComponents(
    new ButtonBuilder()
      .setCustomId('manga_release')
      .setLabel('Manga Release')
      .setStyle(ButtonStyle.Success),
    new ButtonBuilder()
      .setCustomId('anime_release')
      .setLabel('Anime Release')
      .setStyle(ButtonStyle.Success),
    new ButtonBuilder()
      .setCustomId('manwha_release')
      .setLabel('Manwha Release')
      .setStyle(ButtonStyle.Success),
    new ButtonBuilder()
      .setCustomId('exit')
      .setLabel('Exit')
      .setStyle(ButtonStyle.Danger)
  );
}

module.exports = {
  createReleaseButtons
};
