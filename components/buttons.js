const { ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');

function createNavigationButtons(date, type, currentIndex = 0, totalMangas = 0) {
  const exitButton = new ButtonBuilder()
    .setCustomId('exit')
    .setLabel('❌')
    .setStyle(ButtonStyle.Secondary);

  const nextButton = new ButtonBuilder()
    .setCustomId(`next_${type}_${date}_${currentIndex}`)
    .setLabel('▶️')
    .setStyle(ButtonStyle.Primary)
    .setDisabled(currentIndex >= totalMangas - 1);

  const prevButton = new ButtonBuilder()
    .setCustomId(`prev_${type}_${date}_${currentIndex}`)
    .setLabel('◀️')
    .setStyle(ButtonStyle.Primary)
    .setDisabled(currentIndex <= 0);

  const backButton = new ButtonBuilder()
  .setCustomId(`back`)
  .setLabel('🔙')
  .setStyle(ButtonStyle.Secondary)

  return new ActionRowBuilder().addComponents(prevButton, exitButton, nextButton, backButton);
}

function createInitialButtons() {
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
      .setCustomId('exit')
      .setLabel('Exit')
      .setStyle(ButtonStyle.Danger)
  );
}

module.exports = {
  createNavigationButtons,
  createInitialButtons,
};
