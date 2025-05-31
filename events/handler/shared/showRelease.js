const { getForDate } = require('../../../aniListAPI');
const { getCounts } = require('../../../utils/getCounts');
const { getReleaseCountsForWindow } = require('../../../utils/mangaUtils');
const { createDateSelectMenu } = require('../../../components/dropdown/dropdown');
const { createMangaEmbeds } = require('../../../components/release/manga/mangaEmbeds');
const { createAnimeEmbeds } = require('../../../components/release/anime/animeEmbeds');
const { createManwhaEmbeds } = require('../../../components/release/manwha/manwhaEmbeds');
const { createNavigationButtons } = require('../../../components/buttons');
const { errorEmbeds } = require('../../../components/basicEmbeds/errorEmbeds');

module.exports = async function showRelease(interaction, dateStr, type) {
    // console.log('type avant getforDate', type);
    const data = await getForDate(dateStr, type);
    // console.log('from showRelease.js -->', data, '/', dateStr, '/', type);
    const counts = await getCounts(dateStr, type);
    if (data === null || counts === null) {
        return interaction.editReply({ embeds: errorEmbeds('Type invalide') });
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
