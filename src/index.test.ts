import { parseCron } from './index';
test('My Greeter', () => {
  expect(parseCron('Carl')).toBe('Hello Carl');
});
