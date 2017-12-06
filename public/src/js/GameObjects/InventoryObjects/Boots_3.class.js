import InventoryObject from "./_InventoryObject.base.class";

export default class Boots_3 extends InventoryObject {
    constructor(Loader, stackCount) {
        super("boots_3", 50, stackCount);
        this.setEquipable(this.AREAS.BOOTS, 20);
        this.setImage(Loader.getImage('boots_3'));
    }
}