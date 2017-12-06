import InventoryObject from "./_InventoryObject.base.class";

export default class Shield_2 extends InventoryObject {
    constructor(Loader, stackCount) {
        super("shield_2", 50, stackCount);
        this.setEquipable(this.AREAS.OFF_HAND, 15);
        this.setImage(Loader.getImage('shield_2'));
    }
}