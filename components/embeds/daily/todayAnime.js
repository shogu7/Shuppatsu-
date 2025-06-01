const { EmbedBuilder } = require('discord.js');
const { GIF_NO_RESULT_SCHEDULE_A } = require('../../../config');

function DailyAnimeEmbed(anime, date) {
  const dateObj = new Date(date);
  const formattedDate = dateObj.toLocaleDateString('fr-FR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  if (anime.length === 0) {
    return new EmbedBuilder()
      .setColor('#9B59B6')
      .setTitle(`🎬 Sorties d'Anime du jour ! ${formattedDate}`)
      .setDescription("Aucun anime ajourd'hui ;-; .")
      .setImage(GIF_NO_RESULT_SCHEDULE_A)
      .setTimestamp();
  }

  const description = anime.map((anime, index) => {
    const rawTitle = anime.title?.english || anime.title?.romaji || anime.title?.native || "Titre inconnu";
    const title = rawTitle.length > 70 ? rawTitle.substring(0, 70) + '…' : rawTitle;
    const episode = anime.episode || '?';
    return `**${index + 1}. [${title}](${anime.streamUrl || '#'})** - Épisode : ${episode}`;
  }).join('\n');

  return new EmbedBuilder()
    .setColor('#9B59B6')
    .setTitle(`Sorties d'Anime du jour ! ${formattedDate}`)
    .setDescription(description)
    .setTimestamp();
}

module.exports = { DailyAnimeEmbed };
