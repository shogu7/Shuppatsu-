const { createInitialButtons } = require('../../../../components/buttons');
const { createHomeEmbeds } = require('../../../../components/basicEmbeds/home/homeEmbeds');

async function homeInteger(interaction) {

    const embeds = createHomeEmbeds();
    const row = createInitialButtons();
    await interaction.update({ embeds: embeds, components: [row] });  
}

module.exports = { homeInteger };