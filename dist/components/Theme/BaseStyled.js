'use strict';

exports.__esModule = true;
exports.Resend = exports.Avatar = exports.Nickname = exports.Wrapper = undefined;

var _templateObject = _taggedTemplateLiteralLoose(['\n    display: flex;\n    position: relative;\n'], ['\n    display: flex;\n    position: relative;\n']),
    _templateObject2 = _taggedTemplateLiteralLoose([''], ['']),
    _templateObject3 = _taggedTemplateLiteralLoose(['\n    height: 36px;\n    width: 36px;\n'], ['\n    height: 36px;\n    width: 36px;\n']),
    _templateObject4 = _taggedTemplateLiteralLoose(['\n    width: 20px;\n    height: 20px;\n    background: #FC5D60;\n    margin-right: 5px;\n    border-radius: 10px;\n    position: relative;\n    align-self: center;\n    &:before {\n        content: \'\';\n        position: absolute;\n        top: 4px;\n        width: 2px;\n        height: 8px;\n        border-radius: 1px;\n        left: 50%;\n        background: #fff;\n        transform: translateX(-50%);\n    }\n    &:after {\n        content: \'\';\n        content: \'\';\n        position: absolute;\n        bottom: 4px;\n        width: 2px;\n        height: 2px;\n        left: 50%;\n        background: #fff;\n        transform: translateX(-50%);\n    }\n'], ['\n    width: 20px;\n    height: 20px;\n    background: #FC5D60;\n    margin-right: 5px;\n    border-radius: 10px;\n    position: relative;\n    align-self: center;\n    &:before {\n        content: \'\';\n        position: absolute;\n        top: 4px;\n        width: 2px;\n        height: 8px;\n        border-radius: 1px;\n        left: 50%;\n        background: #fff;\n        transform: translateX(-50%);\n    }\n    &:after {\n        content: \'\';\n        content: \'\';\n        position: absolute;\n        bottom: 4px;\n        width: 2px;\n        height: 2px;\n        left: 50%;\n        background: #fff;\n        transform: translateX(-50%);\n    }\n']);

var _styledComponents = require('styled-components');

var _styledComponents2 = _interopRequireDefault(_styledComponents);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _taggedTemplateLiteralLoose(strings, raw) { strings.raw = raw; return strings; } /**
                                                                                           * Created by lvcy on 18-1-4.
                                                                                           */


var Wrapper = exports.Wrapper = _styledComponents2.default.div(_templateObject);

var Nickname = exports.Nickname = _styledComponents2.default.div(_templateObject2);

var Avatar = exports.Avatar = _styledComponents2.default.img(_templateObject3);
var Resend = exports.Resend = _styledComponents2.default.div(_templateObject4);