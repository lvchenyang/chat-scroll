/**
 * Created by lvcy on 18-1-8.
 */
import styled from 'styled-components';
import {Wrapper} from './BaseStyled';

export const ComponentWrapper = Wrapper.extend`
    width: 100%;
    justify-content: center;
`;
export const ComponentLoading = styled.div`
    color: #888;
    font-size: 12px;
    text-align: center;
    line-height: 20px;
    height: 40px;
    padding: 10px;
    width: 100%;
`;
