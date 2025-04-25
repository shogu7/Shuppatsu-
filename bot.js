require('dotenv').config();
const { Client, GatewayIntentBits } = require('discord.js');
const puppeteer = require('puppeteer');

const BOT_TOKEN = process.env.BOT_TOKEN;
const MANGA_COLLECT_URL = 'https://www.mangacollec.com/planning';
const YOUR_CHANNEL_ID = '1353787888260743188';

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent
  ]
});

function getTomorrowDate() {
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  return tomorrow.toISOString().split('T')[0];
}

function convertFrenchDateToISO(frenchDate) {
  const monthMap = {
    "janvier": "01", "février": "02", "mars": "03", "avril": "04",
    "mai": "05", "juin": "06", "juillet": "07", "août": "08",
    "septembre": "09", "octobre": "10", "novembre": "11", "décembre": "12"
  };

  const parts = frenchDate.split(' ');
  if (parts.length < 4) return '';
  const day = parts[1];
  const month = monthMap[parts[2].toLowerCase()];
  const year = parts[3];
  return `${year}-${month}-${day}`;
}

async function scrollPageToBottom(page) {
  let previousHeight = await page.evaluate(() => document.body.scrollHeight);
  while (true) {
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    await page.waitForTimeout(1000);
    const newHeight = await page.evaluate(() => document.body.scrollHeight);
    if (newHeight === previousHeight) break;
    previousHeight = newHeight;
  }
}

async function getMangaReleases() {
  console.log(`[${new Date().toISOString()}] Scraping started...`);

  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();

  await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36');
  await page.goto(MANGA_COLLECT_URL, { waitUntil: 'networkidle2' });

  await scrollPageToBottom(page);

  const releases = await page.evaluate(() => {
    const extractedReleases = [];
    const banners = document.querySelectorAll('div.css-175oi2r');
    console.log('Nombre de bannières trouvées:', banners.length);

    banners.forEach(banner => {
      const dateText = banner.textContent.trim();
      if (!/janvier|février|mars|avril|mai|juin|juillet|août|septembre|octobre|novembre|décembre/i.test(dateText)) return;
      
      const mangaContainer = banner.nextElementSibling;
      if (mangaContainer) {
        const mangaElements = mangaContainer.querySelectorAll('.css-146c3p1');
        mangaElements.forEach(mangaEl => {
          const title = mangaEl.textContent.trim();
          const imgEl = mangaEl.closest('div')?.querySelector('img');
          const imgUrl = imgEl ? imgEl.src : '';
          extractedReleases.push({
            title,
            imgUrl,
            releaseDateText: dateText
          });
        });
      }
    });
    console.log('Releases extraites:', extractedReleases);
    return extractedReleases;
  });

  await browser.close();

  const tomorrow = getTomorrowDate();
  const filteredReleases = releases.filter(m => convertFrenchDateToISO(m.releaseDateText) === tomorrow);
  return filteredReleases;
}

async function sendMangaReleases(channel) {
  console.log(`[${new Date().toISOString()}] Sending manga releases...`);

  const releases = await getMangaReleases();

  if (releases.length === 0) {
    console.log(`[${new Date().toISOString()}] No manga releases found... ;-;`);
    await channel.send("📭 No manga releases for today.");
    return;
  }

  for (const manga of releases) {
    const embed = {
      color: 0x0099ff,
      title: manga.title,
      description: `Release Date: ${manga.releaseDateText}`,
      image: { url: manga.imgUrl },
    };

    await channel.send({ embeds: [embed] });
  }
}

client.once('ready', () => {
  console.log(`✅ Logged in as ${client.user.tag}!`);
});

client.on('messageCreate', async message => {
  if (message.content === '!mangas' && message.channel.id === YOUR_CHANNEL_ID) {
    await sendMangaReleases(message.channel);
  }
});

client.login(BOT_TOKEN);
