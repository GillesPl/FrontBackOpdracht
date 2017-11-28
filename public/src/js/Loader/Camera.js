export default class Camera {
    constructor(map, width, height) {
        this.width = width;
        this.height = height;
        this.map = map;

        this.x = 0;
        this.y = 0;
    }

    follow(sprite) {
        this.following = sprite;
        sprite.screenX = 0;
        sprite.screenY = 0;
    }

    update() {
        if (this.following === undefined) return;

        this.maxX = this.map.cols * this.map.drawSize - this.width;
        this.maxY = this.map.rows * this.map.drawSize - this.height;

        let minPlayerX = this.width / 3;
        let minPlayerY = this.height / 3;
        let maxPlayerX = 2 * this.width / 3;
        let maxPlayerY = 2 * this.height / 3;

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

    }

    getScreenX(originalX) {
        return originalX - this.x;
    }
    getScreenY(originalY) {
        return originalY - this.y ;
    }

}