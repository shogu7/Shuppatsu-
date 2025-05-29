const { ActionRowBuilder } = require('discord.js');
const { expiredEmbeds } = require('../components/basicEmbeds/expiredEmbeds');

async function sendWithExpiry(channel, embeds, rows, timeout = 90_000, userId = null) {
  const sent = await channel.send({ embeds, components: rows });
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

    await sent.edit({
      embeds: expiredEmbeds(),
      components: disabled
    });
  });

  return sent;
}

module.exports = { sendWithExpiry };
