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
      .setTitle(`🎬 Today's Anime Releases! ${formattedDate}`)
      .setDescription("No anime today ;-; .")
      .setImage(GIF_NO_RESULT_SCHEDULE_A)
      .setTimestamp();
  }

  const description = anime.map((anime, index) => {
    const rawTitle = anime.title?.english || anime.title?.romaji || anime.title?.native || "Unknow title";
    const title = rawTitle.length > 70 ? rawTitle.substring(0, 70) + '…' : rawTitle;
    const episode = anime.episode || '?';
    return `**${index + 1}. [${title}](${anime.streamUrl || '#'})** - Episode : ${episode}`;
  }).join('\n');

  return new EmbedBuilder()
    .setColor('#9B59B6')
    .setTitle(`Today's Anime Releases! ${formattedDate}`)
    .setDescription(description)
    .setTimestamp();
}

module.exports = { DailyAnimeEmbed };
