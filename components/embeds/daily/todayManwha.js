const { EmbedBuilder } = require('discord.js');
const { GIF_NO_RESULT_SCHEDULE_W } = require('../../../config');

function DailyManwhaEmbed(manwha, date) {
  const dateObj = new Date(date);
  const formattedDate = dateObj.toLocaleDateString('fr-FR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  if (manwha.length === 0) {
    return new EmbedBuilder()
      .setColor('#FFD580')
      .setTitle(`Sorties de Manwha du jour! ${formattedDate}`)
      .setDescription("Aucun manwha ajourd'hui snif snif...")
      .setImage(GIF_NO_RESULT_SCHEDULE_W)
      .setTimestamp();
  }

  const description = manwha.map((manwha, index) => {
    const rawTitle = manwha.title?.english || manwha.title?.romaji || manwha.title?.native || "Titre inconnu";
    const title = rawTitle.length > 70 ? rawTitle.substring(0, 70) + '…' : rawTitle;
    const episode = manwha.episode || '?';
    return `**${index + 1}. [${title}](${manwha.streamUrl || '#'})** - Épisode : ${episode}`;
  }).join('\n');

  return new EmbedBuilder()
    .setColor('#FFD580')
    .setTitle(`Sorties de manwha du jour ! ${formattedDate}`)
    .setDescription(description)
    .setTimestamp();
}

module.exports = { DailyManwhaEmbed };
