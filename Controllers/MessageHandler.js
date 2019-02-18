
const messageHandler = (data, clientManager) => {

    const sendFromServer = () =>{
        if(clientManager.isOnline(data.to)){
            console.log("to....", data.to);
            const recipient = clientManager.getClientByName(data.to);
            console.log("recipent name....", recipient.name);
            recipient.emit("messageToClient", {msg: data.msg, from: data.from});
        }
    }
    return {sendFromServer};
};

module.exports = () => messageHandler;
