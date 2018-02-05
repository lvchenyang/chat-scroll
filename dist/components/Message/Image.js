'use strict';

exports.__esModule = true;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _ImageStyled = require('../Theme/ImageStyled');

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Created by lvcy on 17-12-29.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */


var Image = function (_PureComponent) {
    _inherits(Image, _PureComponent);

    function Image() {
        _classCallCheck(this, Image);

        var _this = _possibleConstructorReturn(this, _PureComponent.call(this));

        _this.state = {
            loadingHeight: 0
        };
        _this.resendMessage = _this.resendMessage.bind(_this);
        return _this;
    }

    Image.prototype.imageClick = function imageClick() {
        this.props.showAlbum(this.props.message);
    };

    Image.prototype.resendMessage = function resendMessage() {
        this.props.resend(this.props.message);
    };

    Image.prototype.render = function render() {
        var _this2 = this;

        var _props$message = this.props.message,
            id = _props$message.id,
            side = _props$message.side,
            avatar = _props$message.avatar,
            nickname = _props$message.nickname,
            data = _props$message.data,
            resend = _props$message.resend;
        var loadingHeight = this.state.loadingHeight;

        var src = data.url || data.blob;
        if (src === '') {
            src = '';
        }
        return _react2.default.createElement(
            _ImageStyled.ImageWrapper,
            { className: (0, _classnames2.default)('message_' + side.toLowerCase()) },
            nickname && _react2.default.createElement(
                _ImageStyled.ImageNickname,
                { className: 'message__nickname' },
                nickname
            ),
            avatar && _react2.default.createElement(_ImageStyled.ImageAvatar, { className: 'message__avatar', src: avatar }),
            _react2.default.createElement(
                _ImageStyled.ImageSection,
                { onClick: this.imageClick.bind(this), className: (0, _classnames2.default)('message__image', 'message__image_' + side.toLowerCase()) },
                _react2.default.createElement(_ImageStyled.ImageUploadLoading, { visible: data.process < 100, className: 'message__loading', loadingHeight: loadingHeight }),
                _react2.default.createElement(_ImageStyled.ImageContent, { className: 'image_' + id, ref: function ref(_ref) {
                        return _this2.img = _ref;
                    }, src: src })
            ),
            resend === true && _react2.default.createElement(_ImageStyled.ImageResend, { onClick: this.resendMessage, className: 'message__resend' })
        );
    };

    Image.prototype.componentDidMount = function componentDidMount() {
        var _this3 = this;

        var imgElem = document.getElementsByClassName('image_' + this.props.message.id)[0];
        imgElem.addEventListener('load', function () {
            _this3.setState({
                loadingHeight: imgElem.parentElement.offsetHeight
            });
            _this3.props.message.resolve();
        }, false);
    };

    Image.prototype.componentDidUpdate = function componentDidUpdate() {
        console.log('update image');
    };

    return Image;
}(_react.PureComponent);

exports.default = Image;