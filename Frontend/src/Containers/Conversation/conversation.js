import React, {Component} from "react";

import "./conversation.css";

class Conversation extends Component{

    render(){
        return(
        <div className = "flex-container">
            <div className = "convheader">
            <ConvHeader  />
            </div >
            <div className = "messages" >
            <Messages />
            </div>
            <div className = "messagebox">
            <MessageBox />
            </div>
        </div>
        );
    }
}

export default Conversation;


