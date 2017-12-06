import InventoryObject from "./_InventoryObject.base.class";

export default class Armor_2 extends InventoryObject {
    constructor(Loader, stackCount) {
        super("armor_2", 50, stackCount);
        this.setEquipable(this.AREAS.BODY, 40);
        this.setImage(Loader.getImage('armor_2'));
    }
}