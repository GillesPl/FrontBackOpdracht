import InventoryObject from "./_InventoryObject.base.class";

export default class Boots_3 extends InventoryObject {
    constructor(Loader, stackCount, inventoryLocation, actionLocation, isEquipped) {
        super("boots_3", 50, stackCount, inventoryLocation, actionLocation);
        this.setEquipable(this.AREAS.BOOTS, 20, isEquipped);
        this.setImage(Loader.getImage('boots_3'));
    }
}