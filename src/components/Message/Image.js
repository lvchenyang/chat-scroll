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
        let src = data.url || data.blob;
        if(src === '') {
            src = ''
        }
        return (
            <ImageWrapper className={classnames(`message_${side.toLowerCase()}`)}>
                {nickname && <ImageNickname className="message__nickname">{nickname}</ImageNickname>}
                {avatar && <ImageAvatar className="message__avatar" src={avatar}/>}
                <ImageSection onClick={this.imageClick.bind(this)} className={classnames('message__image', `message__image_${side.toLowerCase()}`)}>
                    <ImageContent ref={ref => this.img = ref} src={src}/>
                </ImageSection>
                {resend === true && <ImageResend onClick={this.resendMessage} className="message__resend"/>}
            </ImageWrapper>
        );
    }
    componentDidMount() {
        const imgElem = document.getElementsByClassName(this.img.state.generatedClassName)[0];
        imgElem.addEventListener('load', () => {
            this.props.message.resolve();
        }, false);
    }
    componentDidUpdate() {
        console.log('update image');
    }
}
export default Image;