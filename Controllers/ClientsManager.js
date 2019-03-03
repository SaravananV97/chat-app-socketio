
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

    const getAllClients = () => {
        return Array.from(clientsMap.values());
    }

    return {
        addClient, removeClient,
        getAvailableUsers, isOnline,
        getClientByName, getAllClients
    };
}

module.exports = clientsManager;