import NPCObject from "./_NPCObject.base.class";

export default class Dog extends NPCObject {
    constructor(loader, x, y, map, bounds) {
        super("Dog", x, y, map.drawSize * 0.8, map.drawSize * 0.8, 100000, 10, 3, 128, 20, true, map, bounds);
        this.setTilesImage(loader.getImage('dog'), 4, 4, 4);
    }

    draw(ctx, screenX, screenY) {
        super.draw(ctx, screenX, screenY);
        ctx.font = "22px Arial";
        ctx.fillStyle = "blue";
        ctx.fillText("Pickles", screenX, screenY - 20);
    }
}