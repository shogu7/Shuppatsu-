function mangasCountByDate(mangas) {
  const counts = {};
  mangas.forEach(manga => {
    const sd = manga.startDate;
    if (!sd?.year || !sd?.month || !sd?.day) return;
    const key = `${sd.year}-${String(sd.month).padStart(2,'0')}-${String(sd.day).padStart(2,'0')}`;
    counts[key] = (counts[key] || 0) + 1;
  });
  return counts;
}

module.exports = mangasCountByDate;
