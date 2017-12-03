export default class InventoryObject {
    constructor(typeId, stackLimit, stackCount) {
        this.AREAS = {
            NONE: 0,
            HEAD: 1,
            BODY: 2,
            CAPE: 3,
            BOOTS: 4,
            ONE_HANDED: 5,
            OFF_HAND: 6
        };

        this.typeId = typeId;
        this.area = this.AREAS.NONE;
        this.isEquipable = false;
        this.armor = 0;
        this.image = null;
        this.rows = 1;
        this.cols = 1;
        this.tileWidth = 1;
        this.tileHeight = 1;
        this.imageIndex = 0;
        this.increaseRatio = 1;
        this.stackLimit = stackLimit;
        this.stackCount = stackCount > stackLimit ? stackLimit : stackCount;
        this.inventoryLocation = 0;
        this.shownLocation = 0;
        this.isHolding = false;
        this.actionLocation = -1;
    }

    setEquipable(area, armor) {
        this.isEquipable = true;
        this.area = area;
        this.armor = armor;
        this.isEquiped = false;
    }

    setEquiped(equiped, emptyPosition) {
        this.isHolding = false;
        this.isEquiped = equiped;
        this.inventoryLocation = emptyPosition;
        this.shownLocation = emptyPosition;
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
            if (!this.isEquiped) {
                this.isHolding = true;
            } else {
                this.setEquiped(false, -2);
            }
        }
    }

    onMouseUp(mousePosition) {
        this.isHolding = false;
    }

    getImageIndex() {
        return Math.floor(this.imageIndex);
    }

    update(delta, allInventoryPositions) {
        if (this.image !== null && (this.rows > 1 || this.cols > 1)) {
            this.increaseImageIndex(delta);
        }

        if (this.inventoryLocation === -2) {
            if (allInventoryPositions.length !== 0) {
                this.inventoryLocation = allInventoryPositions[allInventoryPositions.length - 1];
                this.shownLocation = allInventoryPositions[allInventoryPositions.length - 1];
            } else {
                this.setEquiped(true, -1);
            }
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