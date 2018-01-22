import InventoryObject from "./_InventoryObject.base.class";

export default class Shield_3 extends InventoryObject {
    constructor(loader, stackCount, inventoryLocation, actionLocation, isEquipped) {
        super("shield_3", 50, stackCount, inventoryLocation, actionLocation);
        this.setEquipable(this.AREAS.OFF_HAND, 25, isEquipped);
        this.setImage(loader.getImage('shield_3'));
    }
}