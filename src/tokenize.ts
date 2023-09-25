import TM from './tokens';
import { TokenType } from './tokens';

export type Token = {
  type: TokenType;
  value: string;
};

export const tokenize = (input: string): Token[] => {
  if (!input) {
    throw new Error('Input string required.');
  }
  const raw = input.split(/\W+/);
  const tokens: Token[] = [];
  raw.forEach(r => {
    const keys = Object.values(TokenType);
    for (let i = 0; i < keys.length; i += 1) {
      const k = keys[i];
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
