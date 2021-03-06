'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _reload = require('reload');

var _reload2 = _interopRequireDefault(_reload);

var _open = require('open');

var _open2 = _interopRequireDefault(_open);

var _logUpdate = require('log-update');

var _logUpdate2 = _interopRequireDefault(_logUpdate);

var _boxen = require('boxen');

var _boxen2 = _interopRequireDefault(_boxen);

var _gaze = require('gaze');

var _gaze2 = _interopRequireDefault(_gaze);

var _getPort = require('get-port');

var _getPort2 = _interopRequireDefault(_getPort);

var _chalk = require('chalk');

var _chalk2 = _interopRequireDefault(_chalk);

var _isHemlFile = require('../utils/isHemlFile');

var _isHemlFile2 = _interopRequireDefault(_isHemlFile);

var _renderHemlFile = require('../utils/renderHemlFile');

var _renderHemlFile2 = _interopRequireDefault(_renderHemlFile);

var _buildErrorPage = require('../utils/buildErrorPage');

var _buildErrorPage2 = _interopRequireDefault(_buildErrorPage);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var errorBlock = _chalk2.default.bgRed.white;
var _console = console,
    log = _console.log;

exports.default = function () {
  var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee3(file, options) {
    var filepath, _options$port, port, _options$open, open, _ref2, update, url, _ref3, html, errors, metadata;

    return _regenerator2.default.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            filepath = _path2.default.resolve(file);
            _options$port = options.port, port = _options$port === undefined ? 3000 : _options$port, _options$open = options.open, open = _options$open === undefined ? false : _options$open;

            /** require .heml extention */

            if (!(0, _isHemlFile2.default)(file)) {
              log(`${(0, _chalk.red)('ERROR')} ${file} must have ${(0, _chalk.yellow)('.heml')} extention`);
              process.exit(1);
            }

            _context3.prev = 3;
            _context3.next = 6;
            return startDevServer(_path2.default.dirname(filepath), port);

          case 6:
            _ref2 = _context3.sent;
            update = _ref2.update;
            url = _ref2.url;
            _context3.next = 11;
            return (0, _renderHemlFile2.default)(filepath);

          case 11:
            _ref3 = _context3.sent;
            html = _ref3.html;
            errors = _ref3.errors;
            metadata = _ref3.metadata;


            update({ html, errors, metadata });

            if (open) (0, _open2.default)(url);

            /** watch for file changes */
            (0, _gaze2.default)(filepath, function (err) {
              var _this = this;

              if (err) throw err;

              this.on('changed', function () {
                var _ref4 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(changedFile) {
                  var _ref5, html, errors, metadata;

                  return _regenerator2.default.wrap(function _callee$(_context) {
                    while (1) {
                      switch (_context.prev = _context.next) {
                        case 0:
                          _context.next = 2;
                          return (0, _renderHemlFile2.default)(filepath);

                        case 2:
                          _ref5 = _context.sent;
                          html = _ref5.html;
                          errors = _ref5.errors;
                          metadata = _ref5.metadata;

                          update({ html, errors, metadata });

                        case 7:
                        case 'end':
                          return _context.stop();
                      }
                    }
                  }, _callee, _this);
                }));

                return function (_x3) {
                  return _ref4.apply(this, arguments);
                };
              }());

              this.on('deleted', function () {
                var _ref6 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(changedFile) {
                  return _regenerator2.default.wrap(function _callee2$(_context2) {
                    while (1) {
                      switch (_context2.prev = _context2.next) {
                        case 0:
                          log(`${errorBlock(' Error ')} ${(0, _chalk.yellow)(file)} was deleted. Shutting down.`);
                          process.exit();

                        case 2:
                        case 'end':
                          return _context2.stop();
                      }
                    }
                  }, _callee2, _this);
                }));

                return function (_x4) {
                  return _ref6.apply(this, arguments);
                };
              }());
            });
            _context3.next = 24;
            break;

          case 20:
            _context3.prev = 20;
            _context3.t0 = _context3['catch'](3);

            if (_context3.t0.code === 'ENOENT') {
              log(`${errorBlock(' Error ')} ${(0, _chalk.yellow)(file)} doesn't exist`);
            } else {
              log(`${errorBlock(' Error ')} ${_context3.t0.message}`);
            }
            process.exit();

          case 24:
          case 'end':
            return _context3.stop();
        }
      }
    }, _callee3, this, [[3, 20]]);
  }));

  function develop(_x, _x2) {
    return _ref.apply(this, arguments);
  }

  return develop;
}();

/**
 * update the cli UI
 * @param  {String} params.url     URL for preview server
 * @param  {String} params.status  the current status
 * @param  {String} params.time    time to compile the heml
 * @param  {String} params.size    size of the HTML in mb
 */


function renderCLI(_ref7) {
  var url = _ref7.url,
      status = _ref7.status,
      time = _ref7.time,
      size = _ref7.size;

  return (0, _logUpdate2.default)((0, _boxen2.default)(`${_chalk2.default.bgBlue.black(' HEML ')}\n\n` + `- ${_chalk2.default.bold('Preview:')}         ${url}\n` + `- ${_chalk2.default.bold('Status:')}          ${status}\n` + `- ${_chalk2.default.bold('Compile time:')}    ${time}ms\n` + `- ${_chalk2.default.bold('Total size:')}      ${size}`, { padding: 1, margin: 1 }));
}

/**
 * Launches a server that reloads when the update function is called
 * @param  {String} defaultPreview  the default content for when the sever loads
 * @return {Object}                 { server, port, update }
 */
function startDevServer(directory) {
  var port = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 3000;

  var url = void 0;
  var app = (0, _express2.default)();

  var _reloadServer = (0, _reload2.default)(app),
      reload = _reloadServer.reload;

  var preview = '';

  app.get('/', function (req, res) {
    return res.send(preview);
  });
  app.use(_express2.default.static(directory));

  function update(_ref8) {
    var html = _ref8.html,
        errors = _ref8.errors,
        metadata = _ref8.metadata;

    var status = errors.length ? _chalk2.default.red('failed') : _chalk2.default.green('success');
    preview = errors.length ? (0, _buildErrorPage2.default)(errors) : html.replace('</body>', '<script src="/reload/reload.js"></script></body>');

    renderCLI({ url, status, time: metadata.time, size: metadata.size });
    reload();
  }

  return new _promise2.default(function (resolve, reject) {
    (0, _getPort2.default)({ port }).then(function (availablePort) {
      url = `http://localhost:${availablePort}`;

      app.listen(availablePort, function () {
        return resolve({ update, url, app });
      });
    });

    process.on('uncaughtException', reject);
  });
}