import InventoryObject from "./_InventoryObject.base.class";

export default class Helmet_1 extends InventoryObject {
    constructor(loader, stackCount, inventoryLocation, actionLocation, isEquipped) {
        super("helmet_1", 50, stackCount, inventoryLocation, actionLocation);
        this.setEquipable(this.AREAS.HEAD, 10, isEquipped);
        this.setImage(loader.getImage('helmet_1'));
    }
}