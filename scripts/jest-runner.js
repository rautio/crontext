const jest = require('jest');
const { argv } = require('yargs');
const cliReverter = require('yargs-unparser');

const { suite, ...rest } = argv;

process.env.TEST_SUITE = suite;

jest.run(cliReverter(rest));
