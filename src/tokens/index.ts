export type TokenDef = {
  test: string;
};

export enum TokenType {
  MINUTE = 'minutes',
  NUMBER = 'number',
  // Unknown has to be last
  UNKOWN = 'unknown',
}

export type TokenMap = Record<string, TokenDef>;

export const tokens = {
  [TokenType.MINUTE]: {
    test: '^(minutes|minute|mins|min)$',
  },
  [TokenType.NUMBER]: {
    test: /^\d+$/,
  },
  [TokenType.UNKOWN]: {
    test: ``,
  },
};

export default tokens;
