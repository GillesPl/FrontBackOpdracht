var Map = require('./Map/Map.class');
var Player = require('./GameObjects/Player.class');
var NonCharacterObject = require('./GameObjects/NonCharacterObject.class');
var Projectile = require('./GameObjects/Projectile.class');

class Manager {
    constructor() {
        //this.socket = socket;
        this.reset();
    }

    reset() {
        this.players = [];
        this.projectiles = [];
        this.map = new Map.Map();
        this.map.loadMap('../Map/map.json', (objects, enemies) => {
            this.createNonCharacterObjects(objects);
            this.enemies = enemies;
        });
    }

    newPlayer(playerJsonString, socket) {
        this.players.push(new Player.Player(playerJsonString, this.map, socket.id));
        socket.broadcast.emit("New_connection", playerJsonString);
        socket.emit("otherPlayers", this.getSendablePlayers());
        socket.emit("allObjects", this.getSendableNonCharacterObjects());
    }

    updatePlayer(playerJsonString, socket) {
        this.players.forEach(player => {
            if (player.updatePlayer(playerJsonString)) { // This will only execute with the correct player and then return true
                socket.broadcast.emit("updatingPlayer", playerJsonString); // Notify all other players
            }
        });
    }

    updateObject(obj, socket) {
        //console.log(obj);
        obj = JSON.parse(obj);
        let recreate = null;
        let delObj = null;
        this.nonCharacterObjects.forEach(objToUpdate => {
            if (objToUpdate.id === obj.id) {
                delObj = objToUpdate;
            }
        });
        this.originalCharacterObjects.forEach(objToRecreate => {
            if (objToRecreate.id === obj.id) {
                recreate = objToRecreate;
            }
        });
        this.nonCharacterObjects.splice(this.nonCharacterObjects.indexOf(delObj), 1);
        socket.broadcast.emit("allObjects", this.getSendableNonCharacterObjects());
        if (recreate !== null) {
            setTimeout(() => {
                this.nonCharacterObjects.push(recreate);
                socket.emit("allObjects", this.getSendableNonCharacterObjects());
                socket.broadcast.emit("allObjects", this.getSendableNonCharacterObjects());
            }, 30 * 1000); // Recreate the object after 30 seconds
        }
    }

    updateProjectile(projectileJsonString, socket) {
        let projectile = JSON.parse(projectileJsonString);
        let newProjectile = true;
        this.projectiles.forEach(projectileToUpdate => {
            if (projectileToUpdate.id === projectile.id) {
                projectileToUpdate = projectile;
                newProjectile = false;
            }
        });
        if (newProjectile) {
            this.projectiles.push(new Projectile.Projectile(projectile));
            socket.broadcast.emit("newProjectile", projectileJsonString);            
        }
    }

    disconnectPlayer(socket) {
        this.players.forEach(player => {
            if (player.socketId === socket.id) {
                this.players.splice(this.players.indexOf(player), 1);
            }
        });
        socket.broadcast.emit("otherPlayers", this.getSendablePlayers());
    }

    getSendablePlayers() {
        let sendPlayers = [];
        this.players.forEach(player => {
            sendPlayers.push(player.getSmallObject());
        });
        return JSON.stringify(sendPlayers);
    }

    createNonCharacterObjects(objects) {
        this.nonCharacterObjects = [];
        this.originalCharacterObjects = [];
        let i = 0;
        objects.forEach(obj => {
            obj.id = i++;
            this.nonCharacterObjects.push(new NonCharacterObject.NonCharacterObject(obj));
            this.originalCharacterObjects.push(new NonCharacterObject.NonCharacterObject(obj));
        });
    }

    getSendableNonCharacterObjects() {
        let nonCharacterObjectsJsonString = [];
        this.nonCharacterObjects.forEach(obj => {
            nonCharacterObjectsJsonString.push(obj.getSmallObject());
        });
        return JSON.stringify(nonCharacterObjectsJsonString);
    }
}

module.exports.Manager = Manager;