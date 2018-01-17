import InventoryObject from "./_InventoryObject.base.class";

export default class Axe_1 extends InventoryObject {
    constructor(Loader, stackCount) {
        super("axe_1", 10, stackCount);
        this.setImage(Loader.getImage('axe_1'));
        this.setWeapon(this.WEAPONTYPES.MELEE, 15, 4, "DamageArea_1");
    }
}