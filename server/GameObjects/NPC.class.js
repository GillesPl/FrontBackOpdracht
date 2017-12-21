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
        this.speed = 196;
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
                if (npc.isInObject(left, top) ||
                    npc.isInObject(right, top) ||
                    npc.isInObject(right, bottom) ||
                    npc.isInObject(left, bottom)) {
                    return true;
                }
            }
        }
        return false;
    }

    isInObject(x, y) {
        return (this.x < x && this.x + this.width > x &&
            this.y < y && this.y + this.height > y);
    }

    update(delta, otherNPCs) {
        if (this.doingAction > 0) {
            this.doingAction -= delta;
        }

        this.move(delta, otherNPCs);

        if (this.doingAction <= 0) {
            if (this.action !== this.STATE.STOP) {
                this.action = this.STATE.STOP;
                this.doingAction = Math.floor(Math.random() * 3) + 2;
            } else {
                let previousAction = this.action;
                this.action = Math.floor(Math.random() * 4) + 1;
                switch (this.action) {
                    case this.STATE.RUNNINGNORTH:
                        this.imageState = 3;
                        break;
                    case this.STATE.RUNNINGEAST:
                        this.imageState = 2;
                        break;
                    case this.STATE.RUNNINGSOUTH:
                        this.imageState = 0;
                        break;
                    case this.STATE.RUNNINGWEST:
                        this.imageState = 1;
                        break;
                        //default: // STOP
                        //    break;
                }
                this.doingAction = Math.floor(Math.random() * 2) + 1;
            }
            this.parent.sendMessage("updateUnit", this.getSmallObject(true));
        }
    }

    move(delta, units) {
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
        } else {
            this.doingAction = 0; // Change action
        }

        this._collide(dirx, diry);
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