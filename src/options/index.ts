import type { WeekDays, Hours, Minutes } from './types';

export type InputOptions = {
  preset?: 'system';
  defaultHour?: Hours;
  defaultMinute?: Minutes;
  startOfWeek?: WeekDays;
  startDate?: Date;
};

export type Options = {
  defaultHour: Hours;
  defaultMinute: Minutes;
  startDate: Date;
  startOfWeek: WeekDays;
};

export const DEFAULT_DAY_MINUTES: Minutes = '0' as Minutes;
export const DEFAULT_DAY_HOURS: Hours = '9' as Hours;
export const DEFAULT_DAY_OF_WEEK: WeekDays = '1' as WeekDays;

export const parseOptions = (options?: InputOptions): Options => {
  let defaultHour = DEFAULT_DAY_HOURS;
  let defaultMinute = DEFAULT_DAY_MINUTES;
  let startDate = new Date();
  let startOfWeek = DEFAULT_DAY_OF_WEEK;
  if (options?.preset === 'system') {
    defaultHour = '0';
    defaultMinute = '0';
  }
  if (options?.defaultHour) {
    defaultHour = options.defaultHour;
  }
  if (options?.defaultMinute) {
    defaultMinute = options.defaultMinute;
  }
  if (options?.startDate) {
    startDate = options.startDate;
  }
  if (options?.startOfWeek) {
    startOfWeek = options.startOfWeek;
  }
  return { defaultHour, defaultMinute, startDate, startOfWeek };
};
