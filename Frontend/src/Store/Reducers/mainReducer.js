
import * as actionTypes from "../Action/actionTypes";

const initState = {
    socket: null,
    messages: {},
    userName:"",
    onlinePeople:[]
}

const mainReducer = (state = initState, action) => {

    switch(action.type){
        case actionTypes.assignSocket:
            return {...state, socket: action.payload.socket};   
        case actionTypes.addNewMessage:
            const msgs = {...state.messages};
            const name = action.payload.name
            if(msgs.hasOwnProperty(name))
                msgs[name].push(action.payload.msg);
            else msgs[name] = [action.payload.msg];
            return {...state, messages: {...msgs}} 
        case actionTypes.updateOnline:
            let people = action.payload.people;
            people = people.filter(user => user !== state.userName)
            return {...state, onlinePeople: [...people]}
        case actionTypes.setUserName:
            return {...state, userName: action.payload.name}
        default: return state;
    }
} 

export default mainReducer;

