export default class NPCObject {
    constructor(x, y, width, height, health, damage, attackSpeed, speed, passive, map, bounds) {
        this.x = x; // int
        this.y = y; // int
        this.width = width; // int
        this.height = height; // int
        this.health = health; // int
        this.damage = damage; // int
        this.map = map;
        this.bounds = bounds;
        this.tileLevel = 0;
        this.damageDone = 0;
        this.attackSpeed = attackSpeed;
        this.speed = speed;
        this.passive = passive;
        this.image = null;
        this.rows = 1;
        this.cols = 1;
        this.tileWidth = 1;
        this.tileHeight = 1;
        this.imageIndex = 0;
        this.increaseRatio = 1;
        this.canBePickedUp = false;
        this.STATE = {
            STOP: 0,
            RUNNINGNORTH: 1,
            RUNNINGEAST: 2,
            RUNNINGSOUTH: 3,
            RUNNINGWEST: 4
        };

        this.action = this.STATE.STOP;
        this.doingAction = 0;
    }

    hasDamage() {
        return this.damageDone > 0 ? false : this.damage >= 0;
    }

    doDamage() {
        this.damageDone += 1;
        return this.damage;
    }

    setImage(image) {
        this.image = image; // image
        this.rows = 1;
        this.cols = 1;
        this.tileWidth = image.width;
        this.tileHeight = image.height;
        this.imageIndex = 0;
        this.imageState = 0;
    }

    setTilesImage(image, rows, cols, increaseRatio) {
        this.setImage(image);
        this.rows = rows;
        this.cols = cols;
        this.tileWidth = image.width / cols;
        this.tileHeight = image.height / rows;
        this.imageIndex = 0;
        this.increaseRatio = increaseRatio;
    }

    isInObject(x, y) {
        return (this.x < x && this.x + this.width > x &&
            this.y < y && this.y + this.height > y);
    }

    isNear(xMin, yMin, xMax, yMax) {
        // DON'T EDIT IF YOU DON'T UNDERSTAND! (source: https://stackoverflow.com/questions/306316/determine-if-two-rectangles-overlap-each-other)
        //console.log('isNear: ' + (this.x < xMax) + ' && ' + (this.x + this.width > xMin) + ' && ' +
        //   (this.y < yMax) + ' && ' + (this.y + this.height > yMin));
        return (this.x < xMax && this.x + this.width > xMin &&
            this.y < yMax && this.y + this.height > yMin);
    }

    increaseImageIndex(increase) {
        this.imageIndex += increase * this.increaseRatio;
        if (this.imageIndex >= this.cols) {
            this.imageIndex -= this.cols;
        }
    }

    getImageIndex() {
        if (this.action === this.STATE.STOP)
            return this.imageState;
        // else
        return this.imageState + this.cols * Math.floor(this.imageIndex);
    }

    update(delta, otherNPCs) {
        if (this.image !== null && (this.rows > 1 || this.cols > 1) && this.action !== this.STATE.STOP) {
            this.increaseImageIndex(delta);
        }
        if (this.damageDone > 0) {
            this.damageDone -= delta;
        }
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
                this.imageIndex = 0;
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
        }

        this._collide(dirx, diry);
    }

    draw(ctx, screenX, screenY) {
        if (this.image === null) {
            this.ctx.fillText("Object", this.x, this.y);
            this.ctx.fillStyle = "purple";
            this.ctx.fillRect(this.x, this.y, this.width, this.height);
        } else {
            ctx.drawImage(
                this.image, // Image
                (this.getImageIndex() % this.rows) * this.tileWidth, // Src x
                Math.floor(this.getImageIndex() / this.rows) * this.tileHeight, // Src y
                this.tileWidth, // Src width
                this.tileHeight, // Src height
                screenX, // Target x
                screenY, // Target y
                this.width, // Target width
                this.height); // Target height
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
                if (npc.isInObject(left, top) ||
                    npc.isInObject(right, top) ||
                    npc.isInObject(right, bottom) ||
                    npc.isInObject(left, bottom)) {
                    this.imageIndex = 0;
                    return true;
                }
            }
        }
        return false;
    }

    _collide(dirx, diry) {
        let row, col;
        let left = this.x;
        let right = this.x + this.width - 1;
        let top = this.y;
        let bottom = this.y + this.height - 1;

        if (left < this.bounds.x) {
            this.x = this.bounds.x;
            this.imageIndex = 0;
        } else if (right > this.bounds.x + this.bounds.width) {
            this.x = this.bounds.x + this.bounds.width - this.width;
            this.imageIndex = 0;
        } else if (top < this.bounds.y) {
            this.y = this.bounds.y;
            this.imageIndex = 0;
        } else if (bottom > this.bounds.y + this.bounds.height) {
            this.y = this.bounds.y + this.bounds.height - this.height;
            this.imageIndex = 0;
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

        if (diry > 0) {
            row = this.map.getRow(bottom);
            this.y = -this.height + this.map.getY(row);
            this.imageIndex = 0;
        } else if (diry < 0) {
            row = this.map.getRow(top);
            this.y = this.map.getY(row + 1);
            this.imageIndex = 0;
        } else if (dirx > 0) {
            col = this.map.getCol(right);
            this.x = -this.width + this.map.getX(col);
            this.imageIndex = 0;
        } else if (dirx < 0) {
            col = this.map.getCol(left);
            this.x = this.map.getX(col + 1);
            this.imageIndex = 0;
        }
    }
}