/**
 * Created by lvcy on 17-12-29.
 */
import React, {PureComponent} from 'react';
import Text from './Text';
import Image from './Image';
import Constant from '../../Constant';

class Message extends PureComponent {

    render() {
        const {message} = this.props;
        const {TEXT, IMAGE, FILE, VIDEO, VOICE, SYSTEM, TIME, COMPONENT} = Constant.type;
        switch (message.type) {
            case TEXT:
                return <Text {...this.props}/>;
            case IMAGE:
                return <Image {...this.props}/>;
            case FILE:
            case VIDEO:
            case VOICE:
            case SYSTEM:
            case TIME:
            case COMPONENT:
            default:
                return <div>{message.type}</div>
        }
    }
}
export default Message;