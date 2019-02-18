import React, {Component} from "react";
import "./messages.css";
import io from "socket.io-client";

var socket = io("http://localhost:5000?token=123");

class Messages extends Component{

    constructor(props){
        super(props);
        this.state = {messages: []}
    }

    render(){
        socket.on("messageToClient", (data) => {
            console.log(data)
            let msgs = this.state.messages.slice();
            msgs[msgs.length] = {from:data.from, msg: data.msg};
            this.setState({messages: [...msgs]});
            console.log(`from ${data.from}: ${data.msg} with id ${data.id}`);
        });
        socket.on("disconnect", () => socket.removeAllListeners())

        return(
            <div className = "messages">
                {this.state.messages.map((msg, index) => {
                    return <p key = {index}>{msg.from} : {msg.msg}</p>;
                })}
            </div>
         );
    }
}

export default Messages;

