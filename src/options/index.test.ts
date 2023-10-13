import { parseOptions } from './index';

const currentDate = new Date('2023-10-13');
describe('parseOptions() should', () => {
  beforeAll(() => {
    jest.useFakeTimers().setSystemTime(currentDate);
  });
  afterAll(() => {
    jest.useRealTimers();
  });
  test('use default options if none passed', () => {
    expect(parseOptions()).toEqual({
      defaultHour: '9',
      defaultMinute: '0',
      startDate: currentDate,
      startOfWeek: '1',
    });
  });
  test('honor presets', () => {
    expect(parseOptions({ preset: 'system' })).toEqual({
      defaultHour: '0',
      defaultMinute: '0',
      startDate: currentDate,
      startOfWeek: '1',
    });
  });
  test('use custom start of day', () => {
    expect(parseOptions({ defaultHour: '7', defaultMinute: '45' })).toEqual({
      defaultHour: '7',
      defaultMinute: '45',
      startDate: currentDate,
      startOfWeek: '1',
    });
    // Custom values should override default
    expect(
      parseOptions({ preset: 'system', defaultHour: '7', defaultMinute: '45' }),
    ).toEqual({
      defaultHour: '7',
      defaultMinute: '45',
      startDate: currentDate,
      startOfWeek: '1',
    });
  });
});
