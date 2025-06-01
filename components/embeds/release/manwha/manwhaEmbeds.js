const { EmbedBuilder } = require('discord.js');
const { GIF_NO_RESULT_W } = require('../../../../config');

function createManwhaEmbeds(manwhas, date) {
  const dateObj = new Date(date);
  const formattedDate = dateObj.toLocaleDateString('fr-FR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  if (manwhas.length === 0) {
    const noResultEmbed = new EmbedBuilder()
      .setColor('#FFD580')
      .setTitle(`📚 Manhwa Releases on ${formattedDate}`)
      .setDescription("No manhwa found for this date.")
      .setImage(GIF_NO_RESULT_W)
      .setTimestamp();

    return [noResultEmbed];
  }

  return manwhas.map((manwha, index) => {
    const rawTitle = manwha.title?.english || manwha.title?.native || manwha.title?.romaji || "Unknow title";
    const title = rawTitle.length > 80 ? rawTitle.substring(0, 80) + '…' : rawTitle;
    const chapter = manwha.chapter || "Not found";

    return new EmbedBuilder()
      .setColor('#FFD580')
      .setTitle(`${index + 1}. ${title}`)
      .setDescription(`**Chapitre :** ${chapter}`)
      .setURL(manwha.siteUrl)
      .setImage(manwha.coverImage?.large || manwha.coverImage?.medium || null)
      .setFooter({ text: `📅 Release Date: ${formattedDate}` })
      .setTimestamp();
  });
}

module.exports = { createManwhaEmbeds };
