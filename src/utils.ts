/** 
 * Formats given date
 * 
 * Intl.DateTimeFormat cheatsheet:
 * https://devhints.io/wip/intl-datetime
 */
export function formatDate(date: Date) {
  const dateString = new Intl.DateTimeFormat(undefined, {
    timeZoneName: 'short',
    year: 'numeric',
    month: 'short',
    weekday: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
  }).format(date);

  const [weekday, monthAndDay, year, timeAndZone] = dateString.split(', ');

  // The format required by freeCodeCamp:
  // -> Fri, Dec 25 2015 01:00:00 GMT+1
  return `${weekday}, ${monthAndDay} ${year} ${timeAndZone}`;
}
