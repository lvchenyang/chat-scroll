/**
 * Created by lvcy on 17-12-29.
 */

const MESSAGE_ADD = 'MESSAGE_ADD';
const messageAdd = (dispatch, message) => {
    dispatch({type: MESSAGE_ADD, message});
};
export {MESSAGE_ADD, messageAdd};