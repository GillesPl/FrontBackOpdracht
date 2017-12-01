export default class InventoryObject {
    constructor(stackLimit) {
        this.AREAS = {
            NONE: 0,
            HEAD: 1,
            BODY: 2,
            CAPE: 3,
            BOOTS: 4,
            ONE_HANDED: 5,
            TWO_HANDED: 6
        };
        this.area = this.AREAS.NONE;
        this.equipable = false;
        this.damageOrArmor = 0;
        this.image = null;
        this.rows = 1;
        this.cols = 1;
        this.tileWidth = 1;
        this.tileHeight = 1;
        this.imageIndex = 0;
        this.increaseRatio = 1;
        this.stackLimit = stackLimit;
        this.stackCount = 1;
        this.inventoryLocation = 0;
        this.shownLocation = 0;
        this.isHolding = false;
    }

    setEquipable(area, damageOrArmor) {
        this.equipable = true;
        this.area = area;
        this.damageOrArmor = damageOrArmor;
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

    onMouseDown(mousePosition) {
        if (this.isInObject(mousePosition.x, mousePosition.y)) {
            this.isHolding = true;
        }
    }

    onMouseUp(mousePosition) {
        this.isHolding = false;
    }

    getImageIndex() {
        return Math.floor(this.imageIndex);
    }

    update(delta) {
        if (this.image !== null && (this.rows > 1 || this.cols > 1)) {
            this.increaseImageIndex(delta);
        }
    }

    draw(ctx, screenX, screenY, width, height) {
        this.x = screenX;
        this.y = screenY;
        this.width = width;
        this.height = height;
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
                width, // Target width
                height); // Target height
        }
    }
}