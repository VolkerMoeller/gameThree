class SalsaBottle extends MoveableObject {
    y = 350;
    imageSizes = {
        'bottle_width': Math.floor(400 / 5),
        'bottle_height': Math.floor(400 / 5),
        'bollte_splash_width': Math.floor(524 / 6),
        'bottle_splash_height': Math.floor(400 / 6)
    }

    IMAGES_BOTTLE = [
        'img/6_salsa_bottle/salsa_bottle.png'
    ]

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

    IMAGES_ONGROUND = [
        'img/6_salsa_bottle/1_salsa_bottle_on_ground.png',
        'img/6_salsa_bottle/2_salsa_bottle_on_ground.png'
    ];

    constructor() {
        super().loadImage(this.IMAGES_BOTTLE[0]);
        this.loadImages(this.IMAGES_BOTTLE);
        this.loadImages(this.IMAGES_ROTATION);
        this.loadImages(this.IMAGES_SPLASH);
        this.loadImages(this.IMAGES_ONGROUND);
        this.rightSize('bottle');
        this.x = Math.random() * 3400 + 100;
        this.animate();
    }

    rightSize(sequenz) {
        this.width = this.imageSizes[sequenz + '_width'];
        this.height = this.imageSizes[sequenz + '_height'];
    }

    animate() {
        setStopableInterval(() => {
            this.animateByChangingImg();
            // this.animateByChangingValue();
        }, slowMs)
    }


    animateByChangingImg() {
        this.changeImg(this.IMAGES_ONGROUND);
        // if (this.soundOn) {
        // this.noises(this.delay_noises);
    }
}