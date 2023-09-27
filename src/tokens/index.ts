import { numberStringRegexOptions } from './number';

export type TokenDef = {
  test: string;
};

export enum TokenType {
  MINUTE = 'minutes',
  NUMBER = 'number',
  EXCLUDE = 'exclude',
  FREQUENCY = 'frequency',
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
  [TokenType.NUMBER]: {
    test: `^(\\d+|${numberStringRegexOptions})$`,
  },
  [TokenType.FREQUENCY]: {
    test: '^(every|each|every other)$',
  },
  [TokenType.EXCLUDE]: {
    test: '^(except|excluding)$',
  },
  [TokenType.UNKOWN]: {
    test: ``,
  },
};

export default tokens;
