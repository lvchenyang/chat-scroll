/**
 * Created by lvcy on 17-12-29.
 */

import React, {Component} from 'react';
import styled from 'styled-components';
import Message from '../Message';
const Wrapper = styled.div`
    height: 100%;
    width : 100%;
    overflow: hidden;
    position: relative;
    box-sizing: border-box;
    flex: 1 1 auto;
    & * {
        box-sizing: border-box;
    }
`;
const Content = styled.div.attrs({
    style: (props) => ({
        transform: `translate3d(0, ${props.translateY}px, 0)`,
        transitionDuration: `${props.duration}ms`
    })
})`
    display: flex;
    flex-direction: column;
    transition-property: transform;
    transition-timing-function: cubic-bezier(.24,.68,.32,.88);
`;
const PullDown = styled.div.attrs({
    style: (props) => ({
        top: `${props.translateY< 0 ? -100 : props.translateY - 100}px`
    })
})`
    height: 100px;
    left: 0;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
`;

const PullDownCanvas = styled.canvas`
    position: absolute;
    left: 50%;
    top: 0;
    transform: translateX(-50%);
`;
const WaveContainer = styled.div.attrs({
    style: (props) => ({
        display: props.visible ? 'block' : 'none',
        bottom : props.position === 'top' ? 'auto' : 0,
        top    : props.position === 'bottom' ? 'auto' : 0
    })
})`
    height: 40px;
    left: 0;
    position: absolute;
    width: 100%;
`;
const WaveCanvas = styled.canvas`
    position: absolute;
    left: 0;
    top: 0;
`;
const ScrollBarWrapper = styled.div.attrs({
    style: (props) => ({
        display: `${props.visible ? 'block' : 'none'}`,
        height: `${props.wrapperHeight}px`
    })
})`
    position: absolute;
    width: 6px;
    top: 0;
    right: 2px;
`;
const ScrollBarDrager = styled.div.attrs({
    style: (props) => ({
        height: `${props.barHeight}px`,
        top: `${props.barTop}px`,
        transitionDuration: `${props.duration}ms`,
        background: 'rgba(155,155,155,.4)'
    })
})`
    position: absolute;
    right: 0;
    width: 6px;
    border-radius: 3px;
    cursor: pointer;
`;

const scrollApi = {
    scrollToBottom: () => {},
    scrollToTop   : () => {},
    isBottom      : () => {},
    isTop         : () => {},
    hideLoading   : () => {}
};
class Scroll extends Component {
    constructor() {
        super();
        this.state = {
            translateY: 0,
            animationDuration: 0,
            waveContainerVisible: false,
            dragging: false,
            wavePosition: 'bottom'
        };


        // Scroll容器
        this.wrapper       = null;
        this.wrapperElem   = null;
        this.wrapperHeight = 0;
        this.wrapperWidth  = 0;

        // Scroll内容
        this.content       = null;
        this.contentElem   = null;
        this.contentHeight = 0;

        this.scrollBar = null;

        // 顶部画布
        this.topCanvas        = null;
        this.topCanvasElem    = null;
        this.topCanvasContext = null;

        // 底端画布
        this.waveCanvas        = null;
        this.waveCanvasElem    = null;
        this.waveCanvasContext = null;

        // 用于记录是否在移动中
        this.moving            = false;
        this.totalScrollHeight = 0;
        this.distance          = 0;

        this.touchClientX      = 0;
        this.touchClientY      = 0;
        this.touchDeltaY       = null;

        this.scrollOffsetY = 0;
        this.scrollToTopTimer = null;
        this.scrollToBottomTimer = null;
        this.prevItemCount    = 0;
        this.nextItemCount    = 0;
        this.prevScrollHeight = 0;
        this.nextScrollHeight = 0;

        this.touchStart     = this.touchStart.bind(this);
        this.touchMove      = this.touchMove.bind(this);
        this.touchEnd       = this.touchEnd.bind(this);
        this.scrollToBottom = this.scrollToBottom.bind(this);
        this.scrollToTop    = this.scrollToTop.bind(this);
        this.scrollOffset   = this.scrollOffset.bind(this);
        this.isBottom       = this.isBottom.bind(this);
        this.isTop          = this.isTop.bind(this);
        this.hideLoading    = this.hideLoading.bind(this);
        this.mouseWheel     = this.mouseWheel.bind(this);

        this.scrollBarMouseDown  = this.scrollBarMouseDown.bind(this);
        this.scrollBarMouseMove  = this.scrollBarMouseMove.bind(this);
        this.scrollBarMouseUp    = this.scrollBarMouseUp.bind(this);
    }
    touchStart(e) {
        this.touchClientX = e.targetTouches[0].clientX;
        this.touchClientY = e.targetTouches[0].clientY;
        this.touchDeltaY = this.touchClientY;
        this.setState({
            animationDuration: 0
        });
    }
    touchMove(e) {
        if(e.cancelable && !e.defaultPrevented) {
            e.preventDefault();
        }
        this.moving = true;
        this.touchClientX = e.targetTouches[0].clientX;
        this.touchClientY = e.targetTouches[0].clientY;
        const distance = this.touchDeltaY - this.touchClientY;
        this.touchDeltaY = this.touchClientY;

        this.distance = distance;

        // 在顶部上拉或下拉
        if(this.state.translateY >= 0) {
            this.pullDown(distance);
            return;
        }
        // 在底部往上拉
        if(distance > 0 && this.state.translateY + this.totalScrollHeight <= 0) {
            this.pullUp(distance);
            return;
        }
        let offset = this.state.translateY - distance;

        if(offset > 0) {
            offset = 0;
        }
        if(offset < 0 - this.totalScrollHeight) {
            offset = 0 - this.totalScrollHeight;
        }
        this.setState({
            translateY: offset,
            waveContainerVisible: false
        })
    }

    touchEnd(e) {
        const distance = this.moving ? this.distance : 0;
        this.moving = false;

        if(this.state.translateY === 100) {
            this.props.onRefresh && this.props.onRefresh();
            return;
        }

        let offset = this.state.translateY - distance * 20;
        if(offset === 100) {
            return;
        }
        if(offset > 0) {
            offset = 0;
        }
        if(offset < 0 - this.totalScrollHeight) {
            offset = 0 - this.totalScrollHeight;
        }
        let duration = 1000;
        if(Math.abs(offset - this.state.translateY) < 500) {
            duration = 300;
        }
        this.setState({
            translateY: offset,
            animationDuration: duration,
            waveContainerVisible: false
        });
    }
    mouseWheel(e) {
        const {deltaX, deltaY} = e;
        const distance = deltaY - deltaX;
        let offset = this.state.translateY - distance;
        if(offset > 0) {
            offset = 0;
        }
        if(offset < 0 - this.totalScrollHeight) {
            offset = 0 - this.totalScrollHeight;
        }
        // 滚动到了最顶部
        if(offset === 0) {
            clearTimeout(this.scrollToTopTimer);
            this.scrollToTopTimer = setTimeout(() => {
                if(this.props.onScrollTop) {
                    this.props.onScrollTop();
                }
            }, 100);
        }
        // 滚动到了最底部
        if(offset + this.totalScrollHeight === 0 && offset < 0) {
            clearTimeout(this.scrollToBottomTimer);
            this.scrollToBottomTimer = setTimeout(() => {
                if(this.props.onScrollBottom) {
                    this.props.onScrollBottom();
                }
            }, 100);
        }
        this.setState({
            translateY: offset,
            animationDuration: 0,
            waveContainerVisible: false
        })
    }
    pullDown(distance) {
        if(this.props.canRefresh) {
            let offset = this.state.translateY - distance;
            if(offset > 100) {
                offset = 100;
            }
            this.setState({
                translateY: offset,
            }, () => {
                this.drawTopLoading();
            });
        } else {

            let offset = this.state.translateY - distance;
            if(offset > 0) {
                offset = 0;
            }

            this.setState({
                translateY: offset,
                waveContainerVisible: this.props.topWave !== false
            }, () => {
                if(this.props.topWave === false) {
                    return;
                }
                this.drawWave('top');
            });
        }
    }
    drawTopLoading() {
        const context = this.topCanvasContext;
        const offset = this.state.translateY;
        if(offset < 0) {
            return;
        }

        context.clearRect(0, 0, 400, 400);
        context.beginPath();
        const centralY = 400 - 2 * offset;
        const cycleMid   = {x: 200, y: centralY, r: 0};
        const cycleLeft  = {x: 0,   y: centralY, r: 0};
        const cycleRight = {x: 0,   y: centralY, r: 0};
        if(offset < 30) {
            cycleMid.r = offset;
        } else if(offset >= 30 && offset < 50) {
            cycleMid.r = 30;
        } else if(offset >= 50 && offset < 80) {
            cycleLeft.x  = 200 - (50 - offset);
            cycleRight.x = 200 + (50 - offset);
            cycleLeft.r  = cycleRight.r = 20- (80 - offset) * 2 / 3;
            cycleMid.r   = 20 + (80 - offset) / 3;
        } else {
            cycleLeft.x  = 200 - (50 - offset) * 2;
            cycleRight.x = 200 + (50 - offset) * 2;
            cycleMid.r   = cycleLeft.r  = cycleRight.r = 20;
        }
        context.arc(cycleMid.x, cycleMid.y, cycleMid.r, 0, 2 * Math.PI);
        context.fill();
        context.arc(cycleLeft.x, cycleLeft.y, cycleLeft.r, 0, 2 * Math.PI);
        context.fill();
        context.arc(cycleRight.x, cycleRight.y, cycleRight.r, 0, 2 * Math.PI);
        context.fill();
    }
    hideLoading(delay = 500) {
        if(this.state.translateY <=0 || this.moving) {
            return;
        }
        this.setState({
            translateY: 0,
            animationDuration: delay
        });
    }
    pullUp(distance) {
        this.setState({
            waveContainerVisible: this.props.bottomWave !== false
        }, () => {
            if(this.props.bottomWave === false) {
                return;
            }
            this.drawWave('bottom');
        })
    }
    isBottom(offset = 40) {
        return this.totalScrollHeight+ this.state.translateY <= offset;
    }
    isTop() {
        return this.state.translateY === 0;
    }
    getProcess() {
        return 0 - (this.state.translateY /  this.totalScrollHeight);
    }
    scrollToBottom(duration) {
        if(this.moving) {
            return;
        }
        this.initElementHeight();
        if(this.wrapperHeight > this.contentHeight) {
            this.scrollToTop();
            return;
        }
        this.setState({
            translateY: this.wrapperHeight - this.contentHeight,
            animationDuration: duration || 0
        })
    }
    scrollToTop(duration) {
        if(this.moving) {
            return;
        }
        const prevDuration = this.state.animationDuration;
        this.setState({
            translateY: 0,
            animationDuration: duration || 0
        }, () => {
            this.setState({
                animationDuration: prevDuration
            })
        })
    }
    scrollOffset(offset, duration) {
        if(this.moving) {
            return;
        }
        const prevDuration = this.state.animationDuration;
        offset = this.state.translateY + offset;
        if(offset > 0) {
            offset = 0;
        }
        if(offset < 0 - this.totalScrollHeight) {
            offset = 0 - this.totalScrollHeight;
        }
        this.setState({
            translateY: offset,
            animationDuration: duration
        }, () => {
            this.setState({
                animationDuration: prevDuration
            })
        })


    }
    drawWave(type) {
        const x = this.touchClientX;
        this.waveCanvasContext.clearRect(0,0, this.wrapperWidth * 2, 80);
        this.waveCanvasContext.beginPath();
        if(type === 'bottom') {
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

    }
    scrollBarMouseDown(e) {
        if(e.cancelable && !e.defaultPrevented) {
            e.preventDefault();
        }
        e.stopPropagation();
        this.scrollOffsetY = e.clientY - this.getProcess() * this.wrapperHeight;
        this.setState({
            dragging: true
        })
    }
    scrollBarMouseMove(e) {
        if(this.state.dragging === false) {
            return;
        }
        if(e.cancelable && !e.defaultPrevented) {
            e.preventDefault();
        }
        e.stopPropagation();
        const clientY = e.clientY;
        const relativeClientY = clientY - this.scrollOffsetY;
        let offset = relativeClientY * this.totalScrollHeight / (0 - this.wrapperHeight);
        if(offset > 0) {
            offset = 0;
        }
        if(offset < 0 - this.totalScrollHeight) {
            offset = 0 - this.totalScrollHeight;
        }
        // 滚动到了最顶部
        if(offset === 0) {
            clearTimeout(this.scrollToTopTimer);
            this.scrollToTopTimer = setTimeout(() => {
                if(this.props.onScrollTop) {
                    this.props.onScrollTop();
                }
            }, 100);
        }
        // 滚动到了最底部
        if(offset === this.totalScrollHeight && offset > 0) {
            clearTimeout(this.scrollToBottomTimer);
            this.scrollToBottomTimer = setTimeout(() => {
                if(this.props.onScrollBottom) {
                    this.props.onScrollBottom();
                }
            }, 100);
        }
        this.setState({
            translateY: offset
        });
    }
    scrollBarMouseUp(e) {
        if(this.state.dragging === false) {
            return;
        }
        if(e.cancelable && !e.defaultPrevented) {
            e.preventDefault();
        }
        e.stopPropagation();
        this.setState({
            dragging: false
        });
    }
    render() {
        const {translateY, animationDuration, waveContainerVisible, wavePosition} = this.state;
        const {scrollBar, children} = this.props;
        const process = this.getProcess();
        const scrollBarHeight = 80;
        const scrollBarTop    = (this.wrapperHeight - scrollBarHeight) * process;
        const showScrollBar = this.wrapperHeight - this.contentHeight < 0 && scrollBar;
        return (
            <Wrapper
                ref={ref => this.wrapper = ref}
                className={this.props.className}
                onTouchStart={this.touchStart}
                onTouchMove={this.touchMove}
                onTouchEnd={this.touchEnd}
                onWheel={this.mouseWheel}>
                <PullDown translateY={translateY}>
                    <PullDownCanvas ref={ref => this.topCanvas = ref}/>
                </PullDown>
                <Content translateY={translateY} duration={animationDuration} ref={ref => this.content = ref}>
                    {children}
                </Content>
                <WaveContainer visible={waveContainerVisible} position={wavePosition}>
                    <WaveCanvas ref={ref => this.waveCanvas = ref}/>
                </WaveContainer>
                <ScrollBarWrapper visible={showScrollBar} wrapperHeight={this.wrapperHeight}>
                    <ScrollBarDrager
                        ref={ref=> this.scrollBar = ref}
                        barTop={scrollBarTop}
                        barHeight={scrollBarHeight}
                        duration={animationDuration}
                        onMouseDown={this.scrollBarMouseDown}
                    />
                </ScrollBarWrapper>
            </Wrapper>
        );
    }
    componentDidMount() {
        this.contentElem = document.getElementsByClassName(this.content.state.generatedClassName)[0];
        this.wrapperElem = document.getElementsByClassName(this.wrapper.state.generatedClassName)[0];
        this.topCanvasElem  = document.getElementsByClassName(this.topCanvas.state.generatedClassName)[0];
        this.waveCanvasElem = document.getElementsByClassName(this.waveCanvas.state.generatedClassName)[0];

        this.initElementHeight();
        this.initCanvas();
        this.initApi();
    }
    componentWillUpdate(nextProps) {
        const {children} = nextProps;
        if(children) {
            this.prevScrollHeight = this.totalScrollHeight;
            this.nextItemCount = children.size;
        }
    }
    componentDidUpdate() {
        this.initElementHeight();
        if(this.state.dragging) {
            document.addEventListener('mousemove', this.scrollBarMouseMove);
            document.addEventListener('mouseup', this.scrollBarMouseUp);
        } else {
            document.removeEventListener('mousemove', this.scrollBarMouseMove);
            document.removeEventListener('mouseup', this.scrollBarMouseUp);
        }
        if(this.nextItemCount > this.prevItemCount) {
            this.prevItemCount = this.nextItemCount;
            this.nextScrollHeight = this.totalScrollHeight;
            const offsetScrollHeight = this.nextScrollHeight - this.prevScrollHeight;
            this.setState({
                translateY: this.state.translateY - offsetScrollHeight,
                animationDuration: 0
            });
        }
    }

    // 初始化元素高度
    initElementHeight() {
        this.contentHeight = this.contentElem.offsetHeight;
        this.wrapperHeight = this.wrapperElem.offsetHeight;
        this.wrapperWidth  = this.wrapperElem.offsetWidth;
        this.totalScrollHeight = this.contentHeight - this.wrapperHeight;
        if(this.totalScrollHeight < 0) {
            this.totalScrollHeight = 0;
        }
    }

    // 初始化画布
    initCanvas() {
        this.topCanvasElem.width = 400;
        this.topCanvasElem.height = 400;
        this.topCanvasElem.style.width = '100px';
        this.topCanvasElem.style.height = '100px';
        this.topCanvasContext = this.topCanvasElem.getContext('2d');
        this.topCanvasContext.strokeStyle = '#fff';
        this.topCanvasContext.fillStyle   = '#aaa';

        this.waveCanvasElem.width = this.wrapperWidth * 2;
        this.waveCanvasElem.height = 80;
        this.waveCanvasElem.style.width = this.wrapperWidth + 'px';
        this.waveCanvasElem.style.height = '40px';
        this.waveCanvasContext = this.waveCanvasElem.getContext('2d');
        this.waveCanvasContext.fillStyle   = '#000';
        this.waveCanvasContext.globalAlpha = 0.1;
    }

    // 初始化接口
    initApi() {
        scrollApi.scrollToBottom = this.scrollToBottom;
        scrollApi.scrollToTop    = this.scrollToTop;
        scrollApi.scrollOffset   = this.scrollOffset;
        scrollApi.isBottom       = this.isBottom;
        scrollApi.isTop          = this.isTop;
        scrollApi.hideLoading    = this.hideLoading;
    }
}
export {Scroll as default, scrollApi};