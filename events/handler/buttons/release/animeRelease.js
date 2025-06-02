//!#region: Dead Code
// helpers
const { getForDate, getCounts, getReleaseCountsForWindow } = require('../../../../utils').helpers;
// Components UI
const { createDateSelectMenu } = require('../../../../components/dropdown/dropdown');
// Components Embeds
const { createAnimeEmbeds } = require('../../../../components/embeds/release/anime/animeEmbeds');
const { createNavigationButtons } = require('../../../../components/buttons');

async function handleAnimeRelease(interaction) {
  const today = new Date();
  const todayStr = today.toISOString().split('T')[0];

  await interaction.deferUpdate();

  const animes = await getForDate(todayStr);
  const animeInRange = await getCounts(todayStr);

  const countByDate = getReleaseCountsForWindow(animeInRange, todayStr);
  const dateMenu = createDateSelectMenu(todayStr, countByDate);
  const embeds = createAnimeEmbeds(animes, todayStr);
  const navRow = createNavigationButtons(todayStr, 0, animes.length);
  const displayEmbeds = animes.length > 0 ? [embeds[0]] : embeds;

  await interaction.editReply({ embeds: displayEmbeds, components: [dateMenu, navRow] });
}

module.exports = handleAnimeRelease;
//#endregion