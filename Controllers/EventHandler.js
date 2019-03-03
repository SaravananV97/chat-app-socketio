const makeHandler = () => {

    const eventHandler = (client, clientsManager) => {

        const handleNewUser = (name) => {
            client.name = name;
            clientsManager.addClient(client);
            let clients = clientsManager.getAllClients();
            clients.map(c => c.emit("onlinePeople", clientsManager.getAvailableUsers()));
            console.log(clientsManager.getAvailableUsers());
        }
        const handleLeftUser = () => {
            clientsManager.removeClient(client.name);
            let clients = clientsManager.getAllClients();
            clients.map(c => c.emit("onlinePeople", clientsManager.getAvailableUsers()));
            console.log(`${client.name} left`);
            console.log(clientsManager.getAvailableUsers());
        }
        return { handleLeftUser, handleNewUser}
    };
    return eventHandler;
};
module.exports = makeHandler;

