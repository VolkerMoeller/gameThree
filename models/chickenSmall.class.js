class ChickenSmall extends MoveableObject {
    y = 375;
    width = Math.floor(236 / 5);
    height = Math.floor(210 / 5);
    beep_sound = new Audio('audio/beep.mp3');
    justBeep = false;
    beep_ms = Math.floor(Math.random() * 1000 + 5000);

    IMAGES_WALK = [
        'img/3_enemies_chicken/chicken_small/1_walk/1_w.png',
        'img/3_enemies_chicken/chicken_small/1_walk/2_w.png',
        'img/3_enemies_chicken/chicken_small/1_walk/3_w.png'
    ];

    IMAGES_DEAD = [
        'img/3_enemies_chicken/chicken_small/2_dead/dead.png'
    ];

    constructor() {
        super().loadImage('./img/3_enemies_chicken/chicken_small/1_walk/1_w.png');
        this.loadImages(this.IMAGES_WALK);
        this.loadImages(this.IMAGES_DEAD);
        this.x = Math.floor(Math.random() * (4000 - 100)) + 100;
        this.animate();
        this.speed = Math.floor((Math.random() * 4)) + 1;
    }

    animate() {
        setStopableInterval(() => {
            this.animateByChangingImg();
            this.animateByChangingValue();
        }, slowMs)
    }


    animateByChangingImg() {
        this.changeImg(this.IMAGES_WALK);
        this.beepSound();
    }


    beepSound() {
        if (!this.justBeep) {
            this.startBeep = Date.now();
            this.beep_sound.play();
            this.beep_sound.volume = quietVolume;
            this.justBeep = true;
        } else {
            if (this.justBeep && this.waitMs(this.beep_ms)) {
                this.justBeep = false;
            }
        }
    }


    waitMs(ms) {
        return Date.now() - this.startBeep > ms;
    }


    changeImg(arrImg) {
        let i = this.currentImage % arrImg.length;
        let path = arrImg[i];
        this.img = this.imgCache[path];
        this.currentImage++;
    }

    animateByChangingValue() {
        this.moveLeft();
    }
}