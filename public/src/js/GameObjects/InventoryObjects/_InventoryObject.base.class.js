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
        this.USES = {
            NONE: 0,
            HEALTH: 1
        };
        this.WEAPONTYPES = {
            NONE: 0,
            RANGED: 1,
            MELEE: 2
        };

        this.typeId = typeId;
        this.area = this.AREAS.NONE;
        this.usage = this.USES.NONE;
        this.weapontype = this.WEAPONTYPES.NONE;
        this.createObjectName = "none";
        this.usedObject = null;
        this.isEquipable = false;
        this.isUsable = false;
        this.strength = 0;
        this.interval = 0;
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

    setEquipable(area, strength) {
        this.isEquipable = true;
        this.area = area;
        this.strength = strength;
        this.isEquiped = false;
        this.isUsable = false;
    }

    setUsable(usage, strength, usedObject) {
        this.isUsable = true;
        this.usage = usage;
        this.strength = strength;
        this.usedObject = usedObject;
        this.isEquipable = false;
    }

    setWeapon(type, strength, intervalTime, createObjectName) {
        this.weapontype = type;
        this.strength = strength;
        this.createObjectName = createObjectName;
        this.isUsable = false;
        this.isEquipable = false;
        this.interval = 0;
        this.intervalTime = intervalTime;
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

    update(delta, emptyPosition) {
        if (this.image !== null && (this.rows > 1 || this.cols > 1)) {
            this.increaseImageIndex(delta);
        }

        if (this.inventoryLocation === -2) {
            if (emptyPosition !== false) {
                this.inventoryLocation = emptyPosition;
                this.shownLocation = emptyPosition;
            } else {
                this.setEquiped(true, -1);
            }
        }
        if (this.interval !== 0) {
            this.interval -= delta;
            if (this.interval < 0) {
                this.interval = 0;
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

        if (this.interval !== 0) {
            let angle = (this.interval / this.intervalTime) * 2 * Math.PI;

            ctx.beginPath();
            ctx.moveTo(screenX + width, screenY + width / 2);
            ctx.lineTo(screenX + width / 2, screenY + width / 2);
            ctx.moveTo(screenX + width / 2, screenY + width / 2);
            ctx.lineTo(screenX + width / 2 + width / 2 * Math.cos(angle), screenY + width / 2 + width / 2 * Math.sin(angle));
            ctx.moveTo(screenX + width / 2, screenY + width / 2);
            ctx.arc(screenX + width / 2, screenY + width / 2, width / 2, 0, angle);
            ctx.fillStyle = "black";
            ctx.globalAlpha = 0.4;
            ctx.fill();
            ctx.closePath();
            ctx.globalAlpha = 1;
        }
    }
}