import InventoryObject from "./_InventoryObject.base.class";

export default class Bow_3 extends InventoryObject {
    constructor(loader, stackCount, inventoryLocation, actionLocation) {
        super("bow_3", 10, stackCount, inventoryLocation, actionLocation);
        this.setImage(loader.getImage('bow_3'));
        this.setWeapon(this.WEAPONTYPES.RANGED, 50, 0.5, "Arrow_1", 5);
    }
}