import React, { Component } from 'react';
import './App.css';
import "./Containers/ChatBuilder/chatbuilder";
import io from "socket.io-client";
import ChatBuilder from './Containers/ChatBuilder/chatbuilder';
import * as actionCreator from "./Store/Action/actionCreators";
import {connect} from "react-redux";

const socket = io("http://localhost:5000?token=123");


class App extends Component {

  componentDidMount = () => {
    this.props.assignSocket(socket);
    socket.on("messageFromServer", (data) => {
        console.log(data);
        this.props.addMessage(data.from, data.msg);
    })
  }

  render() {
    return (
      <div className="App">
      <ChatBuilder ></ChatBuilder>
       </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    socket: state.socket,
  }
}

const mapDispatchToProps = (dispatch) => {
  
  return {
    assignSocket: (socket) => dispatch(actionCreator.assignSocket(socket)),
    addMessage: (from, msg) => dispatch(actionCreator.addMessage(from, msg))
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(App);


