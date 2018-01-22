import InventoryObject from "./_InventoryObject.base.class";

export default class Armor_1 extends InventoryObject {
    constructor(loader, stackCount, inventoryLocation, actionLocation, isEquipped) {
        super("armor_1", 50, stackCount, inventoryLocation, actionLocation);
        this.setEquipable(this.AREAS.BODY, 20, isEquipped);
        this.setImage(loader.getImage('armor_1'));
    }
}