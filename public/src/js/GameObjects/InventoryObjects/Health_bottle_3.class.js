import InventoryObject from "./_InventoryObject.base.class";
import Empty_bottle_3 from "./Empty_bottle_3.class";

export default class Health_bottle_3 extends InventoryObject {
    constructor(Loader, stackCount) {
        super("health_bottle_3", 50, stackCount);
        this.setUsable(this.USES.HEALTH, 50, new Empty_bottle_3(Loader, 1));
        this.setImage(Loader.getImage('health_bottle_3'));
    }
}