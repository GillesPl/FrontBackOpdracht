import Projectile from "./_Projectile.base.class";

export default class Arrow_1 extends Projectile {
    constructor(Loader, x, y, angleInRadians, map, drawSize) {
        super(x, y, angleInRadians, 10, drawSize, drawSize, map);
        this.setImage(Loader.getImage('arrow_1'));
    }
}