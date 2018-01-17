'use strict';

exports.__esModule = true;
/**
 * Created by lvcy on 17-12-29.
 */

var MESSAGE_ADD = 'MESSAGE_ADD';
var MESSAGE_DEL = 'MESSAGE_DEL';
var messageAdd = function messageAdd(dispatch, message) {
    dispatch({ type: MESSAGE_ADD, message: message });
};
var messageDel = function messageDel(dispatch, id) {
    dispatch({ type: MESSAGE_DEL, id: id });
};
exports.MESSAGE_ADD = MESSAGE_ADD;
exports.messageAdd = messageAdd;
exports.MESSAGE_DEL = MESSAGE_DEL;
exports.messageDel = messageDel;