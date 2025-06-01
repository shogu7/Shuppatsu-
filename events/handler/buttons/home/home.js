const { createReleaseButtons } = require('../../../../components/buttons/releaseButtons');
const { createHomeEmbeds } = require('../../../../components/embeds/basic/home/homeEmbeds');

async function homeInteger(interaction) {

    const embeds = createHomeEmbeds();
    const row = createReleaseButtons();
    await interaction.update({ embeds: embeds, components: [row] });  
}

module.exports = { homeInteger };