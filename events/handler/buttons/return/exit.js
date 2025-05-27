const createExitEmbed = require('../../components/exitEmbed');

module.exports = async function handleExit(interaction) {
  if (interaction.customId !== 'exit') return;

  const embed = createExitEmbed();
  await interaction.update({
    embeds: [embed],
    components: []
  });
};
