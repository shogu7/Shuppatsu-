const { createReleaseButtons } = require('../../../../components/buttons');
const { createHomeEmbeds } = require('../../../../components/basicEmbeds/home/homeEmbeds');

async function homeInteger(interaction) {

    const embeds = createHomeEmbeds();
    const row = createReleaseButtons();
    await interaction.update({ embeds: embeds, components: [row] });  
}

module.exports = { homeInteger };