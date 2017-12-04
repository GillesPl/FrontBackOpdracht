import InventoryObject from "./_InventoryObject.base.class";

export default class Empty_bottle_1 extends InventoryObject {
    constructor(Loader, stackCount) {
        super("empty_bottle_1", 50, stackCount);
        this.setImage(Loader.getImage('empty_bottle_1'));
    }
}