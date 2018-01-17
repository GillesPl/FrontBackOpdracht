import InventoryObject from "./_InventoryObject.base.class";

export default class Shield_2 extends InventoryObject {
    constructor(Loader, stackCount, inventoryLocation, actionLocation, isEquipped) {
        super("shield_2", 50, stackCount, inventoryLocation, actionLocation);
        this.setEquipable(this.AREAS.OFF_HAND, 15, isEquipped);
        this.setImage(Loader.getImage('shield_2'));
    }
}