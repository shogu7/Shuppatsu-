const { ActionRowBuilder, StringSelectMenuBuilder } = require('discord.js');
const mangasCountByDate = require('../utils/mangasCountByDate');

function createDateSelectMenu(date, mangasCountByDate = {}) {
  const dateObj = new Date(date);
  const dates = [];

  for (let i = -5; i <= 5; i++) {
    const currDate = new Date(dateObj);
    currDate.setDate(currDate.getDate() + i);

    const dateStr = currDate.toISOString().split('T')[0];
    const formattedDate = currDate.toLocaleDateString('fr-FR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
    const count = mangasCountByDate[dateStr] || 0;
    const label = count > 0
      ? `${formattedDate} - ${count} Sortie${count > 1 ? 's' : ''} de Manga`
      : `${formattedDate} - Aucune sortie`;

    dates.push({
      value: dateStr,
      label: label,
      default: i === 0,
    });
  }

  return new ActionRowBuilder().addComponents(
    new StringSelectMenuBuilder()
      .setCustomId('date_select')
      .setPlaceholder('Sélectionner une date')
      .addOptions(dates)
  );
}

module.exports = { createDateSelectMenu };


// TODO : Fix Date on dropdown do not display how much release for each day ! ! ! ! ! ! ! ! ! ! ! ! ! ! ! ! ! ! 