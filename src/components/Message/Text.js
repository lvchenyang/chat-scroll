/**
 * Created by lvcy on 17-12-29.
 */
import React, {PureComponent} from 'react';
import {TextWrapper, TextNickname, TextAvatar, TextContent, TextResend} from '../Theme/TextStyled';
import classnames from 'classnames';

class Text extends PureComponent {
    constructor() {
        super();
        this.resendMessage = this.resendMessage.bind(this)
    }
    resendMessage() {
        this.props.resend(this.props.message);
    }
    render() {
        const message = this.props.message;
        const {side, avatar, nickname, data, resend} = this.props.message;
        return (
            <TextWrapper className={classnames(`message_${side.toLowerCase()}`)}>
                {nickname && <TextNickname className="message__nickname">{nickname}</TextNickname>}
                {avatar && <TextAvatar className="message__avatar" src={avatar}/>}
                <TextContent className={classnames('message__text', `message__text_${side.toLowerCase()}`)}>{data}</TextContent>
                {resend === true && <TextResend onClick={this.resendMessage} className="message__resend"/>}
            </TextWrapper>
        );
    }
    componentDidMount() {
        this.props.message.resolve();
    }
    componentDidUpdate() {
        console.log('update text');
    }
}
export default Text;