const express = require("express");
const mongodb = require("mongodb").MongoClient;
const socket = require("socket.io");
const bodyParser = require("body-parser");
const app = express();
const user = require("./routes/api/user");
const mongoose = require("mongoose");
const db = require("./config/keys").mongodbURI;

// mongodb.connect("mongodb://localhost:27017/chatapp", { useNewUrlParser: true }, (err, db) => {
//     if(err) throw err;
//     else console.log("Connected to DB");
// });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.get("/", (req, res) => {
    res.json({msg: "welcome to the chat app"});
});

mongoose.connect(db, {useNewUrlParser: true})
        .then(() => console.log("Connected to DB"))
        .catch(err => {throw new Error(err)});

const server = app.listen(5000, () => console.log("Server Running..."));
const io = socket(server);

const ClientsManager = require("./Controllers/ClientsManager");
const EventHandler = require("./Controllers/EventHandler");
const MessageHandler = require("./Controllers/MessageHandler");

const clientsManager = ClientsManager();
const eventHandler = EventHandler();
const messageHandler = MessageHandler();

app.use("/api/users", user);

io.on("connection", (client) => {

    console.log(`Client id: ${client.id}`);
    const {handleNewUser, handleLeftUser} = eventHandler(client, clientsManager);
    client.on("makeOnline", (name) => handleNewUser(name))
    client.emit("messageFromServer", {from: "django", msg:{1:"welcome"}});
    client.on("disconnect", handleLeftUser);
    client.on("messageFromClient", (data) => {
      console.log(data);
      const {sendFromServer} = messageHandler(data, clientsManager);           
      sendFromServer();
        });
    });    
