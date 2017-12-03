import InventoryObject from "./_InventoryObject.base.class";

export default class Sword_1 extends InventoryObject {
    constructor(Loader, stackCount) {
        super("sword_1", 10, stackCount);
        //this.setEquipable(this.AREAS.ONE_HANDED, 10);
        this.setImage(Loader.getImage('sword_1'));
    }
}