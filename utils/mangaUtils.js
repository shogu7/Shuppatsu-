function countMangasByDate(mangas) {
  const countByDate = {};
  mangas.forEach(manga => {
    const date = manga.date;
    if (date) {
      countByDate[date] = (countByDate[date] || 0) + 1;
    }
  });
  return countByDate;
}

module.exports = { countMangasByDate };
