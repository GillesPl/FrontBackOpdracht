NonCharacterObject = require('./NonCharacterObject.class');

class NPC {
    constructor(id, type, x, y, map, bounds, health, parent) {
        this.id = id;
        this.type = type;
        this.x = x;
        this.y = y;
        this.width = map.drawSize * 0.8;
        this.height = map.drawSize * 0.8;
        this.map = map;
        this.bounds = bounds;
        this.health = health;
        this.parent = parent;
        this.STATE = {
            STOP: 0,
            RUNNINGNORTH: 1,
            RUNNINGEAST: 2,
            RUNNINGSOUTH: 3,
            RUNNINGWEST: 4
        };
        this.tileLevel = 0;
        this.action = this.STATE.STOP;
        this.doingAction = 0;
        switch (this.type) {
            case "Sheep":
            this.speed = 160;
            break;
            case "Goblins":
            this.speed = 196;
            break;
            case "Slimes":
            this.speed = 80;
            break;
        }
    }

    unitsOverlap(units, thisx, thisy) {
        if (thisx === undefined) {
            thisx = this.x;
        }
        if (thisy === undefined) {
            thisy = this.y;
        }
        let left = thisx;
        let right = thisx + this.width - 1;
        let top = thisy;
        let bottom = thisy + this.height - 1;

        for (let i = 0; i < units.length; i++) {
            const npc = units[i];
            if (npc !== this) {
                if (npc.isNear(left, top, right, bottom)) {
                    return true;
                }
            }
        }
        return false;
    }

    isNear(xMin, yMin, xMax, yMax) {
        // (source: https://stackoverflow.com/questions/306316/determine-if-two-rectangles-overlap-each-other)
        return (this.x < xMax && this.x + this.width > xMin &&
            this.y < yMax && this.y + this.height > yMin);
    }

    update(delta, otherNPCs) {
        if (this.doingAction > 0) {
            this.doingAction -= delta;
        }
        if (this.doingAction < 0) {
            delta += this.doingAction; // Get the difference
        }
        this.move(delta, otherNPCs);

        if (this.doingAction <= 0) {
            if (this.action !== this.STATE.STOP) {
                this.action = this.STATE.STOP;
                this.doingAction = Math.floor(Math.random() * 3) + 2;
            } else {
                let dirx = 0;
                let diry = 0;
                let count = 0;
                do {
                    let previousAction = this.action;
                    this.action = Math.floor(Math.random() * 4) + 1;
                    dirx = 0;
                    diry = 0;
                    switch (this.action) {
                        case this.STATE.RUNNINGNORTH:
                            diry = -1;
                            break;
                        case this.STATE.RUNNINGEAST:
                            dirx = 1;
                            break;
                        case this.STATE.RUNNINGSOUTH:
                            diry = 1;
                            break;
                        case this.STATE.RUNNINGWEST:
                            dirx = -1;
                            break;
                            //default: // STOP
                            //    break;
                    }
                    this.doingAction = Math.floor(Math.random() * 2) + 1;
                    count++;
                } while (count < 5 && this.unitsOverlap(this.units, this.x + dirx * this.speed * delta, this.y + diry * this.speed * delta));
            }
            this.parent.sendMessage("updateUnit", this.getSmallObject(true));
        }
    }

    move(delta, units) {
        this.units = units;
        let dirx = 0;
        let diry = 0;
        switch (this.action) {
            case this.STATE.RUNNINGNORTH:
                diry = -1;
                break;
            case this.STATE.RUNNINGEAST:
                dirx = 1;
                break;
            case this.STATE.RUNNINGSOUTH:
                diry = 1;
                break;
            case this.STATE.RUNNINGWEST:
                dirx = -1;
                break;
                //default: // STOP
                //    break;
        }
        if (!this.unitsOverlap(units, this.x + dirx * this.speed * delta, this.y + diry * this.speed * delta)) {
            this.x += dirx * this.speed * delta;
            this.y += diry * this.speed * delta;
            this._collide(dirx, diry);
        } else {
            this.doingAction = 0; // Change action
        }
    }

    updateUnit(npcObject) {
        if (this.id !== npcObject.id) {
            return false;
        }
        //this.type = npcObject.type;
        //this.x = npcObject.x;
        //this.y = npcObject.y;
        this.health = npcObject.health;
        //this.action = npcObject.action;
        //this.doingAction = npcObject.doingAction;
        return true;
    }

    _collide(dirx, diry) {
        let row, col;
        let left = this.x;
        let right = this.x + this.width - 1;
        let top = this.y;
        let bottom = this.y + this.height - 1;

        if (left < this.bounds.x) {
            this.x = this.bounds.x;
        } else if (right > this.bounds.x + this.bounds.width) {
            this.x = this.bounds.x + this.bounds.width - this.width;
        } else if (top < this.bounds.y) {
            this.y = this.bounds.y;
        } else if (bottom > this.bounds.y + this.bounds.height) {
            this.y = this.bounds.y + this.bounds.height - this.height;
        }

        // check for collisions on sprite sides
        let collision =
            this.map.isSolidTileAtXY(left, top, this.tileLevel) ||
            this.map.isSolidTileAtXY(right, top, this.tileLevel) ||
            this.map.isSolidTileAtXY(right, bottom, this.tileLevel) ||
            this.map.isSolidTileAtXY(left, bottom, this.tileLevel);
        if (!collision) {
            return;
        }

        this.doingAction = 0; // Change action
        if (diry > 0) {
            row = this.map.getRow(bottom);
            this.y = -this.height + this.map.getY(row);
        } else if (diry < 0) {
            row = this.map.getRow(top);
            this.y = this.map.getY(row + 1);
        } else if (dirx > 0) {
            col = this.map.getCol(right);
            this.x = -this.width + this.map.getX(col);
        } else if (dirx < 0) {
            col = this.map.getCol(left);
            this.x = this.map.getX(col + 1);
        }
    }

    addDrop(name, amount, chance) {
        this.possibledrops.push({
            id: Math.floor(Math.random() * 9999999),
            name: name,
            properties: {
                Count: amount
            },
            chance: chance
        });
    }

    getDropItem() {
        this.possibledrops = [];
        switch (this.type) {
            case "Sheep":
                this.addDrop("Empty_bottle_1", 3, 10);
                this.addDrop("Axe_1", 1, 1);
                this.addDrop("Boots_1", 1, 1);
                this.addDrop("Bow_1", 1, 1);
                this.addDrop("Health_bottle_1", 5, 1);
                this.addDrop("Health_bottle_2", 3, 1);
                this.addDrop("Shield_1", 1, 1);
                this.addDrop("Shield_2", 1, 1);
                this.addDrop("Sword_1", 1, 1);
                break;

            case "Goblins":
                this.addDrop("Empty_bottle_4", 3, 10);
                this.addDrop("Armor_1", 1, 1);
                this.addDrop("Axe_2", 1, 1);
                this.addDrop("Boots_2", 1, 1);
                this.addDrop("Bow_2", 1, 1);
                this.addDrop("Health_bottle_3", 5, 1);
                this.addDrop("Helmet_1", 1, 1);
                this.addDrop("Shield_3", 1, 1);
                this.addDrop("Spear", 1, 1);
                this.addDrop("Sword_2", 1, 1);
                break;

            case "Slimes":
                this.addDrop("Armor_2", 1, 1);
                this.addDrop("Axe_3", 1, 1);
                this.addDrop("Boots_3", 1, 1);
                this.addDrop("Bow_3", 1, 1);
                this.addDrop("Health_bottle_4", 3, 1);
                this.addDrop("Helmet_2", 1, 1);
                this.addDrop("Mace", 1, 1);
                this.addDrop("Shield_4", 1, 1);
                this.addDrop("Sword_3", 1, 1);
                break;
        }

        let totalChance = 0;
        this.possibledrops.forEach(drop => {
            totalChance += drop.chance;
        });
        let rand = Math.random() * totalChance;

        for (let i = 0; i < this.possibledrops.length; i++) {
            const drop = this.possibledrops[i];
            if (drop.chance >= rand) {
                drop.x = this.x;
                drop.y = this.y;
                return drop;
            }
            rand -= drop.chance;
        }

        let t = this.possibledrops[Math.floor(Math.random() * this.possibledrops.length)];
        t.x = this.x;
        t.y = this.y;
        return t; // Shouldn't happen
    }

    getSmallObject(stringify) {
        let smallObject = {};
        smallObject.id = this.id;
        smallObject.x = this.x;
        smallObject.y = this.y;
        smallObject.type = this.type;
        smallObject.health = this.health;
        smallObject.action = this.action;
        smallObject.doingAction = this.doingAction;
        return stringify ? JSON.stringify(smallObject) : smallObject;
    }
}

module.exports.NPC = NPC;