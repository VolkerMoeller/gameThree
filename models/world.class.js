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
    barCoin = new Statusbar(20, 140);
    barEndboss = new Statusbar(575, 40);
    thrownObjects = [];

    justPressed = false;


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
        this.drawObjects();
        this.addToMap(this.character);
        this.drawBars();
        // this.drawTest2(this.character);
        // this.drawTest(this.character);
        this.ctx.translate(-this.camera_x, 0);
        let self = this;
        this.requestId = requestAnimationFrame(() => {
            self.draw();
        });
    }


    drawTest(obj) {
        if (obj instanceof Character) {
            if (obj.justHurt) {
                this.ctx.save();
                this.ctx.translate(obj.x + 10, obj.y + 50);
                this.ctx.rotate(-10 * Math.PI / 180);
                this.ctx.translate(-obj.x + 10, -obj.y + 50);
                this.ctx.txtAlign = 'center';
                this.ctx.font = '20px Georgia';
                this.ctx.fillStyle = 'red';
                this.ctx.fillText("Autsch!", obj.x, obj.y);
                this.ctx.restore()
            }
        }
    }

    drawTest2(obj) {
        if (obj.justHurt) {
            this.ctx.fillStyle = 'white';
            this.ctx.roundRect(obj.x + 20, obj.y + 65, 80, 40, [10]);
            this.ctx.fill();
        }
    }


    drawBars() {
        this.drawHealthBar();
        this.drawBottleBar();
        this.drawCoinBar();
        this.drawEndbossBar();

    }


    drawObjects() {
        this.addObjectsToMap(this.level.bottles);
        this.addObjectsToMap(this.level.coins);
        this.addObjectsToMap(this.level.enemies);
        this.addObjectsToMap(this.thrownObjects);
    }


    drawHealthBar() {
        this.ctx.translate(-this.camera_x, 0);
        this.addToMap(this.barHealth);
        this.ctx.translate(this.camera_x, 0);
        this.drawBar(this.character.x + 10, 60, this.character.energy, '#41B345');
        this.ctx.translate(-this.camera_x, 0);
        this.ctx.drawImage(this.barHealth.imgCache['img/7_statusbars/3_icons/icon_health.png'], 5, 25, Math.floor(157 / 3), Math.floor(158 / 3));
        this.ctx.translate(this.camera_x, 0);
    }


    drawBottleBar() {
        this.ctx.translate(-this.camera_x, 0);
        this.addToMap(this.barBottle);
        this.ctx.translate(this.camera_x, 0);
        this.drawBar(this.character.x + 10, 110, this.character.bottleBarLength, '#41B345');
        this.ctx.translate(-this.camera_x, 0);
        this.ctx.drawImage(this.barBottle.imgCache['img/7_statusbars/3_icons/icon_salsa_bottle.png'], 5, 80, Math.floor(157 / 3), Math.floor(158 / 3));
        this.ctx.translate(this.camera_x, 0);
    }




    drawCoinBar() {
        this.ctx.translate(-this.camera_x, 0);
        this.addToMap(this.barCoin);
        this.ctx.translate(this.camera_x, 0);
        this.drawBar(this.character.x + 10, 160, this.character.nrCollectedCoins * 100 / this.level.amountCoins, '#41B345');
        this.ctx.translate(-this.camera_x, 0);
        this.ctx.drawImage(this.barCoin.imgCache['img/7_statusbars/3_icons/icon_coin.png'], 8, 135, Math.floor(157 / 3.5), Math.floor(158 / 3.5));
        this.ctx.translate(this.camera_x, 0);
    }


    drawEndbossBar() {
        this.ctx.translate(-this.camera_x, 0);
        this.addToMap(this.barEndboss);
        this.ctx.translate(this.camera_x, 0);
        this.drawBar(this.character.x + 565, 60, this.character.nrEnbossHits * 100 / this.character.amountHits, '#FF4E00');
        this.ctx.translate(-this.camera_x, 0);
        this.ctx.drawImage(this.barEndboss.imgCache['img/7_statusbars/3_icons/icon_health_endboss.png'], 550, 35, Math.floor(157 / 3), Math.floor(158 / 3));
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
            this.checkThrowObjects();
            this.checkThrownObjects();
        }, normalMs);
    }


    checkThrowObjects() {
        if (this.keyboard.KEY_D &&
            this.character.nrCollectedBottles > this.character.nrThrownBottles &&
            !this.justPressed &&
            !this.character.otherDirection) {
            this.justPressed = true;
            let thrownBottle = new ThrowableObject(this.character.x + 70, this.character.y + 100);
            this.thrownObjects.push(thrownBottle);
            this.character.nrThrownBottles++;
        }
        if (!this.keyboard.KEY_D) {
            this.justPressed = false;
        }
    }

    checkThrownObjects() {
        this.thrownObjects.forEach((thrownBottle) => {
            if (thrownBottle.shownImg == 'img/6_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png') {
                setTimeout(() => {
                    this.spliceObj(thrownBottle, this.thrownObjects);
                }, 125);
            }
        })
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

        mo.drawThisImg(this.ctx);
        // this.drawFrame(mo);
        // mo.drawFrame(this.ctx);

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
                this.collidingChickens(enemy);
                this.collidingEndboss(enemy);
            }
        });
    }


    collidingChickens(enemy) {
        if (enemy instanceof Chicken || enemy instanceof ChickenSmall) {
            if (this.character.isFalling(this.character.ground_y)) {
                this.character.jump();
                this.chickenDead(enemy);
            }
            if (!this.character.isFalling(this.character.ground_y)) {
                this.characterLoseEnergy();
            }
        }
    }


    chickenDead(enemy) {
        enemy.justDead = true;
        setTimeout(() => {
            this.spliceObj(enemy, this.level.enemies)
        }, 225);
    }


    collidingEndboss(enemy) {
        if (enemy instanceof Endboss) {
            this.characterLoseEnergy();
        }
    }


    collisionBottles() {
        this.level.bottles.forEach((bottle) => {
            if (this.character.isColliding(bottle)) {
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
        let position = this.findIndex(obj, arr);
        if (obj instanceof SalsaBottle) {
            this.countCollectedBottles();
            obj.soundCollect();
        }
        if (obj instanceof Coin) {
            this.countCollectedCoins();
            obj.soundCollect();
        }
        if (obj instanceof Endboss) {
            stopAnimation();
        }
        arr.splice(position, 1);
    }


    countCollectedBottles() {
        this.character.nrCollectedBottles++;
    }


    countCollectedCoins() {
        this.character.nrCollectedCoins++;
        if (this.character.nrCollectedCoins == this.level.amountCoins) {
            this.character.energy = 100;
            this.character.nrCollectedCoins = 0;
        }
    }


    findIndex(obj, array) {
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
            mo instanceof Chicken ||
            mo instanceof ChickenSmall ||
            mo instanceof Endboss
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
        for (let i = 0; i < this.level.bottles.length; i++) {
            this.level.bottles[i].soundOn = boolean;
        }
        for (let i = 0; i < this.level.coins.length; i++) {
            this.level.coins[i].soundOn = boolean;
        }
    }


    soundsOn() {
        this.onOffSounds(true);
    }


    soundsOff() {
        this.onOffSounds(false);
    }


    drawBar(posX, posY, diff, col) {
        this.ctx.beginPath();
        let grd = ctx.createLinearGradient(posX, (posY - 5), posX, (posY + 15));
        grd.addColorStop(0, 'white');
        grd.addColorStop(0.6, col);
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