import InventoryObject from "./_InventoryObject.base.class";

export default class Bow_1 extends InventoryObject {
    constructor(Loader, stackCount) {
        super("bow_1", 10, stackCount);
        this.setImage(Loader.getImage('bow_1'));
    }
}