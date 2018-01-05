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
const Image = styled.img`
    max-width: 100%;
`;
class Album extends Component {
    constructor() {
        super();
        this.clickTimeout = null;
        this.clickNumber = 0;
        this.node = document.createElement('div');
        document.body.appendChild(this.node);
        this.close = this.close.bind(this);
        this.zoom  = this.zoom.bind(this);
    }
    close() {
        this.clickNumber++;
        if(this.clickNumber === 2) {
            this.clickNumber = 0;
            clearTimeout(this.clickTimeout);
            this.zoom();
            return;
        }
        this.clickTimeout = setTimeout(() => {
            this.clickNumber = 0;
            this.props.close();
        }, 200);
    }
    zoom() {
        console.log('zoom');
    }
    render() {
        const {visible, url} = this.props;
        return createPortal(
            <Wrapper
                onClick={this.close}
                ref={ref => this.wrapper = ref}
                visible={visible}>
                <Image src={url}/>
            </Wrapper>,
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