/**
 * Creates an array of sorted number values given a single cron format string.
 * Note: Does not support '/' format
 * @param str
 * @returns
 */
export const getNums = (str: string, units: number): Array<number> => {
  const isNum = !isNaN(Number(str));
  let res: Array<number> = [];
  if (isNum) {
    res.push(Number(str));
  } else if (str.indexOf(',') > -1) {
    const splits = str.split(',');
    splits.forEach(split => {
      res = [...res, ...getNums(split, units)];
    });
  } else if (str.indexOf('-') > -1) {
    // There's a range - but we've already split so this should be just two numbers
    const splits = str.split('-');
    if (splits.length === 2) {
      const start = Number(splits[0]);
      const end = Number(splits[1]);
      const diff = getDiff(start, end, units);
      for (let i = 0; i <= diff; i++) {
        res.push((start + i) % units);
      }
    }
  }
  // '*' returns empty array.
  return res.sort((a, b) => a - b);
};
/**
 * Given an array of possible next values find the closest one that comes next in the order.
 * @param cur
 * @param nums
 * @returns
 */
export const getNextValue = (cur: number, nums: Array<number>): number => {
  // Nums has to always have at least 1 value
  // Otherwise all values are valid and we don't call this method
  // But for safety we just return the current number;
  if (nums.length === 0) return cur;
  const sorted = nums.sort((a, b) => a - b);
  for (let i = 0; i < sorted.length; i++) {
    const num = sorted[i];
    if (num >= cur) {
      return num;
    }
  }
  // If we didn't find a number, it means our cur is the largest so we need to
  // wrap and return the next smallest item in the schedule.
  return nums[0];
};

/**
 * Whether the given number is part of a schedule.
 * @param num
 * @param nums
 * @returns
 */
export const isValid = (num: number, nums: Array<number>) => {
  // If nums is empty - all values are valid
  if (nums.length === 0) return true;
  return nums.indexOf(num) > -1;
};

/**
 * Get the difference between two time numbers. If the first is less than the second
 * we go around the clock to get to it. Not backwards in time. No time traveling!
 * @param cur
 * @param next
 * @param max
 * @returns
 */
export const getDiff = (cur: number, next: number, units: number) => {
  if (next < cur) {
    return units - cur + next;
  }
  return next - cur;
};

/**
 * Iterate to the next month according to the given schedule
 * @param cur
 * @param cronSplit
 */
export const iterMonth = (cur: Date, schedule: number[]) => {
  if (!isValid(cur.getMonth(), schedule)) {
    // Current month is not valid - iterate.
    const next = getNextValue(cur.getMonth(), schedule);
    // Calculate diff in case the month is behind us - then it'll bump the year
    const diff = getDiff(cur.getMonth(), next, 12);
    cur.setMonth(cur.getMonth() + diff);
    // There is no year format so no need to check if we had spill over
  }
  return cur;
};

/**
 * Iterate to the next day of week given the schedule.
 * @param cur
 * @param schedule
 * @returns
 */
export const iterDayOfWeek = (cur: Date, schedule: number[]): Date => {
  if (!isValid(cur.getDay(), schedule)) {
    // Current day of week is not valid - iterate
    const next = getNextValue(cur.getDay(), schedule);
    const diff = getDiff(cur.getDay(), next, 7);
    cur.setDate(cur.getDate() + diff);
  }
  return cur;
};

/**
 * Iterate to the next day of month.
 * @param cur
 * @param schedule
 * @returns
 */
export const iterDayOfMonth = (cur: Date, schedule: number[]): Date => {
  if (!isValid(cur.getDate(), schedule)) {
    const next = getNextValue(cur.getDate(), schedule);
    // Don't know how many days are in each month so just bump by 1 if the month is behind us
    if (cur.getDate() > next) {
      cur.setMonth(cur.getMonth() + 1);
    }
    cur.setDate(next);
  }
  return cur;
};

/**
 * Iterate to the next hour.
 * @param cur
 * @param schedule
 */
export const iterHour = (cur: Date, schedule: number[]): Date => {
  if (!isValid(cur.getHours(), schedule)) {
    const curHours = cur.getHours();
    const next = getNextValue(curHours, schedule);
    const diff = getDiff(curHours, next, 24);
    cur.setHours(curHours + diff);
  }
  return cur;
};

export const iterMinute = (cur: Date, schedule: number[]): Date => {
  if (!isValid(cur.getMinutes(), schedule)) {
    const curMinutes = cur.getMinutes();
    const next = getNextValue(curMinutes, schedule);
    const diff = getDiff(curMinutes, next, 60);
    cur.setMinutes(curMinutes + diff);
  }
  return cur;
};

/**
 * Iterate to the next date on the cron schedule. Does not support seconds format.
 * @param date
 * @param cron
 * @returns
 */
export const iterDate = (date: Date, cron: string): Date => {
  // Keep dates idompotent since this is called recursively.
  let cur = new Date(date.getTime());
  const splits = cron.split(' ');
  const [minute, hour, dayMonth, month, dayWeek] = splits;
  // Validate largest items first (smaller ones will spill over and re-run checks)
  const monthSchedule = getNums(month, 11);
  const dayWeekSchedule = getNums(dayWeek, 7);
  const dayMonthSchedule = getNums(dayMonth, 31); // How do we know? Depends on the month.
  const hourSchedule = getNums(hour, 24);
  const minuteSchedule = getNums(minute, 60);
  // Validate minute
  const curMinutes = cur.getMinutes();
  cur = iterMinute(cur, minuteSchedule);
  if (curMinutes > cur.getMinutes()) {
    return iterDate(cur, cron);
  }
  // Validate hour
  const curHours = cur.getHours();
  cur = iterHour(cur, hourSchedule);
  if (curHours > cur.getHours()) {
    // We have spilled over the day - need to revalidate
    return iterDate(cur, cron);
  }
  // Validate date
  cur = iterDayOfMonth(cur, dayMonthSchedule);
  // Validate day of week
  cur = iterDayOfWeek(cur, getNums(dayWeek, 7));
  // Validate month
  cur = iterMonth(cur, getNums(month, 12));
  if (
    !isValid(cur.getMonth(), monthSchedule) ||
    !isValid(cur.getDay(), dayWeekSchedule) ||
    !isValid(cur.getDate(), dayMonthSchedule)
  ) {
    // We broke the month or day schedule, need to reiterate
    return iterDate(cur, cron);
  }
  return cur;
};

/**
 * Returns a date string of the next occurence of the cron schedule.
 * @param cron
 */
export const nextDate = (cron: string, startDate?: Date): Date => {
  const splits = cron.split(' ');
  const start = startDate || new Date();
  // If length is 6 then there are seconds.
  if (splits.length === 5) {
    return iterDate(start, cron);
  }
  return start;
};
