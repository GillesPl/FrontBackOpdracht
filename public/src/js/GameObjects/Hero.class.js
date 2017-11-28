export default class Hero {
    constructor(map, x, y, Loader) {
        this.map = map;
        this.x = x;
        this.y = y;
        this.Loader = Loader;
        this.debugging = true;

        this.health = 80;
        this.shield = 50;

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

        this.action = this.STATE.STOP;
        this.image = this.Loader.getImage('hero');

        this.speed = 256;
        this.id = this.generateId();

        if (this.debugging) {
            this.speed = 512;
        }
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
        return smallObject;
    }

    generateId() {
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
    }


    move(delta, dirx, diry) {
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
        return this.imageState + 4 * Math.floor(this.imageIndex);
    }

    draw(ctx) {
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