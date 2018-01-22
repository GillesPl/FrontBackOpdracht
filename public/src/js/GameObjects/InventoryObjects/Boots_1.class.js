import InventoryObject from "./_InventoryObject.base.class";

export default class Boots_1 extends InventoryObject {
    constructor(loader, stackCount, inventoryLocation, actionLocation, isEquipped) {
        super("boots_1", 50, stackCount, inventoryLocation, actionLocation);
        this.setEquipable(this.AREAS.BOOTS, 4, isEquipped);
        this.setImage(loader.getImage('boots_1'));
    }
}