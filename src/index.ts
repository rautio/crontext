import tokenize from './tokenize';

export const parseCron = (input: string): string => {
  const tokens = tokenize(input);
  console.log(tokens);
  return input;
};

export default parseCron;
