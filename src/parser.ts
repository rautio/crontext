import type { Token } from './tokenize';
import { TokenType } from './tokens';
import { getNumber } from './tokens/number';
import { getTime } from './tokens/clock';

export type Parsed = {
  minutes: string;
  hour: string;
};

const { FREQUENCY, NUMBER, MINUTE, CLOCK } = TokenType;

const defaultParsed: Parsed = {
  minutes: '*',
  hour: '*',
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
      crontext.minutes = '*'; // default
      return crontext;
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

export const parser = (tokens: Token[]): Parsed => {
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
          crontext = rule.update(crontext, sub);
        }
      }
    }
  }
  return crontext;
};

export default parser;
