class ThrowableObject extends MoveableObject {
    offsetT = 12;
    offsetB = 17;
    offsetL = 33;
    offsetR = 57;

    intervalId;

    ground_y = 300;
    // ??

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

    constructor() {
        super().loadImage(this.IMAGES_ROTATION[0]);
        this.rightSize('rotate');
        this.loadImages(this.IMAGES_ROTATION);
        this.rightSize('splash');
        this.loadImages(this.IMAGES_SPLASH);
        this.applyGravity(this.ground_y);
        // this.animate();
    }


    animate() {
        setStopableInterval(() => {
            this.animateByChangingImg();
            this.animateByChangingValue();
        }, normalMs);
        this.intervalId = currentIntervalId;
    }
    
    animateByChangingValue() {
        console.log('hier');
    }
    animateByChangingImg(){
        console.log('da');

    }

    rightSize(sequenz) {
        this.width = this.imageSizes[sequenz + '_width'];
        this.height = this.imageSizes[sequenz + '_height'];
    }

}