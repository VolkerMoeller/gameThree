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
        if (this.isHurt() && this.justHurt && !this.justDead)
            this.animHurt();
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


    /**
     * This function shows the alert animation.
     * The end boss starts to jump forwards when it is alerted for longer. 
     * 
     */
    animIsAlert() {
        if (!this.justStartAnim)
            this.setStartAnim();
        if (!this.isLongAlert()) {
            this.animAlert();
        } if (this.isLongAlert() && !this.justDead) {
            this.setStartLongAlert();
            this.animLongAlert();
            this.leap();
        }
    }


    /**
     * This function shows the leap animation
     * The end boss only jumps when the appropriate image 
     * of the attack animation is shown.
     * 
     */
    leap() {
        if (!this.setBeginLeap) {
            this.determBeginLeap();
            this.runLeap();
        }
    }


    /**
     * This function ensures that the jump animation only 
     * takes place when the attack animation is running.
     * 
     */
    determBeginLeap() {
        if (this.shownImg == 'img/4_enemie_boss_chicken/3_attack/G13.png') {
            this.beginLeap = true;
            this.setBeginLeap = true;
        }
    }


    /**
     * This function makes the final boss jump forwards when 
     * the appropriate image of the attack animation is shown.
     * 
     */
    runLeap() {
        if (this.beginLeap) {
            if (this.shownImg == 'img/4_enemie_boss_chicken/3_attack/G16.png')
                this.x -= 30;
            this.setBeginLeap = false;
        }
    }


    /**
     * This function shows the walk animation.
     * 
     */
    animWalk() {
        this.changeImg(this.IMAGES_WALKING);
    }


    /**
     * This function determines the start time of the alarm animation.
     */
    setStartLongAlert() {
        this.startLongAlert = Date.now();
    }


    /**
     * This function shows the alert animaion and 
     * switches on the corresponding sounds
     * 
     */
    animAlert() {
        this.changeImg(this.IMAGES_ALERT);
        this.noisesSound(this.delay_noises);
    }


    /**
     * This function shows the attack animation and 
     * switches on the corresponding sounds.
     * 
    */
    animLongAlert() {
        this.changeImg(this.IMAGES_ATTACK);
        this.noisesSound(this.delay_noises_short);
    }


    /**
     * This function switches on the noises sound.
     * 
     * @param {number} delay – This parameter determines the milliseconds that 
     * are waited between repeated playback of the sound.
     * 
     */
    noisesSound(delay) {
        if (this.soundOn)
            this.noises(delay, this.noise_volume);
    }


    /**
     * This function shwos the dead animation an ends the game.
     * The end animation only runs once in a controlled manner.
     * 
     */
    animDead() {
        this.justDead = true;
        this.animOpen = true;
        let imgNr = this.imgCounter % 3;
        this.settingTheImageCounter();
        this.changeImgByNr(this.IMAGES_DEAD, imgNr);
        this.winSound();
        gameWon();
    }


    /**
     * This function sets the image counter.
     */
    settingTheImageCounter() {
        if (countToOne == 1)
            this.imgCounter++;
        if (this.imgCounter >= 2)
            this.imgCounter = 2;
    }


    /**
     * This function plays the win sound.
     */
    winSound() {
        if (this.soundOn) {
            this.world.character.level_sound.pause();
            this.sound(this.win_sound, mediumVolume);
        }
    }


    /**
     * This function causes the animation change based on corresponding conditions. 
     * These are animations that are created by changing parameters. 
     * 
     */
    animateByChangingValue() {
        if (!this.isAlert() && !this.justDead)
            this.moveLeft();
        if (this.justDead)
            this.y += 20;
        if (this.y >= 450)
            stopAnimation();
    }


    /**
     * This function checks if the end boss should be alert. 
     * 
     * @returns - true if the main character is nearby the endboss.
     */
    isAlert() {
        return this.world ? this.isNearby() : console.log('no world');
    }


    /**
     *This function checks if the end boss should be long alert.
     * 
     * @returns – true if the alert animation lasts for two seconds.
     */
    isLongAlert() {
        return this.wait(this.startAnim, 2000);
    }
}