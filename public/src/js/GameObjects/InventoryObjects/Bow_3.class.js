import InventoryObject from "./_InventoryObject.base.class";

export default class Bow_3 extends InventoryObject {
    constructor(Loader, stackCount, inventoryLocation, actionLocation) {
        super("bow_3", 10, stackCount, inventoryLocation, actionLocation);
        this.setImage(Loader.getImage('bow_3'));
        this.setWeapon(this.WEAPONTYPES.RANGED, 40, 0.5, "Arrow_1");
    }
}