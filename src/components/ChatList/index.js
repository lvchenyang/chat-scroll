/**
 * Created by lvcy on 17-12-29.
 */
import React, {PureComponent} from 'react';
import {connect} from 'react-redux';
import {messageAdd} from '../../store/actions';
import Message from '../Message';
import Scroll from '../Scroll';

class ChatList extends PureComponent {
    constructor() {
        super();
    }
    render() {
        const {oldMessages, newMessages} = this.props;
        const list = oldMessages.reverse().concat(newMessages).toList();
        return (
            <Scroll>
                {list.map(item =><Message key={item.id} message={item}/>)}
            </Scroll>
        );
    }
    componentDidUpdate() {

    }
}
const api = {
    message: {}
};

const mapReducerToProps = (dispatch, props) => {
    api.message.add = (message) => messageAdd(dispatch, message);
    return {
        ...props,
        messageAdd: api.message.add
    }
};
const mapStateToProps = (state) => {
    return {
        oldMessages: state.messages.oldMessages,
        newMessages: state.messages.newMessages
    }
};
const ConnectedScroll = connect(mapStateToProps, mapReducerToProps)(ChatList);
export {ConnectedScroll as default, api};