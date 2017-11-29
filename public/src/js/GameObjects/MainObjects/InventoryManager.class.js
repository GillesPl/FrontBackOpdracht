import InventoryIcon from "./InventoryIcon.class";

export default class InventoryManager {
    constructor(inventoryObjects, Loader) {
        this.inventory = inventoryObjects;

        this.imageBack = Loader.getImage("inventoryTileSet");
        this.backCols = 4;
        this.backRows = 4;
        this.tileBackWidth = this.imageBack.width / this.backCols;
        this.tileBackHeight = this.imageBack.height / this.backRows;
        this.imageIconBar = Loader.getImage("iconbar");
        this.iconBarCols = 2;
        this.iconBarRows = 4;
        this.tileIconBarWidth = this.imageIconBar.width / this.iconBarCols;
        this.tileIconBarHeight = this.imageIconBar.height / this.iconBarRows;

        this.STATES = {
            HIDDEN: 0,
            INVENTORY: 1,
            CHARACTER: 2
        };
        this.iconBar = [];
        this.iconBar.push(new InventoryIcon(this.STATES.CHARACTER, this.imageIconBar, 0, this.tileIconBarHeight));
        this.iconBar.push(new InventoryIcon(this.STATES.INVENTORY, this.imageIconBar, 1, this.tileIconBarHeight));

        this.state = this.STATES.HIDDEN;
    }

    update(delta) {
        this.inventory.forEach(inventoryObject => {
            inventoryObject.update(delta);
        });
    }

    onMouseClick(mousePosition) {
        let oldState = this.state;
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
    }

    onMouseMove(mousePosition, mousePressed) {
        this.iconBar.forEach(icon => {
            icon.onMouseMove(mousePosition);
        });
    }

    draw(ctx, x, y, width, height) {
        //ctx.fillRect(x, y, width, height);
        let iterations = 8;
        let drawWidth = Math.round(width / iterations * 5) / 5;
        let drawHeight = Math.ceil(height / (iterations + 1));

        if (this.state !== this.STATES.HIDDEN) {
            this.drawBack(ctx, x, y, drawWidth, drawHeight, iterations);
            ctx.fillText(this.state, x + 128, y + 128);
        }

        this.drawIconBar(ctx, x, y, drawWidth, drawHeight);
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
}