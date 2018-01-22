import InventoryObject from "./_InventoryObject.base.class";

export default class Axe_1 extends InventoryObject {
    constructor(loader, stackCount, inventoryLocation, actionLocation) {
        super("axe_1", 10, stackCount, inventoryLocation, actionLocation);
        this.setImage(loader.getImage('axe_1'));
        this.setWeapon(this.WEAPONTYPES.MELEE, 15, 4, "DamageArea_1", 0);
    }
}