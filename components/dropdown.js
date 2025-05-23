const { ActionRowBuilder, StringSelectMenuBuilder } = require('discord.js');
const mangasCountByDate = require('../utils/mangasCountByDate');

function formatDateToYYYYMMDD(date) {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
}

function createDateSelectMenu(date, mangasCountByDate = {}) {
  const dateObj = new Date(date);
  const dates = [];

  for (let i = -5; i <= 5; i++) {
    const currDate = new Date(dateObj);
    currDate.setDate(currDate.getDate() + i);

    const dateStr = formatDateToYYYYMMDD(currDate);
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
      label,
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