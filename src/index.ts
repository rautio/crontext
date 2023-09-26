import tokenize from './tokenize';
import parse from './parser';
import { generate } from './generate';

export const parseCron = (input: string): string => {
  const tokens = tokenize(input);
  const parsed = parse(tokens);
  const cron = generate(parsed);
  return cron;
};

/**
 * Output:
 *   - cron: * * * * *
 *   - nextOccurence: Date
 *   - repeat: bool
 */

export default parseCron;
