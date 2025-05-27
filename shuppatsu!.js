const { Client, GatewayIntentBits } = require('discord.js');
const handleInteraction = require('./events/handler/buttons/InteractionButton');
const { handleMessageCreate } = require('./events/messageHandler');

require('dotenv').config(); // for token proc
// console.log(getMangasByDate);

const client = new Client({
  intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent],
});

client.once('ready', () => {
  console.log(`✅ Connecté en tant que ${client.user.tag}`);
});

client.on('messageCreate', async (message) => { // New ver to call 
  try { // Addin try/catch to avoid crash
  await handleMessageCreate(message)
  } catch (error) {
    console.error('Error in messageCreate:', error);
  }
});

client.on('interactionCreate', async (interaction) => {
  try {
  await handleInteraction(interaction);
  } catch (error) {
    console.error('Error in interactionCreate:', error);
  }
});

client.login(process.env.BOT_TOKEN);
