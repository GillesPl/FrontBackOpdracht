import InventoryObject from "./_InventoryObject.base.class";

export default class Coin extends InventoryObject {
    constructor(loader, stackCount, inventoryLocation, actionLocation) {
        super("coin", 999999, stackCount, inventoryLocation, actionLocation);
        this.setImage(loader.getImage('coin'));
        this.setWeapon(this.WEAPONTYPES.MELEE, 1, 1, "DamageArea_1", 0);
    }
}