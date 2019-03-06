import React,{Component} from "react";
import * as actionCreator from "../../Store/Action/actionCreators";
import ChatBuilder from "../../Containers/ChatBuilder/chatbuilder";
import {connect} from 'react-redux';


class HOC extends Component{

    componentDidMount = () => {
        if(this.props.socket !== null){
        this.props.socket.on("onlinePeople", (data) => {
          console.log(data);
          this.props.updateOnline(data);
        })
        this.props.socket.on("messageFromServer", (data) => {
          const msg = data.msg;
          this.props.addMessage(data.from, {1:msg});
      })
    }
    }

    render(){

        return (
            <ChatBuilder />
        );
    } 

} 

const mapStateToProps = (state) => {
    return {
        socket : state.socket
    }
}

const mapDispatchToProps = (dispatch) => {
   return {
        updateOnline: (data) => dispatch(actionCreator.updateOnline(data)),
        addMessage: (from, msg) => dispatch(actionCreator.addMessage(from, msg))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(HOC)
