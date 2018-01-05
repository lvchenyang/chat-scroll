/**
 * Created by lvcy on 18-1-4.
 */
import {Wrapper, Avatar, Nickname, Resend} from './BaseStyled';
import styled from 'styled-components';
export const ImageWrapper  = Wrapper.extend``;
export const ImageAvatar   = Avatar.extend``;
export const ImageNickname = Nickname.extend``;
export const ImageResend   = Resend.extend``;
export const ImageSection  = styled.div`
    max-width: 120px;
    overflow: hidden;
    border-radius: 4px;
`;
export const ImageContent  = styled.img`
    max-width: 100%;
    display: block;
`;
