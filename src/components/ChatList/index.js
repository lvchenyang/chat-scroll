/**
 * Created by lvcy on 17-12-29.
 */
import React, {PureComponent} from 'react';
import {connect} from 'react-redux';
import {messageAdd, messageDel} from '../../store/actions';
import Message from '../Message';
import Scroll, {scrollApi} from '../Scroll';
import Album from '../Album';
import Constant from '../../Constant';
import styled from 'styled-components';

const ChatListWrapper = styled.div`
    height: 100%;
    width: 100%;
    overflow: hidden;
    position: relative;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
`;
const api = {
    message: {},
    scrollToBottom: () => {},
    scrollToTop   : () => {}
};
class ChatList extends PureComponent {
    constructor() {
        super();
        this.state = {
            albumVisible: false,
            albumUrl    : ''
        };
        this.showAlbum = this.showAlbum.bind(this);
        this.hideAlbum = this.hideAlbum.bind(this);
        this.resend    = this.resend.bind(this);
    }
    render() {
        const {oldMessages, newMessages, onRefresh} = this.props;
        const list = oldMessages.reverse().concat(newMessages).toList();
        const images = list.filter(item => item.type === Constant.type.IMAGE);
        return (
            <ChatListWrapper style={this.props.style}>
                <Album visible={this.state.albumVisible} close={this.hideAlbum} url={this.state.albumUrl}/>
                <Scroll {...this.props} onRefresh={onRefresh || (() => {})}>
                    {list.map(item =><Message key={item.id} message={item} showAlbum={this.showAlbum} resend={this.resend}/>)}
                </Scroll>
            </ChatListWrapper>
        );
    }
    componentDidMount() {
        api.scrollToBottom = scrollApi.scrollToBottom;
        api.scrollToTop    = scrollApi.scrollToTop;
        api.scrollOffset   = scrollApi.scrollOffset;
        api.isBottom       = scrollApi.isBottom;
        api.isTop          = scrollApi.isTop;
        api.hideLoading    = scrollApi.hideLoading;

    }

    // 显示相册
    showAlbum(image) {
        this.setState({
            albumVisible: true,
            albumUrl    : image.data.url || image.data.blob
        });
    }

    // 关闭相册
    hideAlbum() {
        this.setState({
            albumVisible: false
        })
    }

    resend(message) {
        this.props.onResend && this.props.onResend(message);
    }
}


const mapReducerToProps = (dispatch, props) => {
    api.message.add = (message) => {
        return new Promise(resolve => {
            message.resolve = resolve;
            messageAdd(dispatch, message);
        })
    };
    api.message.del = (messageId) => {
        messageDel(dispatch, messageId);
    };
    return {
        ...props,
        messageAdd: api.message.add,
        messageDel: api.message.del
    }
};
const mapStateToProps = (state) => {
    return {
        oldMessages: state.messages.oldMessages,
        newMessages: state.messages.newMessages
    }
};
const ConnectedScroll = connect(mapStateToProps, mapReducerToProps)(ChatList);
export {ConnectedScroll as default, api};