import InventoryObject from "./_InventoryObject.base.class";

export default class Sword_2 extends InventoryObject {
    constructor(loader, stackCount, inventoryLocation, actionLocation) {
        super("sword_2", 10, stackCount, inventoryLocation, actionLocation);
        //this.setEquipable(this.AREAS.ONE_HANDED, 10);
        this.setImage(loader.getImage('sword_2'));
        this.setWeapon(this.WEAPONTYPES.MELEE, 25, 0.66, "DamageArea_1", 2);
    }
}