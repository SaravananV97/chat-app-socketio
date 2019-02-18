const makeHandler = () => {
    const eventHandler = (client, clientsManager) => {

        const handleNewUser = () => {
            clientsManager.addClient(client);
        }

        const handleLeftUser = () => {
            clientsManager.removeClient(client.name);
            console.log(`${client.name} left`);
        }

        return { handleLeftUser, handleNewUser}

    };
    return eventHandler;
};
module.exports = makeHandler;

