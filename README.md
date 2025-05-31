# Shuppatsu - Manga, Anime & Manhwa Release Discord Bot ;~;

**Shuppatsu** is a feature-rich Discord bot that keeps your server up-to-date with the latest manga, anime, and manhwa releases. Built for manga enthusiasts and Discord communities, Shuppatsu fetches and displays upcoming releases directly in your chosen channels, using reliable and modern APIs.

---

## ✨ Features

- **Up-to-date Releases:** Fetches the latest manga, anime, and manhwa release dates from AniList's API.
- **Smart Filtering:** Shows releases scheduled within ±5 days from today (covering an 11-day window, including today).
- **Embeds:** Sends release details (title, release date, and cover image) as visually appealing Discord embeds.
- **Manual Commands:** Trigger updates anytime with `sr` or `srelease` commands (for more `help`).
- **Automated Notifications:** Posts daily updates in a specified Discord channel.
- **Automated Testing:** Comprehensive unit tests using [Vitest](https://vitest.dev/) keep the bot reliable and bug-free.
- **Continuous Integration:** GitHub Actions automatically run tests on every push or pull request to the `main` branch, so broken code never makes it to production.

---

## 🛠️ Tech Stack

- **JavaScript:** 100% JavaScript for quick iteration and a wide range of Discord bot libraries.
- **[discord.js](https://discord.js.org/):** Handles all Discord API interactions.
- **[AniList API](https://anilist.co/graphiql):** The main data source for up-to-date manga, anime, and manhwa release info.
- ~~Jikan API & MangaCollect scraping (now deprecated):~~ Previously used but replaced with more reliable sources.
- **JSON Data Storage:** Uses static JSON files for caching and efficient API calls.
- **[Vitest](https://vitest.dev/):** Fast, modern unit testing for JavaScript.
- **GitHub Actions:** Automated CI/CD pipelines for testing and code quality.

---

## 🚀 Cool Things to Mention

- **Forward-Looking:** Designed with extensibility in mind—add new features, data sources, or custom commands with ease.
- **Embeds That Pop:** Information is delivered in rich Discord embeds, making updates easy to read and engaging.

---

## 📦 Getting Started

> **Note:** Shuppatsu is currently _under development_. Some features may not be fully functional yet, and improvements are ongoing!

1. **Clone this repo**
2. **Install dependencies:** `npm install`
3. **Set up a Discord bot application** (see [discord.js guide](https://discordjs.guide/preparations/setting-up-a-bot-application.html))
4. **Configure your environment variables** (e.g., bot token, channel IDs)
5. **Run the bot:** `node shuppatsu!.js`
6. **(Optional) Run tests:** `npm test`
> **PS:** Not all bot data is included in this repo. (You can fetch your own data using the scripts provided.)

---

## 🧪 Automated Testing

> **Note:** Unit tests are currently _under development_ and may not work properly yet.
> 
- **Unit tests:** All features are covered by unit tests using Vitest.
- **CI/CD:** Every push or pull request to `main` runs all tests via GitHub Actions, ensuring code quality and reliability.

---

> _Shuppatsu means "departure" in Japanese—never miss the departure of your favorite manga, anime, or manhwa again!_
