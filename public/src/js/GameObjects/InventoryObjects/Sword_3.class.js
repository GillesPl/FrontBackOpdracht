import InventoryObject from "./_InventoryObject.base.class";

export default class Sword_3 extends InventoryObject {
    constructor(Loader, stackCount, inventoryLocation, actionLocation) {
        super("sword_3", 10, stackCount, inventoryLocation, actionLocation);
        //this.setEquipable(this.AREAS.ONE_HANDED, 10);
        this.setImage(Loader.getImage('sword_3'));
        this.setWeapon(this.WEAPONTYPES.MELEE, 25, 0.5, "DamageArea_1");
    }
}