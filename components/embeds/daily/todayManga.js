const { EmbedBuilder } = require('discord.js');
const { GIF_NO_RESULT_SCHEDULE_M } = require('../../../config');

function DailyMangaEmbed(manga, date) {
  const dateObj = new Date(date);
  const formattedDate = dateObj.toLocaleDateString('fr-FR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  if (manga.length === 0) {
    return new EmbedBuilder()
      .setColor('#1ABC9C')
      .setTitle(`Manga Releases for ${formattedDate}`)
      .setDescription("No manga releases today T-T")
      .setImage(GIF_NO_RESULT_SCHEDULE_M)
      .setTimestamp();
  }

  const description = manga.map((manga, index) => {
    const rawTitle = manga.title?.english || manga.title?.romaji || manga.title?.native || "Unknow title";
    const title = rawTitle.length > 70 ? rawTitle.substring(0, 70) + '…' : rawTitle;
    const episode = manga.episode || '?';
    return `**${index + 1}. [${title}](${manga.streamUrl || '#'})** - Episode : ${episode}`;
  }).join('\n');

  return new EmbedBuilder()
    .setColor('#1ABC9C')
    .setTitle(`Today's Manga Releases! ${formattedDate}`)
    .setDescription(description)
    .setTimestamp();
}

module.exports = { DailyMangaEmbed };
