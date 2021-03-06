'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _utils = require('@heml/utils');

var _utils2 = _interopRequireDefault(_utils);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// eslint-disable-line no-unused-vars

exports.default = (0, _utils.createElement)('heml', {
  unique: true,
  parent: [],
  children: ['head', 'body'],
  defaultAttrs: {
    'lang': 'en',
    'xmlns': 'http://www.w3.org/1999/xhtml',
    'xmlns:v': 'urn:schemas-microsoft-com:vml',
    'xmlns:o': 'urn:schemas-microsoft-com:office:office',
    'xmlns:th': 'http://www.thymeleaf.org',
    'th:with': "baseUrl=('https://'+${domain})"
  },

  render(attrs, contents) {
    return [`<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional //EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">`, _utils2.default.renderElement(
      'html',
      attrs,
      contents
    )];
  }
});