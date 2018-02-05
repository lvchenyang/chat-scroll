/**
 * Created by lvcy on 18-1-4.
 */
import {Wrapper, Avatar, Nickname, Resend, MessageContentWrapper} from './BaseStyled';
import styled from 'styled-components';
export const ImageWrapper  = Wrapper.extend``;
export const ImageAvatar   = Avatar.extend``;
export const ImageNickname = Nickname.extend``;
export const ImageResend   = Resend.extend``;
export const ImageSection  = styled.div`
    max-width: 120px;
    overflow: hidden;
    border-radius: 4px;
    position: relative;
`;
export const ImageContent  = styled.img`
    max-width: 100%;
    display: block;
`;
export const ImageUploadLoading = styled.div.attrs({
    style: (props) => ({
        height: `${props.loadingHeight}px`,
        display: `${props.visible ? 'flex' : 'none'}`
    })
})`
    position: absolute;
    width: 100%;
    background: rgba(0, 0, 0, .5);
    left: 0;
    top: 0;
    justify-content: center;
    align-items: center;
    &:before {
        content: url('//storage.360buyimg.com/jimi/resources/image-upload-loading.png');
        width: 26px;
        height: 30px;
    }
`;
export const ImageMessageContentWrapper = MessageContentWrapper.extend``;
