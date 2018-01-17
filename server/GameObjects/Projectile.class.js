class Projectile {
    constructor(jsonObject) {
        this.id = jsonObject.id;
        this.name = jsonObject.name;
        this.x = jsonObject.x;
        this.y = jsonObject.y;
        this.strength = jsonObject.strength;
        this.angleInRadians = jsonObject.angleInRadians;
        this.width = jsonObject.width;
        this.height = jsonObject.height;
    }

    getSmallObject() {
        let smallObject = {};
        smallObject.id = this.id;
        smallObject.name = this.name;
        smallObject.x = this.x;
        smallObject.y = this.y;
        smallObject.strength = this.strength;
        smallObject.angleInRadians = this.angleInRadians;
        smallObject.width = this.width;
        smallObject.height = this.height;
        return smallObject;
    }
}

module.exports.Projectile = Projectile;