class World {
    character = new Character();
    level = level1;
    canvas;
    ctx;
    keyboard;
    camera_x = 0;
    camera_bgLayer1 = 0;
    camera_bgLayer2 = 0;
    camera_bgLayer3 = 0;
    requestId = 0;
    barHealth = new Statusbar(20, 40);
    barBottle = new Statusbar(20, 90);


    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.draw();
        this.setWorldTo();
        this.run();
    }


    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.translate(this.camera_x, 0);
        this.drawBackground();
        this.addObjectsToMap(this.level.bottles);
        this.addObjectsToMap(this.level.coins);
        this.addObjectsToMap(this.level.enemies);
        this.addToMap(this.character);
        this.drawHealthbar();
        this.drawBottlebar();
        this.ctx.translate(-this.camera_x, 0);
        let self = this;
        this.requestId = requestAnimationFrame(() => {
            self.draw();
        });
    }


    drawHealthbar() {
        this.ctx.translate(-this.camera_x, 0);
        this.addToMap(this.barHealth);
        this.ctx.translate(this.camera_x, 0);
        this.drawBar(this.character, 60, this.character.energy);
        this.ctx.translate(-this.camera_x, 0);
        this.ctx.drawImage(this.barHealth.imgCache['img/7_statusbars/3_icons/icon_health.png'], 5, 25, Math.floor(157 / 3), Math.floor(158 / 3));
        this.ctx.translate(this.camera_x, 0);
    }


    drawBottlebar() {
        // let collectedBottles = 
        this.ctx.translate(-this.camera_x, 0);
        this.addToMap(this.barBottle);
        this.ctx.translate(this.camera_x, 0);
        this.drawBar(this.character, 110, this.character.nrCollectedBottles * 100 / this.level.amountBottles);
        this.ctx.translate(-this.camera_x, 0);
        this.ctx.drawImage(this.barBottle.imgCache['img/7_statusbars/3_icons/icon_salsa_bottle.png'], 5, 80, Math.floor(157 / 3), Math.floor(158 / 3));
        this.ctx.translate(this.camera_x, 0);
    }


    setWorldTo() {
        this.character.world = this;
        for (let i = 0; i < this.level.enemies.length; i++) {
            this.level.enemies[i].world = this;
        }
    }


    run() {
        setInterval(() => {
            this.checkCollisions();
            this.checkOutOfStage();
        }, normalMs);
    }


    drawBackground() {
        this.addObjectsToMap(this.level.air);
        this.ctx.translate(-this.camera_x, 0);
        this.addObjectsToMap(this.level.clouds);
        this.moveBackground()
        this.ctx.translate(this.camera_x, 0);
    }


    addObjectsToMap(obj) {
        obj.forEach((o) => {
            this.addToMap(o);
        });
    }


    addToMap(mo) {
        if (mo.otherDirection) {
            this.flipImg(mo);
        }

        this.ctx.drawImage(mo.img, mo.x, mo.y, mo.width, mo.height);
        // this.drawFrame(mo);

        if (mo.otherDirection) {
            this.reFlipImg(mo);
        }
    }


    checkCollisions() {
        this.collisionEnenmies();
        this.collisionBottles();
        this.collisionCoins();
    }


    collisionEnenmies() {
        this.level.enemies.forEach((enemy) => {
            if (this.character.isColliding(enemy)) {
                this.characterLoseEnergy();
            };
        });
    }


    collisionBottles() {
        this.level.bottles.forEach((bottle) => {
            if (this.character.isColliding(bottle)) {
                this.characterCollectedBottles();
                this.spliceObj(bottle, this.level.bottles);
            };
        });
    }


    collisionCoins() {
        this.level.coins.forEach((coin) => {
            if (this.character.isColliding(coin)) {
                this.spliceObj(coin, this.level.coins);
            };
        });
    }


    checkOutOfStage() {
        this.level.enemies.forEach((enemy) => {
            if (enemy.isOutOfStage(enemy)) {
                this.spliceObj(enemy, this.level.enemies);
            };
        });
    }
    
    
    spliceObj(obj, arr) {
        let position = this.findPosition(obj, arr);
        arr.splice(position, 1);
        if (obj instanceof SalsaBottle) {
            this.character.nrCollectedBottles++;
            console.log(this.character.nrCollectedBottles);
        }
    }


    findPosition(obj, array) {
        for (let i = 0; i < array.length; i++) {
            let searchedId = obj.intervalId;
            let arrayId = array[i].intervalId;
            if (searchedId == arrayId) {
                return i;
            }
        }
    }


    characterLoseEnergy() {
        if (this.character.energy > 0) {
            this.character.energy -= 1;
            this.character.justHurt = true;
        }
    }
    
    characterCollectedBottles() {
        if (!this.character.justPickedBottle) {
            // this.character.nrCollectedBottles++;
        }
    }


    moveBackground() {
        this.ctx.translate(this.camera_bgLayer3, 0);
        this.addObjectsToMap(this.level.layer3rd);
        this.ctx.translate(-this.camera_bgLayer3, 0);
        this.ctx.translate(this.camera_bgLayer2, 0);
        this.addObjectsToMap(this.level.layer2nd);
        this.ctx.translate(-this.camera_bgLayer2, 0);
        this.ctx.translate(this.camera_bgLayer1, 0);
        this.addObjectsToMap(this.level.layer1st);
        this.ctx.translate(-this.camera_bgLayer1, 0);
    }


    flipImg(mo) {
        this.ctx.save();
        this.ctx.translate(mo.width, 0);
        this.ctx.scale(-1, 1);
        mo.x = mo.x * -1;
    }


    drawFrame(mo) {
        if (
            mo instanceof Character ||
            mo instanceof Chicken
        ) {
            this.rectangleRed(mo);
            this.rectangleBlue(mo);
        }
    }


    reFlipImg(mo) {
        mo.x = mo.x * -1;
        this.ctx.restore();
    }


    rectangleRed(mo) {
        this.ctx.beginPath();
        this.ctx.lineWidth = '1';
        this.ctx.strokeStyle = 'red';
        this.ctx.rect(mo.x + mo.offsetL, mo.y + mo.offsetT, mo.width - mo.offsetR, mo.height - mo.offsetB);
        this.ctx.stroke();
    }


    rectangleBlue(mo) {
        this.ctx.beginPath();
        this.ctx.lineWidth = '1';
        this.ctx.strokeStyle = 'blue';
        this.ctx.rect(mo.x, mo.y, mo.width, mo.height);
        this.ctx.stroke();
    }


    onOffSounds(boolean) {
        for (let i = 0; i < this.level.enemies.length; i++) {
            this.level.enemies[i].soundOn = boolean;
        }
        this.character.soundOn = boolean;
    }


    soundsOn() {
        this.onOffSounds(true);
    }


    soundsOff() {
        this.onOffSounds(false);
    }


    drawBar(mo, posY, diff) {
        let posX = mo.x + 10;
        this.ctx.beginPath();
        let grd = ctx.createLinearGradient(posX, (posY - 5), posX, (posY + 15));
        grd.addColorStop(0, "white");
        grd.addColorStop(0.6, "#41B345");
        this.ctx.strokeStyle = grd;
        this.ctx.moveTo((posX - 49), posY);
        this.ctx.lineWidth = '11';
        this.ctx.lineCap = "round";
        this.ctx.lineTo((posX - 49) + diff, posY);
        this.ctx.stroke();
    }


    reset() {
        cancelAnimationFrame(this.requestId);
        this.character.x = 10;
        this.character.justIdle = false;
        this.character.otherDirection = false;

        this.level = [];
        level1 = [];

        this.level = new Level(
            [
                new Endboss(),
                new Chicken(),
                new Chicken(),
                new Chicken(),
                new ChickenSmall(),
                new ChickenSmall(),
                new ChickenSmall()
            ],
            [
                new Cloud('img/5_background/layers/4_clouds/1.png', 0),
                new Cloud('img/5_background/layers/4_clouds/2.png', 719),
                new Cloud('img/5_background/layers/4_clouds/1.png', 719 * 2),
                new Cloud('img/5_background/layers/4_clouds/2.png', 719 * 3),
                new Cloud('img/5_background/layers/4_clouds/1.png', 719 * 4),
                new Cloud('img/5_background/layers/4_clouds/2.png', 719 * 5),
            ],
            [
                new BackgroundObject('img/5_background/layers/air.png', -719),
                new BackgroundObject('img/5_background/layers/air.png', 0),
                new BackgroundObject('img/5_background/layers/air.png', 719),
                new BackgroundObject('img/5_background/layers/air.png', 719 * 2),
                new BackgroundObject('img/5_background/layers/air.png', 719 * 3),
                new BackgroundObject('img/5_background/layers/air.png', 719 * 4),
                new BackgroundObject('img/5_background/layers/air.png', 719 * 5)
            ],
            [
                new BackgroundObject('img/5_background/layers/3_third_layer/2.png', -719),
                new BackgroundObject('img/5_background/layers/3_third_layer/1.png', 0),
                new BackgroundObject('img/5_background/layers/3_third_layer/2.png', 719),
                new BackgroundObject('img/5_background/layers/3_third_layer/1.png', 719 * 2),
                new BackgroundObject('img/5_background/layers/3_third_layer/2.png', 719 * 3),
                new BackgroundObject('img/5_background/layers/3_third_layer/1.png', 719 * 4),
                new BackgroundObject('img/5_background/layers/3_third_layer/2.png', 719 * 5)
            ],
            [
                new BackgroundObject('img/5_background/layers/2_second_layer/2.png', -719),
                new BackgroundObject('img/5_background/layers/2_second_layer/1.png', 0),
                new BackgroundObject('img/5_background/layers/2_second_layer/2.png', 719),
                new BackgroundObject('img/5_background/layers/2_second_layer/1.png', 719 * 2),
                new BackgroundObject('img/5_background/layers/2_second_layer/2.png', 719 * 3),
                new BackgroundObject('img/5_background/layers/2_second_layer/1.png', 719 * 4),
                new BackgroundObject('img/5_background/layers/2_second_layer/2.png', 719 * 5)
            ],
            [
                new BackgroundObject('img/5_background/layers/1_first_layer/2.png', -719),
                new BackgroundObject('img/5_background/layers/1_first_layer/1.png', 0),
                new BackgroundObject('img/5_background/layers/1_first_layer/2.png', 719),
                new BackgroundObject('img/5_background/layers/1_first_layer/1.png', 719 * 2),
                new BackgroundObject('img/5_background/layers/1_first_layer/2.png', 719 * 3),
                new BackgroundObject('img/5_background/layers/1_first_layer/1.png', 719 * 4),
                new BackgroundObject('img/5_background/layers/1_first_layer/2.png', 719 * 5)
            ],
            [
                new SalsaBottle(),
                new SalsaBottle(),
                new SalsaBottle()
            ],
            [
                new Coin(),
                new Coin(),
                new Coin(),
                new Coin(),
                new Coin()
            ]
        );

        let self = this;
        this.requestId = requestAnimationFrame(() => {
            self.draw();
        });
    }
}