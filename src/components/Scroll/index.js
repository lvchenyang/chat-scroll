/**
 * Created by lvcy on 17-12-29.
 */

import React, {Component} from 'react';
import styled from 'styled-components';
const Wrapper = styled.div`
    height: 100%;
    width : 100%;
    overflow: hidden;
    position: relative;
    box-sizing: border-box;
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
const PullUp = styled.div.attrs({
    style: (props) => ({
        display: props.visible ? 'block' : 'none'
    })
})`
    height: 40px;
    left: 0;
    bottom: 0px;
    position: absolute;
    width: 100%;
`;
const PullUpCanvas = styled.canvas`
    position: absolute;
    left: 0;
    top: 0;
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
            pullUpVisible: false
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

        // 顶部画布
        this.topCanvas        = null;
        this.topCanvasElem    = null;
        this.topCanvasContext = null;

        // 底端画布
        this.bottomCanvas        = null;
        this.bottomCanvasElem    = null;
        this.bottomCanvasContext = null;

        // 用于记录是否在移动中
        this.moving            = false;
        this.totalScrollHeight = 0;
        this.distance          = 0;

        this.touchClientX      = 0;
        this.touchClientY      = 0;
        this.touchDeltaY       = null;

        this.cycleMagicNumber  = 0.551915024494;

        this.touchStart     = this.touchStart.bind(this);
        this.touchMove      = this.touchMove.bind(this);
        this.touchEnd       = this.touchEnd.bind(this);
        this.scrollToBottom = this.scrollToBottom.bind(this);
        this.scrollToTop    = this.scrollToTop.bind(this);
        this.isBottom       = this.isBottom.bind(this);
        this.isTop          = this.isTop.bind(this);
        this.hideLoading    = this.hideLoading.bind(this);
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
            pullUpVisible: false
        })
    }

    touchEnd(e) {
        const distance = this.moving ? this.distance : 0;
        this.moving = false;

        if(this.state.translateY === 100) {
            this.props.onRefresh();
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
            pullUpVisible: false
        });
    }
    pullDown(distance) {
        let offset = this.state.translateY - distance;
        if(offset > 100) {
            offset = 100;
        }
        this.setState({
            translateY: offset
        }, () => {
            this.drawLoading();
        });
    }
    drawLoading() {
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
            pullUpVisible: true
        }, () => {
            this.pullUpDraw();
        })
    }
    isBottom(offset = 40) {
        return this.totalScrollHeight+ this.state.translateY <= offset;
    }
    isTop() {
        return this.state.translateY === 0;
    }
    scrollToBottom() {
        if(this.moving) {
            return;
        }
        if(this.wrapperHeight > this.contentHeight) {
            this.scrollToTop();
            return;
        }
        this.setState({
            translateY: this.wrapperHeight - this.contentHeight
        })
    }
    scrollToTop() {
        if(this.moving) {
            return;
        }
        this.setState({
            translateY: 0
        })
    }
    pullUpDraw() {
        const x = this.touchClientX;
        this.bottomCanvasContext.clearRect(0,0, this.wrapperWidth * 2, 80);
        this.bottomCanvasContext.beginPath();
        this.bottomCanvasContext.moveTo(0, 80);
        this.bottomCanvasContext.quadraticCurveTo(x, 0, this.wrapperWidth * 2, 80);
        this.bottomCanvasContext.fill();
    }
    render() {
        const {translateY, animationDuration, pullUpVisible} = this.state;
        return (
            <Wrapper
                ref={ref => this.wrapper = ref}
                style={this.props.style}
                className={this.props.className}
                onTouchStart={this.touchStart}
                onTouchMove={this.touchMove}
                onTouchEnd={this.touchEnd}>
                <PullDown translateY={translateY}>
                    <PullDownCanvas ref={ref => this.topCanvas = ref}/>
                </PullDown>
                <Content translateY={translateY} duration={animationDuration} ref={ref => this.content = ref}>
                    {this.props.children}
                </Content>
                <PullUp visible={pullUpVisible}>
                    <PullUpCanvas ref={ref => this.bottomCanvas = ref}/>
                </PullUp>
            </Wrapper>
        );
    }
    componentDidMount() {
        this.contentElem = document.getElementsByClassName(this.content.state.generatedClassName)[0];
        this.wrapperElem = document.getElementsByClassName(this.wrapper.state.generatedClassName)[0];
        this.topCanvasElem  = document.getElementsByClassName(this.topCanvas.state.generatedClassName)[0];
        this.bottomCanvasElem = document.getElementsByClassName(this.bottomCanvas.state.generatedClassName)[0];
        this.initElementHeight();
        this.initCanvas();
        this.initApi();
    }
    componentDidUpdate() {
        this.initElementHeight();
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

        this.bottomCanvasElem.width = this.wrapperWidth * 2;
        this.bottomCanvasElem.height = 80;
        this.bottomCanvasElem.style.width = this.wrapperWidth + 'px';
        this.bottomCanvasElem.style.height = '40px';
        this.bottomCanvasContext = this.bottomCanvasElem.getContext('2d');
        this.bottomCanvasContext.fillStyle   = '#000';
        this.bottomCanvasContext.globalAlpha = 0.1;
    }

    // 初始化接口
    initApi() {
        scrollApi.scrollToBottom = this.scrollToBottom;
        scrollApi.scrollToTop    = this.scrollToTop;
        scrollApi.isBottom       = this.isBottom;
        scrollApi.isTop          = this.isTop;
        scrollApi.hideLoading    = this.hideLoading;
    }
}
export {Scroll as default, scrollApi};