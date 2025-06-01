const { EmbedBuilder } = require('discord.js');
const { GIF_NO_RESULT_M } = require('../../../../config');

function createMangaEmbeds(mangas, date) {
  const dateObj = new Date(date);
  const formattedDate = dateObj.toLocaleDateString('fr-FR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  if (mangas.length === 0) {
    const noResultEmbed = new EmbedBuilder()
      .setColor('#1ABC9C')
      .setTitle(`📚 Manga Releases for ${formattedDate}`)
      .setDescription("No manga found for this date.")
      .setImage(GIF_NO_RESULT_M)
      .setTimestamp();

    return [noResultEmbed];
  }

  return mangas.map((manga, index) => {
    const rawTitle = manga.title?.english || manga.title?.romaji || manga.title?.native || "Unknow title";
    const title = rawTitle.length > 80 ? rawTitle.substring(0, 80) + '…' : rawTitle;
    const chapter = manga.chapter || "Not found";

    return new EmbedBuilder()
      .setColor('#1ABC9C')
      .setTitle(`${index + 1}. ${title}`)
      .setDescription(`**Chapter :** ${chapter}`)
      .setURL(manga.siteUrl)
      .setImage(manga.coverImage?.large || manga.coverImage?.medium || null)
      .setFooter({ text: `📅 Release Date: ${formattedDate}` })
      .setTimestamp();
  });
}

module.exports = { createMangaEmbeds };
