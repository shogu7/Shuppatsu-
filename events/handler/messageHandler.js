const { createInitialButtons } = require('../../components/buttons');
const { createHomeEmbeds }     = require('../../components/basicEmbeds/homeEmbeds');

/**
 * @param {Message} message
 * @param {function} sendWithExpiry
 */
async function handleMessageCreate(message, sendWithExpiry) {
  if (message.author.bot || message.content !== '!manga') return;

  const embeds = createHomeEmbeds();
  const row    = createInitialButtons();

  await sendWithExpiry(
    message.channel,
    embeds,
    [row],
    90_000,
    message.author.id 
  );
}

module.exports = { handleMessageCreate };
