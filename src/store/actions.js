/**
 * Created by lvcy on 17-12-29.
 */

const MESSAGE_ADD = 'MESSAGE_ADD';
const MESSAGE_DEL = 'MESSAGE_DEL';
const messageAdd = (dispatch, message) => {
    dispatch({type: MESSAGE_ADD, message});
};
const messageDel = (dispatch, id) => {
    dispatch({type: MESSAGE_DEL, id});
};
export {MESSAGE_ADD, messageAdd, MESSAGE_DEL, messageDel};