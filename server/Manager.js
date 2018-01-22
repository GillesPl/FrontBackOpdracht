/* 
Try catch rond alle json parse op server
*/

var Map = require('./Map/Map.class'),
    UserController = require('./Controllers/UserController'),
    Player = require('./GameObjects/Player.class'),
    NonCharacterObject = require('./GameObjects/NonCharacterObject.class'),
    Projectile = require('./GameObjects/Projectile.class'),
    Spawner = require('./GameObjects/Spawner.class');

//controllers
var UserController = require("./Controllers/UserController");
var AuthenticateController = require("./Controllers/AuthenticateController");

class Manager {
    constructor() {
        this.reset();
    }

    reset() {
        this.sockets = [];
        this.players = [];
        this.projectiles = [];
        this.map = new Map.Map();
        this.map.loadMap('../Map/map.json', (objects, npcs) => {
            this.createNonCharacterObjects(objects)
            this.loadNPCs(npcs);
        });
    }

    newPlayer(playerJsonString, socket) {
        this.players.push(new Player.Player(playerJsonString, this.map, socket.id));
        socket.broadcast.emit("New_connection", playerJsonString);
        socket.emit("otherPlayers", this.getSendablePlayers());
        socket.emit("allObjects", this.getSendableNonCharacterObjects());
        socket.emit("allSpawners", this.getSendableSpawners());
        this.sockets.forEach(s => {
            if (s.id === socket.id) {
                this.sockets.splice(this.sockets.indexOf(s), 1);
            }
        });
        this.sockets.push(socket);
    }

    updatePlayer(playerJsonString, socket) {
        let player = JSON.parse(playerJsonString);
        let playerForDatabase = {
            _id: player.id,
            token: player.token,
            tileLevel: player.tileLevel,
            health: player.health,
            xp: player.xp,
            level: player.level,
            questsCompleted: player.questsCompleted,
            items: player.items,
            stats: player.stats,
            position: {
                x: player.x,
                y: player.y
            }
        };

        delete player.token; // Remove the token, noone else should know this value!
        delete player.items; // Remove the items, noone else should know this value!
        playerJsonString = JSON.stringify(player);

        this.players.forEach(player => {
            if (player.updatePlayer(playerJsonString)) { // This will only execute with the correct player and then return true
                socket.broadcast.emit("updatingPlayer", playerJsonString); // Notify all other players
            }
        });

        UserController.updateUserFromToken(playerForDatabase, function (res) {
            //console.log(res);
        });
    }

    updateObject(obj, socket) {
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

    updateNpc(npcJsonString, socket) {
        const npc = JSON.parse(npcJsonString);
        this.spawners.forEach(spawner => {
            if (npc.id.startsWith(spawner.id)) {
                spawner.updateFromClient(npc, this, socket);
            }
        });
        socket.broadcast.emit("updateUnit", npcJsonString);
    }

    updateProjectile(projectileJsonString, socket) {
        let projectile = JSON.parse(projectileJsonString);
        let newProjectile = true;
        this.projectiles.forEach(projectileToUpdate => {
            if (projectileToUpdate.id === projectile.id) {
                newProjectile = false;
                if (projectile.destroyed) {
                    this.projectiles.splice(this.projectiles.indexOf(projectile), 1);
                } else {
                    projectileToUpdate = projectile;
                }
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
        this.sockets.forEach(s => {
            if (s.id === socket.id) {
                this.sockets.splice(this.sockets.indexOf(s), 1);
            }
        });
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
        this.idIncrementer = 0;
        objects.forEach(object => {
            object.id = this.idIncrementer++;
            this.nonCharacterObjects.push(new NonCharacterObject.NonCharacterObject(object));
            this.originalCharacterObjects.push(new NonCharacterObject.NonCharacterObject(object));
        });
    }

    createObject(object, socket) {
        object.id = this.idIncrementer++;
        this.nonCharacterObjects.push(new NonCharacterObject.NonCharacterObject(object));
        let send = this.getSendableNonCharacterObjects();
        socket.emit("allObjects", send);
        socket.broadcast.emit("allObjects", send);
    }

    loadNPCs(npcs) {
        this.spawners = [];
        let id = 0;
        npcs.forEach(npc => {
            let bounds = {
                x: npc.x,
                y: npc.y,
                width: npc.width,
                height: npc.height
            };
            this.spawners.push(new Spawner.Spawner(id++, bounds, npc.name, npc.properties.Count, this.map, this.sockets, this.players));
        });
    }

    getSendableNonCharacterObjects() {
        let nonCharacterObjects = [];
        this.nonCharacterObjects.forEach(obj => {
            nonCharacterObjects.push(obj.getSmallObject());
        });
        return JSON.stringify(nonCharacterObjects);
    }

    getSendableSpawners() {
        let spawners = [];
        this.spawners.forEach(spawner => {
            spawners.push(spawner.getSendableObject());
        });
        return JSON.stringify(spawners);
    }

    createUser(user, socket) {
        // i'm so sorry :(
        UserController.createUserSocket(user, function (res) {
            socket.emit("requestRegister", res);
        }, function (res) {
            socket.emit("requestLogin", res);
        });
    }

    loginUser(user, socket) {
        AuthenticateController.authenticate(user, function (res) {
            socket.emit("requestLogin", res);
        });
    }
}

module.exports.Manager = Manager;