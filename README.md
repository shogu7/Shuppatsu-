# Shuppatsu - Manga Release Bot ;~;

Shuppatsu is a Discord bot designed to display manga release dates using data from AniList. It checks for manga scheduled for release today or the next day and posts the information in a specified Discord channel.

**Note:** This project is still under development and not fully functional. Some features may not work as expected, and improvements are ongoing.

## Features

- ~~Scrapes manga release information from [MangaCollect](https://www.mangacollec.com/planning).~~
- ~~Used dynamic calls to Jikan API (MyAnimeList) to fetch daily manga releases.~~
- Now uses static manga data stored in JSON, fetched from AniList API.
- Filters releases scheduled within ±5 days from today, including today (11 days total).
- Sends release information (title, release date, and cover image) as a Discord embed.
- Allows users to trigger the bot manually with the `!mangas` command.

## Automated Testing

- Unit tests with [Vitest](https://vitest.dev/) to check that the features work as expected.
- GitHub Actions set up to run tests automatically on every push or pull request to the `main` branch.
- This helps catch errors quickly and shows exactly which features have issues.
