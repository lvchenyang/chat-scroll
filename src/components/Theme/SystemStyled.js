/**
 * Created by lvcy on 18-1-4.
 */
import styled from 'styled-components';
import {Wrapper} from './BaseStyled';

export const SystemWrapper = Wrapper.extend`
    justify-content: center;
    align-items: center;
    min-height: 40px;
`;
export const SystemContent = styled.div`
    line-height: 20px;
    color: #888;
`;