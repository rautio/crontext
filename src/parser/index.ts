import type { Token } from '../tokenize';
import type { Options } from '../options';
import { rules } from './rules';

export type Crontext = {
  minutes: string;
  hour: string;
  dayOfMonth: string;
  dayOfWeek: string;
  month: string;
  repeat: boolean;
};

export const DEFAULT = '*';
export const INIT = '_'; // Used to know whether the value has been set at all.
export const DEFAULT_DAY_MINUTES = '0';
export const DEFAULT_DAY_HOURS = '9';

const defaultParsed: Crontext = {
  minutes: INIT,
  hour: INIT,
  dayOfMonth: INIT,
  dayOfWeek: INIT,
  month: INIT,
  repeat: false,
};
export const parser = (tokens: Token[], options: Options): Crontext => {
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
