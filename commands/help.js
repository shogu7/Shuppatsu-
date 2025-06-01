const { createHelpEmbeds } = require('../components/embeds/basic/help/helpEmbeds');

module.exports = {
  name: 'help',
  aliases: ['h'],
  description: 'Affiche la liste de toutes les commandes disponibles',
  async execute(message) {
    try {
      const embeds = createHelpEmbeds();
      await message.channel.send({ embeds });
    } catch (error) {
      console.error('Erreur dans la commande help :', error);
      message.reply('Une erreur est survenue lors de l\'exécution de la commande.');
    }
  }
};
