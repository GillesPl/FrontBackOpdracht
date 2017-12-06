import InventoryObject from "./_InventoryObject.base.class";
import Empty_bottle_4 from "./Empty_bottle_4.class";

export default class Health_bottle_4 extends InventoryObject {
    constructor(Loader, stackCount) {
        super("health_bottle_4", 50, stackCount);
        this.setUsable(this.USES.HEALTH, 100, new Empty_bottle_4(Loader, 1));
        this.setImage(Loader.getImage('health_bottle_4'));
    }
}