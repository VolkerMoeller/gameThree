class Endboss extends MoveableObject {
    x = 3800;
    y = 45;
    width = Math.floor(1045 / 3);
    height = Math.floor(1217 / 3);
    world;
    intervalId;
    speed = 5;

    win_sound = new Audio('audio/win.mp3');
    attack_sound = new Audio('audio/endbossHit.mp3');
    noise_sound = new Audio('audio/endboss-cackle.mp3');

    noise_volume = 0.20;
    delay_noises = 800;
    delay_noises_short = 500;

    offsetT = 75;
    offsetB = 95;
    offsetL = 75;
    offsetR = 145;

    startAlert;
    startLongAlert;
    justTimeSet = false;
    justWalk = true;
    justAlert = false;
    justLongAlert = false;
    justHurt = false;
    justDead = false;
    allHits = false;

    setBeginLeap = false;
    beginLeap;

    imgCounter = 0;
    animOpen = false;

    timerCounter = 0;
    countToNine = 0;


    IMAGES_WALKING = [
        'img/4_enemie_boss_chicken/1_walk/G1.png',
        'img/4_enemie_boss_chicken/1_walk/G2.png',
        'img/4_enemie_boss_chicken/1_walk/G3.png',
        'img/4_enemie_boss_chicken/1_walk/G4.png'
    ]

    IMAGES_ALERT = [
        'img/4_enemie_boss_chicken/2_alert/G5.png',
        'img/4_enemie_boss_chicken/2_alert/G6.png',
        'img/4_enemie_boss_chicken/2_alert/G7.png',
        'img/4_enemie_boss_chicken/2_alert/G8.png',
        'img/4_enemie_boss_chicken/2_alert/G9.png',
        'img/4_enemie_boss_chicken/2_alert/G10.png',
        'img/4_enemie_boss_chicken/2_alert/G11.png',
        'img/4_enemie_boss_chicken/2_alert/G12.png'
    ]

    IMAGES_ATTACK = [
        'img/4_enemie_boss_chicken/3_attack/G13.png',
        'img/4_enemie_boss_chicken/3_attack/G14.png',
        'img/4_enemie_boss_chicken/3_attack/G15.png',
        'img/4_enemie_boss_chicken/3_attack/G16.png',
        'img/4_enemie_boss_chicken/3_attack/G17.png',
        'img/4_enemie_boss_chicken/3_attack/G18.png',
        'img/4_enemie_boss_chicken/3_attack/G19.png',
        'img/4_enemie_boss_chicken/3_attack/G20.png'
    ]

    IMAGES_HURT = [
        'img/4_enemie_boss_chicken/4_hurt/G21.png',
        'img/4_enemie_boss_chicken/4_hurt/G22.png',
        'img/4_enemie_boss_chicken/4_hurt/G23.png'
    ]

    IMAGES_DEAD = [
        'img/4_enemie_boss_chicken/5_dead/G24.png',
        'img/4_enemie_boss_chicken/5_dead/G25.png',
        'img/4_enemie_boss_chicken/5_dead/G26.png'
    ]

    /**
     * When creating the main endboss object, 
     * this function loads the required images and starts the animations.
     * 
     */
    constructor() {
        super().loadImage(this.IMAGES_WALKING[0]);
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_ALERT);
        this.loadImages(this.IMAGES_ATTACK);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_DEAD);
        this.animate();
    }


    /**
     * This function enables the animations.
     * 
     */
    animate() {
        setStopableInterval(() => {
            this.animateByChangingImg();
            this.animateByChangingValue();
        }, slowMs)
        this.intervalId = currentIntervalId;
    }


    /**
     * This function causes the animation change based on corresponding conditions. 
     * These are animations that are created by changing images.
     */
    animateByChangingImg() {
        this.showAnimDead();
        this.showAnimAlertOrHurt();
        this.showAnimWalkOrHurt();
    }


    /**
     * This function shows the "dead" animation when the boss is dead.
     * 
     */
    showAnimDead() {
        if (this.isDead()) {
            this.animDead();
        }
    }


    /**
     * This function checks whether the boss has just died.
     * 
     * @returns – true if the end boss has been hit too often or
     * the parameter "animOpen" is true.
     * This is needed for the animation to run to the end.
     *  
     */
    isDead() {
        return this.allHits && !this.justDead || this.animOpen;
    }


    /**
     * This function is used for alert animation
     * 
     */
    showAnimAlertOrHurt() {
        if (this.isAlert() && !this.justDead) {
            this.animIsAlert();
            this.showHurt();
        }
    }


    /**
     * This function is used for walk animation
     * 
     */
    showAnimWalkOrHurt() {
        if (!this.isAlert() && !this.justDead) {
            this.animWalk();
            this.showHurt();
        }
    }


    /**
     * This function is used for hurt animation
     * 
     */
    showHurt() {
        if (this.isHurt() && this.justHurt && !this.justDead) {
            this.animHurt();
        }
    }


    /**
     * This function checks whether the end boss is hurt.
     * 
     * @returns – true if the end boss is just hurt.
     */
    isHurt() {
        return this.justHurt;
    }


    /**
     * This function shows the hurt animation.
     * 
     */
    animHurt() {
        this.startAnimHurt();
        this.changeImg(this.IMAGES_HURT);
        this.endAnimHurt();
    }


    /**
     * This function sets the start time of the animation.
     * 
     */
    startAnimHurt() {
        if (!this.justStartAnim) {
            this.setStartAnim();
            this.justAlert = true;
        }
    }

    /**
     * This function ends the animation.
     * 
     */
    endAnimHurt() {
        this.timePastMs(this.startAnim, Date.now());
        if (this.animFinished(225, 'img/4_enemie_boss_chicken/4_hurt/G23.png')) {
            this.justStartAnim = false;
            this.justHurt = false;
        }
    }


    animIsAlert() {
        if (!this.justStartAnim) {
            this.setStartAnim();
        }
        if (!this.isLongAlert()) {
            this.animAlert();
        } if (this.isLongAlert() && !this.justDead) {
            this.setStartLongAlert();
            this.animLongAlert();
            this.leap();
        }
    }


    leap() {
        if (!this.setBeginLeap) {
            if (this.shownImg == 'img/4_enemie_boss_chicken/3_attack/G13.png') {
                this.beginLeap = true;
                this.setBeginLeap = true;
            }
            if (this.beginLeap) {
                if (this.shownImg == 'img/4_enemie_boss_chicken/3_attack/G16.png') {
                    this.x -= 30;
                }
                this.setBeginLeap = false;
            }
        }
    }


    animWalk() {
        this.justTimeSet = false;
        this.changeImg(this.IMAGES_WALKING);
    }


    setStartLongAlert() {
        this.startLongAlert = Date.now();
    }


    animAlert() {
        this.changeImg(this.IMAGES_ALERT)
        if (this.soundOn) {
            this.noises(this.delay_noises, this.noise_volume);
        }
    }


    animLongAlert() {
        this.changeImg(this.IMAGES_ATTACK);
        if (this.soundOn) {
            this.noises(this.delay_noises_short, this.noise_volume);
        }
    }


    animDead() {
        this.justDead = true;
        this.animOpen = true;
        let imgNr = this.imgCounter % 3;
        if (countToOne == 1) {
            this.imgCounter++;
        }
        if (this.imgCounter >= 2) {
            this.imgCounter = 2;
        }
        this.changeImgByNr(this.IMAGES_DEAD, imgNr);
        if (this.soundOn) {
            this.world.character.level_sound.pause();
            this.sound(this.win_sound, mediumVolume);
        }
        gameWon();
    }


    /**
     * This function causes the animation change based on corresponding conditions. 
     * These are animations that are created by changing parameters. 
     * 
     */
    animateByChangingValue() {
        if (!this.isAlert() && !this.justDead) {
            this.moveLeft();
        }
        if (this.justDead) {
            this.y += 20;
        }
        if (this.y >= 450) {
            stopAnimation();
        }
    }


    isAlert() {
        if (this.world) {
            return this.isNearby();
        }
    }


    isLongAlert() {
        return this.wait(this.startAnim, 2000);
    }
}