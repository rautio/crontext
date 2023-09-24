import { parseCron } from './index';
test('parseCron', () => {
  expect(parseCron('Every weekday')).toBe('0 0 * * 1-5');
});
