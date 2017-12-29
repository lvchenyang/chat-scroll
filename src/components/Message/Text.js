/**
 * Created by lvcy on 17-12-29.
 */
import React, {PureComponent} from 'react';


class Text extends PureComponent {
    render() {
        const message = this.props.message;
        return (
            <div>{message.data}</div>
        );
    }
    componentDidUpdate() {
        console.log('update text');
    }
}
export default Text;