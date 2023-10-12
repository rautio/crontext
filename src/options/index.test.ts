import { parseOptions } from './index';

describe('parseOptions() should', () => {
  test('use default options if none passed', () => {
    expect(parseOptions()).toEqual({
      defaultHour: '9',
      defaultMinute: '0',
      startDate: new Date(),
      startOfWeek: '1',
    });
  });
  test('honor presets', () => {
    expect(parseOptions({ preset: 'system' })).toEqual({
      defaultHour: '0',
      defaultMinute: '0',
      startDate: new Date(),
      startOfWeek: '1',
    });
  });
  test('use custom start of day', () => {
    expect(parseOptions({ defaultHour: '7', defaultMinute: '45' })).toEqual({
      defaultHour: '7',
      defaultMinute: '45',
      startDate: new Date(),
      startOfWeek: '1',
    });
    // Custom values should override default
    expect(
      parseOptions({ preset: 'system', defaultHour: '7', defaultMinute: '45' }),
    ).toEqual({
      defaultHour: '7',
      defaultMinute: '45',
      startDate: new Date(),
      startOfWeek: '1',
    });
  });
});
