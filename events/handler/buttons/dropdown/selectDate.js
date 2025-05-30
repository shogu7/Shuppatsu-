const { getForDate } = require('../../../../utils/helpers/getReleaseData');
const { getCounts } = require('../../../../utils/helpers/getCounts');
const { getReleaseCountsForWindow } = require('../../../../utils/helpers/mangaUtils');
const { createDateSelectMenu } = require('../../../../components/dropdown/dropdown');
const { createMangaEmbeds } = require('../../../../components/release/manga/mangaEmbeds');
const { createAnimeEmbeds } = require('../../../../components/release/anime/animeEmbeds');
const { createManwhaEmbeds } = require('../../../../components/release/manwha/manwhaEmbeds');
const { createNavigationButtons } = require('../../../../components/buttons');
const { errorEmbeds } = require('../../../../components/basicEmbeds/error/errorEmbeds');

async function handleSelectDate(interaction, type) {
//? console.log('[handleSelectDate] type -->', type);

  if (!interaction.isStringSelectMenu() || !interaction.customId.startsWith('date_select')) return;

  const selectedDate = interaction.values[0];
  //? console.log('[handleSelectDate] selectedDate -->', selectedDate);

  await interaction.deferUpdate();

  const data = await getForDate(selectedDate, type);
  const dataInRange = await getCounts(selectedDate, type);

  if (!dataInRange) { //? erreur détectée
    await interaction.editReply({ embeds: [errorEmbeds()] });
    return;
  }

  const countByDate = getReleaseCountsForWindow(dataInRange, selectedDate);
  const dateMenu = createDateSelectMenu(selectedDate, countByDate, type);

  let embeds;
  switch (type) {
    case 'anime':
    case 'anime_release':
      embeds = createAnimeEmbeds(data, selectedDate);
      break;
    case 'manwha':
    case 'manwha_release':
      embeds = createManwhaEmbeds(data, selectedDate);
      break;
    case 'manga':
    case 'manga_release':
      embeds = createMangaEmbeds(data, selectedDate);
      break;
    default:
      embeds = errorEmbeds();
      break;
  }

  const navRow = createNavigationButtons(selectedDate, type, 0, data.length);
  const displayEmbeds = data.length > 0 ? [embeds[0]] : embeds;

  await interaction.editReply({ embeds: displayEmbeds, components: [dateMenu, navRow] });
}

module.exports = handleSelectDate;
