// helpers
const { getForDate, getCounts, getReleaseCountsForWindow } = require('../../../../utils').helpers;
// Components UI
const { createDateSelectMenu } = require('../../../../components/dropdown/dropdown');
const { createNavigationButtons } = require('../../../../components/buttons/navigationButtons');
// Components Embeds
const { createMangaEmbeds } = require('../../../../components/embeds/release/manga/mangaEmbeds');
const { createAnimeEmbeds } = require('../../../../components/embeds/release/anime/animeEmbeds');
const { createManwhaEmbeds } = require('../../../../components/embeds/release/manwha/manwhaEmbeds');

async function handleNextPage(interaction, type) {
  await handlePageChange(interaction, 'next', type);
}

async function handlePrevPage(interaction, type) {
  await handlePageChange(interaction, 'prev', type);
}

async function handlePageChange(interaction, actionID) {
  const parts = interaction.customId.split('_');
  const action = parts[0];
  const type = parts[1] + '_' + parts[2];
  const date = parts[3];
  const indexStr = parts[4];

  let currentIndex = parseInt(indexStr, 10);

  const data = await getForDate(date, type);
  if (!Array.isArray(data) || data.length === 0) {
    return interaction.update({ content: 'No manga found for this date.', components: [], embeds: [] });
  }

  const dataInRange = await getCounts(date, type);
  const allData = data.length;

  if (actionID === 'next' && currentIndex < allData - 1) {
    currentIndex++;
  } else if (actionID === 'prev' && currentIndex > 0) {
    currentIndex--;
  }

  if (currentIndex < 0) currentIndex = 0;
  if (currentIndex >= allData) currentIndex = allData - 1;

  const countByDate = getReleaseCountsForWindow(dataInRange, date);
  const navRow = createNavigationButtons(date, type, currentIndex, allData);
  const dateMenu = createDateSelectMenu(date, countByDate, type);
  let embeds;
  switch(type) {
    case 'anime_release' :
      embeds = createAnimeEmbeds(data, date);
      break;
    case 'manga_release' :
      embeds = createMangaEmbeds(data, date);
      break;
    case 'manwha_release' :
      embeds = createManwhaEmbeds(data, date);
      break;
    default: 
    console.log('type undefined or not correctly');
  }

  const displayEmbed = embeds.length > 0 ? [embeds[currentIndex]] : [];

  // console.log('type from navigation', type);
  await interaction.update({ embeds: displayEmbed, components: [dateMenu, navRow], content: null });
}

module.exports = {
  handleNextPage,
  handlePrevPage,
};
