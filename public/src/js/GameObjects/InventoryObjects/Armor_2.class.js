import InventoryObject from "./_InventoryObject.base.class";

export default class Armor_2 extends InventoryObject {
    constructor(Loader, stackCount, inventoryLocation, actionLocation, isEquipped) {
        super("armor_2", 50, stackCount, inventoryLocation, actionLocation);
        this.setEquipable(this.AREAS.BODY, 40, isEquipped);
        this.setImage(Loader.getImage('armor_2'));
    }
}