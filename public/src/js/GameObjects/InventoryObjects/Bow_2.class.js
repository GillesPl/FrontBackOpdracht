import InventoryObject from "./_InventoryObject.base.class";

export default class Bow_2 extends InventoryObject {
    constructor(loader, stackCount, inventoryLocation, actionLocation) {
        super("bow_2", 10, stackCount, inventoryLocation, actionLocation);
        this.setImage(loader.getImage('bow_2'));
        this.setWeapon(this.WEAPONTYPES.RANGED, 20, 1, "Arrow_1", 2);
    }
}