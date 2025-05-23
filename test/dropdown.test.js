import { describe, it, expect } from 'vitest';
import { createDateSelectMenu } from '../components/dropdown';

describe('createDateSelectMenu', () => {
  it('génère 11 options', () => {
    const date = '2025-05-23';
    const result = createDateSelectMenu(date);
    const options = result.components[0].options;
    expect(options.length).toBe(11);
  });

  it('ajoute les bonnes infos de date et nombre de sorties', () => {
    const date = '2025-05-23';
    const data = { '2025-05-23': 3 };
    const result = createDateSelectMenu(date, data);
    const option = result.components[0].options.find(o => o.data.value === '2025-05-23');
    expect(option.data.label).toContain('3 Sorties de Manga');
  });

  it('marque la date sélectionnée comme par défaut', () => {
    const date = '2025-05-23';
    const result = createDateSelectMenu(date);
    const option = result.components[0].options.find(o => o.data.value === '2025-05-23');
    expect(option.data.default).toBe(true);
  });

  it('affiche "Aucune sortie" si pas de donnée', () => {
    const date = '2025-05-23';
    const result = createDateSelectMenu(date, {});
    const option = result.components[0].options.find(o => o.data.value === '2025-05-23');
    expect(option.data.label).toContain('Aucune sortie');
  });
});
