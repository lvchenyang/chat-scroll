'use strict';

exports.__esModule = true;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Created by lvcy on 18-1-2.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */


var Voice = function (_PureComponent) {
    _inherits(Voice, _PureComponent);

    function Voice() {
        _classCallCheck(this, Voice);

        return _possibleConstructorReturn(this, _PureComponent.apply(this, arguments));
    }

    Voice.prototype.render = function render() {
        return _react2.default.createElement(
            'div',
            null,
            'Voice'
        );
    };

    return Voice;
}(_react.PureComponent);

exports.default = Voice;