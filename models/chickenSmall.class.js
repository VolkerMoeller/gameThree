class ChickenSmall extends MoveableObject {
    y = 375;
    width = Math.floor(236 / 5);
    height = Math.floor(210 / 5);
    world;
    intervalId;

    random_x = Math.floor(Math.random() * (4000 - 100)) + 200;
    random_speed = Math.floor((Math.random() * 4)) + 1;
    random_noises = Math.floor(Math.random() * 1000);

    boing_sound = new Audio('audio/boing.mp3');
    noise_sound = new Audio('audio/beep.mp3');
    noise_volume = 0.2;
    delay_noises = this.random_noises;

    offsetT = 6;
    offsetB = 12;
    offsetL = 6;
    offsetR = 14;

    justDead = false;
    justBoing = false;

    IMAGES_WALK = [
        'img/3_enemies_chicken/chicken_small/1_walk/1_w.png',
        'img/3_enemies_chicken/chicken_small/1_walk/2_w.png',
        'img/3_enemies_chicken/chicken_small/1_walk/3_w.png'
    ];

    IMAGES_DEAD = [
        'img/3_enemies_chicken/chicken_small/2_dead/dead.png'
    ];


    constructor() {
        super().loadImage(this.IMAGES_WALK[0]);
        this.loadImages(this.IMAGES_WALK);
        this.loadImages(this.IMAGES_DEAD);
        this.x = this.random_x;
        this.speed = this.random_speed;
        this.animate();
    }


    animate() {
        setStopableInterval(() => {
            this.animateByChangingImg();
            this.animateByChangingValue();
        }, slowMs);
        this.intervalId = currentIntervalId;
    }


    animateByChangingImg() {
        if (!this.isDead()) {
            this.animWalk();
        }
        else {
            this.animDead();
        }
    }


    animWalk() {
        this.changeImg(this.IMAGES_WALK);
        this.soundNoise();
    }


    animDead() {
        this.changeImg(this.IMAGES_DEAD);
        if (this.soundOn && !this.justBoing) {
            this.sound(this.boing_sound, mediumVolume);
            this.justBoing = true;
        }
    }


    soundNoise() {
        if (this.soundOn && this.isNearby()) {
            this.noises(this.delay_noises, this.noise_volume);
        }
        if (this.world) {
            if (this.world.character.isDead()) {
                this.noise_sound.pause();
            }
        }
    }


    animateByChangingValue() {
        this.moveLeft();
    }


    isDead() {
        return this.justDead == true;
    }
}