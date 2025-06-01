const { EmbedBuilder } = require('discord.js');
const fs = require('fs');
const path = require('path');

function createHelpEmbeds() {
  const commandsPath = path.join(__dirname, '../../../../commands');
  const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

  const embed = new EmbedBuilder()
    .setColor('#2C3E50')
    .setTitle('📝 List of available commands:')

  let descriptionText = '';

    for (const file of commandFiles) {
        const command = require(path.join(commandsPath, file));
        const name = command.name ? `\`${command.name}\`` : '`Unknown command`';
        const description = command.description || 'No description available.';
        const aliases = command.aliases?.length ? `Aliases : ${command.aliases.join(', ')}` : 'No \'aliases';

        descriptionText += `**${name}**\n**Description  :** *${description}*\n**${aliases}**\n\n`;
    }



  embed.setDescription(descriptionText.trim())
       .setFooter({ text: '📅 List of available commands' })
       .setTimestamp();

  return [embed]
}

module.exports = { createHelpEmbeds };
