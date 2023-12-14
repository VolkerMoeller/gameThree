class SalsaBottle extends MoveableObject {
    y = 345;
    width = Math.floor(400 / 5);
    height = Math.floor(400 / 5);

    offsetT = 12;
    offsetB = 17;
    offsetL = 33;
    offsetR = 57;

    collect_sound = new Audio('audio/collected.mp3');
    random_x = Math.floor(Math.random() * 3000) + 200;
    intervalId;
    justCollected = false;

    IMAGE_BOTTLE = [
        'img/6_salsa_bottle/salsa_bottle.png'
    ];

    IMAGES_ONGROUND = [
        'img/6_salsa_bottle/1_salsa_bottle_on_ground.png',
        'img/6_salsa_bottle/2_salsa_bottle_on_ground.png'
    ];

    /**
     * When creating the bottle object, 
     * this function loads the required images and 
     * sets the position. The animation is initiated.
     * 
     */
    constructor() {
        super().loadImage(this.IMAGE_BOTTLE[0]);
        this.loadImages(this.IMAGES_ONGROUND);
        this.x = this.random_x;
        this.animate();
    }


    /**
    * This function essentially enables the animation.
    * 
    */
    animate() {
        setStopableInterval(() => {
            this.animateByChangingImg();
        }, slowerMs);
        this.intervalId = currentIntervalId;
    }


    /**
     * This function causes the animation. 
     * These are animations that are created by changing screens.
     * 
     */
    animateByChangingImg() {
        this.changeImg(this.IMAGES_ONGROUND);
    }

    
    /**
     * This function plays the collect sound.
     * 
     */
    soundCollect() {
        if (this.soundOn && !this.justCollected) {
            this.sound(this.collect_sound, mediumVolume);
            this.justCollected = true;
        }
    }
}