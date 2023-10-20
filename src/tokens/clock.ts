export type Time = {
  minute: number;
  hour: number;
};

/**
 * Calculate the hour and minute from a string clock format.
 * @param str
 * @returns [hour, minute]
 */
export const getTime = (str: string): [number, number] => {
  if (str === 'midnight') return [0, 0];
  if (str === 'noon') return [12, 0];
  const re = new RegExp('([0-9]+)[:]?([0-9]+)?');
  const match = re.exec(str);
  let hour = 0;
  let minute = 0;
  if (match && match.length >= 2) {
    hour += Number(match[1]) || 0;
    if (match.length >= 3) {
      minute += Number(match[2]) || 0;
    }
  }
  if (str.indexOf('pm') > -1 || str.indexOf('PM') > -1) {
    hour += 12;
  }
  return [hour, minute];
};
