import NPCObject from "./_NPCObject.base.class";

export default class Slime extends NPCObject {
    constructor(Loader, x, y, map, bounds) {
        super(x, y, map.drawSize * 2, map.drawSize * 2, 500, 10, 3, 80, false, map, bounds);
        this.setTilesImage(Loader.getImage('slime'), 4, 4, 4);
    }
}