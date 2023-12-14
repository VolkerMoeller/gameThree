class Coin extends MoveableObject {
    width = Math.floor(300 / 4);
    height = Math.floor(301 / 4);
    random_x = Math.random() * 2000 + 100;
    random_y = Math.random() * 200 + 100;

    intervalId;
    
    offsetT = 25;
    offsetB = 50;
    offsetL = 25;
    offsetR = 50;
    
    collect_sound = new Audio('audio/collected.mp3');

    IMAGES_COINSSPARKLE = [
        'img/8_coin/coin_1.png',
        'img/8_coin/coin_2.png'
    ]


    /**
     * When creating the coin object, 
     * this function loads the required images and 
     * sets the position. The animation is initiated.
     * 
     */
    constructor() {
        super().loadImage(this.IMAGES_COINSSPARKLE[0]);
        this.loadImages(this.IMAGES_COINSSPARKLE);
        this.x = this.random_x;
        this.y = this.random_y;
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
        this.changeImg(this.IMAGES_COINSSPARKLE);
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