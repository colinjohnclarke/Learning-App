function LastWeekDates() {
  const currentDate = new Date();
  const previousDates = [];

  // max 1 year streak with this function

  for (let i = 0; i < 7; i++) {
    const previousDate = new Date(currentDate);
    previousDate.setDate(previousDate.getDate() - i);
    previousDates.push(previousDate.toISOString().substring(0, 10));
  }

  const reverseChronologicalOrderdates = previousDates.sort((a, b) => {
    return new Date(b) - new Date(a);
  });

  return reverseChronologicalOrderdates;
}

export default LastWeekDates;
