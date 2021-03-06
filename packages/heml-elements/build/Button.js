'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _utils = require('@heml/utils');

var _utils2 = _interopRequireDefault(_utils);

var _lodash = require('lodash');

var _Style = require('./Style');

var _Style2 = _interopRequireDefault(_Style);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// eslint-disable-line no-unused-vars
var background = _utils.cssGroups.background,
    margin = _utils.cssGroups.margin,
    padding = _utils.cssGroups.padding,
    border = _utils.cssGroups.border,
    borderRadius = _utils.cssGroups.borderRadius,
    width = _utils.cssGroups.width,
    height = _utils.cssGroups.height,
    table = _utils.cssGroups.table,
    text = _utils.cssGroups.text,
    font = _utils.cssGroups.font,
    box = _utils.cssGroups.box;
exports.default = (0, _utils.createElement)('button', {
  attrs: ['href', 'target', 'th:with', 'th:href'],
  defaultAttrs: {
    href: '#'
  },

  rules: {
    '.button': [{ '@pseudo': 'root' }, { display: _utils.transforms.trueHide('block') }],

    '.button__table': [{ '@pseudo': 'table' }, margin, table],

    '.button__cell': [{ '@pseudo': 'cell' }, background, padding, borderRadius, border, height, width, box],

    '.button__link': [{ '@pseudo': 'link' }, background, text, font],
    '.button__text': [{ '@pseudo': 'text' }, 'color', 'text-decoration']
  },

  render(attrs, contents) {
    attrs.class += ' button';

    return _utils2.default.renderElement(
      'div',
      (0, _lodash.omit)(attrs, ['href', 'target', 'th:with', 'th:href']),
      _utils2.default.renderElement(
        'table',
        { role: 'presentation', width: '100%', align: 'left', border: '0', cellpadding: '0', cellspacing: '0' },
        _utils2.default.renderElement(
          'tr',
          null,
          _utils2.default.renderElement(
            'td',
            null,
            _utils2.default.renderElement(
              'table',
              { role: 'presentation', width: 'auto', align: 'center', border: '0', cellspacing: '0', cellpadding: '0', 'class': 'button__table' },
              _utils2.default.renderElement(
                'tr',
                null,
                _utils2.default.renderElement(
                  'td',
                  { align: 'center', 'class': 'button__cell' },
                  _utils2.default.renderElement(
                    'a',
                    (0, _extends3.default)({}, (0, _lodash.pick)(attrs, ['href', 'target', 'th:with', 'th:href']), { 'class': 'button__link', style: 'display: inline-block;' }),
                    _utils2.default.renderElement(
                      'span',
                      { 'class': 'button__text' },
                      contents
                    )
                  )
                )
              )
            )
          )
        )
      ),
      _utils2.default.renderElement(
        _Style2.default,
        { 'for': 'button' },
        `
          button {
            margin: auto;
            border-radius: 3px;
            padding: 6px 12px;
            background-color: #2097e4;
            color: #ffffff;
            text-decoration: none;
          }
        `
      )
    );
  }
});