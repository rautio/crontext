import TM from './tokens';
import { TokenType } from './tokens';

export type Token = {
  type: TokenType;
  value: string;
};

export const tokenize = (input: string): Token[] => {
  const raw = input.split(/\s/); // Split by whitespace
  const tokens: Token[] = [];
  raw.forEach(r => {
    // Lowercasing the value solves a lot of regex complexity.
    // It also makes this not care about casing; which can be good or bad.
    const value = r.toLowerCase();
    const keys = Object.values(TokenType);
    for (let i = 0; i < keys.length; i += 1) {
      const k = keys[i];
      const re = new RegExp(TM[k].test);
      if (re.test(value)) {
        tokens.push({ type: k, value });
        break;
      }
    }
  });
  return tokens;
};

export default tokenize;
