class Endboss extends MoveableObject {
    x = 3800;
    y = 45;
    width = Math.floor(1045 / 3);
    height = Math.floor(1217 / 3);
    world;
    intervalId;

    win_sound = new Audio('audio/win.mp3');
    attack_sound = new Audio('audio/endbossHit.mp3');
    noise_sound = new Audio('audio/endboss-cackle.mp3');

    noise_volume = 0.20;
    delay_noises = 800;

    offsetT = 75;
    offsetB = 95;
    offsetL = 75;
    offsetR = 145;

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
        if (!this.isAlert()) {
            this.changeImg(this.IMAGES_WALKING);
        } else {
            if (this.isAlert()) {
                this.changeImg(this.IMAGES_ALERT)
                if (this.soundOn) {
                    this.noises(this.delay_noises, this.noise_volume);
                }
            }
        }
    }


    animateByChangingValue() {
        if (!this.isAlert()) {
            this.moveLeft();
        }
    }


    isAlert() {
        if (this.world) {
            return this.x - this.world.character.x < 400;
        }
    }
}