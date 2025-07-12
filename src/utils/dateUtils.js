export const getMonthDays = (currentDate) => {
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);

  const daysInMonth = [];
  const startDayOfWeek = firstDay.getDay(); // Sunday = 0

  for (let i = 0; i < startDayOfWeek; i++) {
    daysInMonth.push(null); // padding before the 1st
  }

  for (let day = 1; day <= lastDay.getDate(); day++) {
    daysInMonth.push(new Date(year, month, day));
  }

  return daysInMonth;
};
