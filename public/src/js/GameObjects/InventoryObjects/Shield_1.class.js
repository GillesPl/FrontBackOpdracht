import InventoryObject from "./_InventoryObject.base.class";

export default class Shield_1 extends InventoryObject {
    constructor(Loader, stackCount, inventoryLocation, actionLocation, isEquipped) {
        super("shield_1", 50, stackCount, inventoryLocation, actionLocation);
        this.setEquipable(this.AREAS.OFF_HAND, 10, isEquipped);
        this.setImage(Loader.getImage('shield_1'));
    }
}