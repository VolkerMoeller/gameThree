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

    constructor() {
        super().loadImage(this.IMAGES_WALKING[0]);
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_ALERT);
        this.loadImages(this.IMAGES_ATTACK);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_DEAD);
        this.animate();
    }


    animate() {
        setStopableInterval(() => {
            this.animateByChangingImg();
            this.animateByChangingValue();
        }, slowMs)
        this.intervalId = currentIntervalId;
    }


    animateByChangingImg() {
        if (this.allHits && !this.justDead) {
            this.animDead();
        } else {
            if (this.isHurt() && !this.justDead) {
                this.animHurt();
            } else {
                if (!this.isAlert() && !this.justDead) {
                    this.animWalk();
                } else {
                    if (this.isAlert() && !this.justDead) {
                        this.animIsAlert();
                    }
                }
            }
        }
    }


    isHurt() {
        return this.justHurt;
    }

    animHurt() {
        if (!this.justStartAnim) {
            this.setStartAnim();
        }
        this.changeImg(this.IMAGES_HURT);
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
        } else {
            if (this.isLongAlert() && !this.justDead) {
                this.setStartLongAlert();
                this.animLongAlert();
                this.leap();
            }
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
        if (!this.justStartAnim) {
            this.setStartAnim();
        }
        this.changeImg(this.IMAGES_DEAD);
        this.timePastMs(this.startAnim, Date.now());
        if (this.animFinished(225, 'img/4_enemie_boss_chicken/5_dead/G26.png')) {
            this.justDead = true;
            if (this.soundOn) {
                this.sound(this.win_sound, mediumVolume);
            }
            gameWon();
        }
    }


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
            return this.x - this.world.character.x < 400;
        }
    }


    isLongAlert() {
        return this.wait(this.startAnim, 2000);
    }
}