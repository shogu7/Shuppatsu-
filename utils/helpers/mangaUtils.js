function getReleaseCountsForWindow(allMangas, centerDateStr) {
  const centerDate = new Date(centerDateStr);
  const counts = {};
  for (let i = -5; i <= 5; i++) {
    const date = new Date(centerDate);
    date.setDate(centerDate.getDate() + i);
    const y = date.getFullYear();
    const m = String(date.getMonth() + 1).padStart(2, '0');
    const d = String(date.getDate()).padStart(2, '0');
    const dateStr = `${y}-${m}-${d}`;
    counts[dateStr] = 0;
  }

  allMangas.forEach(manga => {
    const sd = manga.startDate;
    if (sd?.year && sd?.month && sd?.day) {
      const mangaDateStr = `${sd.year}-${String(sd.month).padStart(2, '0')}-${String(sd.day).padStart(2, '0')}`;
      if (mangaDateStr in counts) {
        counts[mangaDateStr] += 1;
      }
    }
  });

  return counts;
}
module.exports = { getReleaseCountsForWindow };
