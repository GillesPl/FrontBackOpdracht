import InventoryObject from "./_InventoryObject.base.class";

export default class Axe_2 extends InventoryObject {
    constructor(Loader, stackCount, inventoryLocation, actionLocation) {
        super("axe_2", 10, stackCount, inventoryLocation, actionLocation);
        this.setImage(Loader.getImage('axe_2'));
        this.setWeapon(this.WEAPONTYPES.MELEE, 30, 4, "DamageArea_1");
    }
}