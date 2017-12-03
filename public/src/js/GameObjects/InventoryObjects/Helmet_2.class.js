import InventoryObject from "./_InventoryObject.base.class";

export default class Helmet_2 extends InventoryObject {
    constructor(Loader, stackCount) {
        super("helmet_2", 50, stackCount);
        this.setEquipable(this.AREAS.HEAD, 10);
        this.setImage(Loader.getImage('helmet_2'));
    }
}