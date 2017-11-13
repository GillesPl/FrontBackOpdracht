export default class Hero {
    constructor(map,x,y,Loader) {
        this.map = map;
        this.x = x;
        this.y = y;

        this.Loader = Loader;

        this.width = map.drawSize;
        this.height = map.drawSize;
        this.maskWidth = map.drawSize * 0.75;
        this.maskHeight = map.drawSize * 0.85;
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
    }
    

    move(delta, dirx,diry) {
        this._calculateTileLevel();
        // move hero
        this.x += dirx * this.speed * delta;
        this.y += diry * this.speed * delta;
    
        // check if we walked into a non-walkable tile
        this._collide(dirx, diry);
    
        // clamp values
        let maxX = this.map.cols * this.map.drawSize;
        let maxY = this.map.rows * this.map.drawSize;
        this.x = Math.max(0, Math.min(this.x, maxX));
        this.y = Math.max(0, Math.min(this.y, maxY));
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

    _collide(dirx,diry) {
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
