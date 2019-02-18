import React, { Component } from 'react';
import './App.css';
import "./Containers/ChatBuilder/chatbuilder";
import ChatBuilder from './Containers/ChatBuilder/chatbuilder';

class App extends Component {
  render() {
    return (
      <div className="App">
      <ChatBuilder ></ChatBuilder>
       </div>
    );
  }
}

export default App;
