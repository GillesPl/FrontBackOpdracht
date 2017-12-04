import InventoryObject from "./_InventoryObject.base.class";

export default class Empty_bottle_4 extends InventoryObject {
    constructor(Loader, stackCount) {
        super("empty_bottle_4", 50, stackCount);
        this.setImage(Loader.getImage('empty_bottle_4'));
    }
}