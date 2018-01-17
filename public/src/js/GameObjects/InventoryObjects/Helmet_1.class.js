import InventoryObject from "./_InventoryObject.base.class";

export default class Helmet_1 extends InventoryObject {
    constructor(Loader, stackCount, inventoryLocation, actionLocation, isEquipped) {
        super("helmet_1", 50, stackCount, inventoryLocation, actionLocation);
        this.setEquipable(this.AREAS.HEAD, 10, isEquipped);
        this.setImage(Loader.getImage('helmet_1'));
    }
}