import { readFileSync, readdirSync } from 'fs';
import { parseText } from '../../src/index';

const currentDate = new Date('2023-3-4');

const path = require('path');

type Case = {
  input: string;
  output: string;
};

/**
 * Run all test suites
 */
const envSuite = process.env.TEST_SUITE;
let suites = readdirSync(path.join(__dirname, './suites'));
if (envSuite && envSuite !== 'undefined') {
  suites = [envSuite + '.txt'];
}
suites.forEach(name => {
  describe('Crontext test suite: ' + name, () => {
    beforeAll(() => {
      jest.useFakeTimers().setSystemTime(currentDate);
    });
    afterAll(() => {
      jest.useRealTimers();
    });
    const content = readFileSync(
      path.join(__dirname, './suites', name),
      'utf-8',
    );
    const lines = content.split('\n');
    const cases: Case[] = [];
    let input = '';
    lines.forEach(line => {
      if (line !== '') {
        if (input === '') {
          input = line;
        } else {
          cases.push({ input, output: line });
          input = '';
        }
      }
    });
    cases.forEach(({ input, output }) => {
      test(input, () => {
        expect(parseText(input)).toEqual(output);
      });
    });
  });
});
