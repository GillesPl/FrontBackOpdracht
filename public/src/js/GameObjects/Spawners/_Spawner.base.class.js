import Goblin from "../NPCObjects/Goblin.class";
import Sheep from "../NPCObjects/Sheep.class";
import Slime from "../NPCObjects/Slime.class";
import Dog from "../NPCObjects/Dog.class";

export default class Spawner {
    constructor(bounds, type, loader, count, map, id, units) {
        this.tileLevel = 0;
        this.id = id;
        this.bounds = bounds;
        this.type = type;
        this.loader = loader;
        this.count = count;
        this.map = map;
        this.units = [];
        this.timeToCreate = 0;


        if (units === undefined) {
            for (let i = 0; i < count; i++) {
                this.units.push(this.createOfType(type));
            }
        } else {
            units.forEach(unit => {
                this.units.push(this.createUnit(unit));
            });
        }
    }

    update(delta, projectiles, parent) {
        //if (this.units.length < this.count) {
        //    if (this.timeToCreate < 10) {
        //        this.timeToCreate += delta;
        //    } else {
        //        this.timeToCreate = 0;
        //        this.units.push(this.createOfType(this.type));
        //    }
        //}
        this.units.forEach(unit => {
            unit.update(delta, this.units);
            if (unit.isHit(projectiles)) {
                let sound;
                let random = Math.floor((Math.random() * 10) + 1);
                parent.updateUnit(unit.getSmallObject());
                if (unit.health > 0) {
                    switch (unit.type) {
                        case "Goblins":
                            sound = this.loader.getSound("goblin-death");
                            sound.loop = false;
                            sound.volume = 1;
                            sound.play().then();
                            break;
                        case "Sheep":
                            if (random <= 3) sound = this.loader.getSound("sheep");
                            else sound = this.loader.getSound("sheep-2");
                            sound.loop = false;
                            sound.volume = 1;
                            sound.play().then();
                            break;
                        case "Slimes":
                            sound = this.loader.getSound("slime");
                            sound.loop = false;
                            sound.volume = 1;
                            sound.play().then();
                            break;
                        default:
                            sound = this.loader.getSound("default");
                            sound.loop = false;
                            sound.volume = 1;
                            sound.play().then();
                            break;
                    }
                } else {
                    switch (unit.type) {
                        case "Goblins":
                            parent.hero.stats.goblinKills++;
                            sound = this.loader.getSound("goblin-death-2");
                            sound.loop = false;
                            sound.volume = 1;
                            sound.play().then();
                            break;
                        case "Sheep":
                            parent.hero.stats.sheepKills++;
                            sound = this.loader.getSound("sheep-3");
                            sound.loop = false;
                            sound.volume = 1;
                            sound.play().then();
                            break;
                        case "Slimes":
                            parent.hero.stats.slimeKills++;
                            sound = this.loader.getSound("slime");
                            sound.loop = false;
                            sound.volume = 1;
                            sound.play().then();
                            break;
                        default:
                            sound = this.loader.getSound("default");
                            sound.loop = false;
                            sound.volume = 1;
                            sound.play().then();
                            break;
                    }
                    parent.hero.xp += unit.xp;
                    this.units.splice(this.units.indexOf(unit), 1);
                }
            }
        });
    }

    newUnit(remoteUnit) {
        if (remoteUnit.id.startsWith(this.id)) {
            this.units.push(this.createUnit(remoteUnit));
        }
    }

    updateUnit(remoteUnit) {
        if (remoteUnit.id.startsWith(this.id)) {
            this.units.forEach(unit => {
                if (remoteUnit.id === unit.id) {
                    unit.x = remoteUnit.x;
                    unit.y = remoteUnit.y;
                    unit.health = remoteUnit.health;
                    unit.action = remoteUnit.action;
                    unit.doingAction = remoteUnit.doingAction;
                    switch (unit.action) {
                        case unit.STATE.RUNNINGNORTH:
                            unit.imageState = 3;
                            break;
                        case unit.STATE.RUNNINGEAST:
                            unit.imageState = 2;
                            break;
                        case unit.STATE.RUNNINGSOUTH:
                            unit.imageState = 0;
                            break;
                        case unit.STATE.RUNNINGWEST:
                            unit.imageState = 1;
                            break;
                    }
                }
            });
        }
    }

    draw(ctx, camera) {
        this.units.forEach(unit => {
            unit.draw(ctx,
                camera.getScreenX(unit.x),
                camera.getScreenY(unit.y));
        });
    }

    createOfType(type) {
        let x, y, collision, unit;
        do {
            x = (Math.random() * this.bounds.width + this.bounds.x);
            y = (Math.random() * this.bounds.height + this.bounds.y);
            switch (type) {
                case "Goblins":
                    unit = new Goblin(this.loader, x, y, this.map, this.bounds);
                    break;

                case "Sheep":
                    unit = new Sheep(this.loader, x, y, this.map, this.bounds);
                    break;

                case "Slimes":
                    unit = new Slime(this.loader, x, y, this.map, this.bounds);
                    break;

                case "Dog":
                    unit = new Dog(this.loader, x, y, this.map, this.bounds);
                    break;

                default:
                    console.log('Cannot create unit of type ' + type);
                    return null;
            }

            let left = x;
            let right = x + this.map.drawSize - 1;
            let top = y;
            let bottom = y + this.map.drawSize - 1;
            collision =
                this.map.isSolidTileAtXY(left, top, this.tileLevel) ||
                this.map.isSolidTileAtXY(right, top, this.tileLevel) ||
                this.map.isSolidTileAtXY(right, bottom, this.tileLevel) ||
                this.map.isSolidTileAtXY(left, bottom, this.tileLevel) ||
                unit.unitsOverlap(this.units);
        } while (collision);
        return unit;
    }

    createUnit(unit) {
        let newUnit;
        switch (unit.type) {
            case "Goblins":
                newUnit = new Goblin(this.loader, unit.x, unit.y, this.map, this.bounds);
                break;

            case "Sheep":
                newUnit = new Sheep(this.loader, unit.x, unit.y, this.map, this.bounds);
                break;

            case "Slimes":
                newUnit = new Slime(this.loader, unit.x, unit.y, this.map, this.bounds);
                break;

            case "Dog":
                newUnit = new Dog(this.loader, unit.x, unit.y, this.map, this.bounds);
                break;

            default:
                console.log('Cannot create unit of type ' + unit.type);
                return null;
        }
        newUnit.id = unit.id;
        newUnit.health = unit.health;
        newUnit.action = unit.action;
        newUnit.doingAction = unit.doingAction;
        switch (newUnit.action) {
            case newUnit.STATE.RUNNINGNORTH:
                newUnit.imageState = 3;
                break;
            case newUnit.STATE.RUNNINGEAST:
                newUnit.imageState = 2;
                break;
            case newUnit.STATE.RUNNINGSOUTH:
                newUnit.imageState = 0;
                break;
            case newUnit.STATE.RUNNINGWEST:
                newUnit.imageState = 1;
                break;
        }
        return newUnit;
    }
}