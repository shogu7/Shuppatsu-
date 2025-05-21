const { Client, GatewayIntentBits, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
const axios = require('axios');
require('dotenv').config();

const client = new Client({
  intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent],
});

async function getMangasForDate(date) {
  try {
    const res = await axios.get('https://api.jikan.moe/v4/manga?order_by=start_date&sort=desc&limit=25');
    const allMangas = res.data.data;

    const targetDate = new Date(date);
    const targetDateStr = targetDate.toISOString().split('T')[0];

    const filtered = allMangas.filter((manga) => {
      const from = manga.published?.from;
      if (!from) return false;

      const publishedDateStr = from.split('T')[0];
      return publishedDateStr === targetDateStr;
    });

    return filtered;
  } catch (err) {
    console.error('❌ Erreur lors de la requête Jikan :', err.message);
    return [];
  }
}

function createMangaEmbeds(mangas, date) {
  const dateObj = new Date(date);
  const formattedDate = dateObj.toLocaleDateString('fr-FR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  if (mangas.length === 0) {
    const noResultEmbed = new EmbedBuilder()
      .setColor('#FF6B6B')
      .setTitle(`📚 Sorties Manga du ${formattedDate}`)
      .setDescription("Aucun manga trouvé pour cette date.")
      .setImage('https://c.tenor.com/ifGz550Sh_4AAAAd/tenor.gif') // ou https://c.tenor.com/iJB_gT1EG_cAAAAd/tenor.gif
      .setTimestamp();

    return [noResultEmbed];
  }
    // for each manga create a embeds with image, name, ect..
    const embeds = [];
    mangas.forEach((manga, index) => {
    const title = manga.title.length > 40 ? manga.title.substring(0, 40) + '…' : manga.title;

    const embed = new EmbedBuilder()
      .setColor('#fe6800')
      .setTitle(`${index + 1}. ${title}`)
      .setURL(manga.url)
      .setImage(manga.images?.jpg?.image_url || null)
      .setFooter({ text: `📅 Sortie du ${formattedDate}` })
      .setTimestamp();

  embeds.push(embed);
  });

  return embeds;
}


function createNavigationButtons(date) {
  return new ActionRowBuilder().addComponents(
    new ButtonBuilder()
      .setCustomId(`prev_${date}`)
      .setLabel('◀️')
      .setStyle(ButtonStyle.Primary),
    new ButtonBuilder()
      .setCustomId('exit')
      .setLabel('❌')
      .setStyle(ButtonStyle.Secondary),
    new ButtonBuilder()
      .setCustomId(`next_${date}`)
      .setLabel('▶️')
      .setStyle(ButtonStyle.Primary)
  );
}

function createInitialButtons() {
  return new ActionRowBuilder().addComponents(
    new ButtonBuilder()
      .setCustomId('manga_release')
      .setLabel('Manga Release')
      .setStyle(ButtonStyle.Success),
    new ButtonBuilder()
      .setCustomId('exit')
      .setLabel('Exit')
      .setStyle(ButtonStyle.Danger)
  );
}

client.once('ready', () => {
  console.log(`✅ Connecté en tant que ${client.user.tag}`);
});

client.on('messageCreate', async (message) => {
  if (message.content === '!manga') {
    const gifEmbed = new EmbedBuilder()
      .setColor('#74B9FF')
      .setTitle('Shuppatsu! ;~;')
      .setDescription('Utilisez les boutons ci-dessous pour naviguer.')
      .setImage('https://64.media.tumblr.com/72a92b4348f3d60379d37a99f355f811/2d4b90a2e9990aaa-d7/s493x246/fa6f7c793c368012208dc02a6a1fbda89f4cdc66.gif');

    const row = createInitialButtons();

    await message.channel.send({ embeds: [gifEmbed], components: [row] });
  }
});

client.on('interactionCreate', async (interaction) => {
  if (!interaction.isButton()) return;

  const { customId } = interaction;

  if (customId === 'exit') {
    const gifEmbed2 = new EmbedBuilder()
      .setColor('#74B9FF')
      .setTitle('Shuppatsu! ;~;')
      .setDescription('See ya soon...')
      .setImage('https://c.tenor.com/5lLSZHtNlTAAAAAd/tenor.gif');

    await interaction.update({ embeds: [gifEmbed2], components: [] });
    return;
  }

  if (customId === 'manga_release') {
    const today = new Date();
    const todayStr = today.toISOString().split('T')[0];

    await interaction.deferUpdate();
    const mangas = await getMangasForDate(todayStr);
    const embed = createMangaEmbeds(mangas, todayStr);
    const row = createNavigationButtons(todayStr);
    // embeds creation
    const embeds = createMangaEmbeds(mangas, todayStr);
    await interaction.editReply({ embeds, components: [row] });
    return;
  }

  if (customId.startsWith('prev_') || customId.startsWith('next_')) {
    const currentDate = customId.split('_')[1];
    const date = new Date(currentDate);

    if (customId.startsWith('prev_')) {
      date.setDate(date.getDate() - 1);
    } else {
      date.setDate(date.getDate() + 1);
    }

    const newDateStr = date.toISOString().split('T')[0];

    await interaction.deferUpdate();
    const mangas = await getMangasForDate(newDateStr);
    const embeds = createMangaEmbeds(mangas, newDateStr);
    const row = createNavigationButtons(newDateStr);
    await interaction.editReply({ embeds, components: [row] });
  }
});

client.login(process.env.BOT_TOKEN);
