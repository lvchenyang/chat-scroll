# 1. 消息协议

## 1.1 文本消息

```javascript
const text = {
  id      : '[*string]        消息ID',
  data    : '[*string]        消息内容',
  type    : '[*Constant.type] 消息类型',
  side    : '[*Constant.side] 消息位置',
  avatar  : '[ string]        用户头像',
  nickname: '[ string]        用户昵称',
  history : '[ boolean]       是否为历史消息',
  resend  : '[ boolean]       是否需要重新发送'
}
```

## 1.2 图片消息

```javascript
const image = {
  id:       '[*string]        消息ID',
  data: {
    url:      '[*string]      图片地址',
    blob:     '[*string]      图片base64',
    propress: '[ number]      图片上传进度'
  },
  type    : '[*Constant.type] 消息类型',
  side    : '[*Constant.side] 消息位置',
  avatar  : '[ string]        用户头像',
  nickname: '[ string]        用户昵称',
  history : '[ boolean]       是否为历史消息',
  resend  : '[ boolean]       是否需要重新发送'
}
```

## 1.3 系统消息

```javascript
const system = {
  id:   '[*string]        消息ID',
  data: '[*string]        消息内容',
  type: '[*Constant.type] 消息类型'
}
```

## 1.4 时间消息

```javascript
const time = {
  id:   '[*string]        消息ID',
  data: '[*string]        消息内容',
  type: '[*Constant.type] 消息类型'
}
```

## 1.5 文件消息

```javascript
//TODO
```

## 1.6 语音消息

```javascript
// TODO
```

## 1.7 视频消息

```javascript
// TODO
```

## 1.8 组件消息

```javascript
const component = {
  id       : '[*string]        消息ID',
  data     : '[*object]        渲染组件的数据',
  type     : '[*Constant.type] 消息类型',
  component: '[*ReactComponent] 组件对象',
  history  : '[ boolean]       是否为历史消息',
}
```

> 注：可以在组件消息的`data`字段中添加`clickCallback`方法，用于组件点击后的回调函数



# 2. 对象及接口描述

消息列表包括一下三个对象或组件

* `ChatScroll` 该对象为消息列表组件

* `api` 该对象为消息列表渲染后向外暴露的方法

* `Constant` 该对象定义了一些枚举值，用于给消息对象赋固定的值，比如消息类型或消息渲染位置

## 2.1 ChatScroll组件

`ChatScroll`是基于React + Redux的列表组件

### 2.1.1 方法及属性描述

| 属性|类型| 说明|
| --------- | ---- | ---------------------------------------- |
| onRefresh | 方法   | 当消息列表下拉到最顶端时触发，此时可拉取历史消息                 |
| onResend  | 方法   | 当消息被标记为发送失败时，消息气泡会出现一个红色的重发按钮，点击重返按钮触发onResend |
| topWave   | boolean   | 用于是否显示顶部下拉是的波浪效果 |
| canRefresh  | boolean   | 用于标记是否还可以下拉刷新 |
| scrollBar   | boolean   | 是否显示滚动条 |
|style| object| css样式 |
|onContextMenu|方法|重写鼠标右键事件|
|onImageClick|方法|点击消息列表中的图片，如果不传入此方法，则使用默认相册|

###2.1.2 使用组件

```javascript
import React from 'react';
import ReactDOM from 'react-dom';
import ChatScroll from 'chat-scroll';

// 刷新页面，当页面在顶部继续往下拉时会触发此方法
const refresh = () => {
  // TODO refresh
};

// 消息重发，当点击重新发送图标时，会触发此方法
const resend = (message) => {
  // TODO resend
};

// 渲染组件
ReactDOM.render(
  <ChatScroll onRefresh={refresh} onResend={resend}/>, 
  document.getElementById('#root')
);

```

## 2.2 api

`api`对象主要包含消息列表渲染后对外暴露的可调用的方法，这些方法会修改消息列表组件的状态，或执行一些动画

### 2.2.1 引入方式

```javascript
const {api} from 'chat-scroll';
```

###2.2.2 方法描述

**api**

|属性|类型|说明|
| ----| ---- | ----|
| scrollToBottom() | 方法   | 将消息列表滚动至最底部     |
| scrollToTop()    | 方法   | 将消息列表滚动至最顶部     |
| isBottom()       | 方法   | 消息列表是否已经滚动到了最底部 |
| isTop()          | 方法   | 消息列表是否在最顶部      |
| hideLoading()    | 方法   | 收起消息列表顶部的加载模块   |




**api.message**

| 属性   | 类型   | 说明           |
| ---- | ---- | ------------ |
| add  | 方法   | 往消息列表中添加一条消息 |
| del  | 方法   | 删除消息列表中的某条记录，传入消息的ID |

> 注：消息列表中所有的消息ID不能重复，若消息ID重复，则覆盖并渲染存在的消息（不会改变消息的位置）

### 2.2.3 新增一条消息

新增一条新消息，会将此消息渲染在消息列表的最底部，消息的顺序按照第一次调用`message.add()`方法的顺序调用。若新增一条历史消息，则需要在消息协议里面添加`history`属性，新增的历史消息渲染在消息列表的顶部。

```javascript
import {api, Constant} from 'chat-scroll';

// 添加一条文本消息，并渲染在右边
api.message.add({
  id: '11110',
  data: `你好，这是一条新消息`,
  type: Constant.type.TEXT,
  side: Constant.side.RIGHT,
  avatar: '//xxx.png'
});

// 添加一条历史消息
api.message.add({
  id: '11109',
  data: `你好，这是一条历史消息`,
  type: Constant.type.TEXT,
  side: Constant.side.LEFT,
  avatar: '//xxx.png',
  history: true
});
```

> 注：调用`api`中的方法必须要在消息列表(ChatScroll)渲染完成之后

### 2.3.4 修改一条消息

修改一条已有的消息不会修改消息渲染的顺序

```javascript
import {api, Constant} from 'chat-scroll';

// 若当前已经在列表上渲染了消息ID为11110的消息，但是消息发送至服务器失败了
// 所以需要更新此条消息，将重新发送按钮渲染出来
api.message.add({
  id: '11110',
  resend: true
});
```



## 2.3 Constant

`Constant`对象定义了一下组件需要使用的常量

### 2.3.1 引入方式

```javascript
const {Constant} from 'chat-scroll';
```

### 2.3.2 Constant.type

`Constant.type`用来描述消息协议里面的消息类型

* `Constant.type.TEXT`         文本消息
* `Constant.type.FILE`         文件消息
* `Constant.type.IMAGE`        图片消息
* `Constant.type.VOICE`        语音消息
* `Constant.type.VIDEO`        视频消息
* `Constant.type.TIME`           时间提示
* `Constant.type.SYSTEM`       系统提示
* `Constant.type.COMPONENT` 自定义组件消息

### 2.3.3 Constant.side

`Constant.side`用于描述消息渲染的位置，它有两个值，分别是：

* `Constant.side.LEFT`
* `Constant.side.RIGHT`

`LEFT`表示消息渲染在左边，`RIGHT`表示消息被渲染在右边

