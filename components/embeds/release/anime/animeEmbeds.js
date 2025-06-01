const { EmbedBuilder } = require('discord.js');
const { GIF_NO_RESULT_A } = require('../../../../config');

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
      .setTitle(`🎬 Anime Releases for ${formattedDate}`)
      .setDescription("No anime found for this date.")
      .setImage(GIF_NO_RESULT_A)
      .setTimestamp();

    return [noResultEmbed];
  }

  return animes.map((anime, index) => {
    const rawTitle = anime.title?.english || anime.title?.romaji || anime.title?.native || "Unknow title";
    const title = rawTitle.length > 200 ? rawTitle.substring(0, 200) + '…' : rawTitle;
    const episode = anime.episode || "Not found";

    return new EmbedBuilder()
      .setColor('#9B59B6')
      .setTitle(`${index + 1}. ${title}`)
      .setDescription(`**Episode :** ${episode}`)
      .setURL(anime.streamUrl)
      .setImage(anime.coverImage?.large || anime.coverImage?.medium || null)
      .setFooter({ text: `📅 Release Date: ${formattedDate}` })
      .setTimestamp();
  });
}

module.exports = { createAnimeEmbeds };
