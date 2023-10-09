import tokenize from './tokenize';
import parse from './parser';
import { generate } from './generate';
import * as next from './next';
import { parseOptions } from './options';
import type { InputOptions } from './options';

export const parseText = (input: string, options?: InputOptions): string => {
  const tokens = tokenize(input);
  const parsed = parse(tokens, parseOptions(options));
  const cron = generate(parsed);
  return cron;
};

export const nextDate = next.nextDate;

/**
 * Output:
 *   - cron: * * * * *
 *   - nextOccurence: Date
 *   - repeat: bool
 */

export default parseText;
