import Projectile from "./_Projectile.base.class";

export default class Arrow_1 extends Projectile {
    constructor(id, loader, playerId, x, y, angleInRadians, strength, map) {
        super(id, "Arrow_1", playerId, x, y, angleInRadians, strength, map.drawSize * 0.5, map.drawSize * 0.5, map);
        this.setImage(loader.getImage('arrow_1'));
    }
}