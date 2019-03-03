import React,{Component} from "react";
import * as actionCreator from "../../Store/Action/actionCreators";
import ChatBuilder from "../../Containers/ChatBuilder/chatbuilder";
import {connect} from 'react-redux';


class HOC extends Component{

    componentDidMount = () => {
        this.props.socket.on("onlinePeople", (data) => {
          console.log(data);
          this.props.updateOnline(data);
        })
        this.props.socket.on("messageFromServer", (data) => {
          console.log(data);
          this.props.addMessage(data.from, data.msg);
      })
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
        updateOnline: (data) => dispatch(actionCreator.updateOnline(data))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(HOC)
