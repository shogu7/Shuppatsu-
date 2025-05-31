const { EmbedBuilder } = require('discord.js');
const { GIF_NO_RESULT_W } = require('../../../config');

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
      .setTitle(`📚 Sorties Manhwa du ${formattedDate}`)
      .setDescription("Aucun manhwa trouvé pour cette date.")
      .setImage(GIF_NO_RESULT_W)
      .setTimestamp();

    return [noResultEmbed];
  }

  return manwhas.map((manwha, index) => {
    const rawTitle = manwha.title?.english || manwha.title?.native || manwha.title?.romaji || "Titre inconnu";
    const title = rawTitle.length > 80 ? rawTitle.substring(0, 80) + '…' : rawTitle;
    const chapter = manwha.chapter || "Inconnu";

    return new EmbedBuilder()
      .setColor('#FFD580')
      .setTitle(`${index + 1}. ${title}`)
      .setDescription(`**Chapitre :** ${chapter}`)
      .setURL(manwha.siteUrl)
      .setImage(manwha.coverImage?.large || manwha.coverImage?.medium || null)
      .setFooter({ text: `📅 Sortie du ${formattedDate}` })
      .setTimestamp();
  });
}

module.exports = { createManwhaEmbeds };
