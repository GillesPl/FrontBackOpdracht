import NPCObject from "./_NPCObject.base.class";

export default class Goblin extends NPCObject {
    constructor(Loader, x, y, map, bounds) {
        super(x, y, map.drawSize * 0.8, map.drawSize * 0.8, 50, 10, 3, 196, false, map, bounds);
        this.setTilesImage(Loader.getImage('goblin'), 4, 4, 4);
        this.addDrop("Empty_bottle_4", 3, 10);
        this.addDrop("Armor_2", 1, 1);
        this.addDrop("Axe_2", 1, 1);
        this.addDrop("Axe_3", 1, 1);
        this.addDrop("Boots_2", 1, 1);
        this.addDrop("Boots_3", 1, 1);
        this.addDrop("Bow_2", 1, 1);
        this.addDrop("Bow_3", 1, 1);
        this.addDrop("Health_bottle_3", 5, 1);
        this.addDrop("Health_bottle_4", 3, 1);
        this.addDrop("Helmet_2", 1, 1);
        this.addDrop("Mace", 1, 1);
        this.addDrop("Shield_3", 1, 1);
        this.addDrop("Shield_4", 1, 1);
        this.addDrop("Spear", 1, 1);
        this.addDrop("Sword_2", 1, 1);
        this.addDrop("Sword_3", 1, 1);
    }
}