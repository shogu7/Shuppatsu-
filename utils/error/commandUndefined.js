async function commandUndefined(message) {
  await message.reply(`❌ ${message.author}, the command \`${message.content}\` is unknown.`);
}

module.exports = { commandUndefined };