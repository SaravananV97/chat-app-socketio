import React, {Component} from "react";
import Appbar from "../../Components/AppBar/AppBar";
import ConvList from "../../Components/ConvList/ConvList";
import MessageBox from "../../Components/MessageBox/messagebox";
import ConvHeader from "../../Components/ConvHeader/convHeader";
import Messages from "../Messages/messages";

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
            <ConvHeader  />
            <Messages />
            </div>
            <div className = "messagebox">
            <MessageBox />
            </div>
        </div>
        );
      }
  }




export default ChatBuilder;

