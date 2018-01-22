import InventoryObject from "./_InventoryObject.base.class";

export default class Axe_2 extends InventoryObject {
    constructor(loader, stackCount, inventoryLocation, actionLocation) {
        super("axe_2", 10, stackCount, inventoryLocation, actionLocation);
        this.setImage(loader.getImage('axe_2'));
        this.setWeapon(this.WEAPONTYPES.MELEE, 30, 4, "DamageArea_1", 2);
    }
}