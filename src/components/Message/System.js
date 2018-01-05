/**
 * Created by lvcy on 18-1-2.
 */
import React, {PureComponent} from 'react';
import {SystemWrapper, SystemContent} from '../Theme/SystemStyled';
class System extends PureComponent {
    render() {
        const {data} = this.props.message;
        return (
            <SystemWrapper>
                <SystemContent className="message__system">{data}</SystemContent>
            </SystemWrapper>
        );
    }
}
export default System;