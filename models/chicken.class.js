class Chicken extends MoveableObject {
    y = 360;
    width = Math.floor(248 / 4);
    height = Math.floor(243 / 4);
    world;
    intervalId;

    random_x = Math.floor(Math.floor(Math.random() * (4000 - 100)) + 200);
    random_speed = Math.floor((Math.random() * 4)) + 1;
    random_noises = Math.floor(Math.random() * 1000 + 500);

    boing_sound = new Audio('audio/boing.mp3');
    noise_sound = new Audio('audio/cackle.mp3');
    noise_volume = 0.1;
    delay_noises = this.random_noises;

    offsetT = 6;
    offsetB = 12;
    offsetL = 2;
    offsetR = 8;

    justDead = false;
    justBoing = false;

    IMAGES_WALK = [
        'img/3_enemies_chicken/chicken_normal/1_walk/1_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/2_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/3_w.png'
    ];

    IMAGES_DEAD = [
        'img/3_enemies_chicken/chicken_normal/2_dead/dead.png'
    ];


    /**
     * When creating the chicken object, 
     * this function loads the required images and 
     * sets the position and speed.
     * 
     */
    constructor() {
        super().loadImage(this.IMAGES_WALK[0]);
        this.loadImages(this.IMAGES_WALK);
        this.loadImages(this.IMAGES_DEAD);
        this.x = this.random_x;
        this.speed = this.random_speed;
        this.animate();
    }


    /**
     * This function essentially enables the animations.
     * 
     */
    animate() {
        setStopableInterval(() => {
            this.animateByChangingImg();
            this.animateByChangingValue();
        }, slowMs);
        this.intervalId = currentIntervalId;
    }


    /**
     * This function causes the animation change based on corresponding conditions. 
     * These are animations that are created by changing screens.
     */
    animateByChangingImg() {
        if (!this.isDead())
            this.animWalk();
        else
            this.animDead();
    }


    /**
     * This function causes the animation. 
     * This animation is created by changing parameters. 
     * 
     */
    animateByChangingValue() {
        if (!this.justDead)
            this.moveLeft();
    }


    /**
     * This function causes the walking animation.
     * 
     */
    animWalk() {
        this.changeImg(this.IMAGES_WALK);
        this.soundNoise();
    }


    /**
     * This function causes the dead animation.
     */
    animDead() {
        this.changeImg(this.IMAGES_DEAD);
        this.boingSound();
    }


    /**
     * This function plays the boing sound.
     * Since the main character is jumping again.
     * 
     */
    boingSound() {
        if (this.soundOn && !this.justBoing) {
            this.sound(this.boing_sound, mediumVolume);
            this.justBoing = true;
        }
    }


    /**
     * This function plays the sounds of the chickens:
     * – Only if the chicken is near the main character.
     * – Not if the chicken has died.
     * 
     */
    soundNoise() {
        if (this.soundOn && this.isNearby())
            this.noises(this.delay_noises, this.noise_volume);
        if (this.world) {
            if (this.world.character.isDead())
                this.noise_sound.pause();
        }
    }


    /**
     * This function checks if the chicken is dead.
     * 
     * @returns – true if the chicken is just dead.
     */
    isDead() {
        return this.justDead == true;
    }
}