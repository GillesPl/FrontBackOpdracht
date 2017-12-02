import InventoryIcon from "./InventoryIcon.class";

export default class InventoryManager {
    constructor(inventoryObjects, Loader) {
        this.inventory = [];
        let i = 0;
        inventoryObjects.forEach(inventoryObject => {
            this.inventory.forEach(oldObject => {
                if (inventoryObject.stackCount > 0) {
                    if (oldObject.typeId === inventoryObject.typeId && oldObject.stackCount < oldObject.stackLimit) {
                        let max = oldObject.stackLimit - oldObject.stackCount;
                        if (inventoryObject.stackCount > max) {
                            inventoryObject.stackCount -= max;
                            oldObject.stackCount += max;
                        } else {
                            oldObject.stackCount += inventoryObject.stackCount;
                            inventoryObject.stackCount = 0;
                        }
                    }
                }
            });
            if (inventoryObject.stackCount > 0) {
                inventoryObject.shownLocation = i;
                inventoryObject.inventoryLocation = i++;
                this.inventory.push(inventoryObject);
            }
        });



        //this.inventory = inventoryObjects;
        //let i = 0;
        //this.inventory.forEach(inventoryObject => {
        //    inventoryObject.shownLocation = i;
        //    inventoryObject.inventoryLocation = i++;
        //});

        this.iterations = 8;
        this.imageCharacter = Loader.getImage("characterModel");
        this.imageBack = Loader.getImage("inventoryTileSet");
        this.backCols = 4;
        this.backRows = 4;
        this.tileBackWidth = this.imageBack.width / this.backCols;
        this.tileBackHeight = this.imageBack.height / this.backRows;
        this.imageIconBar = Loader.getImage("iconbar");
        this.iconBarCols = 3;
        this.iconBarRows = 4;
        this.tileIconBarWidth = this.imageIconBar.width / this.iconBarCols;
        this.tileIconBarHeight = this.imageIconBar.height / this.iconBarRows;
        this.selectedAction = 0;
        this.mousePosition = {
            x: 0,
            y: 0
        };

        this.STATES = {
            HIDDEN: 0,
            INVENTORY: 1,
            CHARACTER: 2,
            COMBAT: 3
        };
        this.iconBar = [];
        this.iconBar.push(new InventoryIcon(this.STATES.INVENTORY, this.imageIconBar, 1, this.tileIconBarHeight));
        this.iconBar.push(new InventoryIcon(this.STATES.CHARACTER, this.imageIconBar, 2, this.tileIconBarHeight));

        this.actionBarIcons = [];
        for (let i = 0; i < 10; i++) {
            this.actionBarIcons.push(new InventoryIcon(i, this.imageIconBar, 0, this.tileIconBarHeight));
            if (this.selectedAction === i)
                this.actionBarIcons[i].isSelected = true;
        }

        this.state = this.STATES.HIDDEN;
    }

    update(delta) {
        this.inventory.forEach(inventoryObject => {
            inventoryObject.update(delta);
        });
    }

    addObject(object) {
        this.inventory.push(object);
    }

    isInInventory(x, y) {
        return (this.xIcon < x && this.xIcon + this.widthIcon > x &&
            this.yIcon < y && this.yIcon + this.heightIcon > y);
    }

    isInActionBar(x, y) {
        return (this.xAction < x && this.xAction + this.widthAction > x &&
            this.yAction < y && this.yAction + this.heightAction > y);
    }

    onMouseDown(mousePosition) {
        this.inventory.forEach(inventoryObject => {
            if (inventoryObject.isEquiped && this.state === this.STATES.CHARACTER ||
                !inventoryObject.isEquiped && this.state === this.STATES.INVENTORY) {
                inventoryObject.onMouseDown(mousePosition);
            }
        });

        this.mousePosition = mousePosition;
        this.movingObject = false;
    }

    onMouseUp(mousePosition) {
        if (this.movingObject) {
            if (this.isInActionBar(mousePosition.x, mousePosition.y)) {
                this.moveAction(mousePosition, true);
            } else {
                this.moveInventory(mousePosition, true);
            }
        } else if (!this.isInActionBar(mousePosition.x, mousePosition.y)) {
            this.equipObject();
        }

        if (!this.movingObject) {
            let oldState = this.state;
            let oldSelectedAction = this.selectedAction;
            this.iconBar.forEach(icon => {
                if (icon.onMouseMove(mousePosition)) {
                    if (icon.isSelected) {
                        icon.isSelected = false;
                        this.state = this.STATES.HIDDEN;
                    } else {
                        this.state = icon.state;
                        icon.isSelected = true;
                    }
                }
            });
            if (oldState != this.state) {
                this.iconBar.forEach(icon => {
                    if (icon.state != this.state) {
                        icon.isSelected = false;
                    }
                });
            }
            this.actionBarIcons.forEach(icon => {
                if (icon.onMouseMove(mousePosition)) {
                    icon.isSelected = true;
                    this.selectedAction = icon.state;
                }
            });
            if (this.selectedAction !== oldSelectedAction) {
                this.actionBarIcons.forEach(icon => {
                    if (this.selectedAction !== icon.state) {
                        icon.isSelected = false;
                    }
                });
            }
        }
        this.inventory.forEach(inventoryObject => {
            inventoryObject.onMouseUp(mousePosition);
        });
    }

    onMouseMove(mousePosition, mousePressed) {
        let isHolding = false;
        this.iconBar.forEach(icon => {
            icon.onMouseMove(mousePosition);
        });
        this.actionBarIcons.forEach(icon => {
            icon.onMouseMove(mousePosition);
        });
        this.inventory.forEach(inventoryObject => {
            if (inventoryObject.isHolding) {
                isHolding = true;
                if (!inventoryObject.isInObject(mousePosition.x, mousePosition.y)) {
                    this.movingObject = true;
                }
            }
        });
        this.mousePosition = mousePosition;
        if (isHolding) {
            if (this.isInActionBar(mousePosition.x, mousePosition.y)) {
                this.moveAction(mousePosition, false);
            } else {
                this.moveInventory(mousePosition, false);
            }
        }
    }

    moveInventory(mousePosition, binding) {
        let drawWidth = (this.widthIcon / (this.iterations + 1));
        let drawHeight = ((this.heightIcon - this.yTop) / (this.iterations + 1));
        let tempX = Math.floor((mousePosition.x - this.xIcon - drawWidth / 2) / drawWidth);
        let tempY = Math.floor((mousePosition.y - this.yIcon - drawHeight / 2) / drawHeight);

        if (tempX < 0) tempX = 0;
        else if (tempX > this.iterations - 1) tempX = this.iterations - 1;
        if (tempY < 0) tempY = 0;
        else if (tempY > this.iterations - 1) tempY = this.iterations - 1;

        let originalPosition;
        let untilPosition;

        this.inventory.forEach(inventoryObject => { // Get original position
            if (inventoryObject.isHolding) {
                originalPosition = inventoryObject.inventoryLocation;
                //console.log(originalPosition + ", " + position);
            }
        });

        let position = tempX + tempY * this.iterations;

        let positionsBetween = [];

        if (position !== originalPosition) {
            if (position < originalPosition) {
                for (let i = position; i < originalPosition; i++) {
                    positionsBetween.push(i);
                }
            } else if (position > originalPosition) {
                for (let i = position; i > originalPosition; i--) {
                    positionsBetween.push(i);
                }
            }
            this.inventory.forEach(inventoryObject => { // Get empty position
                positionsBetween.forEach(posBetween => {
                    if (inventoryObject.inventoryLocation === posBetween) {
                        positionsBetween.splice(positionsBetween.indexOf(posBetween), 1); // remove from array
                    }
                });
            });
        }

        if (positionsBetween.length === 0) {
            untilPosition = originalPosition;
        } else {
            untilPosition = positionsBetween[0];
        }

        this.inventory.forEach(inventoryObject => {
            if (inventoryObject.isHolding) {
                inventoryObject.shownLocation = position;
                if (binding) {
                    inventoryObject.inventoryLocation = position;
                    inventoryObject.actionLocation = -1;
                }
            } else {
                if (position < untilPosition && inventoryObject.inventoryLocation >= position && inventoryObject.inventoryLocation < untilPosition) {
                    inventoryObject.shownLocation = inventoryObject.inventoryLocation + 1;
                } else if (position > untilPosition && inventoryObject.inventoryLocation <= position && inventoryObject.inventoryLocation > untilPosition) {
                    inventoryObject.shownLocation = inventoryObject.inventoryLocation - 1;
                } else {
                    inventoryObject.shownLocation = inventoryObject.inventoryLocation;
                }
                if (binding) {
                    inventoryObject.inventoryLocation = inventoryObject.shownLocation;
                    if (inventoryObject.inventoryLocation >= 0) {
                        inventoryObject.actionLocation = -1;
                    }
                }
            }
        });
    }

    moveAction(mousePosition, binding) {
        let drawWidth = this.widthAction / 10;
        let drawHeight = this.heightAction;
        let position = Math.floor((mousePosition.x - this.xAction) / drawWidth);
        let originalPosition = 0;
        let objectAtPosition = null;

        this.inventory.forEach(inventoryObject => { // Get original position
            if (inventoryObject.isHolding) {
                originalPosition = inventoryObject.actionLocation;
            } else if (inventoryObject.actionLocation === position) {
                objectAtPosition = inventoryObject;
            }
        });

        if (position < 0) position = 0;
        if (position > 9) position = 9;

        if (binding) {
            this.inventory.forEach(inventoryObject => { // Get original position
                if (inventoryObject.isHolding) {
                    if (objectAtPosition !== null) {
                        let t = inventoryObject.actionLocation;
                        inventoryObject.actionLocation = objectAtPosition.actionLocation;
                        objectAtPosition.actionLocation = t;
                        t = inventoryObject.inventoryLocation;
                        inventoryObject.inventoryLocation = objectAtPosition.inventoryLocation;
                        inventoryObject.shownLocation = objectAtPosition.inventoryLocation;
                        objectAtPosition.inventoryLocation = t;
                        objectAtPosition.shownLocation = t;
                    } else {
                        inventoryObject.actionLocation = position;
                        inventoryObject.inventoryLocation = -1;
                        inventoryObject.shownLocation = -1;
                    }
                }
            });
        }
    }

    equipObject() {
        let toEquip = null;
        this.inventory.forEach(inventoryObject => {
            if (inventoryObject.isHolding && inventoryObject.isEquipable) {
                toEquip = inventoryObject;
            }
        });
        if (toEquip !== null) {
            this.inventory.forEach(inventoryObject => {
                if (!inventoryObject.isHolding && inventoryObject.isEquiped && inventoryObject.area === toEquip.area) {
                    inventoryObject.setEquiped(false, toEquip.inventoryLocation);
                }
            });
            toEquip.setEquiped(true, -1);
        }
    }

    draw(ctx, xIcon, yIcon, width, height, xAction, yAction) {
        let drawWidth = Math.round(width / this.iterations * 5) / 5;
        let drawHeight = Math.round(height / (this.iterations + 1));
        this.yTop = yIcon + drawHeight;

        this.xIcon = xIcon;
        this.yIcon = this.yTop;
        this.widthIcon = width;
        this.heightIcon = height;
        this.xAction = xAction;
        this.yAction = yAction;
        this.widthAction = drawWidth * 10;
        this.heightAction = drawHeight;

        this.drawActionBar(ctx, xAction, yAction, drawWidth * 10, drawHeight);
        this.drawActionBarItems(ctx, xAction, yAction, drawWidth, drawHeight);

        if (this.state !== this.STATES.HIDDEN) {
            this.drawBack(ctx, xIcon, this.yTop, drawWidth, drawHeight, this.iterations);
            if (this.state === this.STATES.CHARACTER) {
                ctx.drawImage(this.imageCharacter, xIcon, this.yTop, drawWidth * this.iterations, drawHeight * this.iterations);
            } else if (this.state === this.STATES.INVENTORY) {
                this.drawInventory(ctx, xIcon + drawWidth / 2, this.yTop + drawHeight / 2, drawWidth / this.iterations * (this.iterations - 1), drawHeight / this.iterations * (this.iterations - 1), this.iterations);
            }
        }

        this.drawIconBar(ctx, xIcon, yIcon, drawWidth, drawHeight);
    }

    drawBack(ctx, x, y, drawWidth, drawHeight, iterations) {
        for (let xx = 0; xx < iterations; xx++) {
            for (let yy = 0; yy < iterations; yy++) {
                let xPos = 2,
                    yPos = 1;
                if (xx === 0) {
                    xPos = 0;
                } else if (xx === iterations - 1) {
                    xPos = this.backCols - 1;
                }
                if (yy === 0) {
                    yPos = 0;
                } else if (yy === iterations - 1) {
                    yPos = this.backRows - 1;
                }
                ctx.drawImage(
                    this.imageBack,
                    this.tileBackWidth * xPos,
                    this.tileBackHeight * yPos,
                    this.tileBackWidth,
                    this.tileBackHeight,
                    Math.floor(x + xx * drawWidth),
                    Math.floor(y + yy * drawHeight),
                    drawWidth + 1,
                    drawHeight + 1);
            }
        }
    }

    drawInventory(ctx, x, y, drawWidth, drawHeight, iterations) {
        this.inventory.forEach(inventoryObject => {
            if (!(inventoryObject.isHolding && this.movingObject) && inventoryObject.shownLocation >= 0) {
                let drawX = x + Math.floor(inventoryObject.shownLocation % iterations) * drawWidth;
                let drawY = y + Math.floor(inventoryObject.shownLocation / iterations) * drawHeight;
                inventoryObject.draw(ctx, drawX, drawY, drawWidth, drawHeight);
                if (inventoryObject.stackCount != 1) {
                    ctx.font = "22px Arial";
                    ctx.fillStyle = "white";
                    ctx.fillText(inventoryObject.stackCount, drawX, drawY + drawHeight);
                }
            }
        });
        this.inventory.forEach(inventoryObject => { // Draw the held object on top of the others
            if (inventoryObject.isHolding && this.movingObject) {
                let drawX = this.mousePosition.x;
                let drawY = this.mousePosition.y;
                inventoryObject.draw(ctx, drawX, drawY, drawWidth, drawHeight);
                if (inventoryObject.stackCount != 1) {
                    ctx.font = "22px Arial";
                    ctx.fillStyle = "white";
                    ctx.fillText(inventoryObject.stackCount, drawX, drawY + drawHeight);
                }
            }
        });
    }

    drawActionBarItems(ctx, x, y, drawWidth, drawHeight, iterations) {
        this.inventory.forEach(inventoryObject => {
            if (!(inventoryObject.isHolding && this.movingObject) && inventoryObject.actionLocation >= 0) {
                let drawX = x + Math.floor(inventoryObject.actionLocation) * drawWidth;
                let drawY = y;
                inventoryObject.draw(ctx, drawX, drawY, drawWidth, drawHeight);
                if (inventoryObject.stackCount != 1) {
                    ctx.font = "22px Arial";
                    ctx.fillStyle = "white";
                    ctx.fillText(inventoryObject.stackCount, drawX, drawY + drawHeight);
                }
            }
        });
    }

    drawIconBar(ctx, x, y, drawWidth, drawHeight) {
        for (let i = 0; i < this.iconBar.length; i++) {
            const icon = this.iconBar[i];
            icon.draw(ctx, x + i * drawWidth, y, drawWidth, drawHeight);
        }
    }

    drawActionBar(ctx, x, y, drawWidth, drawHeight) {
        let drawX = x,
            dx = drawWidth / 10;
        ctx.font = "14px Arial";
        ctx.fillStyle = "white";
        for (let i = 0; i < 10; i++) {
            this.actionBarIcons[i].draw(ctx, drawX + i * dx, y, dx, drawHeight);
            ctx.fillText(i === 9 ? 0 : i + 1, drawX + dx / 2 + i * dx, y + drawHeight / 2);
        }
    }
}