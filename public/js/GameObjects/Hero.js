function Hero(map, x, y) {
    this.map = map;
    this.x = x;
    this.y = y;
    this.width = map.drawSize;
    this.height = map.drawSize;
    this.maskWidth = map.drawSize * 0.75;
    this.maskHeight = map.drawSize * 0.8;

    this.STATE = {
        RUNNINGNORTH :  1,
        RUNNINGEAST : 2,
        RUNNINGSOUTH : 3,
        RUNNINGWEST : 4,
        STOP : 5
    }

    this.action = this.STATE.STOP;

    this.image = Loader.getImage('hero');
}

Hero.SPEED = 256; // pixels per second

Hero.prototype.move = function (delta, dirx, diry) {
    // move hero
    this.x += dirx * Hero.SPEED * delta;
    this.y += diry * Hero.SPEED * delta;

    // check if we walked into a non-walkable tile
    this._collide(dirx, diry);

    // clamp values
    var maxX = this.map.cols * this.map.drawSize;
    var maxY = this.map.rows * this.map.drawSize;
    this.x = Math.max(0, Math.min(this.x, maxX));
    this.y = Math.max(0, Math.min(this.y, maxY));
};

Hero.prototype._collide = function (dirx, diry) {
    var row, col;
    // -1 in right and bottom is because image ranges from 0..63
    // and not up to 64
    var left = this.x - this.maskWidth / 2;
    var right = this.x + this.maskWidth / 2 - 1;
    var top = this.y - this.maskHeight / 2;
    var bottom = this.y + this.maskHeight / 2 - 1;

    // check for collisions on sprite sides
    var collision =
        this.map.isSolidTileAtXY(left, top) ||
        this.map.isSolidTileAtXY(right, top) ||
        this.map.isSolidTileAtXY(right, bottom) ||
        this.map.isSolidTileAtXY(left, bottom);
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
};