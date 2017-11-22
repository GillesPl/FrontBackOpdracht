export default class OtherPlayer {
    constructor(hero, Loader, map) {
        this.x = hero.x;
        this.y = hero.y;
        this.Loader = Loader;

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

        this.action = hero.action;
        this.image = this.Loader.getImage('otherPlayer');
        this.speed = hero.speed;
        this.id = hero.id;
        this.map = map;
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

        // TODO: Ban hackers (collide)
    }

    draw(ctx, x, y) {
        //console.log({
        //    image: this.image, // Image
        //    sx: (this.getImageIndex() % 4) * this.imageWidth, // Src x
        //    sy: Math.floor(this.getImageIndex() / 4) * this.imageHeight, // Src y
        //    sw: this.imageWidth, // Src width
        //    sh: this.imageHeight, // Src height
        //    tx: x - this.width / 2, // Target x
        //    ty: y - this.height / 2, // Target y
        //    tw: this.width, // Target width
        //    th: this.height // Target height
        //});

        ctx.drawImage(
            this.image, // Image
            (this.getImageIndex() % 4) * this.imageWidth, // Src x
            Math.floor(this.getImageIndex() / 4) * this.imageHeight, // Src y
            this.imageWidth, // Src width
            this.imageHeight, // Src height
            x - this.width / 2, // Target x
            y - this.height / 2, // Target y
            this.width, // Target width
            this.height); // Target height
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