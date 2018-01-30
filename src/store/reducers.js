/**
 * Created by lvcy on 17-12-29.
 */
import Immutable from 'immutable';
import {MESSAGE_ADD, MESSAGE_DEL} from './actions';
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
            if(message.history) {
                message = Object.assign({}, state.oldMessages.get(message.id) || {}, message);
                verifyMessage(message);
                return {
                    ...state,
                    oldMessages: state.oldMessages.set(message.id, message)
                }
            } else {
                message = Object.assign({}, state.newMessages.get(message.id) || {}, message);
                verifyMessage(message);
                return {
                    ...state,
                    newMessages: state.newMessages.set(message.id, message)
                }
            }
            break;
        case MESSAGE_DEL:
            const messageId = action.id;
            return {
                ...state,
                newMessages: state.newMessages.delete(messageId),
                oldMessages: state.oldMessages.delete(messageId)
            };
            break;
        default:
            return initState;
    }
};

export default combineReducers({messages});