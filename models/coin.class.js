class Coin extends MoveableObject {
    width = Math.floor(300 / 4);
    height = Math.floor(301 / 4);
    random_x = Math.random() * 2000 + 100;
    random_y = Math.random() * 200 + 100;

    offsetT = 25;
    offsetB = 50;
    offsetL = 25;
    offsetR = 50;

    IMAGES_COINSSPARKLE = [
        'img/8_coin/coin_1.png',
        'img/8_coin/coin_2.png'
    ]


    constructor() {
        super().loadImage(this.IMAGES_COINSSPARKLE[0]);
        this.loadImages(this.IMAGES_COINSSPARKLE);
        this.x = this.random_x;
        this.y = this.random_y;
        this.animate();
    }

    
    animate() {
        setStopableInterval(() => {
            this.animateByChangingImg();
        }, slowerMs);
    }


    animateByChangingImg() {
        this.changeImg(this.IMAGES_COINSSPARKLE);
    }
}