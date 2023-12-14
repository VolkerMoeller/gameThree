class ThrowableObject extends MoveableObject {
    width = Math.floor(400 / 5);
    height = Math.floor(400 / 5);
    offsetT = 12;
    offsetB = 17;
    offsetL = 33;
    offsetR = 57;
    intervalId;
    ground_y = 370;
    speed = 40;
    acceleration = 8;
    speedY = 30;
    justSplashed = false;
    hitsEndboss = false;

    smashed_sound = new Audio('audio/smash-bottle.mp3');

    imageSizes = {
        'rotate_width': Math.floor(400 / 5),
        'rotate_height': Math.floor(400 / 5),
        'splash_width': Math.floor(524 / 6),
        'splash_height': Math.floor(400 / 6)
    }

    IMAGES_ROTATION = [
        'img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png'
    ];

    IMAGES_SPLASH = [
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/2_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/3_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/4_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/5_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/6_bottle_splash.png'
    ];

    /**
     * When creating the throwable object, 
     * this function loads the required images and 
     * sets the position. The animation is initiated.
     * 
     */
    constructor(x, y) {
        super().loadImage(this.IMAGES_ROTATION[0]);
        this.loadImages(this.IMAGES_ROTATION);
        this.loadImages(this.IMAGES_SPLASH);
        this.applyGravity(this.ground_y);
        this.x = x;
        this.y = y;
        this.animate();
    }


    /**
     * This function enables the animations .
     * 
     */
    animate() {
        setStopableInterval(() => {
            this.animateByChangingImg();
            this.animateByChangingValue();
        }, normalMs);
        this.intervalId = currentIntervalId;
    }


    /**
     * This function causes the animation change based on corresponding conditions. 
     * These are animations that are created by changing screens.
     */
    animateByChangingImg() {
        if (this.isAboveGround(this.ground_y)) {
            this.animFly();
        } else if (!this.isAboveGround(this.ground_y) || this.hitsEndboss)
            this.animSplash();
    }


    /**
     * This function causes the animation change based on corresponding conditions. 
     * These are animations that are created by changing parameters. 
     * 
     */
    animateByChangingValue() {
        if (!this.justSplashed)
            this.moveRight();
    }


    /**
     * This function is used for fly animation.
     * 
     */
    animFly() {
        this.changeImg(this.IMAGES_ROTATION);
    }


    /**
     * This function is used for splash animation.
     * 
     */
    animSplash() {
        this.changeImg(this.IMAGES_SPLASH);
    }


    /**
     * This function assigns the appropriate image size to the image sequences.
     * This function is required because the animation images provided are 
     * of different sizes.
     * 
     * @param {string} sequenz – This String is the name of an image sequence.
     */
    rightSize(sequenz) {
        this.width = this.imageSizes[sequenz + '_width'];
        this.height = this.imageSizes[sequenz + '_height'];
    }


    /**
     * This function plays the smashed sound.
     * 
     */
    soundSmashed() {
        if (this.soundOn)
            this.sound(this.smashed_sound, mediumVolume);
    }
}