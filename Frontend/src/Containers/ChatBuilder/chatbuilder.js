import React, {Component} from "react";
import Appbar from "../../Components/AppBar/AppBar";
import ConvList from "../../Components/ConvList/ConvList";
import Conversation from "../Conversation/conversation";
import "./chatbuilder.css";
class ChatBuilder extends Component{

    handleConvClick = item => {
        console.log("Showing conversation...");
      };
    
      render() {
        return (
          <div className="app">
          <div className = "chats">
            <Appbar className = "appbar" />
            <ConvList className = "list" handleConvClick={this.handleConvClick} />
          </div>
          <div className = "conversation">  
            <Conversation />  
          </div>
          </div>
        );
      }
  }

export default ChatBuilder;

