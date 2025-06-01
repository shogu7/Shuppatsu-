async function commandUndefined(message) {
  await message.reply(`${message.author}, the command \`${message.content}\` is unknown. \n Type \`!help\` to see the list of commands.`);
}

module.exports = { commandUndefined };