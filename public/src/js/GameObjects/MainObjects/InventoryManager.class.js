import InventoryIcon from "./InventoryIcon.class";

export default class InventoryManager {
    constructor(inventoryObjects, Loader) {
        this.inventory = inventoryObjects;

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

        this.STATES = {
            HIDDEN: 0,
            INVENTORY: 1,
            CHARACTER: 2
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

    onMouseClick(mousePosition) {
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

    onMouseMove(mousePosition, mousePressed) {
        this.iconBar.forEach(icon => {
            icon.onMouseMove(mousePosition);
        });
        this.actionBarIcons.forEach(icon => {
            icon.onMouseMove(mousePosition);
        });
    }

    draw(ctx, xIcon, yIcon, width, height, xAction, yAction) {
        //ctx.fillRect(xIcon, yIcon, width, height);
        let iterations = 8;
        let drawWidth = Math.round(width / iterations * 5) / 5;
        let drawHeight = Math.round(height / (iterations + 1));

        if (this.state !== this.STATES.HIDDEN) {
            this.drawBack(ctx, xIcon, yIcon, drawWidth, drawHeight, iterations);
            if (this.state === this.STATES.CHARACTER) {
                ctx.drawImage(this.imageCharacter, xIcon, yIcon + drawHeight, drawWidth * iterations, drawHeight * iterations);
            }
        }

        this.drawIconBar(ctx, xIcon, yIcon, drawWidth, drawHeight);
        this.drawActionBar(ctx, xAction, yAction, drawWidth * 10, drawHeight);
    }

    drawBack(ctx, x, y, drawWidth, drawHeight, iterations) {
        let yTop = y + drawHeight;

        // Top row
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
                    Math.floor(yTop + yy * drawHeight),
                    drawWidth + 1,
                    drawHeight + 1);
            }
        }
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
        ctx.fillStyle = "white";
        for (let i = 0; i < 10; i++) {
            this.actionBarIcons[i].draw(ctx, drawX + i * dx, y, dx, drawHeight);
            ctx.fillText(i === 9 ? 0 : i + 1, drawX + dx / 2 + i * dx, y + drawHeight / 2);
        }
    }
}