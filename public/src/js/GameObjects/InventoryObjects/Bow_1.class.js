import InventoryObject from "./_InventoryObject.base.class";

export default class Bow_1 extends InventoryObject {
    constructor(Loader, stackCount, inventoryLocation, actionLocation) {
        super("bow_1", 10, stackCount, inventoryLocation, actionLocation);
        this.setImage(Loader.getImage('bow_1'));
        this.setWeapon(this.WEAPONTYPES.RANGED, 10, 3, "Arrow_1");
    }
}