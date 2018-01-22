import Quest from "./Quest.class";
import Health_bottle_1 from "../InventoryObjects/Health_bottle_1.class";
import Spear from "../InventoryObjects/Spear.class";
import Shield_4 from "../InventoryObjects/Shield_4.class";
import Sword_3 from "../InventoryObjects/Sword_3.class";

export default class QuestManager {
    constructor(hero, inventoryManager, loader) {
        this.hero = hero;

        let i = 0;
        this.allQuests = [];
        this.allQuests.push(new Quest(i++, // id
            "Sheep killer", // Title
            "Find a sword and kill a sheep with it. \nYou will get 10xp as a reward.", // Description
            () => {
                return hero.stats.sheepKills >= 1; // Function returns true when completed
            },
            () => {
                hero.xp += 10; // Function gives reward
            }));

        this.allQuests.push(new Quest(i++, // id
            "Another empty bottle", // Title
            "Find at least 10 empty bottles. \nYou will get 10 potions as a reward.", // Description
            () => {
                return inventoryManager.countObjectsOfType("empty_bottle_1") +
                    inventoryManager.countObjectsOfType("empty_bottle_2") +
                    inventoryManager.countObjectsOfType("empty_bottle_3") +
                    inventoryManager.countObjectsOfType("empty_bottle_4") >= 10; // Function returns true when completed
            },
            () => {
                inventoryManager.addObject(new Health_bottle_1(loader, 10, -2, -1)); // Function gives reward
            }));

        this.allQuests.push(new Quest(i++, // id
            "More money", // Title
            "Get over 1000 coins. \nYou will get a spear as a reward.", // Description
            () => {
                return inventoryManager.countObjectsOfType("coin") >= 1000; // Function returns true when completed
            },
            () => {
                inventoryManager.addObject(new Spear(loader, 1, -2, -1)); // Function gives reward
            }));

        this.allQuests.push(new Quest(i++, // id
            "Level up", // Title
            "Reach level 3. \nYou will get 100xp as a reward.", // Description
            () => {
                return hero.level >= 3; // Function returns true when completed
            },
            () => {
                hero.xp += 100; // Function gives reward
            }));

        this.allQuests.push(new Quest(i++, // id
            "Hoarder", // Title
            "Have 200 items in total (coins don't count). \nYou will receive a cool sword.", // Description
            () => {
                return inventoryManager.objectsInInventory().count >= 200; // Function returns true when completed
            },
            () => {
                inventoryManager.addObject(new Sword_3(loader, 1, -2, -1)); // Function gives reward
            }));

        this.allQuests.push(new Quest(i++, // id
            "Nothing is safe", // Title
            "Kill at least 25 sheep, 10 Goblins and 1 Slime. \nYou will receive an awesome shield.", // Description
            () => {
                return hero.stats.sheepKills >= 25 && hero.stats.goblinKills >= 10 && hero.stats.slimeKills >= 1; // Function returns true when completed
            },
            () => {
                inventoryManager.addObject(new Shield_4(loader, 1, -2, -1)); // Function gives reward
            }));
    }

    update() {
        if (this.hero.questsCompleted < this.allQuests.length) {
            if (this.allQuests[this.hero.questsCompleted].check()) {
                this.hero.questsCompleted++;
            }
        }
    }

    draw(ctx, x, y) {
        if (this.hero.questsCompleted < this.allQuests.length) {
            this.allQuests[this.hero.questsCompleted].draw(ctx, x, y);
        } else {
            ctx.font = "22px Arial";
            ctx.fillStyle = "black";
            ctx.fillText("All quests completed.", x + 1, y + 1);
            ctx.fillStyle = "white";
            ctx.fillText("All quests completed.", x, y);
        }
    }
}