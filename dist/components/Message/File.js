'use strict';

exports.__esModule = true;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _FileStyled = require('../Theme/FileStyled');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Created by lvcy on 18-1-2.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */


var FileInfo = function (_PureComponent) {
    _inherits(FileInfo, _PureComponent);

    function FileInfo() {
        _classCallCheck(this, FileInfo);

        return _possibleConstructorReturn(this, _PureComponent.apply(this, arguments));
    }

    FileInfo.prototype.render = function render() {
        var data = this.props.data;
        return _react2.default.createElement(
            'div',
            null,
            '\u7A0B\u5E8F\u5458\u54E5\u54E5\u8FD8\u5728\u5F00\u53D1\u4E2D...'
        );
    };

    return FileInfo;
}(_react.PureComponent);

var File = function (_PureComponent2) {
    _inherits(File, _PureComponent2);

    function File() {
        _classCallCheck(this, File);

        var _this2 = _possibleConstructorReturn(this, _PureComponent2.call(this));

        _this2.resendMessage = _this2.resendMessage.bind(_this2);
        return _this2;
    }

    File.prototype.resendMessage = function resendMessage() {
        this.props.resend(this.props.message);
    };

    File.prototype.render = function render() {
        var _props$message = this.props.message,
            side = _props$message.side,
            data = _props$message.data,
            avatar = _props$message.avatar,
            nickname = _props$message.nickname,
            resend = _props$message.resend;

        return _react2.default.createElement(
            _FileStyled.FileWrapper,
            { className: (0, _classnames2.default)('message_' + side.toLowerCase()) },
            nickname && _react2.default.createElement(
                _FileStyled.FileNickname,
                null,
                nickname
            ),
            avatar && _react2.default.createElement(_FileStyled.FileAvatar, { src: avatar }),
            _react2.default.createElement(FileInfo, { data: data }),
            resend === true && _react2.default.createElement(_FileStyled.FileResend, { onClick: this.resendMessage, className: 'message__resend' })
        );
    };

    return File;
}(_react.PureComponent);

exports.default = File;