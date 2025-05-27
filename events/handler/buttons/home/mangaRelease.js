const { getForDate } = require('../../../../aniListAPI');
const { getMangaCounts } = require('../../../../utils/getCounts');
const { getReleaseCountsForWindow } = require('../../../../utils/mangaUtils');
const { createDateSelectMenu } = require('../../../../components/dropdown');
const { createMangaEmbeds } = require('../../../../components/mangaEmbeds');
const { createNavigationButtons } = require('../../../../components/buttons');

async function handleMangaRelease(interaction, type) {
  const today = new Date();
  const todayStr = today.toISOString().split('T')[0];

  await interaction.deferUpdate();

  const mangas = await getForDate(todayStr);
  console.log('from mangaRelease.js -->', mangas);
  const mangaInRange = await getMangaCounts(todayStr);

  const countByDate = getReleaseCountsForWindow(mangaInRange, todayStr);
  const dateMenu = createDateSelectMenu(todayStr, countByDate);
  const embeds = createMangaEmbeds(mangas, todayStr);
  const navRow = createNavigationButtons(todayStr, type, 0, mangas.length);
  const displayEmbeds = mangas.length > 0 ? [embeds[0]] : embeds;

  await interaction.editReply({ embeds: displayEmbeds, components: [dateMenu, navRow] });
}

module.exports = handleMangaRelease;
