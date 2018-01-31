'use strict';

exports.__esModule = true;
exports.api = exports.default = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _templateObject = _taggedTemplateLiteralLoose(['\n    height: 100%;\n    width: 100%;\n    overflow: hidden;\n    position: relative;\n    box-sizing: border-box;\n    display: flex;\n    flex-direction: column;\n'], ['\n    height: 100%;\n    width: 100%;\n    overflow: hidden;\n    position: relative;\n    box-sizing: border-box;\n    display: flex;\n    flex-direction: column;\n']);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRedux = require('react-redux');

var _actions = require('../../store/actions');

var _Message = require('../Message');

var _Message2 = _interopRequireDefault(_Message);

var _Scroll = require('../Scroll');

var _Scroll2 = _interopRequireDefault(_Scroll);

var _Album = require('../Album');

var _Album2 = _interopRequireDefault(_Album);

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


var ChatListWrapper = _styledComponents2.default.div(_templateObject);
var api = {
    message: {},
    scrollToBottom: function scrollToBottom() {},
    scrollToTop: function scrollToTop() {}
};

var ChatList = function (_PureComponent) {
    _inherits(ChatList, _PureComponent);

    function ChatList() {
        _classCallCheck(this, ChatList);

        var _this = _possibleConstructorReturn(this, _PureComponent.call(this));

        _this.state = {
            albumVisible: false,
            albumUrl: ''
        };
        _this.showAlbum = _this.showAlbum.bind(_this);
        _this.hideAlbum = _this.hideAlbum.bind(_this);
        _this.resend = _this.resend.bind(_this);
        _this.contextMenu = _this.contextMenu.bind(_this);
        return _this;
    }

    ChatList.prototype.render = function render() {
        var _this2 = this;

        var _props = this.props,
            oldMessages = _props.oldMessages,
            newMessages = _props.newMessages,
            onRefresh = _props.onRefresh,
            onImageClick = _props.onImageClick;

        var list = oldMessages.reverse().concat(newMessages).toList();
        var images = list.filter(function (item) {
            return item.type === _Constant2.default.type.IMAGE;
        });
        return _react2.default.createElement(
            ChatListWrapper,
            { style: this.props.style },
            _react2.default.createElement(_Album2.default, { visible: this.state.albumVisible, close: this.hideAlbum, url: this.state.albumUrl }),
            _react2.default.createElement(
                _Scroll2.default,
                _extends({}, this.props, { onRefresh: onRefresh || function () {} }),
                list.map(function (item) {
                    return _react2.default.createElement(_Message2.default, { key: item.id, message: item, showAlbum: onImageClick || _this2.showAlbum, resend: _this2.resend, onContextMenu: _this2.contextMenu });
                })
            )
        );
    };

    ChatList.prototype.componentDidMount = function componentDidMount() {
        api.scrollToBottom = _Scroll.scrollApi.scrollToBottom;
        api.scrollToTop = _Scroll.scrollApi.scrollToTop;
        api.scrollOffset = _Scroll.scrollApi.scrollOffset;
        api.isBottom = _Scroll.scrollApi.isBottom;
        api.isTop = _Scroll.scrollApi.isTop;
        api.hideLoading = _Scroll.scrollApi.hideLoading;
    };

    // 显示相册


    ChatList.prototype.showAlbum = function showAlbum(image) {
        this.setState({
            albumVisible: true,
            albumUrl: image.data.url || image.data.blob
        });
    };

    // 关闭相册


    ChatList.prototype.hideAlbum = function hideAlbum() {
        this.setState({
            albumVisible: false
        });
    };

    ChatList.prototype.resend = function resend(message) {
        this.props.onResend && this.props.onResend(message);
    };

    ChatList.prototype.contextMenu = function contextMenu(message, e) {
        if (this.props.onContextMenu) {
            e.stopPropagation();
            e.preventDefault();
            this.props.onContextMenu(message, e);
        }
    };

    return ChatList;
}(_react.PureComponent);

var mapReducerToProps = function mapReducerToProps(dispatch, props) {
    api.message.add = function (message) {
        return new Promise(function (resolve) {
            message.resolve = resolve;
            (0, _actions.messageAdd)(dispatch, message);
        });
    };
    api.message.del = function (messageId) {
        (0, _actions.messageDel)(dispatch, messageId);
    };
    return _extends({}, props, {
        messageAdd: api.message.add,
        messageDel: api.message.del
    });
};
var mapStateToProps = function mapStateToProps(state) {
    return {
        oldMessages: state.messages.oldMessages,
        newMessages: state.messages.newMessages
    };
};
var ConnectedScroll = (0, _reactRedux.connect)(mapStateToProps, mapReducerToProps)(ChatList);
exports.default = ConnectedScroll;
exports.api = api;