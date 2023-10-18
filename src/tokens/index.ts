import { numberStringRegexOptions } from './number';
import { dayRegexOptions } from './day';

export type TokenDef = {
  test: string;
};

export enum TokenType {
  MINUTE = 'minutes',
  HOUR = 'hours',
  NUMBER = 'number',
  EXCLUDE = 'exclude',
  FREQUENCY = 'frequency',
  OCCURRENCE = 'occurrence',
  DAY = 'day',
  DAYS = 'days',
  RELATIVE_DAY = 'relative day',
  CLOCK = 'clock time',
  // Unknown has to be last
  UNKOWN = 'unknown',
}

export type TokenMap = Record<string, TokenDef>;

/**
 * Possible values:
 *
 * every, each, every other
 * excluding, except
 * next, after, before
 * at, on
 * tomorrow, today, yesterday, day after tomorrow
 * week, day, minute, hour, month, year
 * am, pm
 * 3rd, 2nd, 4th, first, second, third
 *
 *
 */

export const tokens = {
  [TokenType.MINUTE]: {
    test: '^(minutes|minute|mins|min)$',
  },
  [TokenType.HOUR]: {
    test: '^(hours|hour|hrs|hr)$',
  },
  [TokenType.DAYS]: {
    test: 'month|^(days|day|month|months|week|weeks)$',
  },
  [TokenType.RELATIVE_DAY]: {
    test: '^(tomorrow)$',
  },
  [TokenType.NUMBER]: {
    test: `^(\\d+|${numberStringRegexOptions})$|^a$`,
  },
  [TokenType.OCCURRENCE]: {
    test: '^(in|next)$',
  },
  [TokenType.FREQUENCY]: {
    test: '^(every|each|every other|at|on)$',
  },
  [TokenType.CLOCK]: {
    test: /^(\d?\d:\d\d|\d)[ ]?(am|pm|AM|PM)?|\d\d:\d\d|midnight|noon$/,
  },
  [TokenType.DAY]: {
    test: `${dayRegexOptions}`,
  },
  [TokenType.EXCLUDE]: {
    test: '^(except|excluding)$',
  },
  [TokenType.UNKOWN]: {
    test: ``,
  },
};

export default tokens;
