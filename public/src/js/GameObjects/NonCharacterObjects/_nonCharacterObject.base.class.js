import GameObject from "../_GameObject.base.class";

export default class NonCharacterObject extends GameObject {
    constructor(x, y, width, height, damage, solid) {
        super();
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.damage = damage;
        this.damageDone = 0;
        this.solid = solid;
        this.canBePickedUp = false;
    }

    hasDamage() {
        return this.damageDone > 0 ? false : this.damage >= 0;
    }

    doDamage() {
        this.damageDone += 1;
        return this.damage;
    }

    update(delta) {
        super.update(delta);
        if (this.damageDone > 0) {
            this.damageDone -= delta;
        }
    }
}