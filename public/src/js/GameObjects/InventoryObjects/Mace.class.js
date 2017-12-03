import InventoryObject from "./_InventoryObject.base.class";

export default class Mace extends InventoryObject {
    constructor(Loader, stackCount) {
        super("mace", 10, stackCount);
        this.setImage(Loader.getImage('mace'));
    }
}