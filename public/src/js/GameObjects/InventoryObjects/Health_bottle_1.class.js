import InventoryObject from "./_InventoryObject.base.class";
import Empty_bottle_1 from "./Empty_bottle_1.class";

export default class Health_bottle_1 extends InventoryObject {
    constructor(loader, stackCount, inventoryLocation, actionLocation) {
        super("health_bottle_1", 50, stackCount, inventoryLocation, actionLocation);
        this.setUsable(this.USES.HEALTH, 10, "empty_bottle_1");
        this.setImage(loader.getImage('health_bottle_1'));
    }
}