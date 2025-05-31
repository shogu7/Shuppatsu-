const { ActionRowBuilder, EmbedBuilder } = require('discord.js');
const { expiredEmbeds } = require('../components/basicEmbeds/expiredEmbeds');
const { addActiveEmbed } = require('./embedCache');

async function sendWithExpiry(channel, embeds, rows, timeout = 90_000, userId = null) {
  const sent = await channel.send({ embeds, components: rows });

  addActiveEmbed(channel.id, sent.id);

  const collector = sent.createMessageComponentCollector({
    filter: i => !userId || i.user.id === userId,
    time: timeout
  });

  collector.on('end', async () => {
    const disabled = rows.map(r => {
      const nr = ActionRowBuilder.from(r);
      nr.components.forEach(c => c.setDisabled(true));
      return nr;
    });

    const oldEmbed = sent.embeds[0];
    const newEmbed = EmbedBuilder.from(oldEmbed).setFooter({ text: '⏱️ Session expirée. Ce menu est expiré ! Relancez la commande si nécessaire.' });

    await sent.edit({
      embeds: [newEmbed],
      components: []
    });
  });

  return sent;
}

module.exports = { sendWithExpiry };
