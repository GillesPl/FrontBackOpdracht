class NonCharacterObject {
    constructor(jsonObject) {
        this.id = jsonObject.id;
        this.x = jsonObject.x;
        this.y = jsonObject.y;
        this.width = jsonObject.width;
        this.height = jsonObject.height;
        this.name = jsonObject.name;
        this.properties = jsonObject.properties;
        this.count = jsonObject.count;
        this.getSmallObject();
    }

    getSmallObject() {
        let smallObject = {};
        smallObject.id = this.id;
        smallObject.x = this.x;
        smallObject.y = this.y;
        smallObject.width = this.width;
        smallObject.height = this.height;
        smallObject.name = this.name;
        smallObject.properties = this.properties;
        smallObject.count = this.count;
        return smallObject;
    }
}

module.exports.NonCharacterObject = NonCharacterObject;