import * as actionTypes from "./actionTypes";

export const assignSocket = (socket) => {
    return {type: actionTypes.assignSocket, payload:{socket}}
}

export const addMessage = (from, msg) => {
    return {type: actionTypes.addNewMessage, payload: {name: from, msg}}
}


