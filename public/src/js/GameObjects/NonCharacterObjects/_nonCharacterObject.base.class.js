export default class NonCharacterObject {
    constructor(x, y, width, height, damage, solid) {
        this.x = x; // int
        this.y = y; // int
        this.width = width; // int
        this.height = height; // int
        this.damage = damage; // int
        this.solid = solid; // bool
        this.image = null;
        this.rows = 1;
        this.cols = 1;
        this.tileWidth = 1;
        this.tileHeight = 1;
        this.imageIndex = 0;
        this.increaseRatio = 1;
    }

    setImage(image) {
        this.image = image; // image
        this.rows = 1;
        this.cols = 1;
        this.tileWidth = image.width;
        this.tileHeight = image.height;
        this.imageIndex = 0;
    }

    setTilesImage(image, rows, cols, increaseRatio) {
        this.setImage(image);
        this.rows = rows;
        this.cols = cols;
        this.tileWidth = image.width / cols;
        this.tileHeight = image.height / rows;
        this.imageIndex = 0;
        this.increaseRatio = increaseRatio;
    }

    increaseImageIndex(increase) {
        this.imageIndex += increase * this.increaseRatio;
        if (this.imageIndex >= this.rows * this.cols) {
            this.imageIndex -= this.rows * this.cols;
        }
    }

    getImageIndex() {
        return Math.floor(this.imageIndex);
    }

    update(delta) {
        if (this.image !== null && (this.rows > 1 || this.cols > 1)) {
            this.increaseImageIndex(delta);
        }
    }

    draw(ctx, screenX, screenY) {
        if (this.image === null) {
            this.ctx.fillText("Object", this.x, this.y);
            this.ctx.fillStyle = "purple";
            this.ctx.fillRect(this.x, this.y, this.width, this.height);
        } else {
            ctx.drawImage(
                this.image, // Image
                (this.getImageIndex() % this.cols) * this.tileWidth, // Src x
                Math.floor(this.getImageIndex() / this.cols) * this.tileHeight, // Src y
                this.tileWidth, // Src width
                this.tileHeight, // Src height
                screenX, // Target x
                screenY, // Target y
                this.width, // Target width
                this.height); // Target height
        }
    }
}