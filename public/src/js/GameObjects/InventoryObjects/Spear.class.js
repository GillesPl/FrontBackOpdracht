import InventoryObject from "./_InventoryObject.base.class";

export default class Spear extends InventoryObject {
    constructor(Loader, stackCount, inventoryLocation, actionLocation) {
        super("spear", 10, stackCount, inventoryLocation, actionLocation);
        this.setImage(Loader.getImage('spear'));
        this.setWeapon(this.WEAPONTYPES.MELEE, 75, 4, "DamageArea_1");
    }
}