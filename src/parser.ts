import type { Token } from './tokenize';
import { TokenType } from './tokens';

export type Parsed = {
  minutes: string;
};

const defaultParsed: Parsed = {
  minutes: '*',
};

export const parser = (tokens: Token[]): Parsed => {
  const result = { ...defaultParsed };
  let prevToken: Token | null = null;
  for (let i = 0; i < tokens.length; i++) {
    const token = tokens[i];
    if (token.type === TokenType.MINUTE) {
      console.log('yes minutes');
      console.log(prevToken);
    }
    prevToken = token;
  }
  return result;
};

export default parser;
