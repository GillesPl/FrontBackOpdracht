export default class OtherPlayer {
    constructor(hero, Loader, map) {
        this.x = hero.x;
        this.y = hero.y;
        this.Loader = Loader;

        this.width = hero.width;
        this.height = hero.height;
        this.maskWidth = hero.width * 0.75;
        this.maskHeight = hero.height * 0.85;
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

        // check if we walked into a non-walkable tile
        this._collide(dirx, diry);
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
        } else if (diry < 0) {
            row = this.map.getRow(top);
            this.y = this.maskHeight / 2 + this.map.getY(row + 1);
        } else if (dirx > 0) {
            col = this.map.getCol(right);
            this.x = -this.maskWidth / 2 + this.map.getX(col);
        } else if (dirx < 0) {
            col = this.map.getCol(left);
            this.x = this.maskWidth / 2 + this.map.getX(col + 1);
        }
    }
}