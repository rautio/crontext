import tokenize from './tokenize';
import parse, { type Crontext } from './parser';
import { generate } from './generate';
import * as next from './next';
import { parseOptions } from './options';
import type { InputOptions } from './options';

const pJson = require('../package.json');

export const parseText = (input: string, options?: InputOptions): string => {
  const tokens = tokenize(input);
  const parsed = parse(tokens, parseOptions(options));
  const cron = generate(parsed);
  return cron;
};

export const crontext = (input: string, options?: InputOptions): Crontext => {
  const tokens = tokenize(input);
  const parsed = parse(tokens, parseOptions(options));
  return parsed;
};

export const nextDate = next.nextDate;

export const version = pJson.version;

/**
 * Output:
 *   - cron: * * * * *
 *   - nextOccurence: Date
 *   - repeat: bool
 */

export default crontext;
