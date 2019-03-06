import React, {Component} from "react";
import "./messages.css";
import {connect} from "react-redux";
import * as actionCreators from "../../Store/Action/actionCreators"

class Messages extends Component{

    render(){
        const messages = this.props.messages[this.props.currentChat]; // replace with current opened chatbox
        console.log(messages);
        return(
            <div className = "messages">
            <ul>
                {messages === undefined?null:messages.map((msg, index) => {
                    const name = msg[1] === undefined?"You":this.props.currentChat;
                    const idx =  msg[1] === undefined?msg[0]:msg[1];
                    return <li key = {index}>{name} : {idx}</li>
                })}
                </ul>
            </div>
         );
    }
}

const mapDispatchToProps = (dispatch) => {
    return{
        addMessage: (from, msg) => dispatch(actionCreators.addMessage(from, msg))
    }
}

const mapStateToProps = (state) => {

    return {
        messages: state.messages,
        userName: state.userName,
        currentChat: state.currentChat
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Messages);

