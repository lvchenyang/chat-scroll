'use strict';

exports.__esModule = true;
exports.ImageContent = exports.ImageSection = exports.ImageResend = exports.ImageNickname = exports.ImageAvatar = exports.ImageWrapper = undefined;

var _templateObject = _taggedTemplateLiteralLoose([''], ['']),
    _templateObject2 = _taggedTemplateLiteralLoose(['\n    max-width: 120px;\n    overflow: hidden;\n    border-radius: 4px;\n'], ['\n    max-width: 120px;\n    overflow: hidden;\n    border-radius: 4px;\n']),
    _templateObject3 = _taggedTemplateLiteralLoose(['\n    max-width: 100%;\n    display: block;\n'], ['\n    max-width: 100%;\n    display: block;\n']);

var _BaseStyled = require('./BaseStyled');

var _styledComponents = require('styled-components');

var _styledComponents2 = _interopRequireDefault(_styledComponents);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _taggedTemplateLiteralLoose(strings, raw) { strings.raw = raw; return strings; } /**
                                                                                           * Created by lvcy on 18-1-4.
                                                                                           */


var ImageWrapper = exports.ImageWrapper = _BaseStyled.Wrapper.extend(_templateObject);
var ImageAvatar = exports.ImageAvatar = _BaseStyled.Avatar.extend(_templateObject);
var ImageNickname = exports.ImageNickname = _BaseStyled.Nickname.extend(_templateObject);
var ImageResend = exports.ImageResend = _BaseStyled.Resend.extend(_templateObject);
var ImageSection = exports.ImageSection = _styledComponents2.default.div(_templateObject2);
var ImageContent = exports.ImageContent = _styledComponents2.default.img(_templateObject3);