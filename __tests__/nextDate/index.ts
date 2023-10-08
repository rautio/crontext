import { readFileSync, readdirSync } from 'fs';
import { nextDate } from '../../src/next';

const path = require('path');

type Case = {
  start: string;
  cron: string;
  output: string;
};

const envSuite = process.env.TEST_SUITE;
let suites = readdirSync(path.join(__dirname, './suites'));
if (envSuite && envSuite !== 'undefined') {
  suites = [envSuite + '.txt'];
}
suites.forEach(name => {
  describe('nextDate test suite: ' + name, () => {
    const content = readFileSync(
      path.join(__dirname, './suites', name),
      'utf-8',
    );
    const lines = content.split('\n');
    const cases: Case[] = [];
    let start = '';
    let cron = '';
    lines.forEach(line => {
      if (line !== '') {
        if (start === '') {
          start = line;
        } else if (cron === '') {
          cron = line;
        } else {
          cases.push({ start, cron, output: line });
          start = '';
          cron = '';
        }
      }
    });
    cases.forEach(({ start, cron, output }) => {
      test(`start: ${start}, cron: ${cron}`, () => {
        expect(
          nextDate(cron, new Date(start)).toLocaleString('en-US', {
            timeZone: 'America/Los_Angeles',
          }),
        ).toEqual(
          new Date(output).toLocaleString('en-US', {
            timeZone: 'America/Los_Angeles',
          }),
        );
      });
    });
  });
});
