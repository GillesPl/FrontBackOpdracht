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
    constructor(loader, id, x, y, width, height, type, count) {
        super(id, x, y, width, height, 0, false);
        this.type = type;

        switch (type) {
            case "coin":
                this.setImage(loader.getImage('coin'));
                this.value = new Coin(loader, count);
                break;

            case "Armor_1":
                this.setImage(loader.getImage('armor_1'));
                this.value = new Armor_1(loader, count);
                break;

            case "Armor_2":
                this.setImage(loader.getImage('armor_2'));
                this.value = new Armor_2(loader, count);
                break;

            case "Axe_1":
                this.setImage(loader.getImage('axe_1'));
                this.value = new Axe_1(loader, count);
                break;

            case "Axe_2":
                this.setImage(loader.getImage('axe_2'));
                this.value = new Axe_2(loader, count);
                break;

            case "Axe_3":
                this.setImage(loader.getImage('axe_3'));
                this.value = new Axe_3(loader, count);
                break;

            case "Boots_1":
                this.setImage(loader.getImage('boots_1'));
                this.value = new Boots_1(loader, count);
                break;

            case "Boots_2":
                this.setImage(loader.getImage('boots_2'));
                this.value = new Boots_2(loader, count);
                break;

            case "Boots_3":
                this.setImage(loader.getImage('boots_3'));
                this.value = new Boots_3(loader, count);
                break;

            case "Bow_1":
                this.setImage(loader.getImage('bow_1'));
                this.value = new Bow_1(loader, count);
                break;

            case "Bow_2":
                this.setImage(loader.getImage('bow_2'));
                this.value = new Bow_2(loader, count);
                break;

            case "Bow_3":
                this.setImage(loader.getImage('bow_3'));
                this.value = new Bow_3(loader, count);
                break;

            case "Empty_bottle_1":
                this.setImage(loader.getImage('empty_bottle_1'));
                this.value = new Empty_bottle_1(loader, count);
                break;

            case "Empty_bottle_2":
                this.setImage(loader.getImage('empty_bottle_2'));
                this.value = new Empty_bottle_2(loader, count);
                break;

            case "Empty_bottle_3":
                this.setImage(loader.getImage('empty_bottle_3'));
                this.value = new Empty_bottle_3(loader, count);
                break;

            case "Empty_bottle_4":
                this.setImage(loader.getImage('empty_bottle_4'));
                this.value = new Empty_bottle_4(loader, count);
                break;

            case "Health_bottle_1":
                this.setImage(loader.getImage('health_bottle_1'));
                this.value = new Health_bottle_1(loader, count);
                break;

            case "Health_bottle_2":
                this.setImage(loader.getImage('health_bottle_2'));
                this.value = new Health_bottle_2(loader, count);
                break;

            case "Health_bottle_3":
                this.setImage(loader.getImage('health_bottle_3'));
                this.value = new Health_bottle_3(loader, count);
                break;

            case "Health_bottle_4":
                this.setImage(loader.getImage('health_bottle_4'));
                this.value = new Health_bottle_4(loader, count);
                break;

            case "Helmet_1":
                this.setImage(loader.getImage('helmet_1'));
                this.value = new Helmet_1(loader, count);
                break;

            case "Helmet_2":
                this.setImage(loader.getImage('helmet_2'));
                this.value = new Helmet_2(loader, count);
                break;

            case "Mace":
                this.setImage(loader.getImage('mace'));
                this.value = new Mace(loader, count);
                break;

            case "Shield_1":
                this.setImage(loader.getImage('shield_1'));
                this.value = new Shield_1(loader, count);
                break;

            case "Shield_2":
                this.setImage(loader.getImage('shield_2'));
                this.value = new Shield_2(loader, count);
                break;

            case "Shield_3":
                this.setImage(loader.getImage('shield_3'));
                this.value = new Shield_3(loader, count);
                break;

            case "Shield_4":
                this.setImage(loader.getImage('shield_4'));
                this.value = new Shield_4(loader, count);
                break;

            case "Spear":
                this.setImage(loader.getImage('spear'));
                this.value = new Spear(loader, count);
                break;

            case "Sword_1":
                this.setImage(loader.getImage('sword_1'));
                this.value = new Sword_1(loader, count);
                break;

            case "Sword_2":
                this.setImage(loader.getImage('sword_2'));
                this.value = new Sword_2(loader, count);
                break;

            case "Sword_3":
                this.setImage(loader.getImage('sword_3'));
                this.value = new Sword_3(loader, count);
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