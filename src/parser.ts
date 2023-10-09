import type { Token } from './tokenize';
import { TokenType } from './tokens';
import { getNumber } from './tokens/number';
import { getTime } from './tokens/clock';
import { getDayOfWeek } from './tokens/day';
import type { Options } from './options';

export type Parsed = {
  minutes: string;
  hour: string;
  dayOfMonth: string;
  dayOfWeek: string;
  month: string;
};

export const DEFAULT = '*';
export const INIT = '_'; // Used to know whether the value has been set at all.
export const DEFAULT_DAY_MINUTES = '0';
export const DEFAULT_DAY_HOURS = '9';

const { FREQUENCY, NUMBER, MINUTE, CLOCK, DAY } = TokenType;

const defaultParsed: Parsed = {
  minutes: INIT,
  hour: INIT,
  dayOfMonth: INIT,
  dayOfWeek: INIT,
  month: INIT,
};

/**
 * -> [FREQ][COMBO1]
 * [COMBO1] -> [(NUMBER)][MINUTE|HOUR|DAY]
 *
 */

// The grammar
export const rules = [
  {
    match: [FREQUENCY, NUMBER, MINUTE],
    update: (crontext: Parsed, tokens: Token[]): Parsed => {
      crontext.minutes = '/' + getNumber(tokens[1].value);
      return crontext;
    },
  },
  {
    match: [FREQUENCY, MINUTE],
    update: (crontext: Parsed): Parsed => {
      crontext.minutes = DEFAULT;
      crontext.hour = DEFAULT;
      return crontext;
    },
  },
  {
    match: [FREQUENCY, DAY],
    update: (crontext: Parsed, tokens: Token[], options: Options): Parsed => {
      // If there are no minutes or hour set we use defaults
      // 'On monday' -> 9am Monday
      if (crontext.minutes === INIT) crontext.minutes = options.defaultMinute;
      if (crontext.hour === INIT) crontext.hour = options.defaultHour;
      const dayOfWeek = getDayOfWeek(tokens[1].value);
      return { ...crontext, dayOfWeek };
    },
  },
  {
    match: [FREQUENCY, CLOCK],
    update: (crontext: Parsed, tokens: Token[]): Parsed => {
      const [hour, minute] = getTime(tokens[1].value);
      crontext.minutes = minute.toString();
      crontext.hour = hour.toString();
      return crontext;
    },
  },
];

export const parser = (tokens: Token[], options: Options): Parsed => {
  let crontext = { ...defaultParsed };
  // Iterate all tokens
  for (let t = 0; t < tokens.length; t++) {
    // Check if any of the rules match the given token and forward lookups.
    for (let r = 0; r < rules.length; r++) {
      const rule = rules[r];
      const ruleLen = rule.match.length;
      if (ruleLen <= tokens.length - t) {
        const sub = tokens.slice(t, t + ruleLen);
        let isMatch = true;
        for (let s = 0; s < sub.length; s++) {
          if (sub[s].type !== rule.match[s]) {
            isMatch = false;
          }
        }
        if (isMatch) {
          t = t + sub.length - 1;
          crontext = rule.update(crontext, sub, options);
        }
      }
    }
  }
  return crontext;
};

export default parser;
