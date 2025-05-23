import { describe, it, expect } from 'vitest';
import { createNavigationButtons, createInitialButtons } from '../components/buttons';

describe('createNavigationButtons', () => {
  it('génère 3 boutons dans un ActionRow', () => {
    const row = createNavigationButtons('2025-05-23', 1, 5);
    const buttons = row.components;
    expect(buttons.length).toBe(3);
  });

  it('désactive le bouton précédent si currentIndex est 0', () => {
    const row = createNavigationButtons('2025-05-23', 0, 5);
    const prev = row.components[0];
    expect(prev.data.disabled).toBe(true);
  });

  it('désactive le bouton suivant si currentIndex >= totalMangas - 1', () => {
    const row = createNavigationButtons('2025-05-23', 4, 5);
    const next = row.components[2];
    expect(next.data.disabled).toBe(true);
  });

  it('utilise le bon customId pour next et prev', () => {
    const row = createNavigationButtons('2025-05-23', 2, 5);
    const prev = row.components[0];
    const next = row.components[2];
    expect(prev.data.custom_id).toBe('prevManga_2025-05-23_2');
    expect(next.data.custom_id).toBe('nextManga_2025-05-23_2');
  });
});

describe('createInitialButtons', () => {
  it('génère 2 boutons dans un ActionRow', () => {
    const row = createInitialButtons();
    const buttons = row.components;
    expect(buttons.length).toBe(2);
  });

  it('utilise les bons customId et labels', () => {
    const row = createInitialButtons();
    const [manga, exit] = row.components;
    expect(manga.data.custom_id).toBe('manga_release');
    expect(manga.data.label).toBe('Manga Release');
    expect(exit.data.custom_id).toBe('exit');
    expect(exit.data.label).toBe('Exit');
  });
});