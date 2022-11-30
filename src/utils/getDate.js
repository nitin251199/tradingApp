export const getDate = () => {
  const months = [
    'Jan',
    'Febr',
    'Mar',
    'Apr',
    'May',
    'June',
    'July',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ];
  const today = new Date();
  const date = today.getDate();
  const month = months[today.getMonth()];
  const year = today.getFullYear();
  const amOrPm = today.getHours() < 12 ? 'AM' : 'PM';
  return `${date} ${month} ${year} | ${today
    .toLocaleTimeString()
    .slice(0, 5)} ${amOrPm}`;
};
