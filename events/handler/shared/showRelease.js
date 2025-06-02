// helpers
const { getForDate, getCounts, getReleaseCountsForWindow } = require('../../../utils').helpers;
// Components - Embeds
const { createAnimeEmbeds, createMangaEmbeds, createManwhaEmbeds } = require('../../../components/embeds/release');
const { errorEmbeds } = require('../../../components/embeds/basic/error/errorEmbeds');
// Components - UI
const { createNavigationButtons } = require('../../../components').buttons;
const { createDateSelectMenu } = require('../../../components').dropdown;

module.exports = async function showRelease(interaction, dateStr, type) {

    const data = await getForDate(dateStr, type);

    const counts = await getCounts(dateStr, type);
    if (data === null || counts === null) {
        return interaction.editReply({ embeds: errorEmbeds('Invalid type') });
    }

    const countByDate = getReleaseCountsForWindow(counts, dateStr);
    const dateMenu = createDateSelectMenu(dateStr, countByDate, type);

    let embeds;
    switch (type) {
        case 'anime_release':
        case 'anime':
            embeds = createAnimeEmbeds(data, dateStr);
            break;
        case 'manwha_release':
        case 'manwha':
            embeds = createManwhaEmbeds(data, dateStr);
            break;
        case 'manga_release':
        case 'manga':
            embeds = createMangaEmbeds(data, dateStr);
            break;
        default:
            embeds = errorEmbeds;
    }

    const navRow = createNavigationButtons(dateStr, type, 0, data.length);
    const displayEmbeds = data.length > 0 ? [embeds[0]] : embeds;

    await interaction.editReply({ embeds: displayEmbeds, components: [dateMenu, navRow] });
};
