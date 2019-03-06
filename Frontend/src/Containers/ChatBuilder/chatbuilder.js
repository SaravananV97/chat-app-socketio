import React, {Component} from "react";
import Appbar from "../../Components/AppBar/AppBar";
import ConvList from "../../Components/ConvList/ConvList";
import * as actionCreator from "../../Store/Action/actionCreators";
import MessageBox from "../../Components/MessageBox/messagebox";
import ConvHeader from "../../Components/ConvHeader/convHeader";
import Messages from "../Messages/messages";
import {connect} from "react-redux";
import "./chatbuilder.css";


class ChatBuilder extends Component{

    handleConvClick = people => {
      console.log(people);
      this.props.setCurrentChat(people);
    };
  
      render() {
        return (
          <div className="app">
          <div className = "chats">
            <Appbar className = "appbar" />
            <ConvList className = "list" handleConvClick={this.handleConvClick} />
          </div>
          <div className = "conversation">  
            <ConvHeader name = {this.props.currentChat} />
            <Messages />
            </div>
            <div className = "messagebox">
            <MessageBox />
            </div>
        </div>
        );
      }
  }

  const mapStateToProps = (state) => {
    return {
      currentChat: state.currentChat
    }
  }


  const mapDispatchToProps = (dispatch) => {
    return {
        setCurrentChat: (people) => dispatch(actionCreator.setCurrentChat(people))
    }
  }


export default connect(mapStateToProps, mapDispatchToProps)(ChatBuilder);

