Game.render = function () {
    var canvas = document.querySelector("canvas");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    canvas.style.width = window.innerWidth;
    canvas.style.height = window.innerHeight;

    this.ctx.width = window.innerWidth;    
    this.ctx.height = window.innerHeight;
    this.camera.width = window.innerWidth;
    this.camera.height = window.innerHeight;

    this.ctx.globalAlpha = 1;
    this.ctx.imageSmoothingEnabled = false;
    // draw map background layer
    for (var i = 0; i < 11; i++)
        this._drawLayer(i);

    // draw main character
    this.ctx.drawImage(
        this.hero.image,
        this.hero.screenX - this.hero.width / 2,
        this.hero.screenY - this.hero.height / 2,
        this.hero.width,
        this.hero.height);

    // draw map top layer
    for (i = 11; i < 13; i++)
        this._drawLayer(i);

    this.ctx.globalAlpha = 0.5;
    this._drawLayer(13);
    //this._drawGrid();
    var tx = 10,
        ty = 0,
        dy = 40;
    this.ctx.font = "30px Arial";
    this.ctx.fillStyle = "white";
    this.ctx.fillText("Player:", 10, ty += dy);
    this.ctx.fillText("x: " + this.hero.x, 10, ty += dy);
    this.ctx.fillText("y: " + this.hero.y, 10, ty += dy);
};

Game._drawLayer = function (layer) {
    var startCol = Math.floor(this.camera.x / map.drawSize);
    var endCol = startCol + (this.ctx.width / map.drawSize) + 1;
    var startRow = Math.floor(this.camera.y / map.drawSize);
    var endRow = startRow + (this.ctx.height / map.drawSize) + 1;
    var offsetX = -this.camera.x + startCol * map.drawSize;
    var offsetY = -this.camera.y + startRow * map.drawSize;

    for (var c = startCol; c <= endCol; c++) {
        for (var r = startRow; r <= endRow; r++) {
            var tile = map.getTile(layer, c, r);
            var x = (c - startCol) * map.drawSize + offsetX;
            var y = (r - startRow) * map.drawSize + offsetY;
            if (tile !== 0) { // 0 => empty tile
                this.ctx.drawImage(
                    this.tileAtlas, // image
                    (tile % map.twidth - 1) * (map.tsize + 1), // source x
                    (Math.floor(tile / map.twidth)) * (map.tsize + 1), // source y
                    map.tsize, // source width
                    map.tsize, // source height
                    Math.round(x), // target x
                    Math.round(y), // target y
                    map.drawSize, // target width
                    map.drawSize // target height
                );
            }
        }
    }
};

Game._drawGrid = function () {
    var width = map.cols * map.tsize;
    var height = map.rows * map.tsize;
    var x, y;
    for (var r = 0; r < map.rows; r++) {
        x = -this.camera.x;
        y = r * map.tsize - this.camera.y;
        this.ctx.beginPath();
        this.ctx.moveTo(x, y);
        this.ctx.lineTo(width, y);
        this.ctx.stroke();
    }
    for (var c = 0; c < map.cols; c++) {
        x = c * map.tsize - this.camera.x;
        y = -this.camera.y;
        this.ctx.beginPath();
        this.ctx.moveTo(x, y);
        this.ctx.lineTo(x, height);
        this.ctx.stroke();
    }
};