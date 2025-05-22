const { EmbedBuilder } = require('discord.js');
const { getMangasForDate } = require('../aniListAPI');
const { countMangasByDate } = require('../utils/mangaUtils');
const { createDateSelectMenu } = require('../components/dropdown');
const { createMangaEmbeds } = require('../components/mangaEmbeds');
const { createNavigationButtons } = require('../components/buttons'); // Will change asap, blouce circulaire idiiooot
const { GIF_EXIT } = require('../config');

async function handleInteraction(interaction) {
  if (!interaction.isButton() && !interaction.isStringSelectMenu()) return;

  if (interaction.customId === 'exit') {
    const gifEmbed2 = new EmbedBuilder()
      .setColor('#74B9FF')
      .setTitle('Shuppatsu! ;~;')
      .setDescription('See ya soon...')
      .setImage(GIF_EXIT);

    await interaction.update({ embeds: [gifEmbed2], components: [] });
    return;
  }

  if (interaction.customId === 'manga_release') {
    const today = new Date();
    const todayStr = today.toISOString().split('T')[0];

    await interaction.deferUpdate();
    const mangas = await getMangasForDate(todayStr);
    // console.log(mangas);

    const countByDate = countMangasByDate(mangas);
    const dateMenu = createDateSelectMenu(todayStr, countByDate);
    const embeds = createMangaEmbeds(mangas, todayStr);
    const navRow = createNavigationButtons(todayStr, 0, mangas.length);
    const displayEmbeds = mangas.length > 0 ? [embeds[0]] : embeds;

    await interaction.editReply({ embeds: displayEmbeds, components: [dateMenu, navRow] });
    return;
  }

  if (interaction.isStringSelectMenu() && interaction.customId === 'date_select') {
    const selectedDate = interaction.values[0];

    await interaction.deferUpdate();
    const mangas = await getMangasForDate(selectedDate);
    const countByDate = countMangasByDate(mangas);
    const dateMenu = createDateSelectMenu(selectedDate, countByDate);
    const embeds = createMangaEmbeds(mangas, selectedDate);
    const navRow = createNavigationButtons(selectedDate, 0, mangas.length);
    const displayEmbeds = mangas.length > 0 ? [embeds[0]] : embeds;

    await interaction.editReply({ embeds: displayEmbeds, components: [dateMenu, navRow] });
    return;
  }

  if (interaction.isButton()) {
    const [action, date, indexStr] = interaction.customId.split('_');
    if (action === 'nextManga' || action === 'prevManga') {
      let currentIndex = parseInt(indexStr, 10);
      const mangas = await getMangasForDate(date);
      const totalMangas = mangas.length;

      if (action === 'nextManga' && currentIndex < totalMangas - 1) {
        currentIndex++;
      } else if (action === 'prevManga' && currentIndex > 0) {
        currentIndex--;
      }

      const embeds = createMangaEmbeds(mangas, date);
      const countByDate = countMangasByDate(mangas);
      const navRow = createNavigationButtons(date, currentIndex, totalMangas);
      const dateMenu = createDateSelectMenu(date, countByDate);
      const displayEmbed = embeds.length > 0 ? [embeds[currentIndex]] : embeds;

      await interaction.update({ embeds: displayEmbed, components: [dateMenu, navRow] });
      return;
    }
  }
}

module.exports = { handleInteraction };
