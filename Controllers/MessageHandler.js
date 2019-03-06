const toneAnalyzer = require("../sentiment/toneAnalyser");

const messageHandler = (data, clientManager) => {

    const sendFromServer = () =>{
        if(clientManager.isOnline(data.to)){
            let msg = data.msg;
            toneAnalyzer.analyzeTone(msg).then(emoticon => {
                msg += emoticon;
                const recipient = clientManager.getClientByName(data.to);
                console.log("emitting...");
                recipient.emit("messageFromServer", {msg, from: data.from, to: data.to});               
            })
            .catch((err) => console.log(err));
        }
    }
    return {sendFromServer};
};

module.exports = () => messageHandler;
