
const messageHandler = (data, clientManager) => {

    const sendFromServer = () =>{
        if(clientManager.isOnline(data.from)){
            const recipient = clientManager.getClientByName(data.from);
            recipient.emit("messageFromServer", {msg: {1:"Hello there!"}, from: data.from});
        }
    }
    return {sendFromServer};
};

module.exports = () => messageHandler;
