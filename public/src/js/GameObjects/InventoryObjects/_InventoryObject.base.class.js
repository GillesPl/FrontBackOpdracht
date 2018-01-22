import GameObject from "../_GameObject.base.class";

export default class InventoryObject extends GameObject {
    constructor(typeId, stackLimit, stackCount, inventoryLocation, actionLocation) {
        super();
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
        this.usedObject = "";
        this.isEquipable = false;
        this.isEquiped = false;
        this.isUsable = false;
        this.strength = 0;
        this.interval = 0;
        this.stackLimit = stackLimit;
        this.stackCount = stackCount > stackLimit ? stackLimit : stackCount;
        this.shownLocation = 0;
        this.isHolding = false;
        this.isMouseInObject = false;
        this.mouseInObjectTime = 0;
        this.levelRequired = 0;
        this.inventoryLocation = (inventoryLocation === undefined) ? -1 : inventoryLocation;
        this.actionLocation = (actionLocation === undefined) ? -1 : actionLocation;
    }

    setEquipable(area, strength, isEquiped) {
        this.isEquipable = true;
        this.area = area;
        this.strength = strength;
        this.isEquiped = false;
        if (isEquiped) {
            this.setEquiped(true, -1);
            this.shownLocation = -1;
        }
        this.isUsable = false;
    }

    setUsable(usage, strength, usedObject) {
        this.isUsable = true;
        this.usage = usage;
        this.strength = strength;
        this.usedObject = usedObject;
        this.isEquipable = false;
    }

    setWeapon(type, strength, intervalTime, createObjectName, levelRequired) {
        this.weapontype = type;
        this.strength = strength;
        this.createObjectName = createObjectName;
        this.levelRequired = levelRequired;
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
        //this.shownLocation = this.inventoryLocation;
    }

    onMouseMove(mousePosition) {
        this.isMouseInObject = this.isInObject(mousePosition.x, mousePosition.y);
    }

    getSmallObject() {
        let smallObject = {};
        smallObject.name = this.typeId;
        smallObject.count = this.stackCount;
        smallObject.inventoryLocation = this.inventoryLocation;
        smallObject.actionLocation = this.actionLocation;
        smallObject.isEquipped = this.isEquiped;
        return smallObject;
    }

    update(delta, emptyPosition) {
        super.update(delta);
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
        if (this.isMouseInObject) {
            this.mouseInObjectTime += delta;
        } else {
            this.mouseInObjectTime = 0;
        }
    }

    draw(ctx, screenX, screenY, width, height) {
        this.x = screenX;
        this.y = screenY;
        this.width = width;
        this.height = height;
        super.draw(ctx, screenX, screenY);

        if (this.interval !== 0) {
            let percentage = (this.interval / this.intervalTime);
            let angle = percentage * 2 * Math.PI;

            ctx.beginPath();
            ctx.moveTo(screenX + width, screenY + width / 2);
            ctx.lineTo(screenX + width / 2, screenY + width / 2);
            ctx.moveTo(screenX + width / 2, screenY + width / 2);
            ctx.lineTo(screenX + width / 2 + width / 2 * Math.cos(angle), screenY + width / 2 + width / 2 * Math.sin(angle));
            ctx.moveTo(screenX + width / 2, screenY + width / 2);
            ctx.arc(screenX + width / 2, screenY + width / 2, width / 2, 0, angle);
            ctx.fillStyle = 'rgba(' + (Math.floor(percentage * 200) + 30) + ', ' + (Math.floor((1 - percentage) * 200) + 30) + ', 60, 0.8)';
            ctx.fill();
            ctx.closePath();
        }

        if (this.mouseInObjectTime > 0.5 && !this.isHolding) {
            ctx.globalAlpha = (this.mouseInObjectTime > 1.5) ? 0.8 : (this.mouseInObjectTime - 0.5) * 0.8;
            let borderWidth = 3;
            ctx.fillStyle = "#a7815a";
            ctx.fillRect(screenX - width * 2.5 - borderWidth, screenY - borderWidth, width * 2.5 + 2 * borderWidth, height * 3 + 2 * borderWidth);
            ctx.fillStyle = "#97714a";
            ctx.fillRect(screenX - width * 2.5, screenY, width * 2.5, height * 3);

            let drawX = screenX - width * 2.5 + 8;
            let drawY = screenY;
            let dy = 24;
            ctx.font = "18px Arial";
            if (this.isEquipable) {
                ctx.fillStyle = "#106010";
                ctx.fillText("Equipable", drawX, drawY += dy);
                ctx.fillText(this.typeId, drawX, drawY += dy);
                ctx.fillStyle = "white";
                ctx.fillText("Armor: " + this.strength, drawX, drawY += dy);
            } else if (this.isUsable) {
                ctx.fillStyle = "#601010";
                ctx.fillText("Usable", drawX, drawY += dy);
                ctx.fillText(this.typeId, drawX, drawY += dy);
                ctx.fillStyle = "white";
                ctx.fillText("Effect: " + this.strength, drawX, drawY += dy);
            } else if (this.weapontype !== this.WEAPONTYPES.NONE) {
                ctx.fillStyle = "#101060";
                ctx.fillText("Weapon", drawX, drawY += dy);
                ctx.fillText(this.typeId, drawX, drawY += dy);
                ctx.fillStyle = "white";
                ctx.fillText("Damage: " + this.strength, drawX, drawY += dy);
                ctx.fillText("Reload time: " + this.intervalTime + "s", drawX, drawY += dy);
                ctx.fillText("Dps: " + Math.round(this.strength / this.intervalTime * 100) / 100 + "/s", drawX, drawY += dy);
                if (this.levelRequired > 1) {
                    ctx.fillText("Level required: " + this.levelRequired, drawX, drawY += dy);
                }
            } else {
                ctx.fillStyle = "#606060";
                ctx.fillText(this.typeId, drawX, drawY += dy);
            }
            ctx.fillText("Stack: " + this.stackCount + "/" + this.stackLimit, drawX, drawY += dy);

            ctx.globalAlpha = 1;
        }
    }
}