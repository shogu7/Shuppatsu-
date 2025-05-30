const activeEmbeds = [];

function addActiveEmbed(channelId, messageId) {
  activeEmbeds.push({ channelId, messageId });
}

function getActiveEmbeds() {
  return activeEmbeds;
}

function clearActiveEmbeds() {
  activeEmbeds.length = 0;
}

module.exports = {
  addActiveEmbed,
  getActiveEmbeds,
  clearActiveEmbeds,
};
