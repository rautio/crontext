import { nextDate } from '.';

describe('nextDate() should', () => {
  test('return the correct next minute', () => {
    const n = nextDate('* * * * *', new Date('Wed October 4 09:00:00 2023'));
    expect(n.toString()).toEqual(
      new Date('Wed October 4 9:01:00 2023').toString(),
    );
  });
});
