/**
 * Created by lvcy on 18-1-4.
 */
import styled from 'styled-components';
import {Wrapper, Avatar, Nickname, Resend, MessageContentWrapper} from './BaseStyled';

export const TextWrapper  = Wrapper.extend``;
export const TextAvatar   = Avatar.extend``;
export const TextNickname = Nickname.extend``;
export const TextResend   = Resend.extend``;
export const TextMessageContentWrapper = MessageContentWrapper.extend``;
export const TextContent  = styled.pre`
    margin: 0;
    position: relative;
`;