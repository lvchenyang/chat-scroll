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
    .message_left: {
        flex-direction: row;
    }
    .message_right {
        flex-direction: row-reverse;
    }
    .message__text {
        border-radius: 3px;
    }
    .message__text_right {
        background-color: #b2e281;
        margin-right: 15px;
        z-index: 1;
        &:after {
            width: 10px;
            height: 10px;
            content: '';
            position: absolute;
            right: -1px;
            top: 50%;
            z-index: 0;
            background-color: #b2e281;
            transform: rotate(45deg) translateY(-50%);
        }
    }
    .message__text_left {
        background-color: #fff;
        margin-left: 15px;
        z-index: 1;
        &:after {
            width: 10px;
            height: 10px;
            content: '';
            position: absolute;
            left: -9px;
            top: 50%;
            z-index: 0;
            background-color: #fff;
            transform: rotate(45deg) translateY(-50%);
        }
    }
`;

const Wrapper = styled.div`
    height: 40px;
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