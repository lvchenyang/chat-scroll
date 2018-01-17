/**
 * Created by lvcy on 18-1-4.
 */
import React, {Component} from 'react';
import {createPortal} from 'react-dom';
import styled from 'styled-components';
const Wrapper = styled.div.attrs({
    style: (props) => ({
        display: props.visible ? 'flex' : 'none'
    })
})`
    position: fixed;
    left: 0;
    top: 0;
    bottom: 0;
    right: 0;
    width: 100%;
    height: 100%;
    background: #000;
    z-index: 1000;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    overflow: hidden;
`;
const Image = styled.img.attrs({
    style: (props) => ({
        transform: `scale(${props.imageScale}) translate(${props.offsetX}px, ${props.offsetY}px)`
    })
})`
    max-width: 100%;
`;
class Container extends Component {
    constructor() {
        super();
        this.clickTimeout = null;
        this.clickNumber = 0;
        this.clickEvt = this.clickEvt.bind(this);
        this.zoom = this.zoom.bind(this);

        this.mouseDown = this.mouseDown.bind(this);
        this.mouseMove = this.mouseMove.bind(this);
        this.mouseUp = this.mouseUp.bind(this);
        this.touchStart = this.touchStart.bind(this);
        this.touchMove  = this.touchMove.bind(this);
        this.touchEnd = this.touchEnd.bind(this);

        this.state = {
            scale: 1,
            dragging: false,
            touching: false,
            offsetX : 0,
            offsetY : 0
        };
        this.dragStartX = 0;
        this.dragStartY = 0;
        this.dragEndX   = 0;
        this.dragEndY   = 0;
        this.draged = false;
    }
    clickEvt() {
        if(this.draged) {
            this.draged = false;
            return;
        }
        this.clickNumber++;
        if(this.clickNumber === 2) {
            this.clickNumber = 0;
            clearTimeout(this.clickTimeout);
            this.zoom();
            return;
        }
        this.clickTimeout = setTimeout(() => {
            this.clickNumber = 0;
            this.setState({
                scale: 1,
                dragging: false,
                touching: false,
                offsetX : 0,
                offsetY : 0
            });
            this.props.close();
        }, 500);
    }
    touchStart(e) {
        this.setState({
            touching: true
        });
        e = e.targetTouches[0];
        this.dragStartX = e.clientX;
        this.dragStartY = e.clientY;
    }
    touchMove(e) {
        this.draged = true;
        if(this.state.touching === false) {
            return;
        }
        if(e.cancelable && !e.defaultPrevented) {
            e.preventDefault();
        }
        e.stopPropagation();
        e = e.targetTouches[0];
        const {clientX, clientY} = e;
        const {scale} = this.state;
        this.setState({
            offsetX: this.dragEndX + (clientX  - this.dragStartX) / scale,
            offsetY: this.dragEndY + (clientY  - this.dragStartY) / scale
        })
    }
    touchEnd(e) {
        if(this.state.touching === false) {
            return;
        }
        this.setState({
            touching: false
        });
        this.dragEndX = this.state.offsetX;
        this.dragEndY = this.state.offsetY;
    }
    mouseDown(e) {
        if(e.cancelable && !e.defaultPrevented) {
            e.preventDefault();
        }
        e.stopPropagation();
        this.setState({
            dragging: true
        });
        this.dragStartX = e.clientX;
        this.dragStartY = e.clientY;
    }
    mouseMove(e) {
        this.draged = true;
        if(this.state.dragging === false) {
            return;
        }
        if(e.cancelable && !e.defaultPrevented) {
            e.preventDefault();
        }
        e.stopPropagation();
        const {clientX, clientY} = e;
        const {scale} = this.state;
        this.setState({
            offsetX: this.dragEndX + (clientX  - this.dragStartX) / scale,
            offsetY: this.dragEndY + (clientY  - this.dragStartY) / scale
        })
    }
    mouseUp(e) {
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
        this.dragEndX = this.state.offsetX;
        this.dragEndY = this.state.offsetY;
    }
    zoom() {
        this.setState({
            scale: this.state.scale === 1 ? 2 : 1
        })
    }
    render() {
        const {visible, url} = this.props;
        const {offsetX, offsetY} = this.state;
        return (
            <Wrapper
                onClick={this.clickEvt}
                ref={ref => this.wrapper = ref}
                visible={visible}>
                <Image
                    imageScale={this.state.scale}
                    offsetX={offsetX}
                    offsetY={offsetY}
                    src={url}
                    onMouseDown={this.mouseDown}
                    onTouchStart={this.touchStart}
                    onTouchMove={this.touchMove}
                    onTouchEnd={this.touchEnd}
                />
            </Wrapper>
        );
    }
    componentDidUpdate() {
        if(this.state.dragging) {
            document.body.addEventListener('mousemove', this.mouseMove);
            document.body.addEventListener('mouseup', this.mouseUp);
        } else {
            document.body.removeEventListener('mousemove', this.mouseMove);
            document.body.removeEventListener('mouseup', this.mouseUp);
        }
    }
}
class Album extends Component {
    constructor() {
        super();
        this.node = document.createElement('div');
        document.body.appendChild(this.node);
        this.close = this.close.bind(this);

    }
    close() {
        this.props.close();
    }
    render() {
        return createPortal(
            <Container {...this.props} close={this.close}/>,
            this.node);
    }
    shouldComponentUpdate(nextProps) {
        return this.props.visible !== nextProps.visible;
    }
    componentWillUnmount() {
        window.document.body.removeChild(this.node);
    }
}

export default Album;