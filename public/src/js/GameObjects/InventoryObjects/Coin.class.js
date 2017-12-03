import InventoryObject from "./_InventoryObject.base.class";

export default class Coin extends InventoryObject {
    constructor(Loader, stackCount) {
        super("coin", 999999, stackCount);
        this.setImage(Loader.getImage('coin'));
    }
}