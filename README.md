# Crontext

[![codecov](https://codecov.io/gh/rautio/crontext/graph/badge.svg?token=2D9ALEL4AD)](https://codecov.io/gh/rautio/crontext)

Parses natural text to a cron schedule format.

Try it out live here: [https://www.crontext.io](https://www.crontext.io/)

```
npm install crontext
```

## Usage

```js
import crontext from 'crontext';

crontext('Every weekday');
// 0 9 * * 1-5
```

Interested in Contributing? Check out the [Contribution](./CONTRIBUTING.md) guide.
