'use strict';

exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; /**
                                                                                                                                                                                                                                                                   * Created by lvcy on 17-12-29.
                                                                                                                                                                                                                                                                   */


var _immutable = require('immutable');

var _immutable2 = _interopRequireDefault(_immutable);

var _actions = require('./actions');

var _redux = require('redux');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var initState = {
    newMessages: _immutable2.default.OrderedMap(),
    oldMessages: _immutable2.default.OrderedMap()
};
var verifyMessage = function verifyMessage(message) {
    if (!message.id) {
        throw new Error('message require id attribute');
    }
    if (!message.data) {
        throw new Error('message require data attribute');
    }
    if (!message.type) {
        throw new Error('message require type attribute');
    }
};
var messages = function messages() {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initState;
    var action = arguments[1];

    if (typeof state === 'undefined') {
        return initState;
    }
    var message = null;
    switch (action.type) {
        case _actions.MESSAGE_ADD:
            message = action.message;
            if (message.history) {
                message = _extends({}, state.oldMessages.get(message.id) || {}, message);
                verifyMessage(message);
                return _extends({}, state, {
                    oldMessages: state.oldMessages.set(message.id, message)
                });
            } else {
                message = _extends({}, state.newMessages.get(message.id) || {}, message);
                verifyMessage(message);
                return _extends({}, state, {
                    newMessages: state.newMessages.set(message.id, message)
                });
            }
            break;
        case _actions.MESSAGE_DEL:
            var messageId = action.id;
            return _extends({}, state, {
                newMessages: state.newMessages.delete(messageId)
            });
            break;
        default:
            return initState;
    }
};

exports.default = (0, _redux.combineReducers)({ messages: messages });