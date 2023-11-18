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
    statusbar = new Statusbar();


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
        this.drawStatusbar();
        this.ctx.translate(-this.camera_x, 0);
        let self = this;
        this.requestId = requestAnimationFrame(() => {
            self.draw();
        });
    }


    drawStatusbar() {
        this.ctx.translate(-this.camera_x, 0);
        this.addToMap(this.statusbar);
        this.ctx.translate(this.camera_x, 0);
        this.drawEnergy(this.character);
        this.ctx.translate(-this.camera_x, 0);
        this.ctx.drawImage(this.statusbar.imgCache['img/7_statusbars/3_icons/icon_health.png'], 10, 35, Math.floor(157 / 4), Math.floor(158 / 4));
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
        this.level.enemies.forEach((enemy) => {
            if (this.character.isColliding(enemy)) {
                this.characterLoseEnergy();
            };
        });
    }


    checkOutOfStage() {
        this.level.enemies.forEach((enemy) => {
            if (enemy.isOutOfStage(enemy)) {
                console.log(enemy);
                console.log(enemy.intervalId);
                this.spliceEnemy(enemy);

            };
        });
    }


    spliceEnemy(enemy) {
        let position = this.findPosition(enemy, this.level.enemies);
        console.log(position)
        this.level.enemies.splice(position, 1);
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


    drawEnergy(mo) {
        this.ctx.beginPath();
        let grd = ctx.createLinearGradient(mo.x + 10, 55, mo.x + 10, 75);
        grd.addColorStop(0, "white");
        grd.addColorStop(0.6, "#41B345");
        this.ctx.strokeStyle = grd;
        this.ctx.moveTo(mo.x - 39, 60);
        this.ctx.lineWidth = '11';
        this.ctx.lineCap = "round";
        this.ctx.lineTo(mo.x + mo.energy - 39, 60);
        this.ctx.stroke();
    }


    reset() {
        cancelAnimationFrame(this.requestId);
        this.character.x = 10;
        this.character.justIdle = false;
        this.character.otherDirection = false;

        this.level = [];
        // level1 = [];

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