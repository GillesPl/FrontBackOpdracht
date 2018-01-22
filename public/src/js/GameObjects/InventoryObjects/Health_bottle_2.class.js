import InventoryObject from "./_InventoryObject.base.class";
import Empty_bottle_2 from "./Empty_bottle_2.class";

export default class Health_bottle_2 extends InventoryObject {
    constructor(loader, stackCount, inventoryLocation, actionLocation) {
        super("health_bottle_2", 50, stackCount, inventoryLocation, actionLocation);
        this.setUsable(this.USES.HEALTH, 25, "empty_bottle_2");
        this.setImage(loader.getImage('health_bottle_2'));
    }
}