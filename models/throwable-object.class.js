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
    ]

    IMAGES_SPLASH = [
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/2_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/3_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/4_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/5_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/6_bottle_splash.png'
    ]

    constructor(x, y) {
        super().loadImage(this.IMAGES_ROTATION[0]);
        this.loadImages(this.IMAGES_ROTATION);
        this.loadImages(this.IMAGES_SPLASH);
        this.applyGravity(this.ground_y);
        this.x = x;
        this.y = y;
        this.animate();
    }


    animate() {
        setStopableInterval(() => {
            this.animateByChangingImg();
            this.animateByChangingValue();
        }, normalMs);
        this.intervalId = currentIntervalId;
    }


    animateByChangingImg() {
        if (this.isAboveGround(this.ground_y)) {
            this.animFly();
        } else {
            if (!this.isAboveGround(this.ground_y) && !this.justSplashed) {
                this.animSplash();
            }
        }
    }


    animFly() {
        this.changeImg(this.IMAGES_ROTATION);
    }

    animSplash() {
        this.changeImg(this.IMAGES_SPLASH);
        // setTimeout(() => { this.justSplashed = true; }, 1000);
}


animateByChangingValue() {
    this.moveRight();
}

rightSize(sequenz) {
    this.width = this.imageSizes[sequenz + '_width'];
    this.height = this.imageSizes[sequenz + '_height'];
}

}