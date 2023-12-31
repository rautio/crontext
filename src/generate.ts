import { type Crontext, INIT, DEFAULT } from './parser';

/**
 * CRON FORMAT:
 *
 * ┌───────────── minute (0 - 59)
 * │ ┌───────────── hour (0 - 23)
 * │ │ ┌───────────── day of the month (1 - 31)
 * │ │ │ ┌───────────── month (1 - 12)
 * │ │ │ │ ┌───────────── day of the week (0 - 6) (Sunday to Saturday;
 * │ │ │ │ │                                   7 is also Sunday on some systems)
 * │ │ │ │ │
 * │ │ │ │ │
 * * * * * *
 */

const getValue = (str: string): string => {
  if (str === INIT) return DEFAULT;
  return str;
};

export const generate = (parsed: Crontext): string => {
  return `${getValue(parsed.minutes)} ${getValue(parsed.hour)} ${getValue(
    parsed.dayOfMonth,
  )} ${getValue(parsed.month)} ${getValue(parsed.dayOfWeek)}`;
};
