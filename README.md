# Crontext

[![codecov](https://codecov.io/gh/rautio/crontext/graph/badge.svg?token=2D9ALEL4AD)](https://codecov.io/gh/rautio/crontext)

> :warning: This package is currently under development. Not meant for production use.

Parses natural text to a cron schedule format.

Try it out live here: [https://www.crontext.io](https://www.crontext.io/)

```
npm install crontext
```

## Usage

```js
import { parseText, nextDate } from 'crontext';

const cron = parseText('Every weekday');
// 0 9 * * 1-5

const nextOccurence = nextDate(cron, new Date());
```

### Custom Options

```js
import { parseText } from 'crontext';

parseText('Every Monday', { defaultHour: '8', defaultMinute: '30' });
// 30 8 * * 1
// aka 8:30am every Monday

parseText('Every weekday', { preset: 'system' });
// 0 0 * * 1-5
// 'system' is the same as: { defaultHour: 0, defaultMinute: 0 }
```

## Configuration

All configurations are optional. The default start of day is 9am. A 'weekday' is considered Monday-Friday and 'weekend' is Saturday or Sunday.

| Option        | Description                                                                                                        | Default |
| ------------- | ------------------------------------------------------------------------------------------------------------------ | ------- |
| preset        | `'system'` as a preset will use 00:00 as the start of the day.                                                     | n/a     |
| defaultHour   | What hour should each day start on. This is the default used when using non specific times like `'Every Monday'`   | `'9'`   |
| defaultMinute | What minute should each day start on. This is the default used when using non specific times like `'Every Monday'` | `'0'`   |

Interested in Contributing? Check out the [Contribution](./CONTRIBUTING.md) guide.
