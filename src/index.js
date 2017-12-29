/**
 * Created by lvcy on 17-12-29.
 */

import React, {Component} from 'react';
import ChatList, {api} from './components/ChatList';
import Constant from './Constant';
import {Provider} from 'react-redux';
import {createStore} from 'redux';
import reducers from './store/reducers';

const store = createStore(reducers);

class ChatScroll extends Component {
    constructor() {
        super();
    }
    render() {
        return (
            <Provider store={store}>
                <ChatList {...this.props}/>
            </Provider>
        );
    }
}

export {ChatScroll as default, api, Constant};
