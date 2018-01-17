export default class Hero {
    constructor(map, x, y, id, health, tileLevel, token, Loader) {
        this.map = map;
        this.x = x;
        this.y = y;
        this.startX = x;
        this.startY = y;
        this.Loader = Loader;
        this.debugging = false;
        this.topText = [];
        this.token = token;

        this.health = health;
        this.maxHealth = 100;
        this.armor = 0;

        this.imageIndex = 0;
        this.imageState = 0;
        this.width = map.drawSize;
        this.height = map.drawSize;
        this.imageWidth = 48;
        this.imageHeight = 48;
        this.maskWidth = map.drawSize * 0.65;
        this.maskHeight = map.drawSize * 0.8;
        this.tileLevel = tileLevel; // HeighttileLevel
        this.STATE = {
            RUNNINGNORTH: 1,
            RUNNINGEAST: 2,
            RUNNINGSOUTH: 3,
            RUNNINGWEST: 4,
            STOP: 5
        };

        this.action = this.STATE.STOP;
        this.image = this.Loader.getImage('hero');
        this.deathAnimation = this.Loader.getImage('death');
        this.deathAnimationCols = 5;
        this.deathAnimationRows = 3;
        this.deadTime = 0;
        this.totalDeadTime = 1;
        this.dead = false;
        this.resurected = false;

        this.speed = 256;
        this.id = id;

        if (this.debugging) {
            this.speed = 512;
        }
    }

    getSmallObject(inventory) {
        let smallObject = {};
        smallObject.token = this.token;
        smallObject.id = this.id;
        smallObject.x = Math.floor(this.x * 100) / 100;
        smallObject.y = Math.floor(this.y * 100) / 100;
        smallObject.action = this.action;
        smallObject.tileLevel = this.tileLevel;
        smallObject.health = this.health;
        smallObject.speed = this.speed;
        smallObject.width = this.width;
        smallObject.height = this.height;
        smallObject.resurected = this.resurected;
        smallObject.items = inventory;
        return JSON.stringify(smallObject);
    }

    getPlayerBounds() {
        return {
            xMin: this.x - this.maskWidth / 2,
            yMin: this.y - this.maskHeight / 2,
            xMax: this.x + this.maskWidth / 2,
            yMax: this.y + this.maskHeight / 2
        };
    }

   /* generateId() {
        function s4() {
            return Math.floor((1 + Math.random()) * 0x10000)
                .toString(16)
                .substring(1);
        }

        function time() {
            return Math.floor((1 + (new Date()).getTime()) * 0x10000)
                .toString(16)
                .substring(1);
        }
        return time() + '-' + s4() + '-' + s4() + '-' +
            s4() + '-' + s4() + s4() + s4();
    }*/


    move(delta, dirx, diry) {
        if (this.dead) return;
        this._calculateTileLevel();

        this._calculateImageState(dirx, diry, delta * 8);

        // move hero
        this.x += dirx * this.speed * delta;
        this.y += diry * this.speed * delta;

        // check if we walked into a non-walkable tile
        if (!this.debugging) {
            this._collide(dirx, diry);
        }

        // clamp values
        let maxX = this.map.cols * this.map.drawSize;
        let maxY = this.map.rows * this.map.drawSize;
        this.x = Math.max(0, Math.min(this.x, maxX));
        this.y = Math.max(0, Math.min(this.y, maxY));
    }

    getImageIndex() {
        if (this.dead) return (Math.floor(this.deadTime / this.totalDeadTime * (this.deathAnimationCols * this.deathAnimationRows)));
        return this.imageState + 4 * Math.floor(this.imageIndex);
    }

    setDirection(state) {
        switch (state) {
            case this.STATE.RUNNINGEAST:
                this._calculateImageState(1, 0, 0);
                break;
            case this.STATE.RUNNINGNORTH:
                this._calculateImageState(0, -1, 0);
                break;
            case this.STATE.RUNNINGSOUTH:
                this._calculateImageState(0, 1, 0);
                break;
            case this.STATE.RUNNINGWEST:
                this._calculateImageState(-1, 0, 0);
                break;

            default:
                this._calculateImageState(0, 0, 0);
                break;
        }
    }

    takeDamage(damage) {
        if (this.dead) return;
        let damageTaken = damage - this.armor;
        if (damageTaken <= 0) return; // No damage done

        this.topText.push({
            text: "-" + damageTaken,
            fillStyle: "red",
            time: 0
        });

        this.health -= damageTaken;
        if (this.health <= 0) { // Die
            this.die();
        }
    }

    die() {
        this.deadTime = 0;
        this.dead = true;
    }

    heal(extraHealth) {
        if (this.dead) return;
        let maxExtra = this.maxHealth - this.health;
        let healthTaken = maxExtra < extraHealth ? maxExtra : extraHealth;
        if (healthTaken <= 0) return false; // No health gain

        this.topText.push({
            text: "+" + healthTaken,
            fillStyle: "green",
            time: 0
        });

        this.health += healthTaken;
        return true;
    }

    update(delta) {
        if (this.dead) {
            if (this.deadTime >= this.totalDeadTime) {
                this.dead = false;
                this.x = this.startX;
                this.y = this.startY;
                this.health = this.maxHealth;
                this.topText = [];
                this.topText.push({
                    text: "died",
                    fillStyle: "black",
                    time: 0
                });
                this.resurected = true;
            } else {
                this.deadTime += delta;
            }
        } else {
            if (this.resurected) {
                this.resurected = false;
            }
            if (this.topText.length > 0) {
                this.topText.forEach(text => {
                    text.time += delta;
                    if (text.time > 2) {
                        this.topText.splice(this.topText.indexOf(text), 1);
                    }
                });
            }
        }
    }

    draw(ctx) {
        if (this.dead) {
            let width = this.deathAnimation.width / this.deathAnimationCols;
            let height = this.deathAnimation.height / this.deathAnimationRows;
            ctx.drawImage(
                this.deathAnimation, // Image
                (this.getImageIndex() % this.deathAnimationCols) * width, // Src x
                Math.floor(this.getImageIndex() / this.deathAnimationCols) * height, // Src y
                width, // Src width
                height, // Src height
                this.screenX - this.width / 2, // Target x
                this.screenY - this.height / 2, // Target y
                this.width, // Target width
                this.height); // Target height
        } else {
            ctx.drawImage(
                this.image, // Image
                (this.getImageIndex() % 4) * this.imageWidth, // Src x
                Math.floor(this.getImageIndex() / 4) * this.imageHeight, // Src y
                this.imageWidth, // Src width
                this.imageHeight, // Src height
                this.screenX - this.width / 2, // Target x
                this.screenY - this.height / 2, // Target y
                this.width, // Target width
                this.height); // Target height

            if (this.topText.length > 0) {
                ctx.font = "20px Arial";
                this.topText.forEach(text => {
                    ctx.fillStyle = text.fillStyle;
                    ctx.fillText(text.text, this.screenX - 15, this.screenY - this.height * (0.3 + text.time / 2));
                });
            }
        }
    }

    _calculateTileLevel() {
        let newTileLevel = this.map.getTileLevelAtXY(this.x, this.y);
        if (newTileLevel != -1) {
            if (this.tileLevel != newTileLevel) {
                //console.log('switch from level ' + this.tileLevel + ' to level ' + newTileLevel);
                this.tileLevel = newTileLevel;
            }
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