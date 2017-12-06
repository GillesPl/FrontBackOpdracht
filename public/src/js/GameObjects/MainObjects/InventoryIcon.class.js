export default class InventoryIcon {
    constructor(state, image, tileX, tileWidth) {
        this.image = image;
        this.tileX = tileX;
        this.tileWidth = tileWidth;
        this.mouseOver = false;
        this.isSelected = false;
        this.state = state;
    }

    onMouseMove(mousePosition) {
        this.mouseOver = (mousePosition.x <= this.x + this.width && mousePosition.x >= this.x &&
            mousePosition.y <= this.y + this.height && mousePosition.y >= this.y);
        return (this.mouseOver);
    }

    draw(ctx, x, y, width, height) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;

        let tileY = 0;
        if (this.isSelected) {
            tileY += 2;
        }
        if (this.mouseOver) {
            tileY += 1;
        }

        //if (this.isSelected && this.mouseOver) {
        //    tileY = 3;
        //} else if (this.isSelected) {
        //    tileY = 2;
        //} else if (this.mouseOver) {
        //    tileY = 1;
        //}

        ctx.drawImage(
            this.image,
            this.tileX * this.tileWidth,
            tileY * this.tileWidth,
            this.tileWidth,
            this.tileWidth,
            x,
            y,
            width,
            height);
    }
}