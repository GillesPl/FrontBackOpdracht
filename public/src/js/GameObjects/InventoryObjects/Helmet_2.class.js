import InventoryObject from "./_InventoryObject.base.class";

export default class Helmet_2 extends InventoryObject {
    constructor(loader, stackCount, inventoryLocation, actionLocation, isEquipped) {
        super("helmet_2", 50, stackCount, inventoryLocation, actionLocation);
        this.setEquipable(this.AREAS.HEAD, 25, isEquipped);
        this.setImage(loader.getImage('helmet_2'));
    }
}