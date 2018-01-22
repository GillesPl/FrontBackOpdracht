import InventoryObject from "./_InventoryObject.base.class";

export default class Mace extends InventoryObject {
    constructor(loader, stackCount, inventoryLocation, actionLocation) {
        super("mace", 10, stackCount, inventoryLocation, actionLocation);
        this.setImage(loader.getImage('mace'));
        this.setWeapon(this.WEAPONTYPES.MELEE, 250, 2, "DamageArea_1", 5);
    }
}