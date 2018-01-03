/**
 * Created by lvcy on 17-12-29.
 */
import React, {PureComponent} from 'react';
import styled, {injectGlobal} from 'styled-components';
import classnames from 'classnames';
const Wrapper  = styled.div`
    display: flex;
    position: relative;
`;
const Nickname = styled.div``;
const Avatar   = styled.img`
    height: 40px;
    width: 40px;
`;
const Content  = styled.pre`
    margin: 0;
    height: 40px;
    padding: 10px;
    line-height: 20px;
    position: relative;
`;
const Resend   = styled.div``;

class Text extends PureComponent {
    render() {
        const message = this.props.message;
        const {side, avatar, nickname, data} = this.props.message;
        return (
            <Wrapper className={classnames(`message_${side.toLowerCase()}`)}>
                {nickname && <Nickname className="message__nickname">{nickname}</Nickname>}
                {avatar && <Avatar className="message__avatar" src={avatar}/>}
                <Content className={classnames('message__text', `message__text_${side.toLowerCase()}`)}>{data}</Content>
                <Resend className="message__resend"/>
            </Wrapper>
        );
    }
    componentDidUpdate() {
        console.log('update text');
    }
}
export default Text;