import { getNumber } from './number';

describe('Number token getNumber() should', () => {
  test('return valid numbers from a string format', () => {
    expect(getNumber('twenty-three')).toEqual(23);
    expect(getNumber('zero')).toEqual(0);
    expect(getNumber('nine')).toEqual(9);
    expect(getNumber('ten')).toEqual(10);
    expect(getNumber('thirty')).toEqual(30);
    expect(getNumber('ninety-nine')).toEqual(99);
    expect(getNumber('twenty three')).toEqual(23);
    expect(getNumber('sixty-seven')).toEqual(67);
  });
  test('return the same number as literally written', () => {
    expect(getNumber('2')).toEqual(2);
    expect(getNumber('12')).toEqual(12);
    expect(getNumber('100032')).toEqual(100032);
    expect(getNumber('0')).toEqual(0);
    expect(getNumber('99')).toEqual(99);
  });
});
