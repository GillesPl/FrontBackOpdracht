import NPCObject from "./_NPCObject.base.class";

export default class Goblin extends NPCObject {
    constructor(Loader, x, y, map, bounds) {
        super("Goblins",x, y, map.drawSize * 0.8, map.drawSize * 0.8, 50, 10, 3, 196, false, map, bounds);
        this.setTilesImage(Loader.getImage('goblin'), 4, 4, 4);        
    }
}