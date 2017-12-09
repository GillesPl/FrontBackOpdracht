import InventoryObject from "./_InventoryObject.base.class";

export default class Bow_3 extends InventoryObject {
    constructor(Loader, stackCount) {
        super("bow_3", 10, stackCount);
        this.setImage(Loader.getImage('bow_3'));
        this.setWeapon(this.WEAPONTYPES.RANGED, 40, "Arrow_1");
    }
}