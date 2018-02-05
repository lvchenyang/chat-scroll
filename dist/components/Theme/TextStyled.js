'use strict';

exports.__esModule = true;
exports.TextContent = exports.TextMessageContentWrapper = exports.TextResend = exports.TextNickname = exports.TextAvatar = exports.TextWrapper = undefined;

var _templateObject = _taggedTemplateLiteralLoose([''], ['']),
    _templateObject2 = _taggedTemplateLiteralLoose(['\n    margin: 0;\n    position: relative;\n'], ['\n    margin: 0;\n    position: relative;\n']);

var _styledComponents = require('styled-components');

var _styledComponents2 = _interopRequireDefault(_styledComponents);

var _BaseStyled = require('./BaseStyled');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _taggedTemplateLiteralLoose(strings, raw) { strings.raw = raw; return strings; } /**
                                                                                           * Created by lvcy on 18-1-4.
                                                                                           */


var TextWrapper = exports.TextWrapper = _BaseStyled.Wrapper.extend(_templateObject);
var TextAvatar = exports.TextAvatar = _BaseStyled.Avatar.extend(_templateObject);
var TextNickname = exports.TextNickname = _BaseStyled.Nickname.extend(_templateObject);
var TextResend = exports.TextResend = _BaseStyled.Resend.extend(_templateObject);
var TextMessageContentWrapper = exports.TextMessageContentWrapper = _BaseStyled.MessageContentWrapper.extend(_templateObject);
var TextContent = exports.TextContent = _styledComponents2.default.pre(_templateObject2);