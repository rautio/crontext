import {
  nextDate,
  iterMonth,
  iterDayOfWeek,
  iterDayOfMonth,
  iterHour,
  iterMinute,
  getNextValue,
  getDiff,
  getNums,
  isValid,
} from '.';

describe('nextDate() should', () => {
  test('return the start date on wrong cron format', () => {
    const start = new Date('July 31 10:05 1993');
    expect(nextDate('foo', start).toString()).toEqual(start.toString());
  });
  test('return the correct next month', () => {
    const n = nextDate('* * * 10-11 *', new Date('October 4 09:00:00 2023'));
    expect(n.toString()).toEqual(
      new Date('November 1 00:00:00 2023').toString(),
    );
    expect(
      nextDate('* * 13 * *', new Date('April 19 13:00 2023')).toString(),
    ).toEqual(new Date('May 13 00:00 2023').toString()); // This should actually be 0:0
  });
  test('return next minute', () => {
    expect(
      nextDate('* * * * *', new Date('March 28 11:00:00 2023')).toString(),
    ).toEqual(new Date('March 28 11:01:00 2023').toString());
  });
  test('return the correct next week', () => {
    const n = nextDate('* * * * 0,6', new Date('March 28 11:00:00 2023'));
    expect(n.toString()).toEqual(new Date('April 1 0:00:00 2023').toString());
  });
  test('return exact datetime', () => {
    expect(
      nextDate('25 8 31 9 *', new Date('March 28 11:00:00 2023')).toString(),
    ).toEqual(new Date('October 31 8:25:00 2023').toString());
  });
  test('return complex datetime', () => {
    expect(
      nextDate(
        '*/27 */2 * 6-8 1-5',
        new Date('March 28 11:00:00 2023'),
      ).toString(),
    ).toEqual(new Date('July 3 0:00:00 2023').toString());
  });
  test('return same date on full range as *', () => {
    const start = new Date('March 28 11:00:00 2023');
    expect(nextDate('27 2 * 0-11 0-6', start).toString()).toEqual(
      nextDate('27 2 0-31 * *', start).toString(),
    );
  });
});

describe('getNums() should', () => {
  test('Return empty array on *', () => {
    expect(getNums('*', 60)).toEqual([]);
  });
  test('Return empty array on full range', () => {
    expect(getNums('0-6', 7)).toEqual([]);
    expect(getNums('0-59', 60)).toEqual([]);
    expect(getNums('0-23', 24)).toEqual([]);
    expect(getNums('0-11', 12)).toEqual([]);
  });
  test('Not allow duplicate options', () => {
    expect(getNums('0-10', 6)).toHaveLength(6);
    expect(getNums('0-10', 6)).toEqual([0, 1, 2, 3, 4, 5]);
    expect(getNums('2,3,4,4,4', 6)).toEqual([2, 3, 4]);
  });
  test('Not allow values greater than max', () => {
    expect(getNums('80', 60)).toEqual([20]);
    expect(getNums('50,70,80', 60)).toEqual([10, 20, 50]);
  });
  test('Return a single number', () => {
    expect(getNums('2', 24)).toEqual([2]);
    expect(getNums('0', 24)).toEqual([0]);
  });
  test('Return numbers given comma separated list', () => {
    expect(getNums('2,3,4', 24)).toEqual([2, 3, 4]);
    expect(getNums('0,1', 24)).toEqual([0, 1]);
    expect(getNums('10, 24', 60)).toEqual([10, 24]);
  });
  test('Return numbers given a range', () => {
    expect(getNums('2-4', 24)).toEqual([2, 3, 4]);
    expect(getNums('22-3', 24)).toEqual([0, 1, 2, 3, 22, 23]);
  });
  test('Return combo of range and comma separated', () => {
    expect(getNums('2-4,12', 24)).toEqual([2, 3, 4, 12]);
    expect(getNums('22-3, 17', 24)).toEqual([0, 1, 2, 3, 17, 22, 23]);
    expect(getNums('22-3, 4-8', 24)).toEqual([
      0, 1, 2, 3, 4, 5, 6, 7, 8, 22, 23,
    ]);
  });
  test('Handle / syntax', () => {
    expect(getNums('*/15', 60)).toEqual([0, 15, 30, 45]);
    expect(getNums('*/2', 12)).toEqual([0, 2, 4, 6, 8, 10]);
    expect(getNums('*/6', 24)).toEqual([0, 6, 12, 18]);
  });
});

describe('iterMonth() should', () => {
  test('return the same date on a valid month', () => {
    const c = new Date('October 4 9:00 2023');
    const res = iterMonth(c, [1, 2, 9, 11, 12]);
    expect(res.getMonth()).toEqual(9);
    expect(res).toEqual(c);
  });
  test('iterate to a month next year', () => {
    const c1 = new Date('October 4 9:00 2023');
    const res1 = iterMonth(c1, [2, 4, 8]);
    expect(res1.getMonth()).toEqual(2);
    expect(res1.toString()).toEqual(new Date('March 4 9:00 2024').toString());
    const c2 = new Date('February 4 9:00 2023');
    const res2 = iterMonth(c2, [0]);
    expect(res2.getMonth()).toEqual(0);
    expect(res2.toString()).toEqual(new Date('January 4 9:00 2024').toString());
  });
  test('iterate to the next month', () => {
    const c1 = new Date('October 4 9:00 2023');
    const res1 = iterMonth(c1, [2, 4, 10]);
    expect(res1.getMonth()).toEqual(10);
    expect(res1.toString()).toEqual(
      new Date('November 4 9:00 2023').toString(),
    );
    const c2 = new Date('February 4 9:00 2023');
    const res2 = iterMonth(c2, [3]);
    expect(res2.getMonth()).toEqual(3);
    expect(res2.toString()).toEqual(new Date('April 4 9:00 2023').toString());
  });
});

describe('iterDayOfWeek() should', () => {
  test('return the same date on a valid day of week', () => {
    const c = new Date('April 16, 13:00 2023');
    const res = iterDayOfWeek(c, [0, 1, 2, 3, 4, 5, 6]);
    expect(res.getDay()).toEqual(0);
    expect(res.toString()).toEqual(new Date('April 16, 13:00 2023').toString());
  });
  test('iterate to the next month', () => {
    const c = new Date('April 29, 13:00 2023');
    const res = iterDayOfWeek(c, [1, 2, 3, 4, 5]);
    expect(res.getDay()).toEqual(1);
    expect(res.toString()).toEqual(new Date('May 1, 13:00 2023').toString());
  });
  test('iterate to the next week', () => {
    const c = new Date('April 17, 13:00 2023');
    const res = iterDayOfWeek(c, [0, 6]);
    expect(res.getDay()).toEqual(6);
    expect(res.toString()).toEqual(new Date('April 22, 13:00 2023').toString());
  });
});

describe('iterDayOfMonth() should', () => {
  test('return the same date on a valid day of month', () => {
    const c = new Date('April 16, 13:00 2023');
    const res = iterDayOfMonth(c, [16]);
    expect(res.toString()).toEqual(new Date('April 16, 13:00 2023').toString());
  });
  test('iterate to the next month', () => {
    const c = new Date('April 29, 13:00 2023');
    const res = iterDayOfMonth(c, [15, 22, 27]);
    expect(res.getDate()).toEqual(15);
    expect(res.toString()).toEqual(new Date('May 15, 13:00 2023').toString());
  });
  test('iterate to the next week', () => {
    const c = new Date('April 17, 13:00 2023');
    const res = iterDayOfMonth(c, [14, 19, 22, 5]);
    expect(res.getDate()).toEqual(19);
    expect(res.toString()).toEqual(new Date('April 19, 13:00 2023').toString());
  });
});

describe('iterHour() should', () => {
  test('return the same date on a valid hour', () => {
    const c = new Date('April 16, 13:00 2023');
    const res = iterHour(c, [13]);
    expect(res.toString()).toEqual(new Date('April 16, 13:00 2023').toString());
  });
  test('iterate to the next day', () => {
    const c = new Date('September 13, 13:00 2023');
    const res = iterHour(c, [9, 10, 4]);
    expect(res.getHours()).toEqual(4);
    expect(res.toString()).toEqual(
      new Date('September 14, 04:00 2023').toString(),
    );
  });
  test('iterate to the next hour', () => {
    const c = new Date('April 17, 13:00 2023');
    const res = iterHour(c, [19, 22, 5]);
    expect(res.getHours()).toEqual(19);
    expect(res.toString()).toEqual(new Date('April 17, 19:00 2023').toString());
  });
});

describe('iterMinute() should', () => {
  test('iterate to the next hour', () => {
    const c = new Date('September 13, 13:45 2023');
    const res = iterMinute(c, [9, 10, 4]);
    expect(res.getMinutes()).toEqual(4);
    expect(res.toString()).toEqual(
      new Date('September 13, 14:04 2023').toString(),
    );
  });
  test('iterate to the next mninute', () => {
    const c = new Date('April 17, 13:00 2023');
    const res = iterMinute(c, [19, 22, 5]);
    expect(res.getMinutes()).toEqual(5);
    expect(res.toString()).toEqual(new Date('April 17, 13:05 2023').toString());
  });
});

describe('getNextValue() should', () => {
  test('return the current value if valid', () => {
    const next = getNextValue(10, [1, 2, 3, 19, 10]);
    expect(next).toEqual(10);
  });
  test('wrap to the beginning of the schedule', () => {
    const next = getNextValue(10, [2, 3, 8, 9]);
    expect(next).toEqual(2);
  });
  test('return the next value in order', () => {
    const next = getNextValue(4, [1, 2, 6, 7]);
    expect(next).toEqual(6);
  });
  test('return current if no schedule', () => {
    const next = getNextValue(12, []);
    expect(next).toEqual(12);
  });
});

describe('getDiff() should', () => {
  test('return a valid diff when the next number is in sequence', () => {
    expect(getDiff(5, 10, 12)).toEqual(5);
    expect(getDiff(2, 6, 7)).toEqual(4);
    expect(getDiff(25, 50, 60)).toEqual(25);
    expect(getDiff(0, 12, 24)).toEqual(12);
  });
  test('return a valid diff skipping the max', () => {
    // month
    expect(getDiff(4, 2, 12)).toEqual(10);
    expect(getDiff(11, 6, 12)).toEqual(7);
    // day of week
    expect(getDiff(4, 1, 7)).toEqual(4);
    expect(getDiff(2, 1, 7)).toEqual(6);
    expect(getDiff(6, 0, 7)).toEqual(1);
    // hour
    expect(getDiff(18, 2, 24)).toEqual(8);
    expect(getDiff(23, 2, 24)).toEqual(3);
    expect(getDiff(0, 2, 24)).toEqual(2);
    // minute
    expect(getDiff(55, 5, 60)).toEqual(10);
    expect(getDiff(40, 23, 60)).toEqual(43);
    expect(getDiff(10, 23, 60)).toEqual(13);
  });
});

describe('isValid() should', () => {
  test('return correct response', () => {
    expect(isValid(4, [1, 2, 3])).toEqual(false);
    expect(isValid(4, [])).toEqual(true);
    expect(isValid(4, [4])).toEqual(true);
    expect(isValid(4, [4, 1, 12])).toEqual(true);
  });
});
