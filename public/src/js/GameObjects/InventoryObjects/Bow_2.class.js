import InventoryObject from "./_InventoryObject.base.class";

export default class Bow_2 extends InventoryObject {
    constructor(Loader, stackCount) {
        super("bow_2", 10, stackCount);
        this.setImage(Loader.getImage('bow_2'));
    }
}