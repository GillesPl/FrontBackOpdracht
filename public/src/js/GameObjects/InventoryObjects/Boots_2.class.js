import InventoryObject from "./_InventoryObject.base.class";

export default class Boots_2 extends InventoryObject {
    constructor(Loader, stackCount) {
        super("boots_2", 50, stackCount);
        this.setEquipable(this.AREAS.BOOTS, 8);
        this.setImage(Loader.getImage('boots_2'));
    }
}