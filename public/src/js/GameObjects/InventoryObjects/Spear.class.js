import InventoryObject from "./_InventoryObject.base.class";

export default class Spear extends InventoryObject {
    constructor(Loader, stackCount) {
        super("spear", 10, stackCount);
        this.setImage(Loader.getImage('spear'));
    }
}