import InventoryObject from "./_InventoryObject.base.class";

export default class Shield_1 extends InventoryObject {
    constructor(loader, stackCount, inventoryLocation, actionLocation, isEquipped) {
        super("shield_1", 50, stackCount, inventoryLocation, actionLocation);
        this.setEquipable(this.AREAS.OFF_HAND, 10, isEquipped);
        this.setImage(loader.getImage('shield_1'));
    }
}