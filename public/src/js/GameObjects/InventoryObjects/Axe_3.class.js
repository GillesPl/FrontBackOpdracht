import InventoryObject from "./_InventoryObject.base.class";

export default class Axe_3 extends InventoryObject {
    constructor(Loader, stackCount) {
        super("axe_3", 10, stackCount);
        this.setImage(Loader.getImage('axe_3'));
        this.setWeapon(this.WEAPONTYPES.MELEE, 100, 4, "DamageArea_1");
    }
}