import InventoryObject from "./_InventoryObject.base.class";

export default class Empty_bottle_1 extends InventoryObject {
    constructor(loader, stackCount, inventoryLocation, actionLocation) {
        super("empty_bottle_1", 50, stackCount, inventoryLocation, actionLocation);
        this.setImage(loader.getImage('empty_bottle_1'));
    }
}