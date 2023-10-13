import { tokens, TokenType } from '.';

describe('Minute token should', () => {
  const re = new RegExp(tokens[TokenType.MINUTE].test);
  test('match on different formats', () => {
    expect(re.test('minutes')).toBe(true);
    expect(re.test('min')).toBe(true);
    expect(re.test('minute')).toBe(true);
    expect(re.test('mins')).toBe(true);
  });
  test('not match in incorrect format', () => {
    expect(re.test('mints')).toBe(false);
    expect(re.test('minut')).toBe(false);
    expect(re.test('minus')).toBe(false);
    expect(re.test('main')).toBe(false);
    expect(re.test('minutess')).toBe(false);
    expect(re.test('minimum')).toBe(false);
    expect(re.test('minor')).toBe(false);
    expect(re.test('minstro')).toBe(false);
    expect(re.test('minutemen')).toBe(false);
    expect(re.test('minutes12')).toBe(false);
  });
});

describe('Number token should', () => {
  const re = new RegExp(tokens[TokenType.NUMBER].test);
  test('match on different formats', () => {
    expect(re.test('1')).toBe(true);
    expect(re.test('30')).toBe(true);
    expect(re.test('100')).toBe(true);
    expect(re.test('60')).toBe(true);
    expect(re.test('2')).toBe(true);
    expect(re.test('0')).toBe(true);
  });
  test('not match in incorrect format', () => {
    expect(re.test('0a')).toBe(false);
    expect(re.test('a12')).toBe(false);
    expect(re.test('q8a03')).toBe(false);
  });
});

describe('Hour token should', () => {
  const re = new RegExp(tokens[TokenType.HOUR].test);
  test('match on different formats', () => {
    expect(re.test('hours')).toBe(true);
    expect(re.test('hour')).toBe(true);
    expect(re.test('hrs')).toBe(true);
    expect(re.test('hr')).toBe(true);
  });
  test('not match in incorrect format', () => {
    expect(re.test('h')).toBe(false);
    expect(re.test('hors')).toBe(false);
    expect(re.test('house')).toBe(false);
    expect(re.test('hers')).toBe(false);
  });
});
