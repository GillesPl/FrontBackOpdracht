import InventoryObject from "./_InventoryObject.base.class";

export default class Shield_3 extends InventoryObject {
    constructor(Loader, stackCount) {
        super("shield_3", 50, stackCount);
        this.setEquipable(this.AREAS.OFF_HAND, 25);
        this.setImage(Loader.getImage('shield_3'));
    }
}