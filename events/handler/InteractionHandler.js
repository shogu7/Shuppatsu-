const showRelease = require('./shared/showRelease');
const { createExitEmbeds } = require('../../components/basicEmbeds/exitEmbed');
const { handleNextPage, handlePrevPage } = require('./buttons/navigation/navigation');
const handleSelectDate  = require('./buttons/dropdown/selectDate');
const { homeInteger } = require('./buttons/home/home');
const { exitInteger } = require('./buttons/home/exit');

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
    return await exitInteger(interaction);
  }

  // DATE_SELECT LOGIC CALL
  if (interaction.isStringSelectMenu() && customId.startsWith('date_select_')) {
    type = customId.substring('date_select_'.length); 
    // console.log('From AFTER ALL interactionButtons.js (type print) -->', type);
    return await handleSelectDate(interaction, type);
  }

  // BUTTON PREV/NEXT LOGIC CALL
  if (interaction.isButton()) {
    const [action, type, date, indexStr] = customId.split('_');

    if (action === 'prev' || action === 'next') {
      console.log('type on button before constfulltype', type);
      const fullType = type + '_release';
      console.log('l.40 : fullType on button after constfulltype', fullType);
      return action === 'next'
        ? await handleNextPage(interaction, fullType)
        : await handlePrevPage(interaction, fullType);
    }
  }

  if (customId === 'back') {
    type = null;
    return await homeInteger(interaction);
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
