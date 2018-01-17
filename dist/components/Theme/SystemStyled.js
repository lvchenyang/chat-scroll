'use strict';

exports.__esModule = true;
exports.SystemContent = exports.SystemWrapper = undefined;

var _templateObject = _taggedTemplateLiteralLoose(['\n    justify-content: center;\n    align-items: center;\n    min-height: 40px;\n'], ['\n    justify-content: center;\n    align-items: center;\n    min-height: 40px;\n']),
    _templateObject2 = _taggedTemplateLiteralLoose(['\n    line-height: 20px;\n    color: #888;\n'], ['\n    line-height: 20px;\n    color: #888;\n']);

var _styledComponents = require('styled-components');

var _styledComponents2 = _interopRequireDefault(_styledComponents);

var _BaseStyled = require('./BaseStyled');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _taggedTemplateLiteralLoose(strings, raw) { strings.raw = raw; return strings; } /**
                                                                                           * Created by lvcy on 18-1-4.
                                                                                           */


var SystemWrapper = exports.SystemWrapper = _BaseStyled.Wrapper.extend(_templateObject);
var SystemContent = exports.SystemContent = _styledComponents2.default.div(_templateObject2);