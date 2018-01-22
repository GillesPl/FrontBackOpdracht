import NPCObject from "./_NPCObject.base.class";

export default class Sheep extends NPCObject {
    constructor(loader, x, y, map, bounds) {
        super("Sheep", x, y, map.drawSize * 0.8, map.drawSize * 0.8, 10, 10, 3, 160, 5, true, map, bounds);
        this.setTilesImage(loader.getImage('sheep'), 4, 4, 4);
    }
}