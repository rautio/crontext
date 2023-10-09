export type InputOptions = {
  preset?: 'system';
  defaultHour?: string;
  defaultMinute?: string;
};

export type Options = {
  defaultHour: string;
  defaultMinute: string;
};

export const DEFAULT_DAY_MINUTES = '0';
export const DEFAULT_DAY_HOURS = '9';

export const parseOptions = (options?: InputOptions): Options => {
  let defaultHour = DEFAULT_DAY_HOURS;
  let defaultMinute = DEFAULT_DAY_MINUTES;
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
  return { defaultHour, defaultMinute };
};
