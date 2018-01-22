import NPCObject from "./_NPCObject.base.class";

export default class Slime extends NPCObject {
    constructor(loader, x, y, map, bounds) {
        super("Slimes", x, y, map.drawSize * 2, map.drawSize * 2, 500, 10, 3, 80, 100, false, map, bounds);
        this.setTilesImage(loader.getImage('slime'), 4, 4, 4);
    }
}