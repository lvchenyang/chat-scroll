/**
 * Created by lvcy on 17-12-29.
 */

import React from 'react';
import ReactDOM from 'react-dom';
import ChatScroll, {api, Constant} from '../src';


ReactDOM.render(<ChatScroll/>, document.querySelector('#root'));
for(let i = 1; i < 41; i++) {
    api.message.add({
        id: i,
        data: `${i}:你好`,
        type: Constant.type.TEXT,
        side: Constant.side.LEFT
    });
}
