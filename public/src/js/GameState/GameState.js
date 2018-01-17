export default class GameState {

    constructor(ctx) {
        this.ctx = ctx;
    }

    getContext() {
        return this.ctx;
    }

    clear() {
        this.ctx.clearRect(0, 0, ctx.width, ctx.height);
    }

    draw() {
        //this draws something
        this.ctx.clearRect(0, 0, ctx.width, ctx.height);
    }
}