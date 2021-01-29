/** 
 * Formats given date
 * 
 * Intl.DateTimeFormat cheatsheet:
 * https://devhints.io/wip/intl-datetime
 */
export function formatDate(date: Date) {
  return new Intl.DateTimeFormat(undefined, {
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
}
