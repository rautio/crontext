import { tokens } from './tokens';

describe('Minute token should', () => {
  const re = new RegExp(tokens.minutes.test);
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
