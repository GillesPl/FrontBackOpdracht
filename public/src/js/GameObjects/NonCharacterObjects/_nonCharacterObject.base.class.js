import GameObject from "../_GameObject.base.class";

export default class NonCharacterObject extends GameObject {
    constructor(id, x, y, width, height, damage, solid) {
        super();
        this.id = id;
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

    getSmallObject() {
        let smallObject = {};
        smallObject.id = this.id;
        smallObject.x = this.x;
        smallObject.y = this.y;
        smallObject.width = this.width;
        smallObject.height = this.height;
        smallObject.damage = this.damage;
        smallObject.damageDone = this.damageDone;
        smallObject.solid = this.solid;
        smallObject.canBePickedUp = this.canBePickedUp;
        return smallObject;
    }
}