/**
 * Created by lvcy on 18-1-2.
 */
import React, {PureComponent} from 'react';
import {TimeWrapper, TimeContent} from '../Theme/TimeStyled';
class Time extends PureComponent {
    render() {
        const {data} = this.props.message;
        return (
            <TimeWrapper>
                <TimeContent className="message__time">{data}</TimeContent>
            </TimeWrapper>
        );
    }
}
export default Time;