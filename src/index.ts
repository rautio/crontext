import tokenize from './tokenize';
import parse from './parser';
import { generate } from './generate';
import * as next from './next';

export const parseText = (input: string): string => {
  const tokens = tokenize(input);
  const parsed = parse(tokens);
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
