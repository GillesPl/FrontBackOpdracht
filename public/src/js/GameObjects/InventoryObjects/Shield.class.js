import InventoryObject from "./_InventoryObject.base.class";

export default class Shield extends InventoryObject {
    constructor(Loader, stackCount) {
        super(5);
        this.stackCount = stackCount;
        this.setEquipable(this.AREAS.ONE_HANDED, 10);
        this.setImage(Loader.getImage('shield'));
    }
}