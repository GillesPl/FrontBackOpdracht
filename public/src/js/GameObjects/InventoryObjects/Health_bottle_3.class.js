import InventoryObject from "./_InventoryObject.base.class";
import Empty_bottle_3 from "./Empty_bottle_3.class";

export default class Health_bottle_3 extends InventoryObject {
    constructor(loader, stackCount, inventoryLocation, actionLocation) {
        super("health_bottle_3", 50, stackCount, inventoryLocation, actionLocation);
        this.setUsable(this.USES.HEALTH, 50, "empty_bottle_3");
        this.setImage(loader.getImage('health_bottle_3'));
    }
}