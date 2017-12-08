import NPCObject from "./_NPCObject.base.class";

export default class Fire extends NPCObject {
    constructor(Loader, x, y, map, bounds) {
        super(x, y, map.drawSize * 0.8, map.drawSize * 0.8, 50, 10, 3, 196, false, map, bounds);
        this.setTilesImage(Loader.getImage('goblin'), 4, 4, 4);
    }
}