import React, {Component} from "react";
import "./messages.css";
import {connect} from "react-redux";
import * as actionCreators from "../../Store/Action/actionCreators"

class Messages extends Component{

    render(){
        const k = this.props.messages.django; // replace with current opened chatbox

        return(
            <div className = "messages">
            <ul>
                {k === undefined?null:k.map((msg, index) => {
                    const name = msg[1] === undefined?"django":"server";
                    const idx =  msg[1] === undefined?msg[0]:msg["1"];
                    return <li key = {index}>{name} : {idx}</li>
                })}
                </ul>
            </div>
         );
    }
}

const mapDispatchToProps = (dispatch) => {
    return{
        addMessage: (from, msg) => dispatch(actionCreators.addMessage(from, msg))
    }
}

const mapStateToProps = (state) => {

    return {
        messages: state.messages
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Messages);

