import Goblin from "../NPCObjects/Goblin.class";
import Sheep from "../NPCObjects/Sheep.class";

export default class Spawner {
    constructor(bounds, type, Loader, count, map) {
        this.tileLevel = 0;
        this.bounds = bounds;
        this.type = type;
        this.Loader = Loader;
        this.count = count;
        this.map = map;
        this.units = [];
        this.timeToCreate = 0;
        for (let i = 0; i < count; i++) {
            this.units.push(this.createOfType(type));
        }
    }

    update(delta, projectiles) {
        if (this.units.length < this.count) {
            if (this.timeToCreate < 10) {
                this.timeToCreate += delta;
            } else {
                this.timeToCreate = 0;
                this.units.push(this.createOfType(this.type));
            }
        }
        this.units.forEach(unit => {
            unit.update(delta, this.units);
            if (unit.isHit(projectiles)) {
                if (unit.health <= 0) {
                    this.units.splice(this.units.indexOf(unit), 1);
                }
            }
        });
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
                    unit = new Goblin(this.Loader, x, y, this.map, this.bounds);
                    break;
                case "Sheep":
                    unit = new Sheep(this.Loader, x, y, this.map, this.bounds);
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
}