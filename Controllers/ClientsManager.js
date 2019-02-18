
const clientsManager = () => {
    
    let clientsMap = new Map();

    const addClient = function (client) {
        clientsMap.set(client.name, client);
    };
    
    const removeClient = (name) => {
        clientsMap.delete(name);
    };

    const getClientByName = (name) => {
        return clientsMap.get(name);
    }

    const getAvailableUsers = () => {
        return Array.from(clientsMap.keys());
    };

    const isOnline = (name) => {
        return clientsMap.has(name);
    };

    return {
        addClient, removeClient,
        getAvailableUsers, isOnline,
        getClientByName
    };
}

module.exports = clientsManager;