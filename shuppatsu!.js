const { Client, GatewayIntentBits } = require('discord.js');
const handleInteraction = require('./events/handler/main/InteractionHandler');
const { handleMessageCreate } = require('./events/handler/main/messageHandler');
const { shutdownEmbeds } = require('./components/basicEmbeds/shutdownEmbeds');
const { getActiveEmbeds } = require('./utils/embedCache');
const { sendWithExpiry } = require('./utils/sendWithExpiry');
const { scheduleDailyMessages } = require('./utils/dailyScheduler');


require('dotenv').config(); // for token proc
// console.log(getMangasByDate);

const client = new Client({
  intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent],
});

//?#region: Client interaction + connection
client.once('ready', () => {
  console.log(`✅ Connecté en tant que ${client.user.tag}`);
  scheduleDailyMessages(client);
});

client.on('messageCreate', async (message) => { //* New ver to call 
  try { //* Addin try/catch to avoid crash
  await handleMessageCreate(message, sendWithExpiry)
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
//#endregion

//?#region: SHUTDOWN function :
process.on('SIGINT', async () => {
  console.log('\n🛑 Bot shutting down... Expiring active embeds...');

  const activeEmbeds = getActiveEmbeds();

  for (const { channelId, messageId } of activeEmbeds) {
    try {
      const channel = await client.channels.fetch(channelId);
      const message = await channel.messages.fetch(messageId);
      await message.edit({ embeds: shutdownEmbeds(), components: [] });
    } catch (err) {
      console.error(`❌ Could not expire message ${messageId}:`, err.message);
    }
  }

  process.exit(0);
});
//#endregion

client.login(process.env.BOT_TOKEN);
