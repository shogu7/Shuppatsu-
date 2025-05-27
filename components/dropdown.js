const { ActionRowBuilder, StringSelectMenuBuilder } = require('discord.js');

function formatDateToYYYYMMDD(date) {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
}

/**
 * @param {string} centerDateStr 
 * @param {object} counts 
 * @returns {ActionRowBuilder}
 */
function createDateSelectMenu(centerDateStr, counts = {}, type) {
  const centerDate = new Date(centerDateStr);
  const options = [];
console.log('From createDateSelectMenu -->', type, centerDateStr);
// console.log(counts);
  for (let i = -5; i <= 5; i++) {
    const dateObj = new Date(centerDate);
    dateObj.setDate(centerDate.getDate() + i);

    const dateStr = formatDateToYYYYMMDD(dateObj);
    const count = counts[dateStr] || 0;
    const formattedDate = dateObj.toLocaleDateString('fr-FR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });

    const label =
      count > 0
        ? `${formattedDate} - ${count} Sortie${count > 1 ? 's' : ''} de Manga`
        : `${formattedDate} - Aucune sortie`;

    options.push({
      label,
      value: dateStr,
      default: i === 0,
    });
  }

  return new ActionRowBuilder().addComponents(
    new StringSelectMenuBuilder()
      .setCustomId(`date_select_${type}`)
      .setPlaceholder('Sélectionner une date')
      .addOptions(options)
  );
}

module.exports = { createDateSelectMenu };