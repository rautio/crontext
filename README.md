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

Interested in Contributing? Check out the [Contribution](./CONTRIBUTING.md) guide.
