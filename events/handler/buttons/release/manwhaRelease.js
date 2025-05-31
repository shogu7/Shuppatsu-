//!#region: Dead Code
const { getForDate } = require('../../../../aniListAPI');
const { getCounts } = require('../../../../utils/getCounts');
const { getReleaseCountsForWindow } = require('../../../../utils/mangaUtils');
const { createDateSelectMenu } = require('../../../../components/dropdown/dropdown');
const { createManwhaEmbeds } = require('../../../../components/mangaEmbeds');
const { createNavigationButtons } = require('../../../../components/buttons');

async function handleMangaRelease(interaction, type) {
  const today = new Date();
  const todayStr = today.toISOString().split('T')[0];

  await interaction.deferUpdate();

  const manwha = await getForDate(todayStr);
  const manwhaInRange = await getMangaCounts(todayStr);

  const countByDate = getReleaseCountsForWindow(manwhaInRange, todayStr);
  const dateMenu = createDateSelectMenu(todayStr, countByDate);
  const embeds = createMangaEmbeds(manwha, todayStr);
  const navRow = createNavigationButtons(todayStr, type, 0, manwha.length);
  const displayEmbeds = manwha.length > 0 ? [embeds[0]] : embeds;

  await interaction.editReply({ embeds: displayEmbeds, components: [dateMenu, navRow] });
}

module.exports = handleManwhaRelease;
//#endregion
