#!/usr/bin/env node
'use strict';

var _commander = require('commander');

var _commander2 = _interopRequireDefault(_commander);

var _lodash = require('lodash');

var _develop = require('./commands/develop');

var _develop2 = _interopRequireDefault(_develop);

var _build = require('./commands/build');

var _build2 = _interopRequireDefault(_build);

var _package = require('../../package');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var commands = ['develop', 'build'];
var args = process.argv.slice(2);

_commander2.default.usage('<command> [options]').version(_package.version);

_commander2.default.command('develop <file>').description('Develop your email locally.').option('--open', 'Open the email in your browser').option('-p, --port <number>', 'Port for server', 3000).action(_develop2.default);

_commander2.default.command('build <file>').description('Build an HEML email for sending in the wild.').option('-o, --output <file>', 'The output HTML file').option('-v, --validate [level]', 'Sets the validation level', /^(none|soft|strict)$/i, 'soft').action(_build2.default);

if (args.length === 0 || !commands.includes((0, _lodash.first)(args)) && !(0, _lodash.first)(args).startsWith('-')) {
  _commander2.default.outputHelp();
}

_commander2.default.parse(process.argv);