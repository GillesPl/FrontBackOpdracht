import NonCharacterObject from "./_nonCharacterObject.base.class";
import Coin from "../InventoryObjects/Coin.class";
import Sword_1 from "../InventoryObjects/Sword_1.class";
import Boots_1 from "../InventoryObjects/Boots_1.class";

export default class DroppedItem extends NonCharacterObject {
    constructor(Loader, x, y, width, height, type, hero, count) {
        super(x, y, width, height, 0, false);

        switch (type) {
            case "coin":
                this.setImage(Loader.getImage('coin'));
                this.value = new Coin(Loader, count);
                break;
                
            case "Sword_1":
                this.setImage(Loader.getImage('sword_1'));
                this.value = new Sword_1(Loader, count);
                break;

            case "Boots_1":
                this.setImage(Loader.getImage('boots_1'));
                this.value = new Boots_1(Loader, count);
                break;

            default:
                throw new Error("type '" + type + "' not found in DroppedItem");
        }

        this.canBePickedUp = true;
    }
}