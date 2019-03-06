import * as actionTypes from "./actionTypes";

export const assignSocket = (socket) => {
    return {type: actionTypes.assignSocket, payload:{socket}}
}

export const addMessage = (from, msg) => {
    return {type: actionTypes.addNewMessage, payload: {name: from, msg}}
}

export const updateOnline = (people) => {
    return {type: actionTypes.updateOnline, payload: {people}}
}

export const setUserName = (name) => {
    return {type: actionTypes.setUserName, payload: {name}}
}

export const setCurrentChat = (currentChat) => {
    return {type: actionTypes.setCurrentChat, payload: {currentChat}}
} 

