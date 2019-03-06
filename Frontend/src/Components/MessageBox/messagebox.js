import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import "./messagebox.css";
import {connect} from "react-redux";
import * as actionCreators from "../../Store/Action/actionCreators";

class MessageBox extends Component {

    constructor(props){
        super(props);
        this.state = {currentMsg: ""};
    }

    handleInputChange = (event) => {
        this.setState({currentMsg: event.target.value});
    }

    sendMessage = () => {
        console.log("Emitting...");
        this.props.socket.emit("messageFromClient", {msg: this.state.currentMsg, from: this.props.userName, to: this.props.currentChat});
        this.props.addMessage(this.props.currentChat, {0:this.state.currentMsg});
    }

    render(){
        return (
            <div className = "messagebox"> 
                <div className = "message">
                <textarea onChange = {this.handleInputChange} rows="8" cols="100">
                </textarea>
            </div>
            <div className = "send">
                <Button onClick = {this.sendMessage}  variant="contained" color="primary">
                    Send
                </Button>
            </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        socket : state.socket,
        userName: state.userName,
        currentChat: state.currentChat
    }
}

const mapDispatchToProps = (dispatch) => {
    return{
        addMessage: (from, msg) => dispatch(actionCreators.addMessage(from, msg))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MessageBox);

