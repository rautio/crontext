import { tokenize } from './tokenize';

describe('Tokenize should', () => {
  test('Throw an error when no input provided', () => {
    expect(() => tokenize('')).toThrow();
  });
});
