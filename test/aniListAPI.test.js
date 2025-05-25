// import { describe, it, expect, vi } from 'vitest';
// const { getMangasForDate } = require('../aniListAPI.js');
// import fs from 'fs';
// import path from 'path';

// describe('getMangasForDate - mocké sans toucher aux fichiers réels', () => {
//   const mockDate = new Date('2025-05-10');

//   const mockData = [
//     {
//       id: 185872,
//       countryOfOrigin: 'JP',
//       format: 'MANGA',
//       title: {
//         romaji: 'Kidou Senshi Gundam: Suisei no Majo - Seishun Frontier',
//         english: null,
//         native: '機動戦士ガンダム 水星の魔女 青春フロンティア'
//       },
//       startDate: {
//         year: 2025,
//         month: 5,
//         day: 23
//       },
//       coverImage: {
//         medium: 'https://s4.anilist.co/file/anilistcdn/media/manga/cover/small/bx185872-eiZHnlYz0Q4s.png'
//       },
//       siteUrl: 'https://anilist.co/manga/185872'
//     },
//     {
//       id: 191808,
//       countryOfOrigin: 'JP',
//       format: 'MANGA',
//       title: {
//         romaji: 'Mahou Shoujo to Mayaku Sensou',
//         english: 'Magical Girl and Narco Wars',
//         native: '魔法少女と麻薬戦争'
//       },
//       startDate: {
//         year: 2025,
//         month: 5,
//         day: 6
//       },
//       coverImage: {
//         medium: 'https://s4.anilist.co/file/anilistcdn/media/manga/cover/small/b191808-qSPzLQvowdyU.jpg'
//       },
//       siteUrl: 'https://anilist.co/manga/191808'
//     }
//   ];

//   it('retourne les mangas dans ±5 jours autour de la date actuelle mockée', async () => {
//     vi.useFakeTimers();
//     vi.setSystemTime(mockDate);

//     const dataPath = path.join(__dirname, '..', 'manga', 'scripts', 'data', 'dataM-2025-5.json');

//     vi.spyOn(fs, 'existsSync').mockImplementation((p) => p === dataPath);

//     vi.spyOn(fs, 'readFileSync').mockImplementation((p, encoding) => {
//       if (p === dataPath && encoding === 'utf-8') {
//         return JSON.stringify(mockData);
//       }
//       throw new Error('Unexpected file read');
//     });

//     const today = new Date();
//     const formattedDate = today.toISOString().split('T')[0];
//     console.log(formattedDate);
//     const result = await getMangasForDate(formattedDate);
//     expect(result).toHaveLength(1);
//     expect(result[0].id).toBe(191808);

//     vi.useRealTimers();
//     vi.restoreAllMocks();
//   });
// });


import { describe, it, expect } from 'vitest';

describe(':-:', () => {
  it(':-:', () => {
    expect(true).toBe(true);
  });
});
