'use strict';

exports.__esModule = true;
exports.scrollApi = exports.default = undefined;

var _templateObject = _taggedTemplateLiteralLoose(['\n    height: 100%;\n    width : 100%;\n    overflow: hidden;\n    position: relative;\n    box-sizing: border-box;\n    flex: 1 1 auto;\n    & * {\n        box-sizing: border-box;\n    }\n'], ['\n    height: 100%;\n    width : 100%;\n    overflow: hidden;\n    position: relative;\n    box-sizing: border-box;\n    flex: 1 1 auto;\n    & * {\n        box-sizing: border-box;\n    }\n']),
    _templateObject2 = _taggedTemplateLiteralLoose(['\n    display: flex;\n    flex-direction: column;\n    transition-property: transform;\n    transition-timing-function: cubic-bezier(.24,.68,.32,.88);\n'], ['\n    display: flex;\n    flex-direction: column;\n    transition-property: transform;\n    transition-timing-function: cubic-bezier(.24,.68,.32,.88);\n']),
    _templateObject3 = _taggedTemplateLiteralLoose(['\n    height: 100px;\n    left: 0;\n    width: 100%;\n    display: flex;\n    justify-content: center;\n    align-items: center;\n    position: absolute;\n'], ['\n    height: 100px;\n    left: 0;\n    width: 100%;\n    display: flex;\n    justify-content: center;\n    align-items: center;\n    position: absolute;\n']),
    _templateObject4 = _taggedTemplateLiteralLoose(['\n    position: absolute;\n    left: 50%;\n    top: 0;\n    transform: translateX(-50%);\n'], ['\n    position: absolute;\n    left: 50%;\n    top: 0;\n    transform: translateX(-50%);\n']),
    _templateObject5 = _taggedTemplateLiteralLoose(['\n    height: 40px;\n    left: 0;\n    position: absolute;\n    width: 100%;\n'], ['\n    height: 40px;\n    left: 0;\n    position: absolute;\n    width: 100%;\n']),
    _templateObject6 = _taggedTemplateLiteralLoose(['\n    position: absolute;\n    left: 0;\n    top: 0;\n'], ['\n    position: absolute;\n    left: 0;\n    top: 0;\n']),
    _templateObject7 = _taggedTemplateLiteralLoose(['\n    position: absolute;\n    width: 6px;\n    top: 0;\n    right: 0;\n'], ['\n    position: absolute;\n    width: 6px;\n    top: 0;\n    right: 0;\n']),
    _templateObject8 = _taggedTemplateLiteralLoose(['\n    position: absolute;\n    right: 0;\n    width: 6px;\n    border-radius: 3px;\n    cursor: pointer;\n'], ['\n    position: absolute;\n    right: 0;\n    width: 6px;\n    border-radius: 3px;\n    cursor: pointer;\n']);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _styledComponents = require('styled-components');

var _styledComponents2 = _interopRequireDefault(_styledComponents);

var _Message = require('../Message');

var _Message2 = _interopRequireDefault(_Message);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _taggedTemplateLiteralLoose(strings, raw) { strings.raw = raw; return strings; } /**
                                                                                           * Created by lvcy on 17-12-29.
                                                                                           */

var Wrapper = _styledComponents2.default.div(_templateObject);
var Content = _styledComponents2.default.div.attrs({
    style: function style(props) {
        return {
            transform: 'translate3d(0, ' + props.translateY + 'px, 0)',
            transitionDuration: props.duration + 'ms'
        };
    }
})(_templateObject2);
var PullDown = _styledComponents2.default.div.attrs({
    style: function style(props) {
        return {
            top: (props.translateY < 0 ? -100 : props.translateY - 100) + 'px'
        };
    }
})(_templateObject3);

var PullDownCanvas = _styledComponents2.default.canvas(_templateObject4);
var WaveContainer = _styledComponents2.default.div.attrs({
    style: function style(props) {
        return {
            display: props.visible ? 'block' : 'none',
            bottom: props.position === 'top' ? 'auto' : 0,
            top: props.position === 'bottom' ? 'auto' : 0
        };
    }
})(_templateObject5);
var WaveCanvas = _styledComponents2.default.canvas(_templateObject6);
var ScrollBarWrapper = _styledComponents2.default.div.attrs({
    style: function style(props) {
        return {
            display: '' + (props.visible ? 'block' : 'none'),
            height: props.wrapperHeight + 'px'
        };
    }
})(_templateObject7);
var ScrollBarDrager = _styledComponents2.default.div.attrs({
    style: function style(props) {
        return {
            height: props.barHeight + 'px',
            top: props.barTop + 'px',
            transitionDuration: props.duration + 'ms',
            background: 'rgba(0,0,0,.5)'
        };
    }
})(_templateObject8);

var scrollApi = {
    scrollToBottom: function scrollToBottom() {},
    scrollToTop: function scrollToTop() {},
    isBottom: function isBottom() {},
    isTop: function isTop() {},
    hideLoading: function hideLoading() {}
};

var Scroll = function (_Component) {
    _inherits(Scroll, _Component);

    function Scroll() {
        _classCallCheck(this, Scroll);

        var _this = _possibleConstructorReturn(this, _Component.call(this));

        _this.state = {
            translateY: 0,
            animationDuration: 0,
            waveContainerVisible: false,
            dragging: false,
            wavePosition: 'bottom'
        };

        // Scroll容器
        _this.wrapper = null;
        _this.wrapperElem = null;
        _this.wrapperHeight = 0;
        _this.wrapperWidth = 0;

        // Scroll内容
        _this.content = null;
        _this.contentElem = null;
        _this.contentHeight = 0;

        _this.scrollBar = null;

        // 顶部画布
        _this.topCanvas = null;
        _this.topCanvasElem = null;
        _this.topCanvasContext = null;

        // 底端画布
        _this.waveCanvas = null;
        _this.waveCanvasElem = null;
        _this.waveCanvasContext = null;

        // 用于记录是否在移动中
        _this.moving = false;
        _this.totalScrollHeight = 0;
        _this.distance = 0;

        _this.touchClientX = 0;
        _this.touchClientY = 0;
        _this.touchDeltaY = null;

        _this.scrollOffsetY = 0;
        _this.scrollToTopTimer = null;

        _this.prevItemCount = 0;
        _this.nextItemCount = 0;
        _this.prevScrollHeight = 0;
        _this.nextScrollHeight = 0;

        _this.touchStart = _this.touchStart.bind(_this);
        _this.touchMove = _this.touchMove.bind(_this);
        _this.touchEnd = _this.touchEnd.bind(_this);
        _this.scrollToBottom = _this.scrollToBottom.bind(_this);
        _this.scrollToTop = _this.scrollToTop.bind(_this);
        _this.scrollOffset = _this.scrollOffset.bind(_this);
        _this.isBottom = _this.isBottom.bind(_this);
        _this.isTop = _this.isTop.bind(_this);
        _this.hideLoading = _this.hideLoading.bind(_this);
        _this.mouseWheel = _this.mouseWheel.bind(_this);

        _this.scrollBarMouseDown = _this.scrollBarMouseDown.bind(_this);
        _this.scrollBarMouseMove = _this.scrollBarMouseMove.bind(_this);
        _this.scrollBarMouseUp = _this.scrollBarMouseUp.bind(_this);
        return _this;
    }

    Scroll.prototype.touchStart = function touchStart(e) {
        this.touchClientX = e.targetTouches[0].clientX;
        this.touchClientY = e.targetTouches[0].clientY;
        this.touchDeltaY = this.touchClientY;
        this.setState({
            animationDuration: 0
        });
    };

    Scroll.prototype.touchMove = function touchMove(e) {
        if (e.cancelable && !e.defaultPrevented) {
            e.preventDefault();
        }
        this.moving = true;
        this.touchClientX = e.targetTouches[0].clientX;
        this.touchClientY = e.targetTouches[0].clientY;
        var distance = this.touchDeltaY - this.touchClientY;
        this.touchDeltaY = this.touchClientY;

        this.distance = distance;

        // 在顶部上拉或下拉
        if (this.state.translateY >= 0) {
            this.pullDown(distance);
            return;
        }
        // 在底部往上拉
        if (distance > 0 && this.state.translateY + this.totalScrollHeight <= 0) {
            this.pullUp(distance);
            return;
        }
        var offset = this.state.translateY - distance;

        if (offset > 0) {
            offset = 0;
        }
        if (offset < 0 - this.totalScrollHeight) {
            offset = 0 - this.totalScrollHeight;
        }
        this.setState({
            translateY: offset,
            waveContainerVisible: false
        });
    };

    Scroll.prototype.touchEnd = function touchEnd(e) {
        var distance = this.moving ? this.distance : 0;
        this.moving = false;

        if (this.state.translateY === 100) {
            this.props.onRefresh && this.props.onRefresh();
            return;
        }

        var offset = this.state.translateY - distance * 20;
        if (offset === 100) {
            return;
        }
        if (offset > 0) {
            offset = 0;
        }
        if (offset < 0 - this.totalScrollHeight) {
            offset = 0 - this.totalScrollHeight;
        }
        var duration = 1000;
        if (Math.abs(offset - this.state.translateY) < 500) {
            duration = 300;
        }
        this.setState({
            translateY: offset,
            animationDuration: duration,
            waveContainerVisible: false
        });
    };

    Scroll.prototype.mouseWheel = function mouseWheel(e) {
        var _this2 = this;

        var deltaX = e.deltaX,
            deltaY = e.deltaY;

        var distance = deltaY - deltaX;
        var offset = this.state.translateY - distance;
        if (offset > 0) {
            offset = 0;
        }
        if (offset < 0 - this.totalScrollHeight) {
            offset = 0 - this.totalScrollHeight;
        }
        if (offset === 0) {
            clearTimeout(this.scrollToTopTimer);
            this.scrollToTopTimer = setTimeout(function () {
                if (_this2.props.onScrollTop) {
                    _this2.props.onScrollTop();
                }
            }, 100);
        }
        this.setState({
            translateY: offset,
            animationDuration: 0,
            waveContainerVisible: false
        });
    };

    Scroll.prototype.pullDown = function pullDown(distance) {
        var _this3 = this;

        if (this.props.canRefresh) {
            var offset = this.state.translateY - distance;
            if (offset > 100) {
                offset = 100;
            }
            this.setState({
                translateY: offset
            }, function () {
                _this3.drawTopLoading();
            });
        } else {

            var _offset = this.state.translateY - distance;
            if (_offset > 0) {
                _offset = 0;
            }

            this.setState({
                translateY: _offset,
                waveContainerVisible: this.props.topWave !== false
            }, function () {
                if (_this3.props.topWave === false) {
                    return;
                }
                _this3.drawWave('top');
            });
        }
    };

    Scroll.prototype.drawTopLoading = function drawTopLoading() {
        var context = this.topCanvasContext;
        var offset = this.state.translateY;
        if (offset < 0) {
            return;
        }

        context.clearRect(0, 0, 400, 400);
        context.beginPath();
        var centralY = 400 - 2 * offset;
        var cycleMid = { x: 200, y: centralY, r: 0 };
        var cycleLeft = { x: 0, y: centralY, r: 0 };
        var cycleRight = { x: 0, y: centralY, r: 0 };
        if (offset < 30) {
            cycleMid.r = offset;
        } else if (offset >= 30 && offset < 50) {
            cycleMid.r = 30;
        } else if (offset >= 50 && offset < 80) {
            cycleLeft.x = 200 - (50 - offset);
            cycleRight.x = 200 + (50 - offset);
            cycleLeft.r = cycleRight.r = 20 - (80 - offset) * 2 / 3;
            cycleMid.r = 20 + (80 - offset) / 3;
        } else {
            cycleLeft.x = 200 - (50 - offset) * 2;
            cycleRight.x = 200 + (50 - offset) * 2;
            cycleMid.r = cycleLeft.r = cycleRight.r = 20;
        }
        context.arc(cycleMid.x, cycleMid.y, cycleMid.r, 0, 2 * Math.PI);
        context.fill();
        context.arc(cycleLeft.x, cycleLeft.y, cycleLeft.r, 0, 2 * Math.PI);
        context.fill();
        context.arc(cycleRight.x, cycleRight.y, cycleRight.r, 0, 2 * Math.PI);
        context.fill();
    };

    Scroll.prototype.hideLoading = function hideLoading() {
        var delay = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 500;

        if (this.state.translateY <= 0 || this.moving) {
            return;
        }
        this.setState({
            translateY: 0,
            animationDuration: delay
        });
    };

    Scroll.prototype.pullUp = function pullUp(distance) {
        var _this4 = this;

        this.setState({
            waveContainerVisible: this.props.bottomWave !== false
        }, function () {
            if (_this4.props.bottomWave === false) {
                return;
            }
            _this4.drawWave('bottom');
        });
    };

    Scroll.prototype.isBottom = function isBottom() {
        var offset = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 40;

        return this.totalScrollHeight + this.state.translateY <= offset;
    };

    Scroll.prototype.isTop = function isTop() {
        return this.state.translateY === 0;
    };

    Scroll.prototype.getProcess = function getProcess() {
        return 0 - this.state.translateY / this.totalScrollHeight;
    };

    Scroll.prototype.scrollToBottom = function scrollToBottom() {
        if (this.moving) {
            return;
        }
        this.initElementHeight();
        if (this.wrapperHeight > this.contentHeight) {
            this.scrollToTop();
            return;
        }
        this.setState({
            translateY: this.wrapperHeight - this.contentHeight
        });
    };

    Scroll.prototype.scrollToTop = function scrollToTop(duration) {
        var _this5 = this;

        if (this.moving) {
            return;
        }
        var prevDuration = this.state.animationDuration;
        this.setState({
            translateY: 0,
            animationDuration: duration || 0
        }, function () {
            _this5.setState({
                animationDuration: prevDuration
            });
        });
    };

    Scroll.prototype.scrollOffset = function scrollOffset(offset, duration) {
        var _this6 = this;

        if (this.moving) {
            return;
        }
        var prevDuration = this.state.animationDuration;
        offset = this.state.translateY + offset;
        if (offset > 0) {
            offset = 0;
        }
        if (offset < 0 - this.totalScrollHeight) {
            offset = 0 - this.totalScrollHeight;
        }
        this.setState({
            translateY: offset,
            animationDuration: duration
        }, function () {
            _this6.setState({
                animationDuration: prevDuration
            });
        });
    };

    Scroll.prototype.drawWave = function drawWave(type) {
        var x = this.touchClientX;
        this.waveCanvasContext.clearRect(0, 0, this.wrapperWidth * 2, 80);
        this.waveCanvasContext.beginPath();
        if (type === 'bottom') {
            // 移动waveContainer的位置
            this.setState({
                wavePosition: 'bottom'
            });
            this.waveCanvasContext.moveTo(0, 80);
            this.waveCanvasContext.quadraticCurveTo(x, 0, this.wrapperWidth * 2, 80);
            this.waveCanvasContext.fill();
        } else {
            this.setState({
                wavePosition: 'top'
            });
            this.waveCanvasContext.moveTo(0, 0);
            this.waveCanvasContext.quadraticCurveTo(x, 80, this.wrapperWidth * 2, 0);
            this.waveCanvasContext.fill();
        }
    };

    Scroll.prototype.scrollBarMouseDown = function scrollBarMouseDown(e) {
        if (e.cancelable && !e.defaultPrevented) {
            e.preventDefault();
        }
        e.stopPropagation();
        this.scrollOffsetY = e.clientY - this.getProcess() * this.wrapperHeight;
        this.setState({
            dragging: true
        });
    };

    Scroll.prototype.scrollBarMouseMove = function scrollBarMouseMove(e) {
        var _this7 = this;

        if (this.state.dragging === false) {
            return;
        }
        if (e.cancelable && !e.defaultPrevented) {
            e.preventDefault();
        }
        e.stopPropagation();
        var clientY = e.clientY;
        var relativeClientY = clientY - this.scrollOffsetY;
        var offset = relativeClientY * this.totalScrollHeight / (0 - this.wrapperHeight);
        if (offset > 0) {
            offset = 0;
        }
        if (offset < 0 - this.totalScrollHeight) {
            offset = 0 - this.totalScrollHeight;
        }
        if (offset === 0) {
            clearTimeout(this.scrollToTopTimer);
            this.scrollToTopTimer = setTimeout(function () {
                if (_this7.props.onScrollTop) {
                    _this7.props.onScrollTop();
                }
            }, 100);
        }
        this.setState({
            translateY: offset
        });
    };

    Scroll.prototype.scrollBarMouseUp = function scrollBarMouseUp(e) {
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
    };

    Scroll.prototype.render = function render() {
        var _this8 = this;

        var _state = this.state,
            translateY = _state.translateY,
            animationDuration = _state.animationDuration,
            waveContainerVisible = _state.waveContainerVisible,
            wavePosition = _state.wavePosition;
        var _props = this.props,
            scrollBar = _props.scrollBar,
            children = _props.children;

        var process = this.getProcess();
        var scrollBarHeight = 80;
        var scrollBarTop = (this.wrapperHeight - scrollBarHeight) * process;
        var showScrollBar = this.wrapperHeight - this.contentHeight < 0 && scrollBar;
        return _react2.default.createElement(
            Wrapper,
            {
                ref: function ref(_ref5) {
                    return _this8.wrapper = _ref5;
                },
                className: this.props.className,
                onTouchStart: this.touchStart,
                onTouchMove: this.touchMove,
                onTouchEnd: this.touchEnd,
                onWheel: this.mouseWheel },
            _react2.default.createElement(
                PullDown,
                { translateY: translateY },
                _react2.default.createElement(PullDownCanvas, { ref: function ref(_ref) {
                        return _this8.topCanvas = _ref;
                    } })
            ),
            _react2.default.createElement(
                Content,
                { translateY: translateY, duration: animationDuration, ref: function ref(_ref2) {
                        return _this8.content = _ref2;
                    } },
                children
            ),
            _react2.default.createElement(
                WaveContainer,
                { visible: waveContainerVisible, position: wavePosition },
                _react2.default.createElement(WaveCanvas, { ref: function ref(_ref3) {
                        return _this8.waveCanvas = _ref3;
                    } })
            ),
            _react2.default.createElement(
                ScrollBarWrapper,
                { visible: showScrollBar, wrapperHeight: this.wrapperHeight },
                _react2.default.createElement(ScrollBarDrager, {
                    ref: function ref(_ref4) {
                        return _this8.scrollBar = _ref4;
                    },
                    barTop: scrollBarTop,
                    barHeight: scrollBarHeight,
                    duration: animationDuration,
                    onMouseDown: this.scrollBarMouseDown
                })
            )
        );
    };

    Scroll.prototype.componentDidMount = function componentDidMount() {
        this.contentElem = document.getElementsByClassName(this.content.state.generatedClassName)[0];
        this.wrapperElem = document.getElementsByClassName(this.wrapper.state.generatedClassName)[0];
        this.topCanvasElem = document.getElementsByClassName(this.topCanvas.state.generatedClassName)[0];
        this.waveCanvasElem = document.getElementsByClassName(this.waveCanvas.state.generatedClassName)[0];

        this.initElementHeight();
        this.initCanvas();
        this.initApi();
    };

    Scroll.prototype.componentWillUpdate = function componentWillUpdate(nextProps) {
        var children = nextProps.children;

        if (children) {
            this.prevScrollHeight = this.totalScrollHeight;
            this.nextItemCount = children.size;
        }
    };

    Scroll.prototype.componentDidUpdate = function componentDidUpdate() {
        this.initElementHeight();
        if (this.state.dragging) {
            document.addEventListener('mousemove', this.scrollBarMouseMove);
            document.addEventListener('mouseup', this.scrollBarMouseUp);
        } else {
            document.removeEventListener('mousemove', this.scrollBarMouseMove);
            document.removeEventListener('mouseup', this.scrollBarMouseUp);
        }
        if (this.nextItemCount > this.prevItemCount) {
            this.prevItemCount = this.nextItemCount;
            this.nextScrollHeight = this.totalScrollHeight;
            var offsetScrollHeight = this.nextScrollHeight - this.prevScrollHeight;
            this.setState({
                translateY: this.state.translateY - offsetScrollHeight,
                animationDuration: 0
            });
        }
    };

    // 初始化元素高度


    Scroll.prototype.initElementHeight = function initElementHeight() {
        this.contentHeight = this.contentElem.offsetHeight;
        this.wrapperHeight = this.wrapperElem.offsetHeight;
        this.wrapperWidth = this.wrapperElem.offsetWidth;
        this.totalScrollHeight = this.contentHeight - this.wrapperHeight;
        if (this.totalScrollHeight < 0) {
            this.totalScrollHeight = 0;
        }
    };

    // 初始化画布


    Scroll.prototype.initCanvas = function initCanvas() {
        this.topCanvasElem.width = 400;
        this.topCanvasElem.height = 400;
        this.topCanvasElem.style.width = '100px';
        this.topCanvasElem.style.height = '100px';
        this.topCanvasContext = this.topCanvasElem.getContext('2d');
        this.topCanvasContext.strokeStyle = '#fff';
        this.topCanvasContext.fillStyle = '#aaa';

        this.waveCanvasElem.width = this.wrapperWidth * 2;
        this.waveCanvasElem.height = 80;
        this.waveCanvasElem.style.width = this.wrapperWidth + 'px';
        this.waveCanvasElem.style.height = '40px';
        this.waveCanvasContext = this.waveCanvasElem.getContext('2d');
        this.waveCanvasContext.fillStyle = '#000';
        this.waveCanvasContext.globalAlpha = 0.1;
    };

    // 初始化接口


    Scroll.prototype.initApi = function initApi() {
        scrollApi.scrollToBottom = this.scrollToBottom;
        scrollApi.scrollToTop = this.scrollToTop;
        scrollApi.scrollOffset = this.scrollOffset;
        scrollApi.isBottom = this.isBottom;
        scrollApi.isTop = this.isTop;
        scrollApi.hideLoading = this.hideLoading;
    };

    return Scroll;
}(_react.Component);

exports.default = Scroll;
exports.scrollApi = scrollApi;