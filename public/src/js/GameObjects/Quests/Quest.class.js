/* Example:

new Quest(1, // id
    "Sheep killer", // title
    "Find a sword and kill a sheep with it. You will get 10xp as a reward", // description
    () => {
        return this.hero.stats.sheepKills >= 1; // Function returns true when completed
    },
    () => {
        this.hero.xp += 10; // Gives reward
    })

*/

export default class Quest {
    constructor(id, title, description, checkFunction, rewardFunction) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.descriptionParts = description.split(/[\n]+/);
        this.checkFunction = checkFunction;
        this.rewardFunction = rewardFunction;
        this.completed = false;
    }

    check() {
        if (!this.completed) {
            if (this.checkFunction()) {
                this.rewardFunction();
                this.completed = true;
                return true;
            }
        }
        return false; // Not completed this time    
    }

    draw(ctx, x, y) {
        let tx = x + 1,
            ty = y + 1,
            dy = 20;
        ctx.font = "22px Arial";
        ctx.fillStyle = "black";
        ctx.fillText(this.title + ":", tx, ty += dy);
        this.descriptionParts.forEach(description => {
            ctx.fillText(description, tx, ty += dy);            
        });
        tx = x;
        ty = y;
        ctx.fillStyle = "white";
        ctx.fillText(this.title + ":", tx, ty += dy);
        this.descriptionParts.forEach(description => {
            ctx.fillText(description, tx, ty += dy);            
        });
    }
}