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

function createMangaEmbed(mangas, date) {
  const dateObj = new Date(date);
  const formattedDate = dateObj.toLocaleDateString('fr-FR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  const embed = new EmbedBuilder()
    .setColor('#FF6B6B')
    .setTitle(`📚 Sorties Manga du ${formattedDate}`)
    .setTimestamp();

  if (mangas.length === 0) {
    embed.setDescription("Aucun manga trouvé pour cette date.");
  } else {
    if (mangas[0].images?.jpg?.image_url) {
      embed.setThumbnail(mangas[0].images.jpg.image_url);
    }

    mangas.forEach((manga, index) => {
      const title = manga.title.length > 25 ? manga.title.substring(0, 25) + '...' : manga.title;
      embed.addFields({
        name: `${index + 1}. ${title}`,
        value: `[Voir](${manga.url})`,
        inline: true,
      });
    });

    embed.setFooter({ text: `${mangas.length} manga(s) trouvé(s)` });
  }

  return embed;
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
      .setStyle(ButtonStyle.Danger),
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
    const embed = createMangaEmbed(mangas, todayStr);
    const row = createNavigationButtons(todayStr);

    await interaction.editReply({ embeds: [embed], components: [row] });
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
    const embed = createMangaEmbed(mangas, newDateStr);
    const row = createNavigationButtons(newDateStr);

    await interaction.editReply({ embeds: [embed], components: [row] });
  }
});

client.login(process.env.BOT_TOKEN);
