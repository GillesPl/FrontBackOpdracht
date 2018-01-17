class Projectile {
    constructor(jsonObject) {
        this.id = jsonObject.id;
        this.name = jsonObject.name;
        this.x = jsonObject.x;
        this.y = jsonObject.y;
        this.strength = jsonObject.strength;
        this.angleInRadians = jsonObject.angleInRadians;
        this.lifeTime = jsonObject.lifeTime;
        this.totalLifeTime = jsonObject.totalLifeTime;
        this.width = jsonObject.width;
        this.height = jsonObject.height;
        this.destroyed = jsonObject.destroyed;
    }

    getSmallObject() {
        let smallObject = {};
        smallObject.id = this.id;
        smallObject.name = this.name;
        smallObject.x = this.x;
        smallObject.y = this.y;
        smallObject.strength = this.strength;
        smallObject.angleInRadians = this.angleInRadians;
        smallObject.lifeTime = this.lifeTime;
        smallObject.totalLifeTime = this.totalLifeTime;
        smallObject.width = this.width;
        smallObject.height = this.height;
        smallObject.destroyed = this.destroyed;
        return smallObject;
    }
}

module.exports.Projectile = Projectile;