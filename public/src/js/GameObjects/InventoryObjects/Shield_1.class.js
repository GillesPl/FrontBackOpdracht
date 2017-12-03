import InventoryObject from "./_InventoryObject.base.class";

export default class Shield_1 extends InventoryObject {
    constructor(Loader, stackCount) {
        super("shield_1", 50, stackCount);
        this.setEquipable(this.AREAS.OFF_HAND, 10);
        this.setImage(Loader.getImage('shield_1'));
    }
}