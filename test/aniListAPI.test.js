import { describe, it, expect, vi } from 'vitest';
import { getMangasForDate } from '../aniListAPI';
import fs from 'fs';
import path from 'path';

describe('getMangasForDate - mocké sans toucher aux fichiers réels', () => {
  const mockDate = new Date('2025-05-10');

  const mockData = [
    {
      id: 192541,
      title: { romaji: "Inshoku-Ou Demar the comic" },
      startDate: { year: 2025, month: 5, day: 12 },
      siteUrl: "https://anilist.co/manga/192541"
    },
    {
      id: 999999,
      title: { romaji: "Hors plage" },
      startDate: { year: 2025, month: 4, day: 1 },
      siteUrl: "https://anilist.co/manga/999999"
    }
  ];

  it('retourne les mangas dans ±5 jours autour de la date actuelle mockée', async () => {
    vi.useFakeTimers();
    vi.setSystemTime(mockDate);

    const dataPath = path.join(__dirname, '..', 'manga', 'scripts', 'data', 'dataM-2025-5.json');

    vi.spyOn(fs, 'existsSync').mockImplementation((p) => p === dataPath);

    vi.spyOn(fs, 'readFileSync').mockImplementation((p, encoding) => {
      if (p === dataPath && encoding === 'utf-8') {
        return JSON.stringify(mockData);
      }
      throw new Error('Unexpected file read');
    });

    const today = new Date();
    const formattedDate = today.toISOString().split('T')[0];

    const result = await getMangasForDate(formattedDate);

    expect(result).toHaveLength(1);
    expect(result[0].id).toBe(192541);

    // Nettoyage
    vi.useRealTimers();
    vi.restoreAllMocks();
  });
});
