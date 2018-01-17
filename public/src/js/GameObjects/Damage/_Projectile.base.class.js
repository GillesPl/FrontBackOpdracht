import DamageArea from "./_DamageArea.base.class";

export default class Projectile extends DamageArea {
    constructor(id, name, x, y, angleInRadians, strength, width, height, map) {
        super(id, name, x, y, angleInRadians, strength, width, height, 3, map);
        this.speed = 512;
    }

    doDamage() {
        this.destroyed = true;
        return this.strength;
    }

    update(delta) {
        super.update(delta);
        this.x += Math.cos(this.angleInRadians) * this.speed * delta;
        this.y += Math.sin(this.angleInRadians) * this.speed * delta;
        console.log(this.map);
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