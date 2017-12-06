import InventoryObject from "./_InventoryObject.base.class";

export default class Armor_1 extends InventoryObject {
    constructor(Loader, stackCount) {
        super("armor_1", 50, stackCount);
        this.setEquipable(this.AREAS.BODY, 20);
        this.setImage(Loader.getImage('armor_1'));
    }
}