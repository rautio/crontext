/**
 * Creates an array of sorted number values given a single cron format string.
 * Note: Does not support '/' format
 * @param str
 * @returns
 */
export const getNums = (str: string): Array<number> => {
  const isNum = !isNaN(Number(str));
  let res: Array<number> = [];
  if (isNum) {
    res.push(Number(str));
  } else if (str.indexOf(',') > -1) {
    const splits = str.split(',');
    splits.forEach(split => {
      res = [...res, ...getNums(split)];
    });
  } else if (str.indexOf('-') > -1) {
    // There's a range - but we've already split so this should be just two numbers
    const splits = str.split('-');
    if (splits.length === 2) {
      const start = Number(splits[0]);
      const end = Number(splits[1]);
      if (!isNaN(start) && !isNaN(end)) {
        for (let i = start; i++; i <= end) {
          res.push(i);
        }
      }
    }
  }
  return res.sort();
};
/**
 * Given an array of possible next values find the closest one that comes next in the order.
 * @param cur
 * @param nums
 * @returns
 */
export const getNextValue = (cur: number, nums: Array<number>): number => {
  for (let i = 0; i < nums.length; i++) {
    const num = nums[i];
    if (num >= cur) {
      return num;
    }
  }
  return -1;
};

export const getDiffMinutes = (cur: number, next: number) => {
  if (next < cur) {
    return 60 - (cur - next);
  }
  return next - cur;
};

/**
 * Returns a date string of the next occurence of the cron schedule.
 * @param cron
 */
export const nextDate = (cron: string, startDate?: Date): Date => {
  const cur = startDate ? new Date(startDate.getTime()) : new Date(); // Either given start date or the current date
  const splits = cron.split(' ');
  const next = startDate ? new Date(startDate.getTime()) : new Date();
  if (splits.length === 5) {
    // 6 would denote we're using seconds
    splits.forEach((item, i) => {
      // Formats:
      // num
      // num-num
      // num,num,num
      // num/num
      switch (i) {
        case 0: {
          let add = 0;
          // minutes
          if (item === '*') {
            add = 1;
          } else if (!isNaN(Number(item))) {
            next.setMinutes(Number(item));
            add = getDiffMinutes(cur.getMinutes(), Number(item));
          } else {
            const c = cur.getMinutes();
            const nums = getNums(item);
            add = getDiffMinutes(cur.getMinutes(), getNextValue(c, nums));
          }
          next.setMinutes(cur.getMinutes() + add);
          break;
        }
        case 1: {
          // hour
          break;
        }
        case 2: {
          // day of month
          break;
        }
        case 3: {
          // month
          break;
        }
        case 4: {
          // day of week
          break;
        }
        default:
          break;
      }
    });
  }
  return next;
};
