import Camera from "../Loader/Camera";
import Keyboard from "../Loader/Keyboard.class";
import Fire from "../GameObjects/NonCharacterObjects/Fire.class";
import DroppedItem from "../GameObjects/NonCharacterObjects/DroppedItem.class";
import Goblin from "../GameObjects/NPCObjects/Goblin.class";
import Spawner from "../GameObjects/Spawners/_Spawner.base.class";
import Hero from "../GameObjects/MainObjects/Hero.class";
import InventoryManager from "../GameObjects/MainObjects/InventoryManager.class";
import OtherPlayer from "../GameObjects/MainObjects/OtherPlayer.class";
import Loader from "../Loader/Loader";
import GameState from "./GameState";
import Pojectile from "../GameObjects/Damage/_Projectile.base.class";
import Arrow_1 from "../GameObjects/Damage/Arrow_1.class";
import DamageArea_1 from "../GameObjects/Damage/DamageArea_1.class";

// inventoryItems
import Sword_1 from "../GameObjects/InventoryObjects/Sword_1.class";
import Sword_2 from "../GameObjects/InventoryObjects/Sword_2.class";
import Sword_3 from "../GameObjects/InventoryObjects/Sword_3.class";
import Shield_1 from "../GameObjects/InventoryObjects/Shield_1.class";
import Shield_2 from "../GameObjects/InventoryObjects/Shield_2.class";
import Shield_3 from "../GameObjects/InventoryObjects/Shield_3.class";
import Shield_4 from "../GameObjects/InventoryObjects/Shield_4.class";
import Axe_1 from "../GameObjects/InventoryObjects/Axe_1.class";
import Axe_2 from "../GameObjects/InventoryObjects/Axe_2.class";
import Axe_3 from "../GameObjects/InventoryObjects/Axe_3.class";
import Bow_1 from "../GameObjects/InventoryObjects/Bow_1.class";
import Bow_2 from "../GameObjects/InventoryObjects/Bow_2.class";
import Bow_3 from "../GameObjects/InventoryObjects/Bow_3.class";
import Mace from "../GameObjects/InventoryObjects/Mace.class";
import Spear from "../GameObjects/InventoryObjects/Spear.class";
import Armor_1 from "../GameObjects/InventoryObjects/Armor_1.class";
import Armor_2 from "../GameObjects/InventoryObjects/Armor_2.class";
import Boots_1 from "../GameObjects/InventoryObjects/Boots_1.class";
import Boots_2 from "../GameObjects/InventoryObjects/Boots_2.class";
import Boots_3 from "../GameObjects/InventoryObjects/Boots_3.class";
import Helmet_1 from "../GameObjects/InventoryObjects/Helmet_1.class";
import Helmet_2 from "../GameObjects/InventoryObjects/Helmet_2.class";
import Coin from "../GameObjects/InventoryObjects/Coin.class";
import Health_bottle_1 from "../GameObjects/InventoryObjects/Health_bottle_1.class";
import Health_bottle_2 from "../GameObjects/InventoryObjects/Health_bottle_2.class";
import Health_bottle_3 from "../GameObjects/InventoryObjects/Health_bottle_3.class";
import Health_bottle_4 from "../GameObjects/InventoryObjects/Health_bottle_4.class";
import Empty_bottle_1 from "../GameObjects/InventoryObjects/Empty_bottle_1.class";
import Empty_bottle_2 from "../GameObjects/InventoryObjects/Empty_bottle_2.class";
import Empty_bottle_3 from "../GameObjects/InventoryObjects/Empty_bottle_3.class";
import Empty_bottle_4 from "../GameObjects/InventoryObjects/Empty_bottle_4.class";

export default class MainGameState {
    constructor(map, socket) {
        this.map = map;
        this.hero;
        this.camera;
        this.socket = socket;
        this.fullscreenState = false;
        this.Loader = new Loader();
        this.otherPlayers = [];
        this.connected = false;

        this.nonCharacterObjects = [];
        //this.NPCObjects = [];
        this.spawners = [];
        this.projectiles = [];

        this._previousElapsed = 0;
        this.isMousePressed = true;
        this.loadassets = this.load();
    }

    //showCustomMenu() {
    //
    //}

    start() {
        document.querySelector("body").innerHTML = `<canvas id="game" width="512" height="512"></canvas>`;
        this.ctx = document.querySelector("#game").getContext('2d');
        this.ctx.width = window.innerWidth;
        this.ctx.height = window.innerHeight;

        Promise.all(this.loadassets).then(function (loaded) {
            this.init();
            var sound = this.Loader.getSound("ambience");
            this.setSound(sound);

            let check = false;
            (function (a) {
                if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(a) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0, 4))) check = true;
            })(navigator.userAgent || navigator.vendor || window.opera);


            if (check) {
                document.ontouchmove = function (event) {
                    this.onMouseMove(event);
                }.bind(this);
                document.ontouchstart = function (event) {
                    this.onMouseDown(event);
                }.bind(this);
                document.ontouchend = function (event) {
                    this.onMouseUp(event);
                }.bind(this);
            } else {
                document.onmousemove = function (event) {
                    this.onMouseMove(event);
                }.bind(this);
                document.onmousedown = function (event) {
                    this.onMouseDown(event);
                }.bind(this);
                document.onmouseup = function (event) {
                    this.onMouseUp(event);
                }.bind(this);
            }
            window.requestAnimationFrame(function (elapsed) {
                this.draw(elapsed);
            }.bind(this));
            //window.oncontextmenu = function () {
            //    this.showCustomMenu();
            //    return false; // cancel default menu
            //}.bind(this);
        }.bind(this));
    }

    draw(elapsed) {
        let self = this;
        window.requestAnimationFrame(function (elapsed) {
            self.draw(elapsed);
        });

        // clear previous frame
        this.ctx.clearRect(0, 0, 512, 512);

        // compute delta elapsed in seconds -- also cap it
        let delta = (elapsed - this._previousElapsed) / 1000.0;
        //delta = Math.min(delta, 0.25); // maximum delta of 250 ms
        this._previousElapsed = elapsed;

        //var in update == delta, see commented code above
        this.update(delta);
        this.render(delta);
    }

    setSound(sound) {
        sound.loop = true;
        sound.volume = 0.1;
        sound.play().then(() => {});
    }



    setUser(user) {
        // Use data from server
        this.overwriteHero = {};
        this.overwriteHero.id = user._id;
        this.overwriteHero.x = user.position.x;
        this.overwriteHero.y = user.position.y;
        this.overwriteHero.health = user.health;
        this.overwriteHero.tileLevel = user.tileLevel;
        this.overwriteHero.token = user.token;
        this.overwriteInventory = user.items;
    }

    loadNonCharacterObjects(objects) {
        this.nonCharacterObjects = [];
        objects.forEach(object => {
            this.createNonCharacterObject(object);
        });
    }

    createNonCharacterObject(object) {
        switch (object.name) {
            case "Fire":
                this.nonCharacterObjects.push(new Fire(this.Loader, object.id, object.x, object.y));
                break;

            case "Coin":
                this.nonCharacterObjects.push(new DroppedItem(this.Loader, object.id, object.x, object.y,
                    16, 16, "coin", object.properties.Count));
                break;

            default:
                this.nonCharacterObjects.push(new DroppedItem(this.Loader, object.id, object.x, object.y,
                    32, 32, object.name, object.properties.Count));
                break;
        }
    }

    loadNPCs(npcs) {
        this.spawners = [];
        npcs.forEach(npc => {
            let bounds = {
                x: npc.x,
                y: npc.y,
                width: npc.width,
                height: npc.height
            };
            this.spawners.push(new Spawner(bounds, npc.name, this.Loader, npc.properties.Count, this.map));
        });
    }

    loadSpawners(spawners) {
        this.spawners = [];
        spawners.forEach(spawner => {
            this.spawners.push(new Spawner(spawner.bounds, spawner.type, this.Loader, spawner.count, this.map, spawner.id, spawner.units));
        });
    }

    loadInventoryObjects() {
        let inventoryObjects = [];
        this.overwriteInventory.forEach(item => {
            this.createInventoryObject(inventoryObjects, item);
        });
        this.InventoryManager = new InventoryManager(inventoryObjects, this.Loader, this.hero, this.projectiles, this.map);
    }

    createInventoryObject(inventoryObjects, object) {
        switch (object.name) {
            case "sword_1":
                inventoryObjects.push(new Sword_1(this.Loader, object.count, object.inventoryLocation, object.actionLocation));
                break;
            case "sword_2":
                inventoryObjects.push(new Sword_2(this.Loader, object.count, object.inventoryLocation, object.actionLocation));
                break;
            case "sword_3":
                inventoryObjects.push(new Sword_3(this.Loader, object.count, object.inventoryLocation, object.actionLocation));
                break;
            case "shield_1":
                inventoryObjects.push(new Shield_1(this.Loader, object.count, object.inventoryLocation, object.actionLocation, object.isEquipped));
                break;
            case "shield_2":
                inventoryObjects.push(new Shield_2(this.Loader, object.count, object.inventoryLocation, object.actionLocation, object.isEquipped));
                break;
            case "shield_3":
                inventoryObjects.push(new Shield_3(this.Loader, object.count, object.inventoryLocation, object.actionLocation, object.isEquipped));
                break;
            case "shield_4":
                inventoryObjects.push(new Shield_4(this.Loader, object.count, object.inventoryLocation, object.actionLocation, object.isEquipped));
                break;
            case "axe_1":
                inventoryObjects.push(new Axe_1(this.Loader, object.count, object.inventoryLocation, object.actionLocation));
                break;
            case "axe_2":
                inventoryObjects.push(new Axe_2(this.Loader, object.count, object.inventoryLocation, object.actionLocation));
                break;
            case "axe_3":
                inventoryObjects.push(new Axe_3(this.Loader, object.count, object.inventoryLocation, object.actionLocation));
                break;
            case "bow_1":
                inventoryObjects.push(new Bow_1(this.Loader, object.count, object.inventoryLocation, object.actionLocation));
                break;
            case "bow_2":
                inventoryObjects.push(new Bow_2(this.Loader, object.count, object.inventoryLocation, object.actionLocation));
                break;
            case "bow_3":
                inventoryObjects.push(new Bow_3(this.Loader, object.count, object.inventoryLocation, object.actionLocation));
                break;
            case "mace":
                inventoryObjects.push(new Mace(this.Loader, object.count, object.inventoryLocation, object.actionLocation));
                break;
            case "spear":
                inventoryObjects.push(new Spear(this.Loader, object.count, object.inventoryLocation, object.actionLocation));
                break;
            case "armor_1":
                inventoryObjects.push(new Armor_1(this.Loader, object.count, object.inventoryLocation, object.actionLocation, object.isEquipped));
                break;
            case "armor_2":
                inventoryObjects.push(new Armor_2(this.Loader, object.count, object.inventoryLocation, object.actionLocation, object.isEquipped));
                break;
            case "boots_1":
                inventoryObjects.push(new Boots_1(this.Loader, object.count, object.inventoryLocation, object.actionLocation, object.isEquipped));
                break;
            case "boots_2":
                inventoryObjects.push(new Boots_2(this.Loader, object.count, object.inventoryLocation, object.actionLocation, object.isEquipped));
                break;
            case "boots_3":
                inventoryObjects.push(new Boots_3(this.Loader, object.count, object.inventoryLocation, object.actionLocation, object.isEquipped));
                break;
            case "helmet_1":
                inventoryObjects.push(new Helmet_1(this.Loader, object.count, object.inventoryLocation, object.actionLocation, object.isEquipped));
                break;
            case "helmet_2":
                inventoryObjects.push(new Helmet_2(this.Loader, object.count, object.inventoryLocation, object.actionLocation, object.isEquipped));
                break;
            case "coin":
                inventoryObjects.push(new Coin(this.Loader, object.count, object.inventoryLocation, object.actionLocation));
                break;
            case "health_bottle_1":
                inventoryObjects.push(new Health_bottle_1(this.Loader, object.count, object.inventoryLocation, object.actionLocation));
                break;
            case "health_bottle_2":
                inventoryObjects.push(new Health_bottle_2(this.Loader, object.count, object.inventoryLocation, object.actionLocation));
                break;
            case "health_bottle_3":
                inventoryObjects.push(new Health_bottle_3(this.Loader, object.count, object.inventoryLocation, object.actionLocation));
                break;
            case "health_bottle_4":
                inventoryObjects.push(new Health_bottle_4(this.Loader, object.count, object.inventoryLocation, object.actionLocation));
                break;
            case "empty_bottle_1":
                inventoryObjects.push(new Empty_bottle_1(this.Loader, object.count, object.inventoryLocation, object.actionLocation));
                break;
            case "empty_bottle_2":
                inventoryObjects.push(new Empty_bottle_2(this.Loader, object.count, object.inventoryLocation, object.actionLocation));
                break;
            case "empty_bottle_3":
                inventoryObjects.push(new Empty_bottle_3(this.Loader, object.count, object.inventoryLocation, object.actionLocation));
                break;
            case "empty_bottle_4":
                inventoryObjects.push(new Empty_bottle_4(this.Loader, object.count, object.inventoryLocation, object.actionLocation));
                break;
        }
    }

    // send map in this
    init() {
        this.Keyboard = new Keyboard(this);
        this.Keyboard.listenForEvents([this.Keyboard.LEFT,
            this.Keyboard.RIGHT,
            this.Keyboard.UP,
            this.Keyboard.DOWN,
            this.Keyboard.A,
            this.Keyboard.D,
            this.Keyboard.W,
            this.Keyboard.S
        ], [this.Keyboard.I,
            this.Keyboard.C,
            this.Keyboard.T
        ]);

        this.tileAtlas = this.Loader.getImage('tiles');
        this.hero = new Hero(this.map, this.overwriteHero.x, this.overwriteHero.y, this.overwriteHero.id, this.overwriteHero.health, this.overwriteHero.tileLevel, this.overwriteHero.token, this.Loader);

        this.camera = new Camera(this.map, window.innerWidth, window.innerHeight);
        this.loadInventoryObjects();

        this.map.loadMap('../../assets/map/map.json', this.camera, this.hero, function (objects, npcs) {
            this.socket.emit("new_user", this.hero.getSmallObject(this.InventoryManager.getSmallObject()));
            this.loadSocket(this.socket);
            //this.loadNonCharacterObjects(objects);
            //this.loadNPCs(npcs);
        }.bind(this));
        this.events();
    }

    numPressed(num) {
        this.InventoryManager.numPressed(num);
    }

    keyPressed(keyCode) {
        this.InventoryManager.keyPressed(keyCode, this.Keyboard);
    }

    retryConnectOnFailure(retryInMilliseconds, socket, self) {
        self.timeout = setTimeout(function () {
            if (!self.connected) {
                //console.log('trying to connect...');
                socket.connect();
                self.retryConnectOnFailure(retryInMilliseconds, socket, self);
            }
        }, retryInMilliseconds);
    }

    loadSocket(client) {
        client.on('connect', () => {
            this.connected = true;
            clearTimeout(this.timeout);
            console.log('connected');
        });
        client.on('disconnect', () => {
            this.connected = false;
            console.log('disconnected');
            this.retryConnectOnFailure(3000, client, this); // Try again in 3s
        });
        client.on("otherPlayers", (othersJsonString) => {
            this.otherPlayers = [];
            const others = JSON.parse(othersJsonString);
            others.forEach((playerJsonString) => {
                const player = JSON.parse(playerJsonString);
                if (player.id != this.hero.id) {
                    this.otherPlayers.push(new OtherPlayer(player, this.Loader, this.map));
                }
            });
        });
        client.on("New_connection", (playerString) => {
            const player = JSON.parse(playerString);
            this.otherPlayers.push(new OtherPlayer(player, this.Loader, this.map));
        });
        client.on("user_leave", (playerString) => {
            const player = JSON.parse(playerString);
            //console.log('player left');
            let toDeleteIndex = 0;
            for (let i = 0; i < this.otherPlayers.length; i++) {
                if (this.otherPlayers[i].id === player.id)
                    toDeleteIndex = i;
            }
            this.otherPlayers.splice(i, 1);
            //this.otherPlayers.push(new OtherPlayer(hero, this.Loader, this.map));
        });
        client.on("updatingPlayer", (heroString) => {
            let found = false; // is player in cache
            const hero = JSON.parse(heroString);
            this.otherPlayers.forEach((player) => {
                if (player.id === hero.id) {
                    //console.log('info from ' + player.id);
                    player.action = hero.action;
                    player.x = hero.x;
                    player.y = hero.y;
                    player.tileLevel = hero.tileLevel;
                    found = true;
                }
            });
            if (!found) {
                this.otherPlayers.push(new OtherPlayer(hero, this.Loader, this.map));
            }
        });
        client.on("allObjects", (objectsString) => {
            const objects = JSON.parse(objectsString);
            this.loadNonCharacterObjects(objects);
        });
        client.on("newProjectile", (projectileJsonString) => {
            const projectile = JSON.parse(projectileJsonString);
            let newProjectile = null;
            switch (projectile.name) {
                case "Arrow_1":
                    newProjectile = new Arrow_1(projectile.id, this.Loader, projectile.x, projectile.y, projectile.angleInRadians, projectile.strength, this.map);
                    break;
                case "DamageArea_1":
                    newProjectile = new DamageArea_1(projectile.id, this.Loader, projectile.x, projectile.y, projectile.angleInRadians, projectile.strength, this.map);
                    break;
            }

            this.InventoryManager.damageAreas.push(newProjectile);
        });
        client.on("allSpawners", (spawnersString) => {
            const spawners = JSON.parse(spawnersString);
            this.loadSpawners(spawners);
        });
        client.on("newUnit", (unitString) => {
            const unit = JSON.parse(unitString);
            //console.log(unit);
            this.spawners.forEach(spawner => {
                spawner.newUnit(unit);
            })
        });
        client.on("updateUnit", (unitString) => {
            const unit = JSON.parse(unitString);
            this.spawners.forEach(spawner => {
                spawner.updateUnit(unit);
            });
        });
    }

    updateUnit(unitJsonString) {
        this.socket.emit("updateUnit", unitJsonString);
    }

    load() {
        return [this.Loader.loadImage('tiles', '../../assets/map/tileset.png'),
            this.Loader.loadImage('hero', '../../assets/sprites/george.png'),
            this.Loader.loadImage('death', '../../assets/sprites/deathAnimation.png'),
            this.Loader.loadImage('otherPlayer', '../../assets/sprites/other.png'),
            this.Loader.loadImage('fire', '../../assets/sprites/CampFire.png'),
            this.Loader.loadImage('inventoryTileSet', '../../assets/sprites/inventoryManager.png'),
            this.Loader.loadImage('iconbar', '../../assets/sprites/iconBar.png'),
            this.Loader.loadImage('characterModel', '../../assets/sprites/characterModel.png'),
            this.Loader.loadImage('goblin', '../../assets/sprites/goblin.png'),
            this.Loader.loadImage('sheep', '../../assets/sprites/sheep.png'),
            this.Loader.loadImage('slime', '../../assets/sprites/slime.png'),
            this.Loader.loadImage('arrow_1', '../../assets/sprites/arrow.png'),
            this.Loader.loadImage('damageArea_1', '../../assets/sprites/melee_attack.png'),

            // InventoryItems
            this.Loader.loadImage('sword_1', '../../assets/sprites/inventory/W_Dagger002.png'),
            this.Loader.loadImage('sword_2', '../../assets/sprites/inventory/W_Dagger003.png'),
            this.Loader.loadImage('sword_3', '../../assets/sprites/inventory/W_Dagger005.png'),
            this.Loader.loadImage('shield_1', '../../assets/sprites/inventory/E_Wood01.png'),
            this.Loader.loadImage('shield_2', '../../assets/sprites/inventory/E_Wood02.png'),
            this.Loader.loadImage('shield_3', '../../assets/sprites/inventory/E_Wood03.png'),
            this.Loader.loadImage('shield_4', '../../assets/sprites/inventory/E_Metal04.png'),
            this.Loader.loadImage('axe_1', '../../assets/sprites/inventory/W_Axe001.png'),
            this.Loader.loadImage('axe_2', '../../assets/sprites/inventory/W_Axe002.png'),
            this.Loader.loadImage('axe_3', '../../assets/sprites/inventory/W_Axe007.png'),
            this.Loader.loadImage('bow_1', '../../assets/sprites/inventory/W_Bow01.png'),
            this.Loader.loadImage('bow_2', '../../assets/sprites/inventory/W_Bow04.png'),
            this.Loader.loadImage('bow_3', '../../assets/sprites/inventory/W_Bow05.png'),
            this.Loader.loadImage('mace', '../../assets/sprites/inventory/W_Mace005.png'),
            this.Loader.loadImage('spear', '../../assets/sprites/inventory/W_Spear001.png'),
            this.Loader.loadImage('armor_1', '../../assets/sprites/inventory/A_Armor04.png'),
            this.Loader.loadImage('armor_2', '../../assets/sprites/inventory/A_Armour02.png'),
            this.Loader.loadImage('boots_1', '../../assets/sprites/inventory/A_Shoes01.png'),
            this.Loader.loadImage('boots_2', '../../assets/sprites/inventory/A_Shoes03.png'),
            this.Loader.loadImage('boots_3', '../../assets/sprites/inventory/A_Shoes04.png'),
            this.Loader.loadImage('helmet_1', '../../assets/sprites/inventory/C_Elm01.png'),
            this.Loader.loadImage('helmet_2', '../../assets/sprites/inventory/C_Elm03.png'),
            this.Loader.loadImage('health_bottle_1', '../../assets/sprites/inventory/P_Red04.png'),
            this.Loader.loadImage('health_bottle_2', '../../assets/sprites/inventory/P_Red02.png'),
            this.Loader.loadImage('health_bottle_3', '../../assets/sprites/inventory/P_Red03.png'),
            this.Loader.loadImage('health_bottle_4', '../../assets/sprites/inventory/P_Red01.png'),
            this.Loader.loadImage('empty_bottle_1', '../../assets/sprites/inventory/I_Bottle01.png'),
            this.Loader.loadImage('empty_bottle_2', '../../assets/sprites/inventory/I_Bottle02.png'),
            this.Loader.loadImage('empty_bottle_3', '../../assets/sprites/inventory/I_Bottle04.png'),
            this.Loader.loadImage('empty_bottle_4', '../../assets/sprites/inventory/I_Bottle03.png'),
            this.Loader.loadImage('coin', '../../assets/sprites/inventory/I_GoldCoin.png'),


            //Sounds
            this.Loader.loadSound('ambience', '../../assets/sounds/ambiance.mp3'),
            this.Loader.loadSound('goblin-death', '../../assets/sounds/goblin-death.mp3'),
            this.Loader.loadSound('goblin-death-2', '../../assets/sounds/goblin-death-2.mp3'),
            this.Loader.loadSound('explosion', '../../assets/sounds/explosion.mp3'),
            this.Loader.loadSound('sheep', '../../assets/sounds/sheep.mp3'),
            this.Loader.loadSound('sheep-2', '../../assets/sounds/sheep-2.mp3'),
            this.Loader.loadSound('sheep-3', '../../assets/sounds/sheep-3.mp3'),
            this.Loader.loadSound('slime', '../../assets/sounds/slime.mp3'),
            this.Loader.loadSound('default', '../../assets/sounds/default.mp3'),
        ];
    }

    sendNewDamageArea(damageArea) {
        this.socket.emit("newProjectile", damageArea.getSmallObject());
    }

    update(delta) {
        let dirx = 0;
        let diry = 0;
        if (this.Keyboard.isDown(this.Keyboard.LEFT) || this.Keyboard.isDown(this.Keyboard.A)) {
            if (this.hero.action != this.hero.STATE.RUNNINGWEST) {
                this.hero.action = this.hero.STATE.RUNNINGWEST;
                this.socket.emit("updatePlayer", this.hero.getSmallObject(this.InventoryManager.getSmallObject()));
            }
            dirx = -1;
        } else if (this.Keyboard.isDown(this.Keyboard.RIGHT) || this.Keyboard.isDown(this.Keyboard.D)) {
            if (this.hero.action != this.hero.STATE.RUNNINGEAST) {
                this.hero.action = this.hero.STATE.RUNNINGEAST;
                this.socket.emit("updatePlayer", this.hero.getSmallObject(this.InventoryManager.getSmallObject()));
            }
            dirx = 1;
        } else if (this.Keyboard.isDown(this.Keyboard.UP) || this.Keyboard.isDown(this.Keyboard.W)) {
            if (this.hero.action != this.hero.STATE.RUNNINGNORTH) {
                this.hero.action = this.hero.STATE.RUNNINGNORTH;
                this.socket.emit("updatePlayer", this.hero.getSmallObject(this.InventoryManager.getSmallObject()));
            }
            diry = -1;
        } else if (this.Keyboard.isDown(this.Keyboard.DOWN) || this.Keyboard.isDown(this.Keyboard.S)) {
            if (this.hero.action != this.hero.STATE.RUNNINGSOUTH) {
                this.hero.action = this.hero.STATE.RUNNINGSOUTH;
                this.socket.emit("updatePlayer", this.hero.getSmallObject(this.InventoryManager.getSmallObject()));
            }
            diry = 1;
        } else {
            if (this.hero.action != this.hero.STATE.STOP) {
                this.hero.action = this.hero.STATE.STOP;
                this.socket.emit("updatePlayer", this.hero.getSmallObject(this.InventoryManager.getSmallObject()));
            }
        }
        if (this.hero.resurected) {
            this.socket.emit("updatePlayer", this.hero.getSmallObject(this.InventoryManager.getSmallObject()));
        }

        this.hero.move(delta, dirx, diry);
        this.otherPlayers.forEach((player) => {
            player.move(delta);
        });
        this.projectiles.forEach(projectile => {
            projectile.update(delta);
            if (projectile.destroyed) {
                this.projectiles.splice(this.projectiles.indexOf(projectile), 1);
            }
        });
        this.nonCharacterObjects.forEach((thisObject) => {
            thisObject.update(delta);
            if (thisObject.hasDamage()) {
                let playerBounds = this.hero.getPlayerBounds();
                if (thisObject.isNear(playerBounds.xMin, playerBounds.yMin, playerBounds.xMax, playerBounds.yMax)) {
                    this.hero.takeDamage(thisObject.doDamage());
                }
            }
            if (thisObject.canBePickedUp) {
                let playerBounds = this.hero.getPlayerBounds();
                if (thisObject.isNear(playerBounds.xMin, playerBounds.yMin, playerBounds.xMax, playerBounds.yMax)) {
                    let countLeft = this.InventoryManager.addObject(thisObject.value);
                    if (countLeft === 0) {
                        this.nonCharacterObjects.splice(this.nonCharacterObjects.indexOf(thisObject), 1);
                    } else {
                        thisObject.value.stackCount = countLeft;
                    }
                    this.socket.emit("updateObject", JSON.stringify(thisObject.getSmallObject()));
                }
            }
        });
        //this.NPCObjects.forEach(npc => {
        //    npc.update(delta);
        //});
        this.spawners.forEach(spawner => {
            spawner.update(delta, this.projectiles, this);
        });
        this.InventoryManager.update(delta);
        this.hero.update(delta);
        this.camera.update();
    }

    getLayersUnder(tileLevel) {
        switch (tileLevel) {
            case 1:
                return 12;
            case 2:
                return 14;
            default:
                return 11;
        }
    }

    render(delta) {
        let canvas = document.querySelector("canvas");
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        canvas.style.width = window.innerWidth;
        canvas.style.height = window.innerHeight;

        this.ctx.width = window.innerWidth;
        this.ctx.height = window.innerHeight;
        this.camera.width = window.innerWidth;
        this.camera.height = window.innerHeight;

        this.ctx.imageSmoothingEnabled = false;
        // draw map background layer
        let layersUnderPlayer = this.getLayersUnder(this.hero.tileLevel);
        let objectLayersUnder = this.getLayersUnder(2);
        let totalLayers = this.map.layers.length;

        // draw map top layer
        for (let i = 0; i < totalLayers - 1; i++) {
            this._drawLayer(i);

            if (layersUnderPlayer === i) {
                this.hero.draw(this.ctx);
            }

            if (objectLayersUnder - 1 === i) {
                this.nonCharacterObjects.forEach((thisObject) => {
                    thisObject.draw(this.ctx,
                        this.camera.getScreenX(thisObject.x),
                        this.camera.getScreenY(thisObject.y));
                });

                //this.NPCObjects.forEach(npc => {
                //    npc.draw(this.ctx,
                //        this.camera.getScreenX(npc.x),
                //        this.camera.getScreenY(npc.y));
                //});
                this.spawners.forEach(spawner => {
                    spawner.draw(this.ctx, this.camera);
                });

                this.projectiles.forEach(projectile => {
                    projectile.draw(this.ctx, this.camera.getScreenX(projectile.x), this.camera.getScreenY(projectile.y));
                });
            }

            this.otherPlayers.forEach((player) => {
                let thisLayersUnder = this.getLayersUnder(player.tileLevel);
                if (thisLayersUnder - 1 === i) {
                    player.draw(this.ctx, this.camera.getScreenX(player.x), this.camera.getScreenY(player.y));
                }
            });
        }

        this.ctx.globalAlpha = 0.5;
        this._drawLayer(totalLayers - 1);

        this.ctx.globalAlpha = 1;
        this.InventoryManager.draw(this.ctx, this.ctx.width * 0.7, 0,
            this.ctx.width * 0.3, this.ctx.width * 0.36,
            this.ctx.width * 0.3, 0,
            delta, this.otherPlayers);
        this._drawUI();
    }

    onMouseDown(event) {
        let mousePosition = {
            x: (event.type.toLowerCase() === 'mousedown') ?
                event.pageX : event.touches[0].pageX,
            y: (event.type.toLowerCase() === 'mousedown') ?
                event.pageY : event.touches[0].pageY
        };
        this.InventoryManager.onMouseDown(mousePosition);
    }
    onMouseUp(event) {
        let mousePosition = {
            x: (event.type.toLowerCase() === 'mouseup') ?
                event.pageX : event.changedTouches[0].pageX,
            y: (event.type.toLowerCase() === 'mouseup') ?
                event.pageY : event.changedTouches[0].pageY
        };
        this.InventoryManager.onMouseUp(mousePosition, this);
    }

    onMouseMove(event) {
        let mousePosition = {
            x: (event.type.toLowerCase() === 'mousemove') ?
                event.pageX : event.targetTouches[0].pageX,
            y: (event.type.toLowerCase() === 'mousemove') ?
                event.pageY : event.targetTouches[0].pageY
        };
        this.InventoryManager.onMouseMove(mousePosition);
    }

    events() {
        let self = this;
        document.addEventListener("keypress", function (event) {
            if (event.key === 'f') {
                self.fullscreen();
            }
        }, this);
        document.addEventListener("fullscreenchange", function () {
            self.fullscreenState = document.fullscreen;
        }, this);

        document.addEventListener("mozfullscreenchange", function () {
            self.fullscreenState = document.mozFullScreen;
        }, this);

        document.addEventListener("webkitfullscreenchange", function () {
            self.fullscreenState = document.webkitIsFullScreen;
        }, this);

        document.addEventListener("msfullscreenchange", function () {
            self.fullscreenState = document.msFullscreenElement;
        }, this);
    }


    fullscreen() {
        let canvas = document.querySelector("canvas");
        if (this.fullscreenState) {
            if (document.exitFullscreen) {
                document.exitFullscreen();
            } else if (document.mozCancelFullScreen) {
                document.mozCancelFullScreen();
            } else if (document.webkitCancelFullScreen) {
                document.webkitCancelFullScreen();
            } else {
                console.log('exitFullScreen not supported');
            }
        } else {
            if (canvas.requestFullscreen) {
                canvas.requestFullscreen();
            } else if (canvas.webkitRequestFullscreen) {
                canvas.webkitRequestFullscreen();
            } else if (canvas.mozRequestFullScreen) {
                canvas.mozRequestFullScreen();
            } else {
                console.log('goFullScreen not supported');
            }
        }
    }

    _drawUI() {
        var tx = 10,
            ty = 0,
            dy = 40;

        this.ctx.fillStyle = "black";
        this.ctx.fillRect(tx, ty += dy, 102, 20);
        this.ctx.fillStyle = "red";
        this.ctx.fillRect(tx + 1, ty + 1, this.hero.health, 18);
    }


    _drawLayer(layer) {
        let startCol = Math.floor(this.camera.x / this.map.drawSize);
        let endCol = startCol + (this.ctx.width / this.map.drawSize) + 1;
        let startRow = Math.floor(this.camera.y / this.map.drawSize);
        let endRow = startRow + (this.ctx.height / this.map.drawSize) + 1;
        let offsetX = -this.camera.x + startCol * this.map.drawSize;
        let offsetY = -this.camera.y + startRow * this.map.drawSize;

        for (let c = startCol; c <= endCol; c++) {
            for (let r = startRow; r <= endRow; r++) {
                let tile = this.map.getTile(layer, c, r);
                let x = (c - startCol) * this.map.drawSize + offsetX;
                let y = (r - startRow) * this.map.drawSize + offsetY;
                if (tile !== 0) { // 0 => empty tile
                    this.ctx.drawImage(
                        this.tileAtlas, // image
                        (tile % this.map.twidth - 1) * (this.map.tsize + 1), // source x
                        (Math.floor(tile / this.map.twidth)) * (this.map.tsize + 1), // source y
                        this.map.tsize, // source width
                        this.map.tsize, // source height
                        Math.round(x), // target x
                        Math.round(y), // target y
                        this.map.drawSize, // target width
                        this.map.drawSize // target height
                    );
                }
            }
        }
    }
}