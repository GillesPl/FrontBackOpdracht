export default class Projectile {
    constructor(x, y, angleInRadians, strength, width, height, map) {
        this.x = x;
        this.y = y;
        this.strength = strength;
        this.angleInRadians = angleInRadians;
        this.width = width;
        this.height = height;
        this.map = map;

        this.image = null;
        this.rows = 1;
        this.cols = 1;
        this.tileWidth = 1;
        this.tileHeight = 1;
        this.imageIndex = 0;
        this.increaseRatio = 1;
        this.speed = 512;
        this.destroyed = false;
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
        this.x += Math.cos(this.angleInRadians) * this.speed * delta;
        this.y += Math.sin(this.angleInRadians) * this.speed * delta;
        if (this.map.isSolidTileAtXY(this.x, this.y, 99)) {
            this.destroyed = true;
        }
    }

    draw(ctx, screenX, screenY) {
        if (this.image === null) {
            ctx.fillText("Object", screenX, screenY);
            ctx.fillStyle = "purple";
            ctx.fillRect(screenX, screenY, this.width, this.height);
        } else {
            this.drawRotatedImage(ctx, this.image, screenX, screenY, this.width, this.height,
                (this.getImageIndex() % this.cols) * this.tileWidth, // Src x
                Math.floor(this.getImageIndex() / this.cols) * this.tileHeight, // Src y
                this.tileWidth, // Src width
                this.tileHeight, // Src height
                this.angleInRadians + Math.PI / 4 * 5
            );
        }
    }

    drawRotatedImage(ctx, image, x, y, width, height, sourceX, sourceY, sourceWidth, sourceHeight, angleInRadians) {
        ctx.translate(x, y);
        ctx.rotate(angleInRadians);
        ctx.drawImage(image, sourceX, sourceY, sourceWidth, sourceHeight, -width / 2, -height / 2, width, height);
        ctx.rotate(-angleInRadians);
        ctx.translate(-x, -y);
    }
}