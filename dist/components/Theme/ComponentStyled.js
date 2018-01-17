'use strict';

exports.__esModule = true;
exports.ComponentLoading = exports.ComponentWrapper = undefined;

var _templateObject = _taggedTemplateLiteralLoose(['\n    width: 100%;\n    justify-content: center;\n'], ['\n    width: 100%;\n    justify-content: center;\n']),
    _templateObject2 = _taggedTemplateLiteralLoose(['\n    color: #888;\n    font-size: 12px;\n    text-align: center;\n    line-height: 20px;\n    height: 40px;\n    padding: 10px;\n    width: 100%;\n'], ['\n    color: #888;\n    font-size: 12px;\n    text-align: center;\n    line-height: 20px;\n    height: 40px;\n    padding: 10px;\n    width: 100%;\n']);

var _styledComponents = require('styled-components');

var _styledComponents2 = _interopRequireDefault(_styledComponents);

var _BaseStyled = require('./BaseStyled');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _taggedTemplateLiteralLoose(strings, raw) { strings.raw = raw; return strings; } /**
                                                                                           * Created by lvcy on 18-1-8.
                                                                                           */


var ComponentWrapper = exports.ComponentWrapper = _BaseStyled.Wrapper.extend(_templateObject);
var ComponentLoading = exports.ComponentLoading = _styledComponents2.default.div(_templateObject2);