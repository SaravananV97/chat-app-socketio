import React, { Component } from 'react';
import './App.css';
import io from "socket.io-client";
import Landing from "../src/Components/Login/landing";
import "./Containers/ChatBuilder/chatbuilder";
import "../src/Components/Login/login.css";
import {Switch, Route } from "react-router-dom";
import HOC from "./Components/Hoc/hoc";
import * as actionCreator from "./Store/Action/actionCreators";
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";

const socket = io("http://localhost:5000");

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
    <div className="bg">
      <Switch>
        <Route path = "/" exact component = {Landing}></Route>
        <Route path = "/chat/:id" component = {HOC}></Route>
      </Switch>
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
    addMessage: (from, msg) => dispatch(actionCreator.addMessage(from, msg)),
    updateOnline: (people) => dispatch(actionCreator.updateOnline(people))
  }
};



export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));

