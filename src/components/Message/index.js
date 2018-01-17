/**
 * Created by lvcy on 17-12-29.
 */
import React, {PureComponent} from 'react';
import Text from './Text';
import Image from './Image';
import File from './File';
import Video from './Video';
import Voice from './Voice';
import System from './System';
import Time from './Time';
import CustomComponent from './CustomComponent';

import Constant from '../../Constant';
import styled, {injectGlobal} from 'styled-components';

injectGlobal`
    .message__avatar {
        height: 36px;
        width: 36px;
        border-radius: 4px;
    }
    .message_left {
        flex-direction: row;
        margin-right: 50px;
    }
    .message_right {
        flex-direction: row-reverse;
        margin-left: 50px;
    }
    .message__text {
        min-height: 36px;
        line-height: 20px;
        padding: 8px 15px;
        border-radius: 18px;
        word-break: break-all;
        white-space: pre-wrap;
        text-align: justify;
    }
    .message__text_right {
        background-color: #FC5D60;
        border-top-right-radius: 4px;
        color: #fff;
        margin-right: 10px;
    }
    .message__text_left {
        background-color: #fff;
        border-top-left-radius: 4px;
        margin-left: 10px;
    }
    .message__image_right{
        margin-right: 10px;
    }
    .message__image_left {
        margin-left: 10px;
    }
    .message__system {
        font-size: 12px;
        min-height: 26px;
        padding: 3px 6px;
        background: rgba(0, 0, 0, .1);
        border-radius: 3px;
    }
    .message__time {
        font-size: 12px;
    }
`;

const Wrapper = styled.div`
    min-height: 36px;
    margin: 5px 0;
    padding: 0 10px;
`;
class Message extends PureComponent {
    wrapper(C) {
        return (
            <Wrapper className="message"><C {...this.props}/></Wrapper>
        );
    }
    render() {
        const {message} = this.props;
        const {TEXT, IMAGE, FILE, VIDEO, VOICE, SYSTEM, TIME, COMPONENT} = Constant.type;
        switch (message.type) {
            case TEXT:
                return this.wrapper(Text);
            case IMAGE:
                return this.wrapper(Image);
            case FILE:
                return this.wrapper(File);
            case VIDEO:
                return this.wrapper(Video);
            case VOICE:
                return this.wrapper(Voice);
            case SYSTEM:
                return this.wrapper(System);
            case TIME:
                return this.wrapper(Time);
            case COMPONENT:
                return this.wrapper(CustomComponent);
            default:
                return <div>{message.type}</div>
        }
    }
}
export default Message;