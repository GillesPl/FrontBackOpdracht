import NonCharacterObject from "./_nonCharacterObject.base.class";

export default class Fire extends NonCharacterObject {
    constructor(Loader, x, y) {
        super(x, y, 96, 96, 50, false);
        this.setTilesImage(Loader.getImage('fire'), 1, 5, 12);
    }
}