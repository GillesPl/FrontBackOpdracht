import InventoryObject from "./_InventoryObject.base.class";
import Empty_bottle_4 from "./Empty_bottle_4.class";

export default class Health_bottle_4 extends InventoryObject {
    constructor(loader, stackCount, inventoryLocation, actionLocation) {
        super("health_bottle_4", 50, stackCount, inventoryLocation, actionLocation);
        this.setUsable(this.USES.HEALTH, 100, "empty_bottle_4");
        this.setImage(loader.getImage('health_bottle_4'));
    }
}