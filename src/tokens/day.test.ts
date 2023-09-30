import { getDayOfWeek } from './day';

describe('Day token getDayOfWeek() should', () => {
  test('return the correct day of week', () => {
    expect(getDayOfWeek('sunday')).toEqual('0');
    expect(getDayOfWeek('sun')).toEqual('0');
    expect(getDayOfWeek('monday')).toEqual('1');
    expect(getDayOfWeek('mon')).toEqual('1');
    expect(getDayOfWeek('tuesday')).toEqual('2');
    expect(getDayOfWeek('tue')).toEqual('2');
    expect(getDayOfWeek('wednesday')).toEqual('3');
    expect(getDayOfWeek('wed')).toEqual('3');
    expect(getDayOfWeek('thursday')).toEqual('4');
    expect(getDayOfWeek('thurs')).toEqual('4');
    expect(getDayOfWeek('friday')).toEqual('5');
    expect(getDayOfWeek('fri')).toEqual('5');
    expect(getDayOfWeek('saturday')).toEqual('6');
    expect(getDayOfWeek('sat')).toEqual('6');
  });
  test('return the correct days for special terms', () => {
    expect(getDayOfWeek('weekend')).toEqual('0,6');
    expect(getDayOfWeek('weekday')).toEqual('1-5');
  });
  test('handle unknown terms', () => {
    expect(() => getDayOfWeek('rick')).toThrow();
    expect(() => getDayOfWeek('morty')).toThrow();
  });
});
