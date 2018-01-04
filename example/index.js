/**
 * Created by lvcy on 17-12-29.
 */

import React from 'react';
import ReactDOM from 'react-dom';
import ChatScroll, {api, Constant} from '../src';

const refresh = () => {
    console.log('触发下拉更新');
    setTimeout(() => {
        api.hideLoading();
    }, 2000);
};

ReactDOM.render(<ChatScroll onRefresh={refresh}/>, document.querySelector('#root'));
for(let i = 1; i < 20; i = i + 2) {
    api.message.add({
        id: i,
        data: `${i}: 你好`,
        type: Constant.type.TEXT,
        side: Constant.side.LEFT,
        avatar: '//img12.360buyimg.com/ee/jfs/t4627/99/4193872524/29235/b045e848/590a9539Nbcbe367b.png'
    });
    api.message.add({
        id: i + 1,
        data: `你好`,
        type: Constant.type.TEXT,
        side: Constant.side.RIGHT,
        avatar: '//img13.360buyimg.com/ee/jfs/t3100/53/3349569343/26913/4e9280da/57f2291dN68afd214.png'
    });
}

// let i = 1;
// setInterval(() => {
//     api.message.add({
//         id: i,
//         data: `${i}:你好`,
//         type: Constant.type.TEXT,
//         side: Constant.side.LEFT
//     });
//     api.isBottom() && api.scrollToBottom();
//     i++;
// }, 200);
// for(let i = 1; i < 41; i++) {
//     api.message.add({
//         id: i,
//         data: `${i}:你好`,
//         type: Constant.type.TEXT,
//         side: Constant.side.LEFT
//     });
// }
