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
    endbossBarLength = 100;
    thrownObjects = [];
    justKEYPressed = false;
    justHitChecked = false;


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
        this.ctx.translate(-this.camera_x, 0);
        let self = this;
        this.requestId = requestAnimationFrame(() => {
            self.draw();
        });
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
        this.drawProgress(this.character.x + 10, 60, this.character.energy, '#41B345');
        this.ctx.translate(-this.camera_x, 0);
        this.ctx.drawImage(this.barHealth.imgCache['img/7_statusbars/3_icons/icon_health.png'], 5, 25, Math.floor(157 / 3), Math.floor(158 / 3));
        this.ctx.translate(this.camera_x, 0);
    }


    drawBottleBar() {
        this.ctx.translate(-this.camera_x, 0);
        this.addToMap(this.barBottle);
        this.ctx.translate(this.camera_x, 0);
        this.drawProgress(this.character.x + 10, 110, this.character.bottleBarLength, '#41B345');
        this.ctx.translate(-this.camera_x, 0);
        this.ctx.drawImage(this.barBottle.imgCache['img/7_statusbars/3_icons/icon_salsa_bottle.png'], 5, 80, Math.floor(157 / 3), Math.floor(158 / 3));
        this.ctx.translate(this.camera_x, 0);
    }


    drawCoinBar() {
        this.ctx.translate(-this.camera_x, 0);
        this.addToMap(this.barCoin);
        this.ctx.translate(this.camera_x, 0);
        this.drawProgress(this.character.x + 10, 160, this.character.nrCollectedCoins * 100 / this.level.amountCoins, '#41B345');
        this.ctx.translate(-this.camera_x, 0);
        this.ctx.drawImage(this.barCoin.imgCache['img/7_statusbars/3_icons/icon_coin.png'], 8, 135, Math.floor(157 / 3.5), Math.floor(158 / 3.5));
        this.ctx.translate(this.camera_x, 0);
    }


    drawEndbossBar() {
        this.calcEndbossBarLength();
        this.ctx.translate(-this.camera_x, 0);
        this.addToMap(this.barEndboss);
        this.ctx.translate(this.camera_x, 0);
        this.drawProgress(this.character.x + 565, 60, this.endbossBarLength, '#FF4E00');
        this.ctx.translate(-this.camera_x, 0);
        this.ctx.drawImage(this.barEndboss.imgCache['img/7_statusbars/3_icons/icon_health_endboss.png'], 550, 35, Math.floor(157 / 3), Math.floor(158 / 3));
        this.ctx.translate(this.camera_x, 0);
    }


    calcEndbossBarLength() {
        this.endbossBarLength = 100 - (this.character.nrEndbossHits * 100 / this.character.amountHits);
        if (this.endbossBarLength < 0) {
            this.endbossBarLength = 0;
        }
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
            !this.justKEYPressed &&
            !this.character.otherDirection) {
            this.justKEYPressed = true;
            let thrownBottle = new ThrowableObject(this.character.x + 70, this.character.y + 100);
            this.thrownObjects.push(thrownBottle);
            this.character.nrThrownBottles++;
        }
        if (!this.keyboard.KEY_D) {
            this.justKEYPressed = false;
        }
    }


    checkThrownObjects() {
        this.thrownObjects.forEach((bottle) => {
            if (this.smashedOnTheFloor(bottle)) {
                this.treatSmachedOnTheFloor(bottle);
            }
            if (this.smashedByTheEndBoss(bottle)) {
                this.treatSmashedByTheEndBoss(bottle);
            }
        })
    }


    treatSmashedByTheEndBoss(bottle) {
        this.justHitChecked = false;
        this.checkNrEndbossHits();
        this.smashSoundImmediatly(bottle);
        bottle.hitsEndboss = true;
        bottle.justSplashed = true;
        bottle.ground_y = bottle.y -720;
    }


    treatSmachedOnTheFloor(bottle) {
        this.smashSoundImmediatly(bottle);
        this.spliceSlightlyLater(bottle);
        bottle.justSplashed = true;
    }


    smashedOnTheFloor(bottle) {
        return !bottle.isAboveGround(bottle.ground_y) &&
            bottle.shownImg == 'img/6_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png'
    }


    smashedByTheEndBoss(bottle) {
        return bottle.isColliding(this.level.enemies[0]) &&
            bottle.isAboveGround(bottle.ground_y);
    }


    checkNrEndbossHits() {
        console.log(this.character.nrEndbossHits);
        if (!this.justHitChecked) {
            this.justHitChecked = true;
            if (this.allHitsLanded()) {
                this.character.nrEndbossHits = this.character.amountHits;
                this.level.enemies[0].allHits = true;
            } else {
                this.character.nrEndbossHits++;
                this.level.enemies[0].justHurt = true;
            }
        }
    }

    allHitsLanded() {
        return this.character.nrEndbossHits == this.character.amountHits - 1;
    }


    spliceSlightlyLater(bottle) {
        setTimeout(() => {
            this.spliceObj(bottle, this.thrownObjects);
        }, 225);
    }


    smashSoundImmediatly(thrownBottle) {
        if (this.character.soundOn) {
            thrownBottle.soundOn = true;
            thrownBottle.soundSmashed();
        }
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

        if (mo.otherDirection) {
            this.reFlipImg(mo);
        }
    }


    checkCollisions() {
        this.collisionEnemies();
        this.collisionBottles();
        this.collisionCoins();
    }


    collisionEnemies() {
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
        this.character.soundOn = boolean;
        for (let i = 0; i < this.level.enemies.length; i++) {
            this.level.enemies[i].soundOn = boolean;
        }
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


    drawProgress(posX, posY, diff, col) {
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
}