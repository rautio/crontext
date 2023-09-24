import { readFileSync, readdirSync } from 'fs';
import { parseCron } from '../src/index';

const path = require('path');

type Case = {
  input: string;
  output: string;
};

/**
 * Run all test suites
 */

const suites = readdirSync(path.join(__dirname, './suites'));
suites.forEach(name => {
  describe('Crontext test suite: ' + name, () => {
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
        }
      }
    });
    cases.forEach(({ input, output }) => {
      test(input, () => {
        expect(parseCron(input)).toEqual(output);
      });
    });
  });
});
