import InventoryObject from "./_InventoryObject.base.class";

export default class Sword_1 extends InventoryObject {
    constructor(loader, stackCount, inventoryLocation, actionLocation) {
        super("sword_1", 10, stackCount, inventoryLocation, actionLocation);
        //this.setEquipable(this.AREAS.ONE_HANDED, 10);
        this.setImage(loader.getImage('sword_1'));
        this.setWeapon(this.WEAPONTYPES.MELEE, 10, 1, "DamageArea_1", 0);
    }
}