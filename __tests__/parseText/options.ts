import { parseText } from '../../src/index';

describe('parseText() configurations should', () => {
  test('work with no defaults', () => {
    expect(parseText('Every weekday')).toEqual('0 9 * * 1-5');
    expect(parseText('Every Friday')).toEqual('0 9 * * 5');
  });
  test('honor preset defaults', () => {
    expect(parseText('Every weekday', { preset: 'system' })).toEqual(
      '0 0 * * 1-5',
    );
    expect(parseText('Every Friday', { preset: 'system' })).toEqual(
      '0 0 * * 5',
    );
  });
  test('use custom deafults', () => {
    expect(parseText('Every weekday', { defaultHour: '7' })).toEqual(
      '0 7 * * 1-5',
    );
    expect(
      parseText('Every weekday', { defaultHour: '6', defaultMinute: '30' }),
    ).toEqual('30 6 * * 1-5');
    expect(
      parseText('Every Friday', { defaultHour: '11', defaultMinute: '50' }),
    ).toEqual('50 11 * * 5');
    // Custom configurations should override system default
    expect(
      parseText('Every Friday', {
        preset: 'system',
        defaultHour: '11',
        defaultMinute: '50',
      }),
    ).toEqual('50 11 * * 5');
  });
});
