class Player {
    constructor(playerJsonString, map, socketId) {
        this.map = map;
        let playerObject = JSON.parse(playerJsonString);
        this.id = playerObject.id;
        this.x = playerObject.x;
        this.y = playerObject.y;
        this.action = playerObject.action;
        this.tileLevel = playerObject.tileLevel;
        this.speed = playerObject.speed;
        this.width = playerObject.width;
        this.height = playerObject.height;
        this.socketId = socketId;
    }

    updatePlayer(playerJsonString) {
        let playerObject = JSON.parse(playerJsonString);
        if (this.id !== playerObject.id) {
            return false;
        }
        if (playerObject.resurected) console.log('oh no, someone died');
        if (!this.map.isSolidTileAtXY(playerObject.x, playerObject.y, playerObject.tileLevel) &&
            (playerObject.resurected || this.x === playerObject.x || this.y === playerObject.y)) { // Players can only move one direction at a time
            this.x = playerObject.x;
            this.y = playerObject.y;
            this.action = playerObject.action;
            this.tileLevel = playerObject.tileLevel;
            this.speed = playerObject.speed;
            this.width = playerObject.width;
            this.height = playerObject.height;
            return true;
        }
        // else
        // Kick player?
        return false;
    }

    getSmallObject() {
        let smallObject = {};
        smallObject.id = this.id;
        smallObject.x = Math.floor(this.x * 100) / 100;
        smallObject.y = Math.floor(this.y * 100) / 100;
        smallObject.action = this.action;
        smallObject.tileLevel = this.tileLevel;
        smallObject.speed = this.speed;
        smallObject.width = this.width;
        smallObject.height = this.height;
        //console.log(smallObject);
        return JSON.stringify(smallObject);
    }
}

module.exports.Player = Player;