import InventoryObject from "./_InventoryObject.base.class";

export default class Sword_2 extends InventoryObject {
    constructor(Loader, stackCount, inventoryLocation, actionLocation) {
        super("sword_2", 10, stackCount, inventoryLocation, actionLocation);
        //this.setEquipable(this.AREAS.ONE_HANDED, 10);
        this.setImage(Loader.getImage('sword_2'));
        this.setWeapon(this.WEAPONTYPES.MELEE, 25, 1, "DamageArea_1");
    }
}