/**
 * Created by lvcy on 17-12-29.
 */

import React, {Component} from 'react';
import styled from 'styled-components';
const Wrapper = styled.div`
    height: 600px;
    width : 100%;
    overflow: hidden;
`;
const Content = styled.div`
    display: flex;
    flex-direction: column;
    transition-property: transform;
    transition-timing-function: cubic-bezier(0.165, 0.84, 0.44, 1);
    transition-duration: 0ms;
    transform: translate(0px, ${props => props.translateY}px) translateZ(0px);
`;
class Scroll extends Component {
    constructor() {
        super();
        this.state = {
            translateY: 0
        };
        this.touchStartY = 0;
    }
    touchStart(e) {
        const touch = e.targetTouches[0];
        this.touchStartY = touch.screenY;
    }
    touchMove(e) {
        const touch = e.targetTouches[0];
        const currentY = touch.screenY;
        this.setState({
            translateY: currentY - this.touchStartY
        })
    }
    touchEnd(e) {

    }
    render() {
        const {translateY} = this.state;
        return (
            <Wrapper>
                <Content
                    translateY={translateY}
                    onTouchStart={this.touchStart.bind(this)}
                    onTouchMove={this.touchMove.bind(this)}
                    onTouchEnd={this.touchEnd.bind(this)}
                >
                    {this.props.children}
                </Content>
            </Wrapper>
        );
    }
}
export default Scroll;