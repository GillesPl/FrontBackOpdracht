import InventoryObject from "./_InventoryObject.base.class";

export default class Shield_4 extends InventoryObject {
    constructor(Loader, stackCount, inventoryLocation, actionLocation, isEquipped) {
        super("shield_4", 50, stackCount, inventoryLocation, actionLocation);
        this.setEquipable(this.AREAS.OFF_HAND, 50, isEquipped);
        this.setTilesImage(Loader.getImage('shield_4'), 4, 4, 16);
    }
}