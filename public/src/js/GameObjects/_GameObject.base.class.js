export default class GameObject {
    constructor() {
        this.image = null;
        this.rows = 1;
        this.cols = 1;
        this.tileWidth = 1;
        this.tileHeight = 1;
        this.imageIndex = 0;
        this.increaseRatio = 1;
        this.topText = [];
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

    isInObject(x, y) {
        return (this.x < x && this.x + this.width > x &&
            this.y < y && this.y + this.height > y);
    }

    isNear(xMin, yMin, xMax, yMax) {
        // (source: https://stackoverflow.com/questions/306316/determine-if-two-rectangles-overlap-each-other)
        return (this.x < xMax && this.x + this.width > xMin &&
            this.y < yMax && this.y + this.height > yMin);
    }

    getImageIndex() {
        return Math.floor(this.imageIndex);
    }

    getImageX() {
        return this.getImageIndex() % this.cols;
    }

    getImageY() {
        return Math.floor(this.getImageIndex() / this.cols);
    }

    update(delta) {
        if (this.image !== null && (this.rows > 1 || this.cols > 1)) {
            this.increaseImageIndex(delta);
        }
        if (this.topText.length > 0) {
            this.topText.forEach(text => {
                text.time += delta;
                if (text.time > 1) {
                    this.topText.splice(this.topText.indexOf(text), 1);
                }
            });
        }
    }

    draw(ctx, screenX, screenY) {
        if (this.image === null) {
            ctx.fillText("Object", screenX, screenY);
            ctx.fillStyle = "purple";
            ctx.fillRect(screenX, screenY, this.width, this.height);
        } else {
            ctx.drawImage(
                this.image, // Image
                this.getImageX() * this.tileWidth, // Src x
                this.getImageY() * this.tileHeight, // Src y
                this.tileWidth, // Src width
                this.tileHeight, // Src height
                screenX, // Target x
                screenY, // Target y
                this.width, // Target width
                this.height); // Target height
        }

        if (this.topText.length > 0) {
            ctx.font = "20px Arial";
            this.topText.forEach(text => {
                ctx.fillStyle = text.fillStyle;
                ctx.fillText(text.text, screenX + 15, screenY - this.height * (0.3 + text.time));
            });
        }
    }

    drawRotatedImage(ctx, image, sourceX, sourceY, sourceWidth, sourceHeight, x, y, width, height, angleInRadians) {
        ctx.translate(x, y);
        ctx.rotate(angleInRadians);
        ctx.drawImage(image, sourceX, sourceY, sourceWidth, sourceHeight, -width / 2, -height / 2, width, height);
        ctx.rotate(-angleInRadians);
        ctx.translate(-x, -y);
    }
}