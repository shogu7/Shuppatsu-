const { EmbedBuilder } = require('discord.js');
const { GIF_NO_RESULT } = require('../../config');

function createAnimeEmbeds(animes, date) {
  const dateObj = new Date(date);
  const formattedDate = dateObj.toLocaleDateString('fr-FR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  if (animes.length === 0) {
    const noResultEmbed = new EmbedBuilder()
      .setColor('#FF6B6B')
      .setTitle(`🎬 Sorties Anime du ${formattedDate}`)
      .setDescription("Aucun anime trouvé pour cette date.")
      .setImage(GIF_NO_RESULT)
      .setTimestamp();

    return [noResultEmbed];
  }

  return animes.map((anime, index) => {
    const rawTitle = anime.title?.english || anime.title?.romaji || anime.title?.native || "Titre inconnu";
    const title = rawTitle.length > 40 ? rawTitle.substring(0, 40) + '…' : rawTitle;

    return new EmbedBuilder()
      .setColor('#0099ff')
      .setTitle(`${index + 1}. ${title}`)
      .setURL(anime.siteUrl)
      .setImage(anime.coverImage?.medium || null)
      .setFooter({ text: `📅 Sortie du ${formattedDate}` })
      .setTimestamp();
  });
}

module.exports = { createAnimeEmbeds };
