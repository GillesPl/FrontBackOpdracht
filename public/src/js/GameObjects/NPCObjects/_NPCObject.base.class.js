import GameObject from "../_GameObject.base.class";

export default class NPCObject extends GameObject {
    constructor(type, x, y, width, height, maxHealth, damage, attackSpeed, speed, xp, passive, map, bounds) {
        super();
        this.type = type;
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.health = maxHealth;
        this.maxHealth = maxHealth;
        this.damage = damage;
        this.map = map;
        this.bounds = bounds;
        this.tileLevel = 0;
        this.damageDone = 0;
        this.attackSpeed = attackSpeed;
        this.speed = speed;
        this.xp = xp;
        this.passive = passive;
        //this.canBePickedUp = false;
        this.STATE = {
            STOP: 0,
            RUNNINGNORTH: 1,
            RUNNINGEAST: 2,
            RUNNINGSOUTH: 3,
            RUNNINGWEST: 4
        };

        this.action = this.STATE.STOP;
        this.doingAction = 0;
        this.imageState = 0;
        this.id = -1;
    }

    hasDamage() {
        return this.damageDone > 0 ? false : this.damage >= 0;
    }

    doDamage() {
        this.damageDone += 1;
        return this.damage;
    }

    getImageIndex() {
        if (this.action === this.STATE.STOP || !this.moving)
            return this.imageState;
        // else
        return this.imageState + this.cols * Math.floor(this.imageIndex);
    }

    getImageX() {
        return this.getImageIndex() % this.rows;
    }

    getImageY() {
        return Math.floor(this.getImageIndex() / this.rows);
    }

    increaseImageIndex(increase) {
        this.imageIndex += increase * this.increaseRatio;
        if (this.imageIndex >= this.cols) {
            this.imageIndex -= this.cols;
        }
    }

    isHit(projectiles) {
        for (let i = 0; i < projectiles.length; i++) {
            const projectile = projectiles[i];
            if (this.isNear(projectile.x, projectile.y, projectile.x + projectile.width, projectile.y + projectile.height)) {
                let damage = projectile.doDamage();
                this.health -= damage;
                this.topText.push({
                    text: "-" + damage,
                    fillStyle: "red",
                    time: 0
                });
                return true;
            }
        }
        return false;
    }

    update(delta, otherNPCs) {
        super.update(delta);
        if (this.damageDone > 0) {
            this.damageDone -= delta;
        }
        if (this.doingAction > 0) {
            this.doingAction -= delta;
        }
        if (this.doingAction <= 0) {
            delta += this.doingAction; // Get the difference
            //this.action = this.STATE.STOP;
        }

        this.move(delta, otherNPCs);
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

        this.moving = false;
        if (!this.unitsOverlap(units, this.x + dirx * this.speed * delta, this.y + diry * this.speed * delta)) {
            this.moving = true;
            this.x += dirx * this.speed * delta;
            this.y += diry * this.speed * delta;
            this._collide(dirx, diry);
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
        this.moving = false;

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

    getSmallObject() {
        let smallObject = {};
        smallObject.id = this.id;
        smallObject.x = this.x;
        smallObject.y = this.y;
        smallObject.type = this.type;
        smallObject.health = this.health;
        smallObject.action = this.action;
        smallObject.doingAction = this.doingAction;
        return JSON.stringify(smallObject);
    }
}