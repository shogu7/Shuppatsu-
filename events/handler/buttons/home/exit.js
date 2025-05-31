const { createExitEmbeds } = require('../../../../components/basicEmbeds/navigation/exitEmbed');

async function exitInteger(interaction) {

    const embeds = createExitEmbeds();
    await interaction.update({ embeds: embeds, components: [] });

}

module.exports = { exitInteger };