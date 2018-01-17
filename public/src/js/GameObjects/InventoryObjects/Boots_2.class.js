import InventoryObject from "./_InventoryObject.base.class";

export default class Boots_2 extends InventoryObject {
    constructor(Loader, stackCount, inventoryLocation, actionLocation, isEquipped) {
        super("boots_2", 50, stackCount, inventoryLocation, actionLocation);
        this.setEquipable(this.AREAS.BOOTS, 8, isEquipped);
        this.setImage(Loader.getImage('boots_2'));
    }
}