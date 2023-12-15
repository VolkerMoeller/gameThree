class World {
    character = new Character();
    level = level1;
    canvas;
    stage;
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
    justDPressed = false;
    justQPressed = false;
    justWPressed = false;
    justHitChecked = false;

    /**
     * When creating the world object, this function:
     * – takes over the canvas and the key lisener,
     * – draws all the required game objects on the canvas,
     * – implemented the necessary links,
     * – initialises the permanent checking of the important states 
     * during the course of the game and
     * – switches on the sounds.
     * 
     * @param {object} canvas – this object is the canvas on which is drawn.
     * @param {object} keyboard – this is the necesary key lisener.
     */
    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.draw();
        this.setWorldTo();
        this.run();
        this.soundsOn();
    }


    /**
     * This function draws all the required game objects on the canvas.
     * 
     */
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

    /**
     * This function enables the process bars to be displayed 
     * on the canvas using the CanvasRenderingContext2D interface.
     * 
     */
    drawBars() {
        let lengthHealth = this.character.energy;
        let lengthBottle = this.character.bottleBarLength;
        let lengthCoin = this.character.nrCollectedCoins * 100 / this.level.amountCoins;
        this.calcEndbossBarLength();
        let progrXLeft = this.character.x + 10;
        let progrXRight = this.character.x + 565;
        let colorLeft = '#41B345';
        let colorRight = '#FF4E00';
        let iconImgHealth = this.barHealth.imgCache['img/7_statusbars/3_icons/icon_health.png'];
        let iconImgBottle = this.barBottle.imgCache['img/7_statusbars/3_icons/icon_salsa_bottle.png'];
        let iconImgCoin = this.barCoin.imgCache['img/7_statusbars/3_icons/icon_coin.png'];
        let iconImgEndboss = this.barEndboss.imgCache['img/7_statusbars/3_icons/icon_health_endboss.png'];
        let iconWidth = Math.floor(157 / 3);
        let iconHeight = Math.floor(158 / 3);
        let iconWidthCoin = Math.floor(157 / 3.5);
        let iconHeightCoin = Math.floor(158 / 3.5);

        this.drawBar(this.barHealth, progrXLeft, 60, lengthHealth, colorLeft, iconImgHealth, 5, 25, iconWidth, iconHeight);
        this.drawBar(this.barBottle, progrXLeft, 110, lengthBottle, colorLeft, iconImgBottle, 5, 80, iconWidth, iconHeight);
        this.drawBar(this.barCoin, progrXLeft, 160, lengthCoin, colorLeft, iconImgCoin, 8, 135, iconWidthCoin, iconHeightCoin);
        this.drawBar(this.barEndboss, progrXRight, 60, this.endbossBarLength, colorRight, iconImgEndboss, 550, 35, iconWidth, iconHeight);
    }


    /**
     * This function draws the status bars on the canvas.
     */
    drawObjects() {
        this.addObjectsToMap(this.level.bottles);
        this.addObjectsToMap(this.level.coins);
        this.addObjectsToMap(this.level.enemies);
        this.addObjectsToMap(this.thrownObjects);
    }


    /**
     * This function draws the respective bar on the canvas
     * using the CanvasRenderingContext2D interface.
     * 
     * @param {object} bar – This object is the specific screen object of the status bar.
     * @param {number} progrX – This parameter is the X value of the position coordinate of the process bar.
     * @param {number} progrY – This parameter is the Y value of the position coordinate of the process bar.
     * @param {number} progrValue - This paramter ist the lenth of the process bar.
     * @param {number} progrColor - This parameter is the color of the process bar.
     * @param {object} iconImg – This image object is the icon of the bar.
     * @param {number} iconX – This parameter is the X value of the position coordinate of the icon image.
     * @param {number} iconY – This parameter is the Y value of the position coordinate of the icon image.
     * @param {number} iconWidth – This parameter is the width of the icon image.
     * @param {number} iconHeight – This parameter is the height of the icon image.
     */
    drawBar(bar, progrX, progrY, progrValue, progrColor, iconImg, iconX, iconY, iconWidth, iconHeight) {
        this.ctx.translate(-this.camera_x, 0);
        this.addToMap(bar);
        this.ctx.translate(this.camera_x, 0);
        this.drawProgress(progrX, progrY, progrValue, progrColor);
        this.ctx.translate(-this.camera_x, 0);
        this.ctx.drawImage(iconImg, iconX, iconY, iconWidth, iconHeight);
        this.ctx.translate(this.camera_x, 0);

    }

    /**
     * This function calculates the value for the current 
     * length of the energy bar for the end boss.
     * 
     */
    calcEndbossBarLength() {
        this.endbossBarLength = 100 - (this.character.nrEndbossHits * 100 / this.character.amountHits);
        if (this.endbossBarLength < 0)
            this.endbossBarLength = 0;
    }


    /**
     * This function makes the world object data available 
     * to the main character object and the enemy objects.
     */
    setWorldTo() {
        this.character.world = this;
        for (let i = 0; i < this.level.enemies.length; i++) {
            this.level.enemies[i].world = this;
        }
    }


    /**
     * This function causes the permanent checking of the important states 
     * during the course of the game.
     */
    run() {
        setInterval(() => {
            checkOrientation();
            screenOrientation();
            this.checkSound();
            this.checkFullscreen();
            this.checkCollisions();
            this.checkOutOfStage();
            this.checkThrowObjects();
            this.checkThrownObjects();
        }, normalMs);
    }

    /**
     * This function checks whether the player switches to full screen mode.
     * 
     */
    checkFullscreen() {
        if (this.keyboard.KEY_F && !this.justFPressed) {
            this.justFPressed = true;
            this.openFullscreen();
        }
        if (!this.keyboard.KEY_F)
            this.justFPressed = false;
    }


    /**
     * This function switches to full screen mode.
     * 
     */
    openFullscreen() {
        this.stage = document.getElementById('stage');
        if (this.stage.requestFullscreen)
            this.stage.requestFullscreen();
    }


    /**
     * This function checks whether the player switches 
     * the game sounds on or off.
     * 
     */
    checkSound() {
        this.checkTheQKey();
        this.checkTheWKey();
    }


    /**
     * This function checks whether the player has pressed Q 
     * to switch on the game sounds and switches them on.
     * 
     */
    checkTheQKey() {
        if (this.keyboard.KEY_Q && !this.justQPressed) {
            this.justQPressed = true;
            this.soundsOn();
        }
        if (!this.keyboard.KEY_Q)
            this.justQPressed = false;
    }


    /**
     * This function checks whether the player has pressed W
     * to switch off the game sounds and switches them off.
     * 
     */
    checkTheWKey() {
        if (this.keyboard.KEY_W && !this.justQPressed) {
            this.justWPressed = true;
            this.soundsOff();
        }
        if (!this.keyboard.KEY_W)
            this.justWPressed = false;
    }


    /**
     * This function checks whether the player has pressed the D button to 
     * throw a bottle and creates a corresponding bottle object at 
     * the desired position.
     * 
     */
    checkThrowObjects() {
        if (this.isThrowing()) {
            let thrownBottle = new ThrowableObject(this.character.x + 70, this.character.y + 100);
            this.thrownObjects.push(thrownBottle);
            this.character.nrThrownBottles++;
            this.justDPressed = true;
        }
        if (!this.keyboard.KEY_D)
            this.justDPressed = false;
    }


    /**
     * This function only allows a bottle to be thrown if 
     * the player has pressed the D button, 
     * there are still bottles to throw, 
     * the main character is facing to the right and 
     * is not injured.
     * 
     * @returns – true if if the above conditions are met. 
     */
    isThrowing() {
        return this.keyboard.KEY_D &&
            this.character.nrCollectedBottles > this.character.nrThrownBottles &&
            !this.justDPressed &&
            !this.character.otherDirection &&
            !this.character.justHurt;
    }


    /**
     * This function checks whether the thrown bottle has 
     * fallen to the ground or hit the end boss.
     * 
     */
    checkThrownObjects() {
        this.thrownObjects.forEach((bottle) => {
            if (this.smashedOnTheFloor(bottle))
                this.treatSmachedOnTheFloor(bottle);
            if (this.smashedByTheEndBoss(bottle)) {
                this.treatSmashedByTheEndBoss(bottle);
            }
        })
    }


    /**
     * This function deals with the case where the bottle has hit the final boss.
     * 
     * @param {object} bottle – This object is the thown bottle.
     */
    treatSmashedByTheEndBoss(bottle) {
        this.justHitChecked = false;
        this.checkNrEndbossHits();
        this.smashSoundImmediatly(bottle);
        bottle.hitsEndboss = true;
        bottle.justSplashed = true;
        bottle.ground_y = bottle.y - 720;
    }


    /**
     * This function handles the case where the bottle has fallen to the floor. 
     * 
     * @param {object} bottle  – This object is the thown bottle.
     */
    treatSmachedOnTheFloor(bottle) {
        this.smashSoundImmediatly(bottle);
        this.spliceSlightlyLater(bottle);
        bottle.justSplashed = true;
    }


    /**
     * This funciton checks if the bottle is smashed on the floor.
     * 
     * @param {object} bottle – This object is the thrown bottle. 
     * @returns – true if the bottle is no longer above the ground.
     * 
     */
    smashedOnTheFloor(bottle) {
        return !bottle.isAboveGround(bottle.ground_y);
    }


    /**
     * This function checks if the bottle collides with the final boss.
     * 
     * @param {object} bottle – This object is the thrown bottle.
     * @returns – true if the bottle is colliding with the endboss and if 
     * the bottle is above the ground.
     * 
     */
    smashedByTheEndBoss(bottle) {
        return bottle.isColliding(this.level.enemies[0]) &&
            bottle.isAboveGround(bottle.ground_y);
    }


    /**
     * This function checks the number of hits.
     * 
     */
    checkNrEndbossHits() {
        if (!this.justHitChecked) {
            this.justHitChecked = true;
            if (this.allHitsLanded()) {
                this.character.nrEndbossHits = this.character.amountHits;
                this.level.enemies[0].allHits = true;
                startTimerCounter();
            } else {
                this.character.nrEndbossHits++;
                this.level.enemies[0].justHurt = true;
            }
        }
    }


    /**
     * This function determines whether the required number of 
     * hits to win has been achieved.
     * 
     * @returns – true if the number of hits is equal to the required number of hits.
     */
    allHitsLanded() {
        return this.character.nrEndbossHits == this.character.amountHits - 1;
    }


    /**
     * This function is used to delete a bottle object.
     * The object is only deleted after a short period of time.
     * 
     * @param {object} bottle – This object is the bottle object that is to be deleted.
     */
    spliceSlightlyLater(bottle) {
        setTimeout(() => {
            this.spliceObj(bottle, this.thrownObjects);
        }, 225);
    }


    /**
     * This function is used to delete a bottle object immediately.
     * 
     * @param {object} thrownBottle – This object is the bottle object that is to be deleted. 
     */
    smashSoundImmediatly(thrownBottle) {
        if (this.character.soundOn) {
            thrownBottle.soundOn = true;
            thrownBottle.soundSmashed();
        }
    }


    /**
     * This function is used to draw the background of the canvas.
     * 
     */
    drawBackground() {
        this.addObjectsToMap(this.level.air);
        this.ctx.translate(-this.camera_x, 0);
        this.addObjectsToMap(this.level.clouds);
        this.moveBackground()
        this.ctx.translate(this.camera_x, 0);
    }


    /**
     * This function is used to draw several image objects on the canvas.
     * 
     * @param {array} obj – This is the array with the image objects which are to be drawn.
     */
    addObjectsToMap(obj) {
        obj.forEach((o) => {
            this.addToMap(o);
        });
    }


    /**
     * This function is used to draw one image object on the canvas.
     * It additionally checks whether the image object should be displayed 
     * mirrored on the vertical axis.
     * For example, when the main character runs in the other direction.
     * 
     * @param {object} mo - this is the image object which is to be drawn.
     */
    addToMap(mo) {
        if (mo.otherDirection)
            this.flipImg(mo);
        mo.drawThisImg(this.ctx);
        if (mo.otherDirection)
            this.reFlipImg(mo);
    }


    /**
     * This function implements the functions that monitor the 
     * collisions of the main character with the enemy objects, 
     * the bottle objects and the coin objects.
     * 
     */
    checkCollisions() {
        this.collisionEnemies();
        this.collisionBottles();
        this.collisionCoins();
    }


    /**
     * This function is used to monitor collisions between 
     * the main character and the enemy objects.
     * 
     */
    collisionEnemies() {
        this.level.enemies.forEach((enemy) => {
            if (this.character.isColliding(enemy)) {
                this.collidingChickens(enemy);
                this.collidingEndboss(enemy);
            }
        });
    }

    
    /**
     * This function is used to monitor collisions between
     * the main character and the chicken objects.
     * 
     * @param {array} enemy – This array is the collection of enemy objects.
     */
    collidingChickens(enemy) {
        if (enemy instanceof Chicken || enemy instanceof ChickenSmall) {
            if (this.character.isFalling(this.character.ground_y)) {
                this.character.jump();
                this.character.justHurt = true;
                this.chickenDead(enemy);
            }
            if (!this.character.isFalling(this.character.ground_y))
                this.characterLoseEnergy();
        }
    }


    /**
     * This function deletes an enemy object if it has died.
     * 
     * @param {object} enemy – This object is the enemy object to be deleted.
     */
    chickenDead(enemy) {
        enemy.justDead = true;
        setTimeout(() => {
            this.spliceObj(enemy, this.level.enemies)
        }, 225);
    }


    /**
     * This function causes the main character to lose energy if 
     * it comes into contact with the end boss.
     * 
     * @param {object} enemy – THis object is the enemy object that collides 
     * with the main character.
     */
    collidingEndboss(enemy) {
        if (enemy instanceof Endboss)
            this.characterLoseEnergy();
    }


    /**
     * This function deletes the bottles encountered by 
     * the main character.
     * 
     */
    collisionBottles() {
        this.level.bottles.forEach((bottle) => {
            if (this.character.isColliding(bottle)) {
                this.spliceObj(bottle, this.level.bottles);
            };
        });
    }


    /**
     * This function deletes the coins encountered by 
     * the main character.
     */
    collisionCoins() {
        this.level.coins.forEach((coin) => {
            if (this.character.isColliding(coin)) {
                this.spliceObj(coin, this.level.coins);
            };
        });
    }


    /**
     * This function deletes the enemy objects (except the 
     * final boss) when they leave the stage.
     * 
     */
    checkOutOfStage() {
        this.level.enemies.forEach((enemy) => {
            if (enemy.isOutOfStage(enemy)) {
                if (!enemy instanceof Endboss) {
                    this.spliceObj(enemy, this.level.enemies);
                }
            }
        });
    }


    /**
     * This function is used when coins or bottles are collected.
     * The collected objects are counted,
     * the corresponding sound is emitted and
     * the object is deleted.
     * 
     * @param {object} obj – This is the collected object.
     * @param {array} arr – This is the collection of objects to be collected.
     */
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


    /**
     * This function is used to count the number of bottles collected.
     */
    countCollectedBottles() {
        this.character.nrCollectedBottles++;
    }


    /**
     * This function is used to count the coins collected.
     * Once all the coins have been collected, the main character receives 100% energy.
     */
    countCollectedCoins() {
        this.character.nrCollectedCoins++;
        if (this.character.nrCollectedCoins == this.level.amountCoins) {
            this.character.energy = 100;
            this.character.nrCollectedCoins = 0;
        }
    }


    /**
     * This function searches for the index of the object to be deleted.
     * 
     * @param {object} obj – This is the object whose index is to be found.
     * @param {array} array – This is the array in which the object is located.
     * @returns 
     */
    findIndex(obj, array) {
        for (let i = 0; i < array.length; i++) {
            let searchedId = obj.intervalId;
            let arrayId = array[i].intervalId;
            if (searchedId == arrayId)
                return i;
        }
    }


    /**
     * This function reduces the life energy of the main character.
     * 
     */
    characterLoseEnergy() {
        if (this.character.energy > 0) {
            this.character.energy -= 1;
            this.character.justHurt = true;
        }
    }


    /**
     * This function is used to draw the background images on the canvas.
     * 
     */
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


    /**
     * This function changes the direction of the image object 
     * to be displayed on the canvas.
     * 
     * @param {object} mo – The image object whose direction is to be changed.
     */
    flipImg(mo) {
        this.ctx.save();
        this.ctx.translate(mo.width, 0);
        this.ctx.scale(-1, 1);
        mo.x = mo.x * -1;
    }


    /**
     * This function is required when changing the direction of 
     * an image object on the screen. 
     * Without this function, all other screen objects would also 
     * be affected by the change of direction.
     * 
     * @param {object} mo – The image object whose direction is to be changed.
     */
    reFlipImg(mo) {
        mo.x = mo.x * -1;
        this.ctx.restore();
    }


    /**
     * This function is used to switch the sounds on and off.
     * 
     * @param {boolean} boolean – This parameter is true if the sounds are to be 
     * switched off and false if the sounds are to be switched on.  
     * 
     */
    onOffSounds(boolean) {
        this.character.level_sound.pause();
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


    /**
     * This function is used to switch on the sounds.
     * 
     */
    soundsOn() {
        this.onOffSounds(true);
    }


    /**
     * This funciton is used to switch off the sounds.
     * 
     */
    soundsOff() {
        this.onOffSounds(false);
    }


    /**
     * This function draws the respective process bar on the canvas
     * using the CanvasRenderingContext2D interface.
     * 
     * @param {number} posX – This parameter is the X value of the position coordinate of the process bar.
     * @param {number} posY – This parameter is the Y value of the position coordinate of the process bar.
     * @param {number} diff – This is the length by which the process display changes.
     * @param {string} col – This is the color of the process bar.
     * 
     */
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