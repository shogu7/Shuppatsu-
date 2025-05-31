const fs = require('fs');
const path = require('path');
const prefix = '!';

const commands = new Map();
const commandsPath = path.join(__dirname, '../../../commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
  const command = require(path.join(commandsPath, file));
  commands.set(command.name, command);
}

async function routerHandler(message) {
  if (message.author.bot) return;
  if (!message.content.startsWith(prefix)) return;

  const args = message.content.slice(prefix.length).trim().split(/ +/);
  const commandName = args.shift().toLowerCase();

  if (!commands.has(commandName)) return;

  const command = commands.get(commandName);

  try {
    await command.execute(message, args);
  } catch (error) {
    console.error(error);
    message.reply('Une erreur est survenue lors de l\'exécution de la commande.');
  }
}

module.exports = { routerHandler };
