
const messageHandler = (data, clientManager) => {

    const sendFromServer = () =>{
        if(clientManager.isOnline(data.to)){
            const recipient = clientManager.getClientByName(data.to);
            recipient.emit("messageFromServer", {msg: {1:"Hello there!"}, from: data.from, to: data.to});
        }
    }
    return {sendFromServer};
};

module.exports = () => messageHandler;
