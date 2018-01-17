import InventoryObject from "./_InventoryObject.base.class";
import Empty_bottle_2 from "./Empty_bottle_2.class";

export default class Health_bottle_2 extends InventoryObject {
    constructor(Loader, stackCount, inventoryLocation, actionLocation) {
        super("health_bottle_2", 50, stackCount, inventoryLocation, actionLocation);
        this.setUsable(this.USES.HEALTH, 25, new Empty_bottle_2(Loader, 1));
        this.setImage(Loader.getImage('health_bottle_2'));
    }
}