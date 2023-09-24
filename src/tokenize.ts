import TM from './tokens';

type Token = {
  type: string;
  value: string;
};

export const tokenize = (input: string): Token[] => {
  if (!input) {
    throw new Error('Input string required.');
  }
  const raw = input.split(/\W+/);
  const tokens: Token[] = [];
  raw.forEach(r => {
    const keys = Object.keys(TM);
    for (let i = 0; i < keys.length; i += 1) {
      const k = keys[i];
      // @ts-expect-error Not sure why
      const re = new RegExp(TM[k].test);
      if (re.test(r)) {
        tokens.push({ type: k, value: r });
        break;
      }
    }
  });
  return tokens;
};

export default tokenize;
