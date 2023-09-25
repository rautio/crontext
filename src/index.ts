import tokenize from './tokenize';
import parse from './parser';
import { generate } from './generate';

export const parseCron = (input: string): string => {
  const tokens = tokenize(input);
  console.log({ tokens });
  const parsed = parse(tokens);
  console.log({ parsed });
  const cron = generate(parsed);
  console.log({ cron });
  return cron;
};

export default parseCron;
