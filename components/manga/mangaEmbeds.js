const { EmbedBuilder } = require('discord.js');
const { GIF_NO_RESULT } = require('../../config');

function createMangaEmbeds(mangas, date) {
  const dateObj = new Date(date);
  const formattedDate = dateObj.toLocaleDateString('fr-FR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  if (mangas.length === 0) {
    const noResultEmbed = new EmbedBuilder()
      .setColor('#FF6B6B')
      .setTitle(`📚 Sorties Manga du ${formattedDate}`)
      .setDescription("Aucun manga trouvé pour cette date.")
      .setImage(GIF_NO_RESULT)
      .setTimestamp();

    return [noResultEmbed];
  }

  return mangas.map((manga, index) => {
    const rawTitle = manga.title?.english || manga.title?.romaji || manga.title?.native || "Titre inconnu";
    const title = rawTitle.length > 40 ? rawTitle.substring(0, 40) + '…' : rawTitle;
    const chapter = manga.chapter;

    return new EmbedBuilder()
      .setColor('#fe6800')
      .setTitle(`${index + 1}. ${title}`)
      .setDescription(`**Chapitre :** ${chapter}`)
      .setURL(manga.siteUrl)
      .setImage(manga.coverImage?.large || manga.coverImage?.medium || null)
      .setFooter({ text: `📅 Sortie du ${formattedDate}` })
      .setTimestamp();
  });
}

module.exports = { createMangaEmbeds };
