import GameObject from "../_GameObject.base.class";

export default class DamageArea extends GameObject {
    constructor(id, name, x, y, angleInRadians, strength, width, height, totalLifeTime, map) {
        super();
        this.id = id;
        this.name = name;
        this.x = x;
        this.y = y;
        this.angleInRadians = angleInRadians;
        this.strength = strength;
        this.width = width;
        this.height = height;
        console.log(map);
        this.map = map;
        this.lifeTime = 0;
        this.totalLifeTime = totalLifeTime;
        this.destroyed = false;
    }

    getSmallObject() {
        let smallObject = {};
        smallObject.id = this.id;
        smallObject.name = this.name;
        smallObject.x = this.x;
        smallObject.y = this.y;
        smallObject.strength = this.strength;
        smallObject.width = this.width;
        smallObject.height = this.height;
        smallObject.lifeTime = this.lifeTime;
        smallObject.totalLifeTime = this.totalLifeTime;
        return JSON.stringify(smallObject);
    }

    doDamage() {
        this.destroyed = true;
        return this.strength;
    }

    update(delta) {
        super.update(delta);
        this.lifeTime += delta;
        if (this.totalLifeTime <= this.lifeTime) {
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
                screenX + this.width / 2 + this.width / 2 * Math.cos(this.angleInRadians),
                screenY + this.height / 2 + this.height / 2 * Math.sin(this.angleInRadians),
                this.width,
                this.height,
                this.angleInRadians // The image is rotated
            );
        } else {
            super.draw(ctx, screenX, screenY);
        }
    }
}