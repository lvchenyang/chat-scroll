'use strict';

exports.__esModule = true;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _ComponentStyled = require('../Theme/ComponentStyled');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Created by lvcy on 18-1-2.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */


var CustomComponent = function (_PureComponent) {
    _inherits(CustomComponent, _PureComponent);

    function CustomComponent() {
        _classCallCheck(this, CustomComponent);

        return _possibleConstructorReturn(this, _PureComponent.apply(this, arguments));
    }

    CustomComponent.prototype.render = function render() {
        var _props$message = this.props.message,
            component = _props$message.component,
            data = _props$message.data;

        var loading = !component || !data;
        var RenderComponent = component;
        return _react2.default.createElement(
            _ComponentStyled.ComponentWrapper,
            null,
            loading && _react2.default.createElement(
                _ComponentStyled.ComponentLoading,
                null,
                '\u6D88\u606F\u7EC4\u4EF6\u6B63\u5728\u52A0\u8F7D\u4E2D...'
            ),
            !loading && _react2.default.createElement(RenderComponent, data)
        );
    };

    CustomComponent.prototype.componentDidMount = function componentDidMount() {
        this.props.message.resolve();
    };

    return CustomComponent;
}(_react.PureComponent);

exports.default = CustomComponent;