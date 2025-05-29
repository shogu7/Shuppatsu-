const { EmbedBuilder } = require('discord.js');
const { GIF_NO_RESULT_ANIME } = require('../../config');

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
      .setTitle(`🎬 Sorties d'Anime du ${formattedDate}`)
      .setDescription("Aucun anime trouvé pour cette date.")
      .setImage(GIF_NO_RESULT_ANIME)
      .setTimestamp();

    return [noResultEmbed];
  }

  return animes.map((anime, index) => {
    const rawTitle = anime.title?.english || anime.title?.romaji || anime.title?.native || "Titre inconnu";
    const title = rawTitle.length > 70 ? rawTitle.substring(0, 70) + '…' : rawTitle;
    const episode = anime.episode;

    return new EmbedBuilder()
      .setColor('#0099ff')
      .setTitle(`${index + 1}. ${title}`)
      .setDescription(`**Épisode :** ${episode}`)
      .setURL(anime.streamUrl)
      .setImage(anime.coverImage?.medium || null)
      .setFooter({ text: `📅 Sortie du ${formattedDate}` })
      .setTimestamp();
  });
}

module.exports = { createAnimeEmbeds };
