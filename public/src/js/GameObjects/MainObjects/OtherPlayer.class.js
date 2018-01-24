import GameObject from "../_GameObject.base.class";

export default class OtherPlayer extends GameObject {
    constructor(hero, loader, map) {
        super();

        this.x = hero.x;
        this.y = hero.y;
        this.loader = loader;
        this.action = hero.action;
        this.image = this.loader.getImage('otherPlayer');
        this.imagePvp = this.loader.getImage('otherPlayerPVP');
        this.speed = hero.speed;
        this.id = hero.id;
        this.map = map;
        this.pvp = hero.pvp;
        this.health = hero.health;
        this.name = hero.username;
        this.level = hero.level;

        this.imageIndex = 0;
        this.imageState = 0;
        this.width = map.drawSize;
        this.height = map.drawSize;
        this.imageWidth = 48;
        this.imageHeight = 48;
        this.maskWidth = map.drawSize * 0.65;
        this.maskHeight = map.drawSize * 0.8;
        this.tileLevel = 0; // HeighttileLevel
        this.STATE = {
            RUNNINGNORTH: 1,
            RUNNINGEAST: 2,
            RUNNINGSOUTH: 3,
            RUNNINGWEST: 4,
            STOP: 5
        };
    }

    getImageIndex() {
        return this.imageState + 4 * Math.floor(this.imageIndex);
    }

    move(delta) {
        let dirx, diry;

        switch (this.action) {
            case this.STATE.RUNNINGNORTH:
                dirx = 0;
                diry = -1;
                break;
            case this.STATE.RUNNINGEAST:
                dirx = 1;
                diry = 0;
                break;
            case this.STATE.RUNNINGSOUTH:
                dirx = 0;
                diry = 1;
                break;
            case this.STATE.RUNNINGWEST:
                dirx = -1;
                diry = 0;
                break;
            case this.STATE.STOP:
                dirx = 0;
                diry = 0;
                break;
        }
        // move hero
        this.x += dirx * this.speed * delta;
        this.y += diry * this.speed * delta;

        this._calculateImageState(dirx, diry, delta * 8);

        // check if we walked into a non-walkable tile
        this._collide(dirx, diry);
    }

    update(delta) {
        if (this.topText.length > 0) {
            this.topText.forEach(text => {
                text.time += delta;
                if (text.time > 1) {
                    this.topText.splice(this.topText.indexOf(text), 1);
                }
            });
        }
    }

    isHit(projectiles) {
        if (this.pvp) {
            for (let i = 0; i < projectiles.length; i++) {
                const projectile = projectiles[i];
                if (projectile.playerId !== this.id && projectile.playerId !== -1) { // -1 means pvp was off
                    if (this.isNear(projectile.x, projectile.y, projectile.x + projectile.width, projectile.y + projectile.height)) {
                        projectile.doDamage(); // Remove projectile
                        return true;
                    }
                }
            }
        }
        return false;
    }

    draw(ctx, x, y) {
        if (this.health > 0) {
            ctx.drawImage(
                this.pvp ? this.imagePvp : this.image, // Image
                (this.getImageIndex() % 4) * this.imageWidth, // Src x
                Math.floor(this.getImageIndex() / 4) * this.imageHeight, // Src y
                this.imageWidth, // Src width
                this.imageHeight, // Src height
                x - this.width / 2, // Target x
                y - this.height / 2, // Target y
                this.width, // Target width
                this.height); // Target height

            ctx.font = "20px Arial";
            ctx.fillStyle = this.pvp ? "red" : "white";
            ctx.fillText("(lvl: " + this.level + ") - " + this.name, x - this.width / 2, y - 20);

            this.drawTopText(ctx, x - this.width / 2, y - this.height);
        }
    }

    _calculateImageState(dirx, diry, increase) {
        if (dirx !== 0 || diry !== 0) {
            this.imageIndex += increase;
            if (this.imageIndex >= 4) {
                this.imageIndex -= 4;
            }
        } else {
            this.imageIndex = 0;
        }

        if (diry > 0) {
            this.imageState = 0;
        } else if (diry < 0) {
            this.imageState = 2;
        } else if (dirx > 0) {
            this.imageState = 3;
        } else if (dirx < 0) {
            this.imageState = 1;
        }
    }

    _collide(dirx, diry) {
        let row, col;
        // -1 in right and bottom is because image ranges from 0..63
        // and not up to 64
        let left = this.x - this.maskWidth / 2;
        let right = this.x + this.maskWidth / 2 - 1;
        let top = this.y - this.maskHeight / 2;
        let bottom = this.y + this.maskHeight / 2 - 1;

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
            this.y = -this.maskHeight / 2 + this.map.getY(row);
            this.imageIndex = 0;
        } else if (diry < 0) {
            row = this.map.getRow(top);
            this.y = this.maskHeight / 2 + this.map.getY(row + 1);
            this.imageIndex = 0;
        } else if (dirx > 0) {
            col = this.map.getCol(right);
            this.x = -this.maskWidth / 2 + this.map.getX(col);
            this.imageIndex = 0;
        } else if (dirx < 0) {
            col = this.map.getCol(left);
            this.x = this.maskWidth / 2 + this.map.getX(col + 1);
            this.imageIndex = 0;
        }
    }
}