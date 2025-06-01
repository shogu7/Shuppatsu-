const { createHelpEmbeds } = require('../components/embeds/basic/help/helpEmbeds');

module.exports = {
  name: 'help',
  aliases: ['h'],
  description: 'Displays the list of all available commands',
  async execute(message) {
    try {
      const embeds = createHelpEmbeds();
      await message.channel.send({ embeds });
    } catch (error) {
      console.error('Error in the help command:', error);
      message.reply('An error occurred while executing the command.');
    }
  }
};
