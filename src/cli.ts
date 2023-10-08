import { parseText } from './index';

const runCLI = () => {
  const args = process.argv;
  if (args.length < 3 || !args[2]) {
    throw new Error('Must pass in input string.');
  }
  const input = args[2];
  console.log('Input: \n', input);
  const res = parseText(input);
  console.log('Cron: \n', res);
};

runCLI();
