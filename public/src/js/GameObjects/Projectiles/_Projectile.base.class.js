import GameObject from "../_GameObject.base.class";

export default class Projectile extends GameObject {
    constructor(x, y, angleInRadians, strength, width, height, map) {
        super();
        this.x = x;
        this.y = y;
        this.strength = strength;
        this.angleInRadians = angleInRadians;
        this.width = width;
        this.height = height;
        this.map = map;
        this.speed = 512;
        this.destroyed = false;
    }

    doDamage() {
        this.destroyed = true;
        return this.strength;
    }

    update(delta) {
        super.update(delta);
        this.x += Math.cos(this.angleInRadians) * this.speed * delta;
        this.y += Math.sin(this.angleInRadians) * this.speed * delta;
        if (this.map.isSolidTileAtXY(this.x, this.y, 99)) {
            this.destroyed = true;
        }
    }

    draw(ctx, screenX, screenY) {
        if (this.image !== null) {
            this.drawRotatedImage(ctx, this.image,
                this.getImageX() * this.tileWidth, // Src x
                this.getImageY() * this.tileHeight, // Src y
                this.tileWidth, // Src width
                this.tileHeight, // Src height
                screenX,
                screenY,
                this.width,
                this.height,
                this.angleInRadians + Math.PI / 4 * 5 // The image is rotated
            );
        } else {
            super.draw(ctx, screenX, screenY);
        }
    }
}