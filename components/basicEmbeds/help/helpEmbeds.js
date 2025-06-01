const { EmbedBuilder } = require('discord.js');
const fs = require('fs');
const path = require('path');

function createHelpEmbeds() {
  const commandsPath = path.join(__dirname, '../../../commands');
  const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

  const embed = new EmbedBuilder()
    .setColor('#2C3E50')
    .setTitle('📝  Liste des commandes disponibles :');

  let descriptionText = '';

  for (const file of commandFiles) {
    const command = require(path.join(commandsPath, file));
    const name = command.name || 'Commande inconnue';
    const description = command.description || 'Pas de description disponible.';
    const aliases = command.aliases?.length ? `Alias : ${command.aliases.join(', ')}` : 'Pas d\'alias';

    descriptionText += `**${name}**\nDescription : ${description}\n${aliases}\n\n`;
  }

  embed.setDescription(descriptionText.trim())
       .setFooter({ text: '📅 Liste des commandes disponibles' })
       .setTimestamp();

  return [embed]
}

module.exports = { createHelpEmbeds };
