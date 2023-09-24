export type TokenDef = {
  test: string;
};

export type TokenMap = Record<string, TokenDef>;

export const tokens = {
  minutes: {
    test: '^(minutes|minute|mins|min)$',
  },
  unknown: {
    test: ``,
  },
};

export default tokens;
