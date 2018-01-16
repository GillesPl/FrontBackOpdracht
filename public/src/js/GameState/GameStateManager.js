export default class GameStateManager {

    constructor() {
        this.currentState;
        this.states = [];
    }
    
    draw() {
        //start the tickevent
        this.currentState.draw();
    }

    setState(state) {
        this.currentState = state;
        this.draw();
    }

    getState(state) {
        states.forEach((el) => {
            if(el === state) return el;
            else throw new Error("state not found in GameStateManager");
        });
    }

    getCurrentState() {
        if(this.currentState != null) return this.currentState;
        else throw new Error("No current state is set");        
    }


    addState(state) {
        this.states.push(state);
    }

    removeState(state) {
        let index = this.states.indexOf(state);
        if(index != null) {
            this.states.splice(index,1);
        }
        else throw new Error("state not found");
    }

    update() {

    }


}