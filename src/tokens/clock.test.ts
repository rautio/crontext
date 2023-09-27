import { getTime } from './clock';

describe('Clock token getTime() should', () => {
  test('return the correct minute and hour in different formats', () => {
    expect(getTime('12:00')).toEqual([12, 0]);
    expect(getTime('2pm')).toEqual([14, 0]);
    expect(getTime('2:15pm')).toEqual([14, 15]);
    expect(getTime('9:59am')).toEqual([9, 59]);
    expect(getTime('6AM')).toEqual([6, 0]);
    expect(getTime('19:21')).toEqual([19, 21]);
    expect(getTime('17:00')).toEqual([17, 0]);
  });
  test('return the correct clock time for special names', () => {
    expect(getTime('midnight')).toEqual([24, 0]);
    expect(getTime('noon')).toEqual([12, 0]);
  });
});
