class ChickenSmall extends MoveableObject {
    y = 375;
    width = Math.floor(236 / 5);
    height = Math.floor(210 / 5);

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
        this.x = Math.floor(Math.random() * 550) + 150;
        this.animate();
        this.speed = 0.5 + Math.random();

    }

    animate() {
        setStopableInterval(() => {
            this.animateByChangingImg();
            this.animateByChangingValue();

        }, slowMs)
    }


    animateByChangingImg() {
        this.changeImg(this.IMAGES_WALK);
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