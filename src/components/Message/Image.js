/**
 * Created by lvcy on 17-12-29.
 */
import React, {PureComponent} from 'react';
import {ImageWrapper, ImageAvatar, ImageNickname, ImageResend, ImageContent, ImageSection} from '../Theme/ImageStyled';
import classnames from 'classnames';

class Image extends PureComponent {
    constructor() {
        super();
        this.resendMessage = this.resendMessage.bind(this);
    }
    imageClick() {
        this.props.showAlbum(this.props.message);
    }
    resendMessage() {
        this.props.resend(this.props.message);
    }
    render() {
        const {side, avatar, nickname, data, resend} = this.props.message;
        const src = data.url || data.blob;
        return (
            <ImageWrapper className={classnames(`message_${side.toLowerCase()}`)}>
                {nickname && <ImageNickname>{nickname}</ImageNickname>}
                {avatar && <ImageAvatar src={avatar}/>}
                <ImageSection onClick={this.imageClick.bind(this)} className={classnames('message__image', `message__image_${side.toLowerCase()}`)}>
                    <ImageContent src={src}/>
                </ImageSection>
                {resend === true && <ImageResend onClick={this.resendMessage} className="message__resend"/>}
            </ImageWrapper>
        );
    }
    componentDidUpdate() {
        console.log('update image');
    }
}
export default Image;