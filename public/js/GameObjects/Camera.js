function Camera(map, width, height) {
    this.x = 0;
    this.y = 0;
    this.width = width;
    this.height = height;
}

Camera.prototype.follow = function (sprite) {
    this.following = sprite;
    sprite.screenX = 0;
    sprite.screenY = 0;
};

Camera.prototype.update = function () {
    this.maxX = map.cols * map.drawSize - this.width;
    this.maxY = map.rows * map.drawSize - this.height;
    minPlayerX = this.width / 3;
    minPlayerY = this.height / 3;
    maxPlayerX = 2 * this.width / 3;
    maxPlayerY = 2 * this.height / 3;

    this.following.screenX = this.following.x - this.x;
    this.following.screenY = this.following.y - this.y;

    if (this.following.screenX > this.width || this.following.screenY > this.height) { // already off screen -> center screen
        this.following.screenX = this.width / 2;
        this.following.screenY = this.height / 2;
        this.x = this.following.x - this.width / 2;
        this.y = this.following.y - this.height / 2;
    }

    if (this.following.screenX < minPlayerX) {
        this.x = this.following.x - minPlayerX;
    } else if (this.following.screenX > maxPlayerX) {
        this.x = this.following.x - maxPlayerX;
    }
    if (this.following.screenY < minPlayerY) {
        this.y = this.following.y - minPlayerY;
    } else if (this.following.screenY > maxPlayerY) {
        this.y = this.following.y - maxPlayerY;
    }

    this.x = Math.max(0, Math.min(this.x, this.maxX));
    this.y = Math.max(0, Math.min(this.y, this.maxY));

    this.following.screenX = this.following.x - this.x;
    this.following.screenY = this.following.y - this.y;

    //// make the camera follow the sprite
    //this.x = this.following.x - this.width / 2;
    //this.y = this.following.y - this.height / 2;
    //// clamp values
    //this.x = Math.max(0, Math.min(this.x, this.maxX));
    //this.y = Math.max(0, Math.min(this.y, this.maxY));
    //
    //// in map corners, the sprite cannot be placed in the center of the screen
    //// and we have to change its screen coordinates
    //
    //// left and right sides
    //if (this.following.x < this.width / 2 ||
    //    this.following.x > this.maxX + this.width / 2) {
    //    this.following.screenX = this.following.x - this.x;
    //}
    //// top and bottom sides
    //if (this.following.y < this.height / 2 ||
    //    this.following.y > this.maxY + this.height / 2) {
    //    this.following.screenY = this.following.y - this.y;
    //}
};