'use strict';

exports.__esModule = true;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _TextStyled = require('../Theme/TextStyled');

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Created by lvcy on 17-12-29.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */


var Text = function (_PureComponent) {
    _inherits(Text, _PureComponent);

    function Text() {
        _classCallCheck(this, Text);

        var _this = _possibleConstructorReturn(this, _PureComponent.call(this));

        _this.resendMessage = _this.resendMessage.bind(_this);
        return _this;
    }

    Text.prototype.resendMessage = function resendMessage() {
        this.props.resend(this.props.message);
    };

    Text.prototype.render = function render() {
        var _props$message = this.props.message,
            side = _props$message.side,
            avatar = _props$message.avatar,
            nickname = _props$message.nickname,
            data = _props$message.data,
            resend = _props$message.resend;

        return _react2.default.createElement(
            _TextStyled.TextWrapper,
            { className: (0, _classnames2.default)('message_' + side.toLowerCase()) },
            nickname && _react2.default.createElement(
                _TextStyled.TextNickname,
                { className: 'message__nickname' },
                nickname
            ),
            avatar && _react2.default.createElement(_TextStyled.TextAvatar, { className: 'message__avatar', src: avatar }),
            _react2.default.createElement(
                _TextStyled.TextMessageContentWrapper,
                null,
                resend === true && _react2.default.createElement(_TextStyled.TextResend, { onClick: this.resendMessage, className: 'message__resend' }),
                _react2.default.createElement(_TextStyled.TextContent, { className: (0, _classnames2.default)('message__text', 'message__text_' + side.toLowerCase()), dangerouslySetInnerHTML: { __html: data } })
            )
        );
    };

    Text.prototype.componentDidMount = function componentDidMount() {
        this.props.message.resolve();
    };

    Text.prototype.componentDidUpdate = function componentDidUpdate() {
        console.log('update text');
    };

    return Text;
}(_react.PureComponent);

exports.default = Text;