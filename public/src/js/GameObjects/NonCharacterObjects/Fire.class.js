import NonCharacterObject from "./_nonCharacterObject.base.class";

export default class Fire extends NonCharacterObject {
    constructor(Loader, id, x, y) {
        super(id, x, y, 96, 96, 45, false);
        this.setTilesImage(Loader.getImage('fire'), 1, 5, 12);
    }
}