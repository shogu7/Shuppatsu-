const fs = require('fs');
const path = require('path');
const { commandUndefined } = require("../../../utils/error/commandUndefined")
const prefix = 's';

const commands = new Map();
const commandsPath = path.join(__dirname, '../../../commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
  const command = require(path.join(commandsPath, file));
  commands.set(command.name, command);
}

async function routerHandler(message) {
  if (message.author.bot || !message.content.startsWith(prefix)) return;

  const args = message.content.slice(prefix.length).trim().split(/ +/);
  const commandName = args.shift().toLowerCase();

  const command =
    commands.get(commandName) ||
    [...commands.values()].find(cmd => cmd.aliases?.includes(commandName));

  if (!command) return await commandUndefined(message);

  try {
    await command.execute(message, args);
  } catch (error) {
    console.error(error);
    message.reply('Une erreur est survenue lors de l\'exécution de la commande.');
  }
}

module.exports = { routerHandler };
