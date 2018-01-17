import NonCharacterObject from "./_nonCharacterObject.base.class";

// inventoryItems
import Sword_1 from "../InventoryObjects/Sword_1.class";
import Sword_2 from "../InventoryObjects/Sword_2.class";
import Sword_3 from "../InventoryObjects/Sword_3.class";
import Shield_1 from "../InventoryObjects/Shield_1.class";
import Shield_2 from "../InventoryObjects/Shield_2.class";
import Shield_3 from "../InventoryObjects/Shield_3.class";
import Shield_4 from "../InventoryObjects/Shield_4.class";
import Axe_1 from "../InventoryObjects/Axe_1.class";
import Axe_2 from "../InventoryObjects/Axe_2.class";
import Axe_3 from "../InventoryObjects/Axe_3.class";
import Bow_1 from "../InventoryObjects/Bow_1.class";
import Bow_2 from "../InventoryObjects/Bow_2.class";
import Bow_3 from "../InventoryObjects/Bow_3.class";
import Mace from "../InventoryObjects/Mace.class";
import Spear from "../InventoryObjects/Spear.class";
import Armor_1 from "../InventoryObjects/Armor_1.class";
import Armor_2 from "../InventoryObjects/Armor_2.class";
import Boots_1 from "../InventoryObjects/Boots_1.class";
import Boots_2 from "../InventoryObjects/Boots_2.class";
import Boots_3 from "../InventoryObjects/Boots_3.class";
import Helmet_1 from "../InventoryObjects/Helmet_1.class";
import Helmet_2 from "../InventoryObjects/Helmet_2.class";
import Coin from "../InventoryObjects/Coin.class";
import Health_bottle_1 from "../InventoryObjects/Health_bottle_1.class";
import Health_bottle_2 from "../InventoryObjects/Health_bottle_2.class";
import Health_bottle_3 from "../InventoryObjects/Health_bottle_3.class";
import Health_bottle_4 from "../InventoryObjects/Health_bottle_4.class";
import Empty_bottle_1 from "../InventoryObjects/Empty_bottle_1.class";
import Empty_bottle_2 from "../InventoryObjects/Empty_bottle_2.class";
import Empty_bottle_3 from "../InventoryObjects/Empty_bottle_3.class";
import Empty_bottle_4 from "../InventoryObjects/Empty_bottle_4.class";

export default class DroppedItem extends NonCharacterObject {
    constructor(Loader, id, x, y, width, height, type, count) {
        super(id, x, y, width, height, 0, false);
        this.type = type;

        switch (type) {
            case "coin":
                this.setImage(Loader.getImage('coin'));
                this.value = new Coin(Loader, count);
                break;

            case "Armor_1":
                this.setImage(Loader.getImage('armor_1'));
                this.value = new Armor_1(Loader, count);
                break;

            case "Armor_2":
                this.setImage(Loader.getImage('armor_2'));
                this.value = new Armor_2(Loader, count);
                break;

            case "Axe_1":
                this.setImage(Loader.getImage('axe_1'));
                this.value = new Axe_1(Loader, count);
                break;

            case "Axe_2":
                this.setImage(Loader.getImage('axe_2'));
                this.value = new Axe_2(Loader, count);
                break;

            case "Axe_3":
                this.setImage(Loader.getImage('axe_3'));
                this.value = new Axe_3(Loader, count);
                break;

            case "Boots_1":
                this.setImage(Loader.getImage('boots_1'));
                this.value = new Boots_1(Loader, count);
                break;

            case "Boots_2":
                this.setImage(Loader.getImage('boots_2'));
                this.value = new Boots_2(Loader, count);
                break;

            case "Boots_3":
                this.setImage(Loader.getImage('boots_3'));
                this.value = new Boots_3(Loader, count);
                break;

            case "Bow_1":
                this.setImage(Loader.getImage('bow_1'));
                this.value = new Bow_1(Loader, count);
                break;

            case "Bow_2":
                this.setImage(Loader.getImage('bow_2'));
                this.value = new Bow_2(Loader, count);
                break;

            case "Bow_3":
                this.setImage(Loader.getImage('bow_3'));
                this.value = new Bow_3(Loader, count);
                break;

            case "Empty_bottle_1":
                this.setImage(Loader.getImage('empty_bottle_1'));
                this.value = new Empty_bottle_1(Loader, count);
                break;

            case "Empty_bottle_2":
                this.setImage(Loader.getImage('empty_bottle_2'));
                this.value = new Empty_bottle_2(Loader, count);
                break;

            case "Empty_bottle_3":
                this.setImage(Loader.getImage('empty_bottle_3'));
                this.value = new Empty_bottle_3(Loader, count);
                break;

            case "Empty_bottle_4":
                this.setImage(Loader.getImage('empty_bottle_4'));
                this.value = new Empty_bottle_4(Loader, count);
                break;

            case "Health_bottle_1":
                this.setImage(Loader.getImage('health_bottle_1'));
                this.value = new Health_bottle_1(Loader, count);
                break;

            case "Health_bottle_2":
                this.setImage(Loader.getImage('health_bottle_2'));
                this.value = new Health_bottle_2(Loader, count);
                break;

            case "Health_bottle_3":
                this.setImage(Loader.getImage('health_bottle_3'));
                this.value = new Health_bottle_3(Loader, count);
                break;

            case "Health_bottle_4":
                this.setImage(Loader.getImage('health_bottle_4'));
                this.value = new Health_bottle_4(Loader, count);
                break;

            case "Helmet_1":
                this.setImage(Loader.getImage('helmet_1'));
                this.value = new Helmet_1(Loader, count);
                break;

            case "Helmet_2":
                this.setImage(Loader.getImage('helmet_2'));
                this.value = new Helmet_2(Loader, count);
                break;

            case "Mace":
                this.setImage(Loader.getImage('mace'));
                this.value = new Mace(Loader, count);
                break;

            case "Shield_bottle_1":
                this.setImage(Loader.getImage('shield_bottle_1'));
                this.value = new Shield_bottle_1(Loader, count);
                break;

            case "Shield_bottle_2":
                this.setImage(Loader.getImage('shield_bottle_2'));
                this.value = new Shield_bottle_2(Loader, count);
                break;

            case "Shield_bottle_3":
                this.setImage(Loader.getImage('shield_bottle_3'));
                this.value = new Shield_bottle_3(Loader, count);
                break;

            case "Shield_bottle_4":
                this.setImage(Loader.getImage('shield_bottle_4'));
                this.value = new Shield_bottle_4(Loader, count);
                break;

            case "Spear":
                this.setImage(Loader.getImage('spear'));
                this.value = new Spear(Loader, count);
                break;

            case "Sword_1":
                this.setImage(Loader.getImage('sword_1'));
                this.value = new Sword_1(Loader, count);
                break;

            case "Sword_2":
                this.setImage(Loader.getImage('sword_2'));
                this.value = new Sword_2(Loader, count);
                break;

            case "Sword_3":
                this.setImage(Loader.getImage('sword_3'));
                this.value = new Sword_3(Loader, count);
                break;

            default:
                throw new Error("type '" + type + "' not found in DroppedItem");
        }

        this.canBePickedUp = true;
    }

    getSmallObject() {
        let smallObject = super.getSmallObject();
        smallObject.canBePickedUp = this.canBePickedUp;
        smallObject.value = this.value;
        return smallObject;
    }
}