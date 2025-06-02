// function: shows release embeds by type and date
const showRelease = require('../shared/showRelease');
// Components - Embeds
const { homeInteger } = require('../buttons/home/home');
const { exitInteger } = require('../buttons/home/exit');
// Components - UI
const { handleNextPage, handlePrevPage } = require('../buttons/navigation/navigation');
const handleSelectDate  = require('../buttons/dropdown/selectDate');

async function handleInteraction(interaction) {

  if (!interaction.isButton() && !interaction.isStringSelectMenu()) return;

  const customId = interaction.customId;
  let type = null;

  //#region: EXIT LOGIC CALL :
  if (customId === 'exit') {

    return await exitInteger(interaction);

  }
  //#endregion

  //#region: DATE_SELECT LOGIC CALL 
  if (interaction.isStringSelectMenu() && customId.startsWith('date_select_')) {

    type = customId.substring('date_select_'.length); 

    return await handleSelectDate(interaction, type);

  }
  //#endregion

  //#region: BUTTON PREV/NEXT LOGIC CALL
  if (interaction.isButton()) {

    const [action, type, date, indexStr] = customId.split('_');

    if (action === 'prev' || action === 'next') {
      const fullType = type + '_release';

      return action === 'next'

        ? await handleNextPage(interaction, fullType)
        : await handlePrevPage(interaction, fullType);

    }

  }
  //#endregion

  //#region: BACK logic
  if (customId === 'back') {

    type = null;

    return await homeInteger(interaction);

  }
  //#endregion

  //#region: Type logic
  if (customId.endsWith('_release')) {

    type = customId;

    if (type.startsWith('date_select_')) {

      type = type.substring('date_select_'.length);

    }

    const todayStr = new Date().toISOString().split('T')[0];

    await interaction.deferUpdate();
    await showRelease(interaction, todayStr, type);
    
    return;

  }
  //#endregion
  
  return;

}
module.exports = handleInteraction;
