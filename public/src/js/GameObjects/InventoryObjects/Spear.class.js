import InventoryObject from "./_InventoryObject.base.class";

export default class Spear extends InventoryObject {
    constructor(loader, stackCount, inventoryLocation, actionLocation) {
        super("spear", 10, stackCount, inventoryLocation, actionLocation);
        this.setImage(loader.getImage('spear'));
        this.setWeapon(this.WEAPONTYPES.MELEE, 75, 4, "DamageArea_1", 0);
    }
}