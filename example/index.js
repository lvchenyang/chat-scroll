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
const resend = (message) => {
    console.log(message);
    api.message.add({
        id: message.id,
        resend: false
    });
};
ReactDOM.render(
    <ChatScroll canRefresh={false} onRefresh={refresh} scrollBar={true} onResend={resend}/>
    , document.querySelector('#root'));
for(let i = 1; i < 80; i = i + 2) {
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
/*api.message.add({
    id: 3,
    data: {
        url: '',
        filename: '设计稿.zip',
        size: '20MB'
    },
    type: Constant.type.FILE,
    side: Constant.side.LEFT,
    avatar: '//img13.360buyimg.com/ee/jfs/t3100/53/3349569343/26913/4e9280da/57f2291dN68afd214.png'
});*/

api.message.add({
    id: 5,
    type: Constant.type.COMPONENT,
    data: {}
});
class Person extends React.Component {
    render() {
        return (<div>{this.props.name}</div>)
    }
}
setTimeout(() => {
    api.message.add({
        id: 5,
        type: Constant.type.COMPONENT,
        data: {name: 'lvchenyang'},
        component: Person
    })
}, 1000);

api.message.add({
    id: 4,
    data: {
        url : '//img20.360buyimg.com/ee/jfs/t16045/210/1121773908/288391/72f9e5c/5a4b62d7N2ccd81ea.png',
        blob: '',
        progress: 0,
    },
    type: Constant.type.IMAGE,
    side: Constant.side.RIGHT,
    avatar: '//img13.360buyimg.com/ee/jfs/t3100/53/3349569343/26913/4e9280da/57f2291dN68afd214.png'
});
setTimeout(() => {
    api.message.add({
        id: 4,
        resend: true
    })
}, 2000);

api.message.add({
    id: 6,
    data: '您已对客服评价成功',
    type: Constant.type.SYSTEM
});
api.message.add({
    id: 7,
    data: '星期一 12:20',
    type: Constant.type.TIME
});
// let j = 50;
// setInterval(() => {
//     api.message.add({
//         id: j++,
//         history: true,
//         data: `${j}: 你好`,
//         type: Constant.type.TEXT,
//         side: Constant.side.LEFT,
//         avatar: '//img12.360buyimg.com/ee/jfs/t4627/99/4193872524/29235/b045e848/590a9539Nbcbe367b.png'
//     });
// }, 1000);


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
