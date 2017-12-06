import InventoryObject from "./_InventoryObject.base.class";

export default class Boots_1 extends InventoryObject {
    constructor(Loader, stackCount) {
        super("boots_1", 50, stackCount);
        this.setEquipable(this.AREAS.BOOTS, 4);
        this.setImage(Loader.getImage('boots_1'));
    }
}