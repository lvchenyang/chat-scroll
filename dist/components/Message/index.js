'use strict';

exports.__esModule = true;

var _templateObject = _taggedTemplateLiteralLoose(['\n    .message__avatar {\n        height: 36px;\n        width: 36px;\n        border-radius: 4px;\n    }\n    .message_left {\n        flex-direction: row;\n        margin-right: 50px;\n    }\n    .message_right {\n        flex-direction: row-reverse;\n        margin-left: 50px;\n    }\n    .message__text {\n        min-height: 36px;\n        line-height: 20px;\n        padding: 8px 15px;\n        border-radius: 18px;\n        word-break: break-all;\n        white-space: pre-wrap;\n        text-align: justify;\n    }\n    .message__text_right {\n        background-color: #FC5D60;\n        border-top-right-radius: 4px;\n        color: #fff;\n        margin-right: 10px;\n    }\n    .message__text_left {\n        background-color: #fff;\n        border-top-left-radius: 4px;\n        margin-left: 10px;\n    }\n    .message__image_right{\n        margin-right: 10px;\n    }\n    .message__image_left {\n        margin-left: 10px;\n    }\n    .message__system {\n        font-size: 12px;\n        min-height: 26px;\n        padding: 3px 6px;\n        background: rgba(0, 0, 0, .1);\n        border-radius: 3px;\n    }\n    .message__time {\n        font-size: 12px;\n    }\n'], ['\n    .message__avatar {\n        height: 36px;\n        width: 36px;\n        border-radius: 4px;\n    }\n    .message_left {\n        flex-direction: row;\n        margin-right: 50px;\n    }\n    .message_right {\n        flex-direction: row-reverse;\n        margin-left: 50px;\n    }\n    .message__text {\n        min-height: 36px;\n        line-height: 20px;\n        padding: 8px 15px;\n        border-radius: 18px;\n        word-break: break-all;\n        white-space: pre-wrap;\n        text-align: justify;\n    }\n    .message__text_right {\n        background-color: #FC5D60;\n        border-top-right-radius: 4px;\n        color: #fff;\n        margin-right: 10px;\n    }\n    .message__text_left {\n        background-color: #fff;\n        border-top-left-radius: 4px;\n        margin-left: 10px;\n    }\n    .message__image_right{\n        margin-right: 10px;\n    }\n    .message__image_left {\n        margin-left: 10px;\n    }\n    .message__system {\n        font-size: 12px;\n        min-height: 26px;\n        padding: 3px 6px;\n        background: rgba(0, 0, 0, .1);\n        border-radius: 3px;\n    }\n    .message__time {\n        font-size: 12px;\n    }\n']),
    _templateObject2 = _taggedTemplateLiteralLoose(['\n    min-height: 36px;\n    margin: 5px 0;\n    padding: 0 10px;\n'], ['\n    min-height: 36px;\n    margin: 5px 0;\n    padding: 0 10px;\n']);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Text = require('./Text');

var _Text2 = _interopRequireDefault(_Text);

var _Image = require('./Image');

var _Image2 = _interopRequireDefault(_Image);

var _File = require('./File');

var _File2 = _interopRequireDefault(_File);

var _Video = require('./Video');

var _Video2 = _interopRequireDefault(_Video);

var _Voice = require('./Voice');

var _Voice2 = _interopRequireDefault(_Voice);

var _System = require('./System');

var _System2 = _interopRequireDefault(_System);

var _Time = require('./Time');

var _Time2 = _interopRequireDefault(_Time);

var _CustomComponent = require('./CustomComponent');

var _CustomComponent2 = _interopRequireDefault(_CustomComponent);

var _Constant = require('../../Constant');

var _Constant2 = _interopRequireDefault(_Constant);

var _styledComponents = require('styled-components');

var _styledComponents2 = _interopRequireDefault(_styledComponents);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _taggedTemplateLiteralLoose(strings, raw) { strings.raw = raw; return strings; } /**
                                                                                           * Created by lvcy on 17-12-29.
                                                                                           */


(0, _styledComponents.injectGlobal)(_templateObject);

var Wrapper = _styledComponents2.default.div(_templateObject2);

var Message = function (_PureComponent) {
    _inherits(Message, _PureComponent);

    function Message() {
        _classCallCheck(this, Message);

        return _possibleConstructorReturn(this, _PureComponent.apply(this, arguments));
    }

    Message.prototype.wrapper = function wrapper(C) {
        return _react2.default.createElement(
            Wrapper,
            { className: 'message' },
            _react2.default.createElement(C, this.props)
        );
    };

    Message.prototype.render = function render() {
        var message = this.props.message;
        var _Constant$type = _Constant2.default.type,
            TEXT = _Constant$type.TEXT,
            IMAGE = _Constant$type.IMAGE,
            FILE = _Constant$type.FILE,
            VIDEO = _Constant$type.VIDEO,
            VOICE = _Constant$type.VOICE,
            SYSTEM = _Constant$type.SYSTEM,
            TIME = _Constant$type.TIME,
            COMPONENT = _Constant$type.COMPONENT;

        switch (message.type) {
            case TEXT:
                return this.wrapper(_Text2.default);
            case IMAGE:
                return this.wrapper(_Image2.default);
            case FILE:
                return this.wrapper(_File2.default);
            case VIDEO:
                return this.wrapper(_Video2.default);
            case VOICE:
                return this.wrapper(_Voice2.default);
            case SYSTEM:
                return this.wrapper(_System2.default);
            case TIME:
                return this.wrapper(_Time2.default);
            case COMPONENT:
                return this.wrapper(_CustomComponent2.default);
            default:
                return _react2.default.createElement(
                    'div',
                    null,
                    message.type
                );
        }
    };

    return Message;
}(_react.PureComponent);

exports.default = Message;