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
    justJumps = false;
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

    imgCounter = 0;

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

    IMAGES_JUMP_UP = [
        'img/2_character_pepe/3_jump/J-31.png',
        'img/2_character_pepe/3_jump/J-32.png',
        'img/2_character_pepe/3_jump/J-33.png',
        'img/2_character_pepe/3_jump/J-34.png'
    ]

    IMAGES_JUMP_DOWN = [
        'img/2_character_pepe/3_jump/J-35.png',
        'img/2_character_pepe/3_jump/J-36.png',
        'img/2_character_pepe/3_jump/J-37.png',
        'img/2_character_pepe/3_jump/J-38.png',
        'img/2_character_pepe/3_jump/J-39.png'
    ]

    IMAGES_JUMP_ZERO = [
        'img/2_character_pepe/3_jump/J-31.png',
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

    /**
     * When creating the main character object, 
     * this function loads the required images and 
     * implements the "gravity effect" as well as starting the animations.
     * 
     */
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

    /**
     * This function essentially enables the animations and 
     * the paralax effect of the background.
     */
    animate() {
        setStopableInterval(() => {
            this.animateByChangingImg();
            this.animateByChangingValue();
            this.shiftBackground();
            this.calculateBottleBarLength();
            this.levelSound();
        }, mediumFastMs);
        this.intervalId = currentIntervalId;
    }


    /**
     * This function causes the animation change based on corresponding conditions. 
     * These are animations that are created by changing screens.
     */
    animateByChangingImg() {
        this.soundsPause();
        if (this.isDead() && !this.justDead) {
            this.startDead = Date.now()
            this.animDead();
        } else if (this.isHurt() && !this.isDead()) {
            this.animHurt();
        } else if (this.isAboveGround(this.ground_y)) {
            this.animJump();
        } else if (this.isWalking() && !this.isDead()) {
            this.animWalk();
        } else if (this.isIdle && !this.justIdle && !this.isDead()) {
            this.animIdle();
        } else if (this.isLongIdle && this.justIdle && !this.isDead() && !this.isAlert()) {
            this.animLongIdle();
        }
    }


    /**
     * This function causes the animation change based on corresponding conditions. 
     * These are animations that are created by changing parameters. 
     * 
     */
    animateByChangingValue() {
        if (this.isWalkingLeft()) {
            this.otherDirection = true;
            this.moveLeft();
        }
        if (this.isWalkingRight()) {
            this.otherDirection = false;
            this.moveRight();
        }
        if (this.jumps()) {
            this.jump();
        }
    }


    /**
     * This function causes the paralax effect.
     * 
     */
    shiftBackground() {
        this.world.camera_x = -this.x + 70;
        this.world.camera_bgLayer3 = (-this.x * 0.1) + 70;
        this.world.camera_bgLayer2 = (-this.x * 0.3) + 70;
        this.world.camera_bgLayer1 = (-this.x * 0.6) + 70;
    }


    /**
     * This function calculates the value for displaying 
     * the length of the bottle bar.
     * 
     */
    calculateBottleBarLength() {
        if (this.world) {
            this.bottleBarLength =
                (this.nrCollectedBottles - this.nrThrownBottles) / this.world.level.amountBottles * 100;
            if (this.bottleBarLength < 0) {
                this.bottleBarLength = 0;
            }
        }
    }


    /**
     * This function determines in which case the background music 
     * of the level is played or not.
     * 
     */
    levelSound() {
        if (this.soundOn && !this.isAlert() && !this.isDead()) {
            this.sound(this.level_sound, veryQuietVolume);
        }
        if (this.isDead()) {
            this.level_sound.pause();
        }
    }


    /**
     * This function transfers the number of bottles initially created 
     * in the level to the appropriate variable.
     * 
     */
    setAmountHits() {
        if (this.world) {
            this.amountHits = this.world.level.amountBottles;
        }
    }


    /**
     * This function is used to stop the running sounds so that they do not
     * overlap when they are constantly replayed.
     * 
     */
    soundsPause() {
        this.walking_sound.pause();
        this.snoring_sound.pause();
    }


    /**
     * This function is used for jump animation.
     * 
     */
    animJump() {
        this.selectMatchingImg();
        this.changeImgByNr(this.IMAGES_JUMP, this.imgCounter);
        this.jumpSound();
        this.justIdle = false;
        this.imgCounter++;
    }


    /**
     * This function is used to select the appropriate 
     * images for the jump animation.
     * 
     */
    selectMatchingImg() {
        this.animJumpUp();
        this.animFallDown();
    }


    /**
     * This function selects the appropriate images when moving upwards.
     * 
     */
    animJumpUp() {
        if (this.imgCounter > 3 && this.imgCounter < 9) {
            if (this.isRising(this.ground_y))
                this.imgCounter = 3;
        }
    }


    /**
     * This function selects the appropriate images when it falls.
     * 
     */
    animFallDown() {
        if (this.imgCounter > 7) {
            if (this.isFalling(this.ground_y))
                this.imgCounter = 7;
            else
                this.imgCounter = 0;
        }
    }


    /**
     * This function plays the jump sound.
     * 
     */
    jumpSound() {
        if (this.soundOn && !this.justJump) {
            this.sound(this.hop_sound, mediumVolume);
            this.justJump = true;
        }
    }


    /**
     * This function is used for hurt animation.
     * 
     */
    animHurt() {
        this.changeImg(this.IMAGES_HURT);
        this.justHurt = false;
        this.justIdle = false;
        this.hurtSound();
    }


    /**
     * This function plays the hurt sound.
     * 
     */
    hurtSound() {
        if (this.soundOn && !this.isTakingOff()) {
            this.sound(this.hurt_sound, mediumVolume);
        }
    }

    
    /**
     * This function is used for walk animation.
     * 
     */
    animWalk() {
        this.justIdle = false;
        this.changeImg(this.IMAGES_WALK);
        this.walkSound();
    }


    /**
     * This function plays the walk sound.
     * 
     */
    walkSound() {
        if (this.soundOn) {
            this.sound(this.walking_sound, louderVolume);
        }
    }


    /**
     * This function is used for idle animation.
     * 
    */
    animIdle() {
        this.startIdle = Date.now();
        this.justIdle = true;
        this.justJump = false;
        this.justJumps = false;
        this.changeImg(this.IMAGES_IDLE);
    }


    /**
     * This function is used for long idle animation.
     * 
     */
    animLongIdle() {
        if (this.isLongIdle()) {
            this.changeImg(this.IMAGES_LONG_IDLE);
            this.snoringSound();
        }
    }

    
    /**
     * This function plays the snoring sound.
     * 
    */
   snoringSound() {
       if (this.soundOn) {
            this.sound(this.snoring_sound, loudVolume);
        }
    }
    
    
    /**
     * This function is used for dead animation.
     * 
    */
   animDead() {
       this.changeImg(this.IMAGES_DEAD);
       if (this.shownImg == 'img/2_character_pepe/5_dead/D-56.png') {
           this.justDead = true;
            gameLost();
            stopAnimation();
        }
        this.lostSound();
    }


    /**
     * This function plays the lost sound.
     * 
    */
    lostSound() {
        if (this.soundOn) {
            this.sound(this.lost_sound, quietVolume);
        }
    }


    /**
     * This function checks the condition for the character's walking animation.
     * 
     * @returns – true if the button for left or right was pressed 
     */
    isWalking() {
        return this.world.keyboard.KEY_LEFT || this.world.keyboard.KEY_RIGHT;
    }
    

    /**
     * This function checks the condition that the Charaker can run to the left.
     * 
     * @returns – true if the character should run to the left and 
     * is still to the right of the level edge. 
     */
    isWalkingLeft() {
        return this.world.keyboard.KEY_LEFT && this.x > 0;
    }


    /**
     * This function checks the condition that the Charaker can run to the right.
     * 
     * @returns – true if the character should run to the right and 
     * is still to the left of the level edge. 
     */
    isWalkingRight() {
        return this.world.keyboard.KEY_RIGHT && this.x < this.world.level.level_end_x;
    }


    /**
     * This function checks if the character is idle.
     * 
     * @returns – true if function nothingElse() is true
     */
    isIdle() {
        return this.nothingElse();
    }


    /**
     * This function checks whether the main character does nothing.
     * 
     * @returns – true if the main character does not jump, is not alarmed, 
     * is not injured and is not dead.
     */
    nothingElse() {
        return !this.jumps() && !this.isAlert() && !this.isHurt() && !this.isDead();
    }


    /**
     * This function checks whether the main character does nothing for a certain period of time.
     * 
     * @returns – true if the main character is bored for more than five seconds.
     */
    isLongIdle() {
        return Date.now() - this.startIdle > 5000;
    }


    /**
     * This function checks whether the main character is in the upward movement.
     * 
     * @returns – true if the main character has speed.
     */
    isTakingOff() {
        return this.speedY > 0;
    }


    /**
     * This function checks whether the player wants to and can make 
     * the main character jump.
     * 
     * @returns – True if the main character is supposed to jump and 
     * the prerequisite for the jump animation is met.
     */
    jumps() {
        return this.world.keyboard.KEY_SPACE && !this.isAboveGround(this.ground_y);
    }


    /**
     * This function checks whether the main character is alerted.
     * 
     * @returns – true if the main character is near by the Endboss.
     */
    isAlert() {
        if (this.world) {
            return this.isNearbyEndboss();
        }
    }


    /**
     * This function checks whether the main character is hurt.
     * 
     * @returns – true if the main character has been hurt.
     */
    isHurt() {
        return this.justHurt;
    }


    /**
     * This function checks whether the main character is dead.
     * 
     * @returns – true if the main character has no energy. 
     */
    isDead() {
        return this.energy == 0;
    }
}