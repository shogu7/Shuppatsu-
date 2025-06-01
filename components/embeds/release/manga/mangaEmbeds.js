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
      .setTitle(`📚 Sorties Manga du ${formattedDate}`)
      .setDescription("Aucun manga trouvé pour cette date.")
      .setImage(GIF_NO_RESULT_M)
      .setTimestamp();

    return [noResultEmbed];
  }

  return mangas.map((manga, index) => {
    const rawTitle = manga.title?.english || manga.title?.romaji || manga.title?.native || "Titre inconnu";
    const title = rawTitle.length > 80 ? rawTitle.substring(0, 80) + '…' : rawTitle;
    const chapter = manga.chapter || "Inconnu";

    return new EmbedBuilder()
      .setColor('#1ABC9C')
      .setTitle(`${index + 1}. ${title}`)
      .setDescription(`**Chapitre :** ${chapter}`)
      .setURL(manga.siteUrl)
      .setImage(manga.coverImage?.large || manga.coverImage?.medium || null)
      .setFooter({ text: `📅 Sortie du ${formattedDate}` })
      .setTimestamp();
  });
}

module.exports = { createMangaEmbeds };
