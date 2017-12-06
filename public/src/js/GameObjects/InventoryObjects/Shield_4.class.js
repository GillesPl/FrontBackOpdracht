import InventoryObject from "./_InventoryObject.base.class";

export default class Shield_4 extends InventoryObject {
    constructor(Loader, stackCount) {
        super("shield_4", 50, stackCount);
        this.setEquipable(this.AREAS.OFF_HAND, 50);
        this.setTilesImage(Loader.getImage('shield_4'), 4, 4, 16);
    }
}