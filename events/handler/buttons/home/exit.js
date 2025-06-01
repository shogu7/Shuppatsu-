const { createExitEmbeds } = require('../../../../components/embeds/basic/navigation/exitEmbed');

async function exitInteger(interaction) {

    const embeds = createExitEmbeds();
    await interaction.update({ embeds: embeds, components: [] });

}

module.exports = { exitInteger };