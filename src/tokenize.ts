type Token = {
  type: string;
  value: string;
};

export const tokenize = (input: string): Token[] => {
  if (!input) {
    throw new Error('Input string required.');
  }
  console.log({ input });
  const raw = input.split(/\W+/);
  console.log({ raw });
  const tokens: Token[] = [];
  return tokens;
};

export default tokenize;
