import InventoryObject from "./_InventoryObject.base.class";

export default class Axe_3 extends InventoryObject {
    constructor(loader, stackCount, inventoryLocation, actionLocation) {
        super("axe_3", 10, stackCount, inventoryLocation, actionLocation);
        this.setImage(loader.getImage('axe_3'));
        this.setWeapon(this.WEAPONTYPES.MELEE, 100, 1, "DamageArea_1", 4);
    }
}