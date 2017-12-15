var Map = require('./Map/Map.class');
var Player = require('./GameObjects/Player.class');

class Manager {
    constructor() {
        //this.socket = socket;
        this.reset();
    }

    reset() {
        this.players = [];
        this.map = new Map.Map();
        this.map.loadMap('../Map/map.json', (objects, enemies) => {
            this.objects = objects;
            this.enemies = enemies;
        });
    }

    newPlayer(playerJsonString, socket) {
        this.players.push(new Player.Player(playerJsonString, this.map, socket.id));
        socket.broadcast.emit("New_connection", playerJsonString);
        socket.emit("otherPlayers", this.getSendablePlayers());
    }

    updatePlayer(playerJsonString, socket) {
        this.players.forEach(player => {
            player.updatePlayer(playerJsonString); // This will only execute with the correct player
        });
        socket.broadcast.emit("updatingPlayer", playerJsonString); // Notify all other players
    }

    disconnectPlayer(socket) {
        this.players.forEach(player => {
            if (player.socketId === socket.id) {
                this.players.splice(this.players.indexOf(player), 1);
            }
        });
        socket.broadcast.emit("otherPlayers", this.getSendablePlayers());
    }

    getSendablePlayers(socket) {
        let sendPlayers = [];
        this.players.forEach(player => {
            sendPlayers.push(player.getSmallObject());
        });
        return JSON.stringify(sendPlayers);
    }
}

module.exports.Manager = Manager;