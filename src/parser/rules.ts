import type { Token } from '../tokenize';
import { TokenType } from '../tokens';
import { testRepeat as freqTestRepeat } from '../tokens/frequency';
import { getNumber } from '../tokens/number';
import { getTime } from '../tokens/clock';
import { getDayOfWeek, pluralDayRegexOptions } from '../tokens/day';
import type { Options } from '../options';
import { INIT, DEFAULT } from './index';
import type { Crontext } from './index';

const {
  FREQUENCY,
  OCCURRENCE,
  NUMBER,
  MINUTE,
  CLOCK,
  DAY,
  HOUR,
  DAYS,
  RELATIVE_DAY,
} = TokenType;

export const updateDay = (
  crontext: Crontext,
  tokens: Token[],
  options: Options,
): Crontext => {
  // If there are no minutes or hour set we use defaults
  // 'On monday' -> 9am Monday
  if (crontext.minutes === INIT) crontext.minutes = options.defaultMinute;
  if (crontext.hour === INIT) crontext.hour = options.defaultHour;
  const re = new RegExp(pluralDayRegexOptions);
  const dayToken = tokens.find(t => t.type === DAY);
  let dayOfWeek = '*';
  if (dayToken) {
    // Plural 'on mondays' means its repeating
    if (re.test(dayToken.value)) {
      crontext.repeat = true;
    }
    dayOfWeek = getDayOfWeek(dayToken.value);
  }
  return { ...crontext, dayOfWeek };
};

export const updateDays = (
  crontext: Crontext,
  tokens: Token[],
  options: Options,
): Crontext => {
  // Default like 'next week'
  let delta = 1;
  let setDate = true;
  if (crontext.minutes === INIT) crontext.minutes = options.defaultMinute;
  if (crontext.hour === INIT) crontext.hour = options.defaultHour;
  // Specified the number like 'in 3 days', 'in 2 weeks', etc.
  if (tokens.length === 3) {
    delta = getNumber(tokens[1].value);
  }
  if (tokens[tokens.length - 1].value.indexOf('month') > -1) {
    const nextDate = new Date(options.startDate.getTime());
    nextDate.setMonth(nextDate.getMonth() + delta);
    // 'next month'
    if (crontext.dayOfMonth === INIT && tokens.length == 2) {
      crontext.dayOfMonth = '1';
    } else {
      crontext.dayOfMonth = nextDate.getDate().toString();
    }
    return {
      ...crontext,
      month: nextDate.getMonth().toString(),
    };
  }
  // Day or week (month would have been returned above)
  if (tokens[tokens.length - 1].value.indexOf('week') > -1) {
    if (tokens.length === 2) {
      crontext.dayOfWeek = '1';
      setDate = false;
    }
    delta *= 7;
  }
  if (setDate) {
    const { startDate } = options;
    const nextDate = new Date(startDate.getTime());
    nextDate.setDate(nextDate.getDate() + delta);
    crontext.dayOfMonth = nextDate.getDate().toString();
  }
  return crontext;
};

/**
 * -> [FREQ][COMBO1]
 * [COMBO1] -> [(NUMBER)][MINUTE|HOUR|DAY]
 *
 */

// The grammar
export const rules = [
  {
    match: [FREQUENCY],
    update: (crontext: Crontext, tokens: Token[]): Crontext => {
      const re = new RegExp(freqTestRepeat);
      if (re.test(tokens[0].value)) {
        crontext.repeat = true;
      }
      return crontext;
    },
  },
  {
    match: [FREQUENCY, NUMBER, MINUTE],
    update: (crontext: Crontext, tokens: Token[]): Crontext => {
      crontext.minutes = '*/' + getNumber(tokens[1].value);
      return crontext;
    },
  },
  {
    match: [FREQUENCY, MINUTE],
    update: (crontext: Crontext): Crontext => {
      crontext.minutes = DEFAULT;
      crontext.hour = DEFAULT;
      return crontext;
    },
  },
  {
    match: [FREQUENCY, NUMBER, HOUR],
    update: (crontext: Crontext, tokens: Token[]): Crontext => {
      if (crontext.minutes === INIT) crontext.minutes = '0';
      crontext.hour = '*/' + getNumber(tokens[1].value);
      return crontext;
    },
  },
  {
    match: [FREQUENCY, HOUR],
    update: (crontext: Crontext): Crontext => {
      crontext.minutes = '0';
      crontext.hour = DEFAULT;
      return crontext;
    },
  },
  {
    match: [OCCURRENCE, DAYS],
    update: updateDays,
  },
  {
    match: [OCCURRENCE, NUMBER, DAYS],
    update: updateDays,
  },
  {
    match: [OCCURRENCE, DAY],
    update: updateDay,
  },
  {
    match: [FREQUENCY, DAY],
    update: updateDay,
  },
  {
    match: [DAY],
    update: updateDay,
  },
  {
    match: [FREQUENCY, DAYS],
    update: (
      crontext: Crontext,
      tokens: Token[],
      options: Options,
    ): Crontext => {
      if (crontext.minutes === INIT) crontext.minutes = options.defaultMinute;
      if (crontext.hour === INIT) crontext.hour = options.defaultHour;
      if (tokens[1].value.indexOf('month') > -1) {
        crontext.dayOfMonth = '1';
      }
      if (tokens[1].value.indexOf('week') > -1) {
        crontext.dayOfWeek = options.startOfWeek;
      }
      return crontext;
    },
  },
  {
    match: [RELATIVE_DAY],
    update: (
      crontext: Crontext,
      tokens: Token[],
      options: Options,
    ): Crontext => {
      if (tokens[0].value === 'tomorrow') {
        const { startDate } = options;
        const tomorrow = new Date(startDate.getTime());
        tomorrow.setDate(startDate.getDate() + 1);
        crontext.dayOfMonth = tomorrow.getDate().toString();
        if (crontext.minutes === INIT) crontext.minutes = options.defaultMinute;
        if (crontext.hour === INIT) crontext.hour = options.defaultHour;
      }
      return crontext;
    },
  },
  {
    match: [FREQUENCY, CLOCK],
    update: (crontext: Crontext, tokens: Token[]): Crontext => {
      const [hour, minute] = getTime(tokens[1].value);
      crontext.minutes = minute.toString();
      crontext.hour = hour.toString();
      return crontext;
    },
  },
];
