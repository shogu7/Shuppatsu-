const { EmbedBuilder } = require('discord.js');
const { GIF_NO_RESULT_A } = require('../../../config');

function createAnimeEmbeds(animes, date) {
  const dateObj = new Date(date);
  const formattedDate = dateObj.toLocaleDateString('fr-FR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  if (animes.length === 0) {
    const noResultEmbed = new EmbedBuilder()
      .setColor('#9B59B6')
      .setTitle(`🎬 Sorties d'Anime du ${formattedDate}`)
      .setDescription("Aucun anime trouvé pour cette date.")
      .setImage(GIF_NO_RESULT_A)
      .setTimestamp();

    return [noResultEmbed];
  }

  return animes.map((anime, index) => {
    const rawTitle = anime.title?.english || anime.title?.romaji || anime.title?.native || "Titre inconnu";
    const title = rawTitle.length > 200 ? rawTitle.substring(0, 200) + '…' : rawTitle;
    const episode = anime.episode;

    return new EmbedBuilder()
      .setColor('#9B59B6')
      .setTitle(`${index + 1}. ${title}`)
      .setDescription(`**Épisode :** ${episode}`)
      .setURL(anime.streamUrl)
      .setImage(anime.coverImage?.large || anime.coverImage?.medium || null)
      .setFooter({ text: `📅 Sortie du ${formattedDate}` })
      .setTimestamp();
  });
}

module.exports = { createAnimeEmbeds };
