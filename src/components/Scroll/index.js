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
        transform: `translate(0px, ${props.translateY}px) translateZ(0px)`,
        transitionDuration: `${props.duration}ms`
    })
})`
    display: flex;
    flex-direction: column;
    transition-property: transform;
    transition-timing-function: cubic-bezier(0.165, 0.84, 0.44, 1);
`;
const PullDown = styled.div.attrs({
    style: (props) => ({
        top: `${props.translateY< 0 ? -80 : props.translateY - 80}px`
    })
})`
    height: 80px;
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
    isTop         : () => {}
};
class Scroll extends Component {
    constructor() {
        super();
        this.state = {
            translateY: 0,
            animationDuration: 0,
            pullUpVisible: false
        };

        // 记录触摸开始和过程中的偏移量
        this.touchStartY   = 0;
        this.touchEndY     = 0;

        // 记录当前的偏移量，下次移动从当前偏移量开始
        this.currentOffset = 0;

        // 记录最终的偏移量
        this.targetOffset  = 0;

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
    }
    touchStart(e) {
        if(e.cancelable && !e.defaultPrevented) {
            e.preventDefault();
        }
        this.touchStartY   = e.targetTouches[0].screenY;
        this.currentOffset = this.state.translateY;
        this.setState({
            animationDuration: 0
        });
    }
    touchMove(e) {
        if(e.cancelable && !e.defaultPrevented) {
            e.preventDefault();
        }
        this.moving = true;


        this.distance = this.touchEndY - e.targetTouches[0].screenY;
        this.touchEndY = e.targetTouches[0].screenY;

        // 计算相对偏移量
        this.targetOffset = this.currentOffset + this.touchEndY - this.touchStartY;

        // 在顶部时，添加一定的阻尼
        if(this.targetOffset >= 2) {
            this.targetOffset = Math.cbrt(this.targetOffset * this.targetOffset);
            this.pullDownDraw();
        }

        // 在底部时，也添加一定的阻尼
        if(this.targetOffset + this.totalScrollHeight < 0) {
            this.targetOffset = 0 - this.totalScrollHeight;
            this.pullUpDraw(e.targetTouches[0].clientX);
            if(this.state.pullUpVisible === false) {
                this.setState({
                    pullUpVisible: true
                })
            }
        } else {
            this.setState({
                pullUpVisible: false
            })
        }

        this.setState({
            translateY: this.targetOffset
        });
    }
    touchEnd(e) {
        if(e.cancelable && !e.defaultPrevented) {
            e.preventDefault();
        }
        const moved = this.moving;
        this.moving = false;
        const translateY = this.state.translateY;
        if(translateY > 50) {
            this.setState({
                animationDuration: 500,
                translateY: 50
            }, () => {
                this.pullDownDraw();
            });
            setTimeout(() => {
                this.scrollToTop();
            }, 2000);
            return;
        }
        if(translateY > 0 && translateY < 50) {
            this.setState({
                animationDuration: 500
            }, () => {
                this.scrollToTop();
            });
            return;
        }


        const distance = moved ? this.distance : 0;

        const bottomY = this.wrapperHeight - this.contentHeight;
        let   targetY = this.state.translateY - distance * 20;
        targetY = targetY > bottomY ? targetY : bottomY;
        targetY = targetY > 0 ? 0 : targetY;

        this.setState({
            animationDuration: 1000,
            translateY: targetY,
            pullUpVisible: false
        });
        this.bottomCanvasContext.clearRect(0,0, this.wrapperWidth * 2, 80);
    }
    isBottom(offset = 40) {
        return this.totalScrollHeight+ this.state.translateY <offset;
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
    pullUpDraw(x) {
        this.bottomCanvasContext.clearRect(0,0, this.wrapperWidth * 2, 80);
        this.bottomCanvasContext.beginPath();
        this.bottomCanvasContext.moveTo(0, 80);
        this.bottomCanvasContext.quadraticCurveTo(x, 0, this.wrapperWidth * 2, 80);
        this.bottomCanvasContext.fill();

    }
    pullDownDraw() {
        this.topCanvasContext.clearRect(0, 0, 160, 160);
        this.topCanvasContext.lineWidth = 0;
        this.topCanvasContext.beginPath();
        const offset = 20 * 0.551915024494;
        let y = 110;
        let yOffset = 0;
        if(this.state.translateY >= 30) {
            yOffset = this.state.translateY - 30;
        }
        y = y - yOffset;
        this.topCanvasContext.moveTo(80, y);
        if(y > 90) {
            this.topCanvasContext.bezierCurveTo(80 + offset, y, 100, 130 - offset , 100, 130);
            this.topCanvasContext.bezierCurveTo(100, 130 + offset, 80 + offset, 150, 80, 150);
            this.topCanvasContext.bezierCurveTo(80 - offset, 150, 60, 130 + offset, 60, 130);
            this.topCanvasContext.bezierCurveTo(60, 130 - offset, 80 - offset, y, 80, y);
        } else {
            this.topCanvasContext.strokeStyle = '#aaa';
            this.topCanvasContext.bezierCurveTo(80 + offset, y, 100, 130 - yOffset - offset, 100, 130 - yOffset);
            this.topCanvasContext.bezierCurveTo(100, 130 - yOffset + offset, 80 + offset, 150 - yOffset, 80, 150 - yOffset);
            this.topCanvasContext.bezierCurveTo(80 - offset, 150 - yOffset, 60, 130 - yOffset + offset, 60, 130 - yOffset);
            this.topCanvasContext.bezierCurveTo(60, 130 - yOffset - offset, 80 - offset, y, 80, y);
        }
        this.topCanvasContext.fill();

        if(y <= 90) {
            this.topCanvasContext.lineWidth = 4;
            this.topCanvasContext.strokeStyle = '#fff';
            this.topCanvasContext.moveTo(95, 130 - yOffset);
            this.topCanvasContext.arc(80, 130 - yOffset, 15, 0, 1.8 * Math.PI);
            this.topCanvasContext.stroke();
        }

    }
    render() {
        const {translateY, animationDuration, pullUpVisible} = this.state;
        return (
            <Wrapper
                ref={ref => this.wrapper = ref}
                style={this.props.style}
                onTouchStart={this.touchStart.bind(this)}
                onTouchMove={this.touchMove.bind(this)}
                onTouchEnd={this.touchEnd.bind(this)}>
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
    }

    // 初始化画布
    initCanvas() {
        this.topCanvasElem.width = 160;
        this.topCanvasElem.height = 160;
        this.topCanvasElem.style.width = '80px';
        this.topCanvasElem.style.height = '80px';
        this.topCanvasContext = this.topCanvasElem.getContext('2d');
        this.topCanvasContext.strokeStyle = '#aaa';
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
        scrollApi.scrollToBottom = this.scrollToBottom.bind(this);
        scrollApi.scrollToTop    = this.scrollToTop.bind(this);
        scrollApi.isBottom       = this.isBottom.bind(this);
        scrollApi.isTop          = this.isTop.bind(this);
    }
}
export {Scroll as default, scrollApi};