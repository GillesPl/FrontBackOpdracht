import InventoryObject from "./_InventoryObject.base.class";

export default class Shield extends InventoryObject {
    constructor(Loader, stackCount) {
        super("shield", 50);
        this.stackCount = stackCount;
        this.setEquipable(this.AREAS.OFF_HAND, 10);
        this.setImage(Loader.getImage('shield'));
    }
}