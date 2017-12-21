var NPC = require('./NPC.class');

class Spawner {
    constructor(id, bounds, type, count, map, sockets) {
        this.id = id;
        this.tileLevel = 0;
        this.bounds = bounds;
        this.type = type;
        this.count = count;
        this.map = map;
        this.units = [];
        this.timeToCreate = 0;
        this.sockets = sockets;
        for (let i = 0; i < count; i++) {
            this.units.push(this.createNPC());
        }

        let delta = 16;

        setInterval(() => {
            this.updateNPCs(delta);
        }, delta);

        setInterval(() => {
            this.checkNPCs();
        }, 60 * 1000);
    }

    sendMessage(messageId, message) {
        this.sockets.forEach(socket => {
            socket.emit(messageId, message);
        });
    }

    createNPC() {
        let x, y, collision, unit, health;

        switch (this.type) {
            case "Goblins":
                health = 50;
                break;
            case "Sheep":
                health = 10;
                break;
            default:
                health = 10;
                console.log('Did not found ' + type);
                break;
        }

        do {
            x = (Math.random() * this.bounds.width + this.bounds.x);
            y = (Math.random() * this.bounds.height + this.bounds.y);

            unit = new NPC.NPC(this.id + '' + Math.floor(Math.random() * 99999), this.type, x, y, this.map, this.bounds, health, this);
            let left = x;
            let right = x + this.map.drawSize - 1;
            let top = y;
            let bottom = y + this.map.drawSize - 1;
            collision =
                this.map.isSolidTileAtXY(left, top, this.tileLevel) ||
                this.map.isSolidTileAtXY(right, top, this.tileLevel) ||
                this.map.isSolidTileAtXY(right, bottom, this.tileLevel) ||
                this.map.isSolidTileAtXY(left, bottom, this.tileLevel) ||
                unit.unitsOverlap(this.units);
        } while (collision);

        return unit;
    }

    checkNPCs() {
        if (this.units.length < this.count) {
            let unit = this.createNPC();
            this.units.push(unit);
            this.sendMessage("newUnit", unit.getSmallObject(true));
        }
    }

    updateNPCs(delta) {
        this.units.forEach(unit => {
            unit.update(delta / 1000, this.units);
        });
    }

    updateFromClient(npc) {
        this.units.forEach(unit => {
            unit.updateUnit(npc);
            if (unit.health <= 0) {
                this.units.splice(this.units.indexOf(unit), 1);
            }
        });
    }

    getSendableObject() {
        let sendableObject = {};
        sendableObject.id = this.id;
        sendableObject.bounds = this.bounds;
        sendableObject.count = this.count;
        sendableObject.units = [];
        this.units.forEach(unit => {
            sendableObject.units.push(unit.getSmallObject(false));
        });
        return sendableObject;
    }
}

module.exports.Spawner = Spawner;