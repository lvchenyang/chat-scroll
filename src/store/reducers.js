/**
 * Created by lvcy on 17-12-29.
 */
import Immutable from 'immutable';
import {MESSAGE_ADD} from './actions';
import {combineReducers} from 'redux';
const initState = {
    newMessages: Immutable.OrderedMap(),
    oldMessages: Immutable.OrderedMap()
};
const verifyMessage = (message) => {
    if(!message.id) {
        throw new Error('message require id attribute');
    }
    if(!message.data) {
        throw new Error('message require data attribute');
    }
    if(!message.type) {
        throw new Error('message require type attribute');
    }
};
const messages = (state = initState, action) => {
    if(typeof state === 'undefined') {
        return initState;
    }
    let message = null;
    switch (action.type) {
        case MESSAGE_ADD:
            message = action.message;
            verifyMessage(message);
            if(message.history) {
                return {
                    ...state,
                    oldMessages: state.oldMessages.set(message.id, message)
                }
            } else {
                return {
                    ...state,
                    newMessages: state.newMessages.set(message.id, message)
                }
            }
            break;
        default:
            return initState;
    }
};

export default combineReducers({messages});