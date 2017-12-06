import InventoryObject from "./_InventoryObject.base.class";
import Empty_bottle_1 from "./Empty_bottle_1.class";

export default class Health_bottle_1 extends InventoryObject {
    constructor(Loader, stackCount) {
        super("health_bottle_1", 50, stackCount);
        this.setUsable(this.USES.HEALTH, 10, new Empty_bottle_1(Loader, 1));
        this.setImage(Loader.getImage('health_bottle_1'));
    }
}