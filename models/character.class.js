class Character extends MoveableObject {
    x = 10;
    y = 130;
    ground_y = 130;
    width = Math.floor(610 / 4);
    height = Math.floor(1200 / 4);
    speed = 40;
    world;
    intervalId;

    startIdle;
    startDead;

    justIdle = false;
    justHurt = false;
    justDead = false;

    nrCollectedBottles = 0;
    nrThrownBottles = 0;
    bottleBarLength = 0;
    nrCollectedCoins = 0;
    nrEndbossHits = 0;
    amountHits = 6;

    level_sound = new Audio('audio/el-pollo-loco.mp3')
    lost_sound = new Audio('audio/lost.mp3')
    walking_sound = new Audio('audio/walking.mp3');
    snoring_sound = new Audio('audio/snoring.mp3');
    hurt_sound = new Audio('audio/hurt.mp3');
    hop_sound = new Audio('audio/hop.mp3');

    offsetY = 100;
    offsetT = 100;
    offsetB = 90;
    offsetL = 20;
    offsetR = 60;

    IMAGES_IDLE = [
        'img/2_character_pepe/1_idle/idle/I-1.png',
        'img/2_character_pepe/1_idle/idle/I-2.png',
        'img/2_character_pepe/1_idle/idle/I-3.png',
        'img/2_character_pepe/1_idle/idle/I-4.png',
        'img/2_character_pepe/1_idle/idle/I-5.png',
        'img/2_character_pepe/1_idle/idle/I-6.png',
        'img/2_character_pepe/1_idle/idle/I-7.png',
        'img/2_character_pepe/1_idle/idle/I-8.png',
        'img/2_character_pepe/1_idle/idle/I-9.png',
        'img/2_character_pepe/1_idle/idle/I-10.png'
    ];

    IMAGES_LONG_IDLE = [
        'img/2_character_pepe/1_idle/long_idle/I-11.png',
        'img/2_character_pepe/1_idle/long_idle/I-12.png',
        'img/2_character_pepe/1_idle/long_idle/I-13.png',
        'img/2_character_pepe/1_idle/long_idle/I-14.png',
        'img/2_character_pepe/1_idle/long_idle/I-15.png',
        'img/2_character_pepe/1_idle/long_idle/I-16.png',
        'img/2_character_pepe/1_idle/long_idle/I-17.png',
        'img/2_character_pepe/1_idle/long_idle/I-18.png',
        'img/2_character_pepe/1_idle/long_idle/I-19.png',
        'img/2_character_pepe/1_idle/long_idle/I-20.png',
        'img/2_character_pepe/1_idle/long_idle/I-11.png'
    ];

    IMAGES_WALK = [
        'img/2_character_pepe/2_walk/W-21.png',
        'img/2_character_pepe/2_walk/W-22.png',
        'img/2_character_pepe/2_walk/W-23.png',
        'img/2_character_pepe/2_walk/W-24.png',
        'img/2_character_pepe/2_walk/W-25.png',
        'img/2_character_pepe/2_walk/W-26.png',
    ]

    IMAGES_JUMP = [
        'img/2_character_pepe/3_jump/J-31.png',
        'img/2_character_pepe/3_jump/J-32.png',
        'img/2_character_pepe/3_jump/J-33.png',
        'img/2_character_pepe/3_jump/J-34.png',
        'img/2_character_pepe/3_jump/J-35.png',
        'img/2_character_pepe/3_jump/J-36.png',
        'img/2_character_pepe/3_jump/J-37.png',
        'img/2_character_pepe/3_jump/J-38.png',
        'img/2_character_pepe/3_jump/J-39.png'
    ]

    IMAGES_HURT = [
        'img/2_character_pepe/4_hurt/H-41.png',
        'img/2_character_pepe/4_hurt/H-42.png',
        'img/2_character_pepe/4_hurt/H-43.png',
    ]

    IMAGES_DEAD = [
        'img/2_character_pepe/5_dead/D-51.png',
        'img/2_character_pepe/5_dead/D-52.png',
        'img/2_character_pepe/5_dead/D-53.png',
        'img/2_character_pepe/5_dead/D-54.png',
        'img/2_character_pepe/5_dead/D-55.png',
        'img/2_character_pepe/5_dead/D-56.png',
        'img/2_character_pepe/5_dead/D-57.png'
    ]


    constructor() {
        super().loadImage(this.IMAGES_IDLE[0]);
        this.loadImages(this.IMAGES_IDLE);
        this.loadImages(this.IMAGES_LONG_IDLE);
        this.loadImages(this.IMAGES_WALK);
        this.loadImages(this.IMAGES_JUMP);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_DEAD);
        this.applyGravity(this.ground_y);
        this.animate();
    }


    animate() {
        setStopableInterval(() => {
            this.animateByChangingImg();
            this.animateByChangingValue();
            this.shiftBackground();
            this.calculateBottleBarLength();
            this.levelSound();
        }, normalMs);
        this.intervalId = currentIntervalId;
    }


    animateByChangingImg() {
        this.soundsPause();
        if (this.isDead() && !this.justDead) {
            this.startDead = Date.now()
            this.animDead();
        } else {
            if (this.isHurt() && !this.isDead()) {
                this.animHurt();
            } else {
                if (this.isAboveGround(this.ground_y)) {
                    this.animJump();
                } else {
                    if (this.isWalking() && !this.isDead()) {
                        this.animWalk();
                    } else {
                        if (this.isIdle && !this.justIdle && !this.isDead()) {
                            this.animIdle();
                        } else {
                            if (this.isLongIdle && this.justIdle && !this.isDead() && !this.isAlert()) {
                                this.animLongIdle();
                            }
                        }
                    }
                }
            }
        }
    }


    animateByChangingValue() {
        if (this.isWalkingLeft()) {
            this.otherDirection = true;
            this.moveLeft();
        }
        if (this.isWalkingRight()) {
            this.otherDirection = false;
            this.moveRight();
        }
        if (this.isJumping()) {
            this.jump();
        }
    }


    shiftBackground() {
        this.world.camera_x = -this.x + 70;
        this.world.camera_bgLayer3 = (-this.x * 0.1) + 70;
        this.world.camera_bgLayer2 = (-this.x * 0.3) + 70;
        this.world.camera_bgLayer1 = (-this.x * 0.6) + 70;
    }


    calculateBottleBarLength() {
        if (this.world) {
            this.bottleBarLength = (this.nrCollectedBottles - this.nrThrownBottles) / this.world.level.amountBottles * 100;
            if (this.bottleBarLength < 0) {
                this.bottleBarLength = 0;
            }
        }
    }


    levelSound() {
        if (this.soundOn && !this.isAlert() && !this.isDead()) {
            this.sound(this.level_sound, veryQuietVolume);
        }
        if (this.isAlert() || this.isDead()) {
            this.level_sound.pause();
        }
    }

    setAmountHits() {
        if (this.world) {
            this.amountHits = this.world.level.amountBottles;
        }
    }


    soundsPause() {
        this.walking_sound.pause();
        this.snoring_sound.pause();
    }


    animJump() {
        this.justIdle = false;
        this.changeImg(this.IMAGES_JUMP);
        if (this.soundOn && !this.justJump) {
            this.sound(this.hop_sound, mediumVolume);
            this.justJump = true;
        }
    }


    animWalk() {
        this.justIdle = false;
        this.changeImg(this.IMAGES_WALK);
        if (this.soundOn) {
            this.sound(this.walking_sound, mediumVolume);
        }
    }


    animIdle() {
        this.startIdle = Date.now();
        this.justIdle = true;
        this.justJump = false;
        this.changeImg(this.IMAGES_IDLE);
    }


    animLongIdle() {
        if (this.isLongIdle()) {
            this.changeImg(this.IMAGES_LONG_IDLE);
            if (this.soundOn) {
                this.sound(this.snoring_sound, loudVolume);
            }
        }
    }


    animHurt() {
        this.changeImg(this.IMAGES_HURT);
        this.justIdle = false;
        this.justHurt = false;
        if (this.soundOn && !this.isTakingOff()) {
            this.sound(this.hurt_sound, mediumVolume);
        }
    }


    animDead() {
        this.changeImg(this.IMAGES_DEAD);
        if (this.shownImg == 'img/2_character_pepe/5_dead/D-56.png') {
            this.justDead = true;
            gameLost();
            stopAnimation();
        }
        if (this.soundOn) {
            this.sound(this.lost_sound, quietVolume);
        }
    }


    isWalking() {
        return this.world.keyboard.KEY_LEFT || this.world.keyboard.KEY_RIGHT;
    }


    isWalkingLeft() {
        return this.world.keyboard.KEY_LEFT && this.x > 0;
    }


    isWalkingRight() {
        return this.world.keyboard.KEY_RIGHT && this.x < this.world.level.level_end_x;
    }


    isIdle() {
        return this.nothingElse();
    }


    nothingElse() {
        return !this.isJumping && !this.isAlert() && !this.isHurt && !this.isDead;
    }


    isLongIdle() {
        return Date.now() - this.startIdle > 5000;
    }


    isTakingOff() {
        return this.speedY > 0;
    }


    isJumping() {
        return this.world.keyboard.KEY_SPACE && !this.isAboveGround(this.ground_y);
    }


    isAlert() {
        return this.world.level.enemies[0].isAlert();
    }


    isHurt() {
        return this.justHurt;
    }


    isDead() {
        return this.energy == 0;
    }
}