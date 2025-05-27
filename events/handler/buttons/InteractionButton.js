const showRelease = require('../shared/showRelease');
const { createExitEmbeds } = require('../../../components/basicEmbeds/exitEmbed');
const { handleNextPage, handlePrevPage } = require('../buttons/navigation');
const handleSelectDate  = require('./dropdown/selectDate');

async function handleInteraction(interaction) {
console.log('---------------------------------------------------------->');
// console.log('GLOBAL HANDLER -- Interaction reçue');
// console.log('Type:', interaction.type);
// console.log('customId:', interaction.customId);
// console.log('isStringSelectMenu:', interaction.isStringSelectMenu?.());

  if (!interaction.isButton() && !interaction.isStringSelectMenu()) return;

  const customId = interaction.customId;
  // console.log('here is the customID :', customId);
  let type = null;

  // EXIT LOGIC CALL
  if (customId === 'exit') {
    const embeds = createExitEmbeds();
    await interaction.update({ embeds: embeds, components: [] });
    return;
  }

  // DATE_SELECT LOGIC CALL
  if (interaction.isStringSelectMenu() && customId.startsWith('date_select_')) {
    type = customId.substring('date_select_'.length); 
    // console.log('From interactionButtons.js (interaction print) -->', interaction);
    return await handleSelectDate(interaction, type);
  }

  // BUTTON PREV/NEXT LOGIC CALL
  if (interaction.isButton()) {
    const [action, type, date, indexStr] = customId.split('_');

    if (action === 'prev' || action === 'next') {
      const fullType = type + '_release'; // ou juste type si déjà complet
      console.log('before sending to handleNextPage here is the type:', fullType);
      return action === 'next'
        ? await handleNextPage(interaction, fullType)
        : await handlePrevPage(interaction, fullType);
    }
  }

  // Type logic
  if (customId.endsWith('_release')) {
    type = customId;
    if (type.startsWith('date_select_')) {
      type = type.substring('date_select_'.length);
    }
    // console.log('l.23 from interactionButton.js -->', type);
    const todayStr = new Date().toISOString().split('T')[0];

    await interaction.deferUpdate();
    await showRelease(interaction, todayStr, type);
    return;
  }
  return;
}
module.exports = handleInteraction;
