// const { EmbedBuilder } = require('discord.js');
// const { GIF_COMMAND } = require('../../config');

// function expiredEmbeds() {

//     const commands = new Map();
//     const commandsPath = path.join(__dirname, '../../../commands');
//     const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

//     for (const file of commandFiles) {
//     const command = require(path.join(commandsPath, file));
//     commands.set(command.name);
//     }

//   return command.map((name, description) => {
//     const name = command.name || "Inconnu";
//     const description = command.description || "No description";
//     const commandName = args.shift().toLowerCase();
//     const cmdName = // TODO: for each ---> cmdName ---> show description + Name + Alias ----> Embeds
//     commands.get(commandName) ||
//     [...commands.values()].find(cmd => cmd.aliases?.includes(commandName));

//     return new EmbedBuilder()
//       .setColor('#1ABC9C')
//       .setTitle(`${cmdName}`)
//       .setDescription(`**Description :** ${chapter}`)
//       .setImage(null)
//       .setFooter({ text: `📅 Sortie du ${formattedDate}` })
//       .setTimestamp();
//   });

// }
// module.exports = { expiredEmbeds };