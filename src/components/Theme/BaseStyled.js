/**
 * Created by lvcy on 18-1-4.
 */
import styled from 'styled-components';

export const Wrapper  = styled.div`
    display: flex;
    position: relative;
`;

export const Nickname = styled.div``;

export const Avatar   = styled.img`
    height: 36px;
    width: 36px;
`;
export const Resend   = styled.div`
    width: 20px;
    height: 20px;
    background: #FC5D60;
    margin-right: 5px;
    border-radius: 10px;
    position: relative;
    align-self: center;
    &:before {
        content: '';
        position: absolute;
        top: 4px;
        width: 2px;
        height: 8px;
        border-radius: 1px;
        left: 50%;
        background: #fff;
        transform: translateX(-50%);
    }
    &:after {
        content: '';
        content: '';
        position: absolute;
        bottom: 4px;
        width: 2px;
        height: 2px;
        left: 50%;
        background: #fff;
        transform: translateX(-50%);
    }
`;