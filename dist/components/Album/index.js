'use strict';

exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _templateObject = _taggedTemplateLiteralLoose(['\n    position: fixed;\n    left: 0;\n    top: 0;\n    bottom: 0;\n    right: 0;\n    width: 100%;\n    height: 100%;\n    background: #000;\n    z-index: 1000;\n    flex-direction: row;\n    justify-content: center;\n    align-items: center;\n    overflow: hidden;\n'], ['\n    position: fixed;\n    left: 0;\n    top: 0;\n    bottom: 0;\n    right: 0;\n    width: 100%;\n    height: 100%;\n    background: #000;\n    z-index: 1000;\n    flex-direction: row;\n    justify-content: center;\n    align-items: center;\n    overflow: hidden;\n']),
    _templateObject2 = _taggedTemplateLiteralLoose(['\n    max-width: 100%;\n'], ['\n    max-width: 100%;\n']);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _styledComponents = require('styled-components');

var _styledComponents2 = _interopRequireDefault(_styledComponents);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _taggedTemplateLiteralLoose(strings, raw) { strings.raw = raw; return strings; } /**
                                                                                           * Created by lvcy on 18-1-4.
                                                                                           */


var Wrapper = _styledComponents2.default.div.attrs({
    style: function style(props) {
        return {
            display: props.visible ? 'flex' : 'none'
        };
    }
})(_templateObject);
var Image = _styledComponents2.default.img.attrs({
    style: function style(props) {
        return {
            transform: 'scale(' + props.imageScale + ') translate(' + props.offsetX + 'px, ' + props.offsetY + 'px)'
        };
    }
})(_templateObject2);

var Container = function (_Component) {
    _inherits(Container, _Component);

    function Container() {
        _classCallCheck(this, Container);

        var _this = _possibleConstructorReturn(this, _Component.call(this));

        _this.clickTimeout = null;
        _this.clickNumber = 0;
        _this.clickEvt = _this.clickEvt.bind(_this);
        _this.zoom = _this.zoom.bind(_this);

        _this.mouseDown = _this.mouseDown.bind(_this);
        _this.mouseMove = _this.mouseMove.bind(_this);
        _this.mouseUp = _this.mouseUp.bind(_this);
        _this.touchStart = _this.touchStart.bind(_this);
        _this.touchMove = _this.touchMove.bind(_this);
        _this.touchEnd = _this.touchEnd.bind(_this);

        _this.state = {
            scale: 1,
            dragging: false,
            touching: false,
            offsetX: 0,
            offsetY: 0
        };
        _this.dragStartX = 0;
        _this.dragStartY = 0;
        _this.dragEndX = 0;
        _this.dragEndY = 0;
        _this.draged = false;
        return _this;
    }

    Container.prototype.clickEvt = function clickEvt() {
        var _this2 = this;

        if (this.draged) {
            this.draged = false;
            return;
        }
        this.clickNumber++;
        if (this.clickNumber === 2) {
            this.clickNumber = 0;
            clearTimeout(this.clickTimeout);
            this.zoom();
            return;
        }
        this.clickTimeout = setTimeout(function () {
            _this2.clickNumber = 0;
            _this2.setState({
                scale: 1,
                dragging: false,
                touching: false,
                offsetX: 0,
                offsetY: 0
            });
            _this2.props.close();
        }, 500);
    };

    Container.prototype.touchStart = function touchStart(e) {
        this.setState({
            touching: true
        });
        e = e.targetTouches[0];
        this.dragStartX = e.clientX;
        this.dragStartY = e.clientY;
    };

    Container.prototype.touchMove = function touchMove(e) {
        this.draged = true;
        if (this.state.touching === false) {
            return;
        }
        if (e.cancelable && !e.defaultPrevented) {
            e.preventDefault();
        }
        e.stopPropagation();
        e = e.targetTouches[0];
        var _e = e,
            clientX = _e.clientX,
            clientY = _e.clientY;
        var scale = this.state.scale;

        this.setState({
            offsetX: this.dragEndX + (clientX - this.dragStartX) / scale,
            offsetY: this.dragEndY + (clientY - this.dragStartY) / scale
        });
    };

    Container.prototype.touchEnd = function touchEnd(e) {
        if (this.state.touching === false) {
            return;
        }
        this.setState({
            touching: false
        });
        this.dragEndX = this.state.offsetX;
        this.dragEndY = this.state.offsetY;
    };

    Container.prototype.mouseDown = function mouseDown(e) {
        if (e.cancelable && !e.defaultPrevented) {
            e.preventDefault();
        }
        e.stopPropagation();
        this.setState({
            dragging: true
        });
        this.dragStartX = e.clientX;
        this.dragStartY = e.clientY;
    };

    Container.prototype.mouseMove = function mouseMove(e) {
        this.draged = true;
        if (this.state.dragging === false) {
            return;
        }
        if (e.cancelable && !e.defaultPrevented) {
            e.preventDefault();
        }
        e.stopPropagation();
        var clientX = e.clientX,
            clientY = e.clientY;
        var scale = this.state.scale;

        this.setState({
            offsetX: this.dragEndX + (clientX - this.dragStartX) / scale,
            offsetY: this.dragEndY + (clientY - this.dragStartY) / scale
        });
    };

    Container.prototype.mouseUp = function mouseUp(e) {
        if (this.state.dragging === false) {
            return;
        }
        if (e.cancelable && !e.defaultPrevented) {
            e.preventDefault();
        }
        e.stopPropagation();
        this.setState({
            dragging: false
        });
        this.dragEndX = this.state.offsetX;
        this.dragEndY = this.state.offsetY;
    };

    Container.prototype.zoom = function zoom() {
        this.setState({
            scale: this.state.scale === 1 ? 2 : 1
        });
    };

    Container.prototype.render = function render() {
        var _this3 = this;

        var _props = this.props,
            visible = _props.visible,
            url = _props.url;
        var _state = this.state,
            offsetX = _state.offsetX,
            offsetY = _state.offsetY;

        return _react2.default.createElement(
            Wrapper,
            {
                onClick: this.clickEvt,
                ref: function ref(_ref) {
                    return _this3.wrapper = _ref;
                },
                visible: visible },
            _react2.default.createElement(Image, {
                imageScale: this.state.scale,
                offsetX: offsetX,
                offsetY: offsetY,
                src: url,
                onMouseDown: this.mouseDown,
                onTouchStart: this.touchStart,
                onTouchMove: this.touchMove,
                onTouchEnd: this.touchEnd
            })
        );
    };

    Container.prototype.componentDidUpdate = function componentDidUpdate() {
        if (this.state.dragging) {
            document.body.addEventListener('mousemove', this.mouseMove);
            document.body.addEventListener('mouseup', this.mouseUp);
        } else {
            document.body.removeEventListener('mousemove', this.mouseMove);
            document.body.removeEventListener('mouseup', this.mouseUp);
        }
    };

    return Container;
}(_react.Component);

var Album = function (_Component2) {
    _inherits(Album, _Component2);

    function Album() {
        _classCallCheck(this, Album);

        var _this4 = _possibleConstructorReturn(this, _Component2.call(this));

        _this4.node = document.createElement('div');
        document.body.appendChild(_this4.node);
        _this4.close = _this4.close.bind(_this4);

        return _this4;
    }

    Album.prototype.close = function close() {
        this.props.close();
    };

    Album.prototype.render = function render() {
        return (0, _reactDom.createPortal)(_react2.default.createElement(Container, _extends({}, this.props, { close: this.close })), this.node);
    };

    Album.prototype.shouldComponentUpdate = function shouldComponentUpdate(nextProps) {
        return this.props.visible !== nextProps.visible;
    };

    Album.prototype.componentWillUnmount = function componentWillUnmount() {
        window.document.body.removeChild(this.node);
    };

    return Album;
}(_react.Component);

exports.default = Album;