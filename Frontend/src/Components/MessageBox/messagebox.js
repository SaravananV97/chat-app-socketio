import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import "./messagebox.css";
import io from "socket.io-client";

var socket = io("http://localhost:5000");
socket.on("connect", () => {
    console.log("Connected!");
})

class MessageBox extends Component {

    constructor(props){
        super(props);
        this.state = {messages: [], currentMsg: ""};
    }

    handleInputChange = (event) => {
        this.setState({currentMsg: event.target.value});
        console.log(this.state.currentMsg);
    }

    sendMessage = () => {
        console.log("Emitting...");
        socket.emit("messageFromClient", {msg: this.state.currentMsg, to: "django", from: "django"});
    }

    render(){
        return (
            <div className = "messagebox"> 
                <div className = "message">
                <textarea onChange = {this.handleInputChange} rows="4" cols="50">
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

export default MessageBox;

