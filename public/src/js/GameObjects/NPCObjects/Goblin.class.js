import NPCObject from "./_NPCObject.base.class";

export default class Goblin extends NPCObject {
    constructor(loader, x, y, map, bounds) {
        super("Goblins", x, y, map.drawSize * 0.8, map.drawSize * 0.8, 50, 10, 3, 196, 20, false, map, bounds);
        this.setTilesImage(loader.getImage('goblin'), 4, 4, 4);
    }
}