const { ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');

function createNavigationButtons(date, currentIndex = 0, totalMangas = 0) {
  const exitButton = new ButtonBuilder()
    .setCustomId('exit')
    .setLabel('❌')
    .setStyle(ButtonStyle.Secondary);

  const nextMangaButton = new ButtonBuilder()
    .setCustomId(`nextManga_${date}_${currentIndex}`)
    .setLabel('▶️')
    .setStyle(ButtonStyle.Primary)
    .setDisabled(currentIndex >= totalMangas - 1);

  const prevMangaButton = new ButtonBuilder()
    .setCustomId(`prevManga_${date}_${currentIndex}`)
    .setLabel('◀️')
    .setStyle(ButtonStyle.Primary)
    .setDisabled(currentIndex <= 0);

  return new ActionRowBuilder().addComponents(prevMangaButton, exitButton, nextMangaButton);
}

function createInitialButtons() {
  return new ActionRowBuilder().addComponents(
    new ButtonBuilder()
      .setCustomId('manga_release')
      .setLabel('Manga Release')
      .setStyle(ButtonStyle.Success),
    new ButtonBuilder()
      .setCustomId('exit')
      .setLabel('Exit')
      .setStyle(ButtonStyle.Danger)
  );
}

module.exports = {
  createNavigationButtons,
  createInitialButtons,
};
