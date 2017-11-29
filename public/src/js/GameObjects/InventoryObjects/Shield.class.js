import InventoryObject from "./_InventoryObject.base.class";

export default class Shield extends InventoryObject {
    constructor(Loader) {
        super();
        this.setEquipable(this.AREAS.ONE_HANDED, 10);
        this.setImage(Loader.getImage('shield'));
    }
}