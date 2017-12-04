import InventoryObject from "./_InventoryObject.base.class";

export default class Empty_bottle_3 extends InventoryObject {
    constructor(Loader, stackCount) {
        super("empty_bottle_3", 50, stackCount);
        this.setImage(Loader.getImage('empty_bottle_3'));
    }
}