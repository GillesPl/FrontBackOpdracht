import NPCObject from "./_NPCObject.base.class";

export default class Sheep extends NPCObject {
    constructor(Loader, x, y, map, bounds) {
        super(x, y, map.drawSize * 0.8, map.drawSize * 0.8, 10, 10, 3, 196, true, map, bounds);
        this.setTilesImage(Loader.getImage('sheep'), 4, 4, 4);
        this.addDrop("Empty_bottle_1", 3, 10);
        this.addDrop("Armor_1", 1, 1);
        this.addDrop("Axe_1", 1, 1);
        this.addDrop("Boots_1", 1, 1);
        this.addDrop("Bow_1", 1, 1);
        this.addDrop("Health_bottle_1", 5, 1);
        this.addDrop("Health_bottle_2", 3, 1);
        this.addDrop("Helmet_1", 1, 1);
        this.addDrop("Shield_1", 1, 1);
        this.addDrop("Shield_2", 1, 1);
        this.addDrop("Sword_1", 1, 1);
    }
}