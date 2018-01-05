/**
 * Created by lvcy on 18-1-2.
 */
import React, {PureComponent} from 'react';
import classnames from 'classnames';
import {FileWrapper, FileAvatar, FileNickname, FileResend} from '../Theme/FileStyled';

class FileInfo extends PureComponent {
    render() {
        const data = this.props.data;
        return (
            <div>程序员哥哥还在开发中...</div>
        );
    }
}

class File extends PureComponent {
    constructor() {
        super();
        this.resendMessage = this.resendMessage.bind(this);
    }
    resendMessage() {
        this.props.resend(this.props.message);
    }
    render() {
        const {side, data, avatar, nickname, resend} = this.props.message;
        return (
            <FileWrapper className={classnames(`message_${side.toLowerCase()}`)}>
                {nickname && <FileNickname>{nickname}</FileNickname>}
                {avatar   && <FileAvatar src={avatar}/>}
                <FileInfo data={data}/>
                {resend === true && <FileResend onClick={this.resendMessage} className="message__resend"/>}
            </FileWrapper>
        );
    }
}
export default File;