'use strict';

exports.__esModule = true;
exports.Constant = exports.api = exports.default = undefined;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _ChatList = require('./components/ChatList');

var _ChatList2 = _interopRequireDefault(_ChatList);

var _Constant = require('./Constant');

var _Constant2 = _interopRequireDefault(_Constant);

var _reactRedux = require('react-redux');

var _redux = require('redux');

var _reducers = require('./store/reducers');

var _reducers2 = _interopRequireDefault(_reducers);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Created by lvcy on 17-12-29.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

var store = (0, _redux.createStore)(_reducers2.default);

var ChatScroll = function (_Component) {
    _inherits(ChatScroll, _Component);

    function ChatScroll() {
        _classCallCheck(this, ChatScroll);

        return _possibleConstructorReturn(this, _Component.call(this));
    }

    ChatScroll.prototype.render = function render() {
        return _react2.default.createElement(
            _reactRedux.Provider,
            { store: store },
            _react2.default.createElement(_ChatList2.default, this.props)
        );
    };

    return ChatScroll;
}(_react.Component);

exports.default = ChatScroll;
exports.api = _ChatList.api;
exports.Constant = _Constant2.default;