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

    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.draw();
        this.keyboard = keyboard;
        this.setWorldTo();
    }

    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.translate(this.camera_x, 0);
        this.drawBackground();
        this.addObjectsToMap(this.level.bottles);
        this.addObjectsToMap(this.level.coins);
        this.addToMap(this.character);
        this.addObjectsToMap(this.level.enemies);
        // this.testCanvas();
        this.ctx.translate(-this.camera_x, 0);
        let self = this;
        this.requestId = requestAnimationFrame(() => {
            self.draw();
        });
    }

    
    testCanvas() {
        this.drawCircle();
        this.drawText();
    }
 

    drawCircle() {
        this.ctx.beginPath();
        this.ctx.arc(95, 150, 40, 0, 2 * Math.PI);
        this.ctx.stroke();
    }


    drawText() {
        this.ctx.font = "30px Comic Sans MS";
        this.ctx.fillStyle = "red";
        this.ctx.textAlign = "center";
        this.ctx.fillText("Hello World", canvas.width / 2, canvas.height / 2);
    }


    drawBackground() {
        this.addObjectsToMap(this.level.air);
        this.ctx.translate(-this.camera_x, 0);
        this.addObjectsToMap(this.level.clouds);
        this.moveBackground()
        this.ctx.translate(this.camera_x, 0);
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


    addToMap(mo) {
        if (mo.otherDirection) {
            this.flipImg(mo);
        }
        this.ctx.drawImage(mo.img, mo.x, mo.y, mo.width, mo.height);
        if (mo.otherDirection) {
            this.reFlipImg(mo);
        }
    }


    addObjectsToMap(obj) {
        obj.forEach((o) => {
            this.addToMap(o);
        });
    }


    setWorldTo() {
        this.character.world = this;
        for (let i = 0; i < this.level.enemies.length; i++) {
            this.level.enemies[i].world = this;
        }
    }


    flipImg(mo) {
        this.ctx.save();
        this.ctx.translate(mo.width, 0);
        this.ctx.scale(-1, 1);
        mo.x = mo.x * -1;
    }


    reFlipImg(mo) {
        mo.x = mo.x * -1;
        this.ctx.restore();
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


    reset() {
        cancelAnimationFrame(this.requestId);
        this.character.x = 10;
        this.character.justIdle = false;
        this.character.otherDirection = false;

        this.level = [];
        level1 = [];   
        
        this.level = new Level(
            [
                new Chicken(),
                new Chicken(),
                new Chicken(),
                new ChickenSmall(),
                new ChickenSmall(),
                new ChickenSmall(),
                new Endboss()
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