import DamageArea from "./_DamageArea.base.class";

export default class DamageArea_1 extends DamageArea {
    constructor(id, loader, playerId, x, y, angleInRadians, strength, map) {
        super(id, "DamageArea_1", playerId, x, y, angleInRadians, strength, map.drawSize * 1, map.drawSize * 1, 0.2, map);
        this.setImage(loader.getImage('damageArea_1'));
    }
}