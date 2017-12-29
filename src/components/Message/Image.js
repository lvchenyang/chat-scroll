/**
 * Created by lvcy on 17-12-29.
 */
import React, {PureComponent} from 'react';

class Image extends PureComponent {
    render() {
        return (
            <div>Image</div>
        );
    }
    componentDidUpdate() {
        console.log('update image');
    }
}
export default Image;