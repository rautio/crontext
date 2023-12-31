export const dayRegexOptions =
  '^(mon|tues|tue|wed|wednes|thurs|thur|fri|sat|satur|sun)(day|days)?$|weekday|weekend|weekdays|weekends$';

export const pluralDayRegexOptions =
  '^(mon|tues|tue|wed|wednes|thurs|thur|fri|sat|satur|sun)(days)?$|weekdays|weekends$';

const weekMap: Record<string, string> = {
  sun: '0',
  mon: '1',
  tue: '2',
  wed: '3',
  thu: '4',
  fri: '5',
  sat: '6',
};

export const getDayOfWeek = (str: string): string => {
  if (str === 'weekday' || str === 'weekdays') return '1-5';
  if (str === 'weekend' || str === 'weekends') return '0,6';
  if (str === 'week') return '1'; // Needs config option
  const sub = str.substring(0, 3);
  if (!(sub in weekMap)) {
    throw new Error('Not a valid day.');
  }
  return weekMap[sub];
};
