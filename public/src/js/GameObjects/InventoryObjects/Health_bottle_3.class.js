import InventoryObject from "./_InventoryObject.base.class";

export default class Health_bottle_3 extends InventoryObject {
    constructor(Loader, stackCount) {
        super("health_bottle_3", 50, stackCount);
        this.setUsable(this.USES.health, 10);
        this.setImage(Loader.getImage('health_bottle_3'));
    }
}