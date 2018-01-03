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
        top: `${props.translateY - 80}px`
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
            duration: 0
        };
        this.touchStartY   = 0;
        this.translateY    = 0;
        this.wrapper       = null;
        this.wrapperElem   = null;
        this.wrapperHeight = 0;
        this.content       = null;
        this.contentElem   = null;
        this.contentHeight = 0;
        this.canvas        = null;
        this.canvasElem    = null;
        this.canvasContext = null;
        this.moving         = false;
        this.scrollDistance = [0, 0];
    }
    touchStart(e) {
        if(e.cancelable && !e.defaultPrevented) {
            e.preventDefault();
        }
        const touch = e.targetTouches[0];
        this.touchStartY = touch.screenY;
        this.translateY = this.state.translateY;
        this.setState({
            duration: 0
        });
    }
    touchMove(e) {
        if(e.cancelable && !e.defaultPrevented) {
            e.preventDefault();
        }
        this.moving = true;
        if(this.scrollDistance[1] !== 0) {
            this.scrollDistance[0] = this.state.translateY;
            this.scrollDistance[1] = 0;
        } else {
            this.scrollDistance[1] = this.state.translateY;
        }
        const touch = e.targetTouches[0];
        const currentY = touch.screenY;
        let   relativeHeight = this.translateY + currentY - this.touchStartY;
        if(relativeHeight >= 2) {
            relativeHeight = Math.cbrt(relativeHeight * relativeHeight);
        }
        if(relativeHeight > 5) {
            this.pullDownDraw();
        }
        this.setState({
            translateY: relativeHeight
        });
    }
    touchEnd(e) {
        if(e.cancelable && !e.defaultPrevented) {
            e.preventDefault();
        }
        this.moving = false;
        if(this.state.translateY > 50) {
            setTimeout(() => {
                this.scrollToTop();
            }, 2000);
            return;
        }
        if(this.state.translateY > 0 && this.state.translateY < 50) {
            this.scrollToTop();
            return;
        }

        if(this.contentHeight - this.wrapperHeight + this.state.translateY < 0) {
            this.setState({
                duration: 1000
            }, () => {
                this.scrollToBottom();
            });

            return;
        }

        if(this.scrollDistance[1] === 0) {
            this.scrollDistance[1] = this.state.translateY;
        }
        if(this.scrollDistance[0] === 0) {
            this.scrollDistance[1] = 0;
        }
        const offset = this.scrollDistance[0] - this.scrollDistance[1];
        console.log(this.scrollDistance);
        const bottomY = this.wrapperHeight - this.contentHeight;
        let   targetY = this.state.translateY - offset * 40;
        targetY = targetY > bottomY ? targetY : bottomY;
        targetY = targetY > 0 ? 0 : targetY;
        this.setState({
            duration: 1000,
            translateY: targetY
        }, () => {
            this.scrollDistance = [0, 0];
        });
    }
    isBottom(offset = 40) {
        return this.contentHeight - this.wrapperHeight + this.state.translateY <=offset;
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
    pullDownDraw() {
        this.canvasContext.clearRect(0, 0, 160, 160);
        this.canvasContext.lineWidth = 0;
        this.canvasContext.beginPath();
        const offset = 20 * 0.551915024494;
        let y = 110;
        let yOffset = 0;
        if(this.state.translateY >= 30) {
            yOffset = this.state.translateY - 30;
        }
        y = y - yOffset;
        this.canvasContext.moveTo(80, y);
        if(y > 90) {
            this.canvasContext.bezierCurveTo(80 + offset, y, 100, 130 - offset , 100, 130);
            this.canvasContext.bezierCurveTo(100, 130 + offset, 80 + offset, 150, 80, 150);
            this.canvasContext.bezierCurveTo(80 - offset, 150, 60, 130 + offset, 60, 130);
            this.canvasContext.bezierCurveTo(60, 130 - offset, 80 - offset, y, 80, y);
        } else {
            this.canvasContext.strokeStyle = '#aaa';
            this.canvasContext.bezierCurveTo(80 + offset, y, 100, 130 - yOffset - offset, 100, 130 - yOffset);
            this.canvasContext.bezierCurveTo(100, 130 - yOffset + offset, 80 + offset, 150 - yOffset, 80, 150 - yOffset);
            this.canvasContext.bezierCurveTo(80 - offset, 150 - yOffset, 60, 130 - yOffset + offset, 60, 130 - yOffset);
            this.canvasContext.bezierCurveTo(60, 130 - yOffset - offset, 80 - offset, y, 80, y);
        }
        this.canvasContext.fill();
        this.canvasContext.stroke();
        if(y <= 90) {
            this.canvasContext.lineWidth = 4;
            this.canvasContext.strokeStyle = '#fff';
            this.canvasContext.moveTo(95, 130 - yOffset);
            this.canvasContext.arc(80, 130 - yOffset, 15, 0, 1.8 * Math.PI);
            this.canvasContext.stroke();
        }

    }
    render() {
        const {translateY, duration} = this.state;
        return (
            <Wrapper
                ref={ref => this.wrapper = ref}
                style={this.props.style}
                onTouchStart={this.touchStart.bind(this)}
                onTouchMove={this.touchMove.bind(this)}
                onTouchEnd={this.touchEnd.bind(this)}>
                <PullDown translateY={translateY}>
                    <PullDownCanvas ref={ref => this.canvas = ref}/>
                </PullDown>
                <Content translateY={translateY} duration={duration} ref={ref => this.content = ref}>
                    {this.props.children}
                </Content>
            </Wrapper>
        );
    }
    componentDidMount() {
        this.contentElem = document.getElementsByClassName(this.content.state.generatedClassName)[0];
        this.wrapperElem = document.getElementsByClassName(this.wrapper.state.generatedClassName)[0];
        this.canvasElem  = document.getElementsByClassName(this.canvas.state.generatedClassName)[0];
        this.canvasElem.width = 160;
        this.canvasElem.height = 160;
        this.canvasElem.style.width = '80px';
        this.canvasElem.style.height = '80px';
        this.canvasContext = this.canvasElem.getContext('2d');
        this.canvasContext.strokeStyle = '#aaa';
        this.canvasContext.fillStyle   = '#aaa';
        scrollApi.scrollToBottom = this.scrollToBottom.bind(this);
        scrollApi.scrollToTop    = this.scrollToTop.bind(this);
        scrollApi.isBottom       = this.isBottom.bind(this);
        scrollApi.isTop          = this.isTop.bind(this);
    }
    componentDidUpdate() {
        this.contentHeight = this.contentElem.offsetHeight;
        this.wrapperHeight = this.wrapperElem.offsetHeight;
    }
}
export {Scroll as default, scrollApi};