import InventoryObject from "./_InventoryObject.base.class";

export default class Empty_bottle_2 extends InventoryObject {
    constructor(Loader, stackCount, inventoryLocation, actionLocation) {
        super("empty_bottle_2", 50, stackCount, inventoryLocation, actionLocation);
        this.setImage(Loader.getImage('empty_bottle_2'));
    }
}