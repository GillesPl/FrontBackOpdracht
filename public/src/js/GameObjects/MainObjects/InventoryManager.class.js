import InventoryIcon from "./InventoryIcon.class";
import QuestManager from "../Quests/QuestManager";
import Arrow_1 from "../Damage/Arrow_1.class";
import DamageArea_1 from "../Damage/DamageArea_1.class";
import Empty_bottle_1 from "../InventoryObjects/Empty_bottle_1.class";
import Empty_bottle_2 from "../InventoryObjects/Empty_bottle_2.class";
import Empty_bottle_3 from "../InventoryObjects/Empty_bottle_3.class";
import Empty_bottle_4 from "../InventoryObjects/Empty_bottle_4.class";

export default class InventoryManager {
    constructor(inventoryObjects, loader, hero, damageAreas, map) {
        this.inventory = [];
        let i = 0;
        inventoryObjects.forEach(inventoryObject => {
            this.addObject(inventoryObject);
        });

        //this.inventory = inventoryObjects;
        //let i = 0;
        //this.inventory.forEach(inventoryObject => {
        //    inventoryObject.shownLocation = i;
        //    inventoryObject.inventoryLocation = i++;
        //});

        this.imageCharacter = loader.getImage("characterModel");
        this.imageBack = loader.getImage("inventoryTileSet");
        this.imageIconBar = loader.getImage("iconbar");
        this.imageLevelToLow = loader.getImage("levelToLow");
        this.hero = hero;
        this.iterations = 8;
        this.loader = loader;
        this.damageAreas = damageAreas;
        this.map = map;
        this.backCols = 4;
        this.backRows = 4;
        this.tileBackWidth = this.imageBack.width / this.backCols;
        this.tileBackHeight = this.imageBack.height / this.backRows;
        this.loader = loader;
        this.iconBarRows = 4;
        this.tileIconBarHeight = this.imageIconBar.height / this.iconBarRows;
        this.selectedAction = 1;
        this.mousePosition = {
            x: 0,
            y: 0
        };

        this.STATES = {
            HIDDEN: 0,
            INVENTORY: 1,
            CHARACTER: 2,
            STATS: 3,
            QUESTS: 4
        };
        this.iconBar = [];
        this.iconBar.push(new InventoryIcon(this.STATES.INVENTORY, this.imageIconBar, 1, this.tileIconBarHeight));
        this.iconBar.push(new InventoryIcon(this.STATES.CHARACTER, this.imageIconBar, 2, this.tileIconBarHeight));
        this.iconBar.push(new InventoryIcon(this.STATES.STATS, this.imageIconBar, 3, this.tileIconBarHeight));
        this.iconBar.push(new InventoryIcon(this.STATES.QUESTS, this.imageIconBar, 4, this.tileIconBarHeight));

        this.actionBarIcons = [];
        for (let i = 1; i <= 10; i++) {
            this.actionBarIcons[i === 10 ? 0 : i] = new InventoryIcon(i === 10 ? 0 : i, this.imageIconBar, 0, this.tileIconBarHeight);
            if (this.selectedAction === (i === 10 ? 0 : i))
                this.actionBarIcons[i === 10 ? 0 : i].isSelected = true;
        }

        this.questManager = new QuestManager(this.hero, this, loader);

        this.state = this.STATES.HIDDEN;
    }

    numPressed(num) {
        if (num >= 0 && num <= 9) {
            this.actionBarIcons.forEach(actionIcon => {
                if (actionIcon.state === num) {
                    actionIcon.isSelected = true;
                    this.selectedAction = actionIcon.state;
                } else {
                    actionIcon.isSelected = false;
                }
            });
        }
    }

    keyPressed(keyCode, keyboard) {
        let checkState = this.STATES.HIDDEN;

        if (keyCode === keyboard.I) {
            checkState = this.STATES.INVENTORY;
        } else if (keyCode === keyboard.C) {
            checkState = this.STATES.CHARACTER;
        } else if (keyCode === keyboard.T) {
            checkState = this.STATES.STATS;
        } else if (keyCode === keyboard.Q) {
            checkState = this.STATES.QUESTS;
        }
        this.iconBar.forEach(icon => {
            if (icon.state === checkState) {
                let oldState = this.state;
                if (icon.isSelected) {
                    icon.isSelected = false;
                    this.state = this.STATES.HIDDEN;
                } else {
                    this.state = icon.state;
                    icon.isSelected = true;
                }
                if (oldState != this.state) {
                    this.iconBar.forEach(icon => {
                        if (icon.state != this.state) {
                            icon.isSelected = false;
                        }
                    });
                }
            }
        });
    }

    getEmptyPosition() {
        let allInventoryPositions = [];
        for (let i = this.iterations * this.iterations - 1; i >= 0; i--) {
            allInventoryPositions.push(i);
        }
        this.inventory.forEach(inventoryObject => {
            if (allInventoryPositions.indexOf(inventoryObject.inventoryLocation) >= 0) {
                allInventoryPositions.splice(allInventoryPositions.indexOf(inventoryObject.inventoryLocation), 1);
            }
        });

        if (allInventoryPositions.length > 0) {
            return allInventoryPositions[allInventoryPositions.length - 1];
        } else {
            return false;
        }
    }

    update(delta) {
        let anyUnequiped = false;
        let position = false;
        this.inventory.forEach(inventoryObject => {
            if (inventoryObject.inventoryLocation === -2) {
                anyUnequiped = true;
            }
        });
        if (anyUnequiped) {
            position = this.getEmptyPosition();
        }
        this.hero.armor = 0;
        this.inventory.forEach(inventoryObject => {
            inventoryObject.update(delta, position);
            if (inventoryObject.isEquiped && inventoryObject.isEquipable) {
                this.hero.armor += inventoryObject.strength;
            }
        });
        this.questManager.update();
    }

    addObject(newObject) {
        if (newObject.inventoryLocation === undefined || (newObject.inventoryLocation === -1 && newObject.actionLocation === -1 && !newObject.isEquiped)) {
            newObject.inventoryLocation = this.getEmptyPosition();
        }

        this.inventory.forEach(oldObject => {
            if (newObject.stackCount > 0) {
                if (oldObject.typeId === newObject.typeId && oldObject.stackCount < oldObject.stackLimit) {
                    //console.log(oldObject);
                    //console.log(newObject);
                    let max = oldObject.stackLimit - oldObject.stackCount;
                    if (newObject.stackCount > max) {
                        newObject.stackCount -= max;
                        oldObject.stackCount += max;
                    } else {
                        oldObject.stackCount += newObject.stackCount;
                        newObject.stackCount = 0;
                    }
                }
            }
        });
        if (newObject.stackCount > 0) {
            newObject.shownLocation = newObject.inventoryLocation;
            this.inventory.push(newObject);
            return 0;
        }
        return newObject.stackCount;
    }

    isInInventory(x, y) {
        return (this.xIcon < x && this.xIcon + this.widthIcon > x &&
            this.yIcon < y && this.yIcon + this.heightIcon > y);
    }

    isInActionBar(x, y) {
        return (this.xAction < x && this.xAction + this.widthAction > x &&
            this.yAction < y && this.yAction + this.heightAction > y);
    }

    isInIconBar(x, y) {
        return (this.xIcon < x && this.xIcon + this.widthSingleIcon * this.iconBar.length > x &&
            this.yIcon - this.heightSingleIcon < y && this.yIcon > y);
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

    onMouseUp(mousePosition, sendNewDamageAreaListener) {
        if (this.movingObject) {
            if (this.isInActionBar(mousePosition.x, mousePosition.y)) {
                this.moveAction(mousePosition, true);
            } else {
                this.moveInventory(mousePosition, true);
            }
        } else if (!this.isInActionBar(mousePosition.x, mousePosition.y)) {
            this.equipObject();
            this.useObject();
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
            if ((!this.isInInventory(mousePosition.x, mousePosition.y) || this.state === this.STATES.HIDDEN) &&
                !this.isInActionBar(mousePosition.x, mousePosition.y) && !this.isInIconBar(mousePosition.x, mousePosition.y)) {
                this.fireObject(mousePosition, sendNewDamageAreaListener);
            }
        }
        this.inventory.forEach(inventoryObject => {
            inventoryObject.onMouseUp(mousePosition);
        });
    }

    fireObject(mousePosition, sendNewDamageAreaListener) {
        this.inventory.forEach(inventoryObject => {
            let location = this.selectedAction - 1;
            if (location < 0) location = 9;
            if (inventoryObject.actionLocation === location && inventoryObject.interval === 0 && inventoryObject.levelRequired <= this.hero.level) {
                if (inventoryObject.weapontype === inventoryObject.WEAPONTYPES.RANGED) {
                    inventoryObject.interval = inventoryObject.intervalTime;
                    //console.log('bow used, creating ' + inventoryObject.createObjectName);
                    switch (inventoryObject.createObjectName) {
                        case 'Arrow_1':
                            let angleInRadians = Math.atan2(mousePosition.y - this.hero.screenY, mousePosition.x - this.hero.screenX); // https://gist.github.com/conorbuck/2606166                                       
                            let projectile = new Arrow_1(
                                Math.random(),
                                this.loader,
                                this.hero.pvp ? this.hero.id : -1,
                                this.hero.x,
                                this.hero.y,
                                angleInRadians,
                                inventoryObject.strength,
                                this.map);
                            sendNewDamageAreaListener.sendNewDamageArea(projectile);
                            this.damageAreas.push(projectile);
                            //console.log(angleInRadians + ', ' + -Math.PI / 4 * 5);
                            if (angleInRadians >= -Math.PI / 4 && angleInRadians <= Math.PI / 4) {
                                this.hero.setDirection(this.hero.STATE.RUNNINGEAST);
                            } else if (angleInRadians <= -Math.PI / 4 && angleInRadians >= -Math.PI / 4 * 3) {
                                this.hero.setDirection(this.hero.STATE.RUNNINGNORTH);
                            } else if (angleInRadians >= Math.PI / 4 && angleInRadians <= Math.PI / 4 * 3) {
                                this.hero.setDirection(this.hero.STATE.RUNNINGSOUTH);
                            } else {
                                this.hero.setDirection(this.hero.STATE.RUNNINGWEST);
                            }
                            break;
                    }
                } else if (inventoryObject.weapontype === inventoryObject.WEAPONTYPES.MELEE) {
                    inventoryObject.interval = inventoryObject.intervalTime;
                    //console.log('melee used, creating ' + inventoryObject.createObjectName);
                    switch (inventoryObject.createObjectName) {
                        case 'DamageArea_1':
                            let angleInRadians = Math.atan2(mousePosition.y - this.hero.screenY, mousePosition.x - this.hero.screenX); // https://gist.github.com/conorbuck/2606166
                            let damageArea = new DamageArea_1(
                                Math.random(),
                                this.loader,
                                this.hero.pvp ? this.hero.id : -1,
                                this.hero.x - this.hero.width / 2 + this.hero.width / 3 * (Math.cos(angleInRadians)),
                                this.hero.y - this.hero.height / 2 + this.hero.height / 3 * (Math.sin(angleInRadians)),
                                angleInRadians,
                                inventoryObject.strength,
                                this.map);
                            sendNewDamageAreaListener.sendNewDamageArea(damageArea);
                            this.damageAreas.push(damageArea);
                            if (angleInRadians >= -Math.PI / 4 && angleInRadians <= Math.PI / 4) {
                                this.hero.setDirection(this.hero.STATE.RUNNINGEAST);
                            } else if (angleInRadians <= -Math.PI / 4 && angleInRadians >= -Math.PI / 4 * 3) {
                                this.hero.setDirection(this.hero.STATE.RUNNINGNORTH);
                            } else if (angleInRadians >= Math.PI / 4 && angleInRadians <= Math.PI / 4 * 3) {
                                this.hero.setDirection(this.hero.STATE.RUNNINGSOUTH);
                            } else {
                                this.hero.setDirection(this.hero.STATE.RUNNINGWEST);
                            }
                            break;
                    }
                }
            }
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
            inventoryObject.onMouseMove(mousePosition);
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
        let position = tempX + tempY * this.iterations;
        let positionsBetween = [];

        this.inventory.forEach(inventoryObject => { // Get original position
            if (inventoryObject.isHolding) {
                originalPosition = inventoryObject.inventoryLocation;
                //console.log(originalPosition + ", " + position);
            }
        });

        if (position !== originalPosition) {
            if (originalPosition === -1) {
                for (let i = position; i < this.iterations * this.iterations; i++) {
                    positionsBetween.push(i);
                }
            } else if (position < originalPosition) {
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
        let objectAtPosition = null;

        this.inventory.forEach(inventoryObject => { // Get original position
            if (inventoryObject.actionLocation === position) {
                objectAtPosition = inventoryObject;
            }
        });

        if (position < 0) position = 0;
        if (position > 9) position = 9;

        this.inventory.forEach(inventoryObject => {
            if (binding) {
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
                        //console.log(inventoryObject);
                    }
                }
            }
            inventoryObject.shownLocation = inventoryObject.inventoryLocation;
        });
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

    useObject() {
        this.inventory.forEach(inventoryObject => {
            if (inventoryObject.isHolding && inventoryObject.isUsable) {
                if (inventoryObject.usage === inventoryObject.USES.HEALTH) {
                    let worked = this.hero.heal(inventoryObject.strength);
                    if (worked) {
                        if (inventoryObject.usedObject !== null) {
                            switch (inventoryObject.usedObject) {
                                case "empty_bottle_1":
                                    this.addObject(new Empty_bottle_1(this.loader, 1, -2, -1));
                                    break;
                                case "empty_bottle_2":
                                    this.addObject(new Empty_bottle_2(this.loader, 1, -2, -1));
                                    break;
                                case "empty_bottle_3":
                                    this.addObject(new Empty_bottle_3(this.loader, 1, -2, -1));
                                    break;
                                case "empty_bottle_4":
                                    this.addObject(new Empty_bottle_4(this.loader, 1, -2, -1));
                                    break;
                            }
                        }
                        if (inventoryObject.stackCount > 1) {
                            inventoryObject.stackCount--;
                        } else {
                            this.inventory.splice(this.inventory.indexOf(inventoryObject), 1);
                        }
                    }
                }
            }
        });
    }

    objectsInInventory() {
        let inventoryObjectsCount = 0;
        let distinctItems = [];
        this.inventory.forEach(item => {
            if (item.typeId !== "coin") {
                inventoryObjectsCount += item.stackCount;
            }
            if (distinctItems.indexOf(item.typeId) === -1) {
                distinctItems.push(item.typeId);
            }
        });
        return {
            count: inventoryObjectsCount,
            distinctCount: distinctItems.length
        };
    }

    countObjectsOfType(typeId) {
        let inventoryObjectsCount = 0;
        this.inventory.forEach(item => {
            if (item.typeId === typeId) {
                inventoryObjectsCount += item.stackCount;
            }
        });
        return inventoryObjectsCount;
    }

    getSmallObject() {
        let smallObject = [];
        this.inventory.forEach(item => {
            smallObject.push(item.getSmallObject());
        });
        return smallObject;
    }

    draw(ctx, xIcon, yIcon, width, height, xAction, yAction, delta, otherPlayers) {
        let drawWidth = Math.round(width / this.iterations * 5) / 5;
        let drawHeight = Math.round(height / (this.iterations + 1));
        this.yTop = yIcon + drawHeight;

        this.xIcon = xIcon;
        this.yIcon = this.yTop;
        this.widthIcon = width;
        this.heightIcon = height;
        this.widthSingleIcon = drawWidth;
        this.heightSingleIcon = drawHeight;
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
                this.drawCharacter(ctx, xIcon, this.yTop, drawWidth, drawHeight);
            } else if (this.state === this.STATES.INVENTORY) {
                this.drawInventory(ctx, xIcon + drawWidth / 2, this.yTop + drawHeight / 2, drawWidth / this.iterations * (this.iterations - 1), drawHeight / this.iterations * (this.iterations - 1), this.iterations);
            } else if (this.state === this.STATES.STATS) {
                this.drawStats(ctx, xIcon + drawWidth / 2, this.yTop + drawHeight / 2, delta, otherPlayers);
            } else if (this.state === this.STATES.QUESTS) {
                this.drawQuest(ctx, xIcon + drawWidth / 2, this.yTop + drawHeight / 2);
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

    drawCharacter(ctx, x, y, drawWidth, drawHeight) {
        this.inventory.forEach(inventoryObject => {
            if (inventoryObject.isEquiped) {
                switch (inventoryObject.area) {
                    case inventoryObject.AREAS.OFF_HAND:
                        inventoryObject.draw(ctx, x + drawWidth, y + 5 * drawHeight, drawWidth, drawHeight);
                        break;
                    case inventoryObject.AREAS.BOOTS:
                        inventoryObject.draw(ctx, x + 3.5 * drawWidth, y + 6.5 * drawHeight, drawWidth, drawHeight);
                        break;
                    case inventoryObject.AREAS.HEAD:
                        inventoryObject.draw(ctx, x + 3.5 * drawWidth, y + 0.5 * drawHeight, drawWidth, drawHeight);
                        break;
                    case inventoryObject.AREAS.BODY:
                        inventoryObject.draw(ctx, x + 6 * drawWidth, y + 5 * drawHeight, drawWidth, drawHeight);
                        break;
                }
            }
        });
    }

    drawInventory(ctx, x, y, drawWidth, drawHeight, iterations) {
        this.inventory.forEach(inventoryObject => {
            if (!(inventoryObject.isHolding && this.movingObject) && inventoryObject.shownLocation >= 0 && !inventoryObject.isMouseInObject) {
                let drawX = x + Math.floor(inventoryObject.shownLocation % iterations) * drawWidth;
                let drawY = y + Math.floor(inventoryObject.shownLocation / iterations) * drawHeight;
                this.drawItem(ctx, inventoryObject, drawX, drawY, drawWidth, drawHeight);
            }
        });
        this.inventory.forEach(inventoryObject => {
            if (!(inventoryObject.isHolding && this.movingObject) && inventoryObject.shownLocation >= 0 && inventoryObject.isMouseInObject) {
                let drawX = x + Math.floor(inventoryObject.shownLocation % iterations) * drawWidth;
                let drawY = y + Math.floor(inventoryObject.shownLocation / iterations) * drawHeight;
                this.drawItem(ctx, inventoryObject, drawX, drawY, drawWidth, drawHeight);
            }
        });
        this.inventory.forEach(inventoryObject => { // Draw the held object on top of the others
            if (inventoryObject.isHolding && this.movingObject) {
                let drawX = this.mousePosition.x;
                let drawY = this.mousePosition.y;
                this.drawItem(ctx, inventoryObject, drawX, drawY, drawWidth, drawHeight);
            }
        });
    }

    drawStats(ctx, x, y, delta, otherPlayers) {
        let tempX = x + 1;
        let tempY = y + 1;
        let deltaY = 22;
        let objectsData = this.objectsInInventory();

        ctx.font = "22px Arial";
        ctx.fillStyle = "black";
        this.drawStatsText(ctx, delta, otherPlayers, tempX, tempY, deltaY, objectsData);
        tempX = x;
        tempY = y;
        ctx.fillStyle = "white";
        this.drawStatsText(ctx, delta, otherPlayers, tempX, tempY, deltaY, objectsData);
    }

    drawStatsText(ctx, delta, otherPlayers, tempX, tempY, deltaY, objectsData) {
        ctx.fillText("Player location: (" + Math.round(this.hero.x) + ", " + Math.round(this.hero.y) + ", " + this.hero.tileLevel + ")", tempX, tempY += deltaY);
        ctx.fillText("Health: " + this.hero.health, tempX, tempY += deltaY);
        ctx.fillText("Armor: " + this.hero.armor, tempX, tempY += deltaY);
        ctx.fillText("Level: " + this.hero.level, tempX, tempY += deltaY);
        ctx.fillText("Xp: " + this.hero.xp + "/" + this.hero.level * 100, tempX, tempY += deltaY);
        ctx.fillText("Quests completed: " + this.hero.questsCompleted + "/6", tempX, tempY += deltaY);
        ctx.fillText("Players connected: " + (otherPlayers.length + 1), tempX, tempY += deltaY);
        ctx.fillText("Objects in inventory: " + objectsData.count + " (without money)", tempX, tempY += deltaY);
        ctx.fillText("Different objects in inventory: " + objectsData.distinctCount + " / 31", tempX, tempY += deltaY);
        ctx.fillText("Sheep killed: " + this.hero.stats.sheepKills, tempX, tempY += deltaY);
        ctx.fillText("Goblins killed: " + this.hero.stats.goblinKills, tempX, tempY += deltaY);
        ctx.fillText("Slimes killed: " + this.hero.stats.slimeKills, tempX, tempY += deltaY);
    }

    drawQuest(ctx, x, y) {
        this.questManager.draw(ctx, x, y);
    }

    drawItem(ctx, inventoryObject, drawX, drawY, drawWidth, drawHeight) {
        inventoryObject.draw(ctx, drawX, drawY, drawWidth, drawHeight);
        if (inventoryObject.levelRequired > this.hero.level) {
            ctx.drawImage(
                this.imageLevelToLow, // Image
                drawX, // Target x
                drawY, // Target y
                drawWidth, // Target width
                drawHeight); // Target height
        }
        if (inventoryObject.stackCount != 1) {
            ctx.font = "22px Arial";
            ctx.fillStyle = "white";
            ctx.fillText(inventoryObject.stackCount, drawX, drawY + drawHeight);
        }
    }

    drawActionBarItems(ctx, x, y, drawWidth, drawHeight, iterations) {
        this.inventory.forEach(inventoryObject => {
            if (!(inventoryObject.isHolding && this.movingObject) && !inventoryObject.isMouseInObject && inventoryObject.actionLocation >= 0) {
                let drawX = x + Math.floor(inventoryObject.actionLocation) * drawWidth;
                let drawY = y;
                this.drawItem(ctx, inventoryObject, drawX, drawY, drawWidth, drawHeight);
            }
        });
        this.inventory.forEach(inventoryObject => {
            if (!(inventoryObject.isHolding && this.movingObject) && inventoryObject.isMouseInObject && inventoryObject.actionLocation >= 0) {
                let drawX = x + Math.floor(inventoryObject.actionLocation) * drawWidth;
                let drawY = y;
                this.drawItem(ctx, inventoryObject, drawX, drawY, drawWidth, drawHeight);
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
            let xPos = (i === 0 ? 9 : i - 1) * dx;
            this.actionBarIcons[i].draw(ctx, drawX + xPos, y, dx, drawHeight);
            ctx.fillText(this.actionBarIcons[i].state, drawX + dx / 2 + xPos, y + drawHeight / 2);
        }
    }
}