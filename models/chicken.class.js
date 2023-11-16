class Chicken extends MoveableObject {
    y = 360;
    width = Math.floor(248 / 4);
    height = Math.floor(243 / 4);
    world;
    
    random_x = Math.floor(Math.floor(Math.random() * (4000 - 100)) + 100);
    random_speed = Math.floor((Math.random() * 4)) + 1;
    random_noises = Math.floor(Math.random() * 1000 + 10000);
    
    noise_sound = new Audio('audio/cackle.mp3');
    noise_volume = 0.02;
    delay_noises = this.random_noises;

    IMAGES_WALK = [
        'img/3_enemies_chicken/chicken_normal/1_walk/1_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/2_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/3_w.png'
    ];

    IMAGES_DEAD = [
        'img/3_enemies_chicken/chicken_normal/2_dead/dead.png'
    ];


    constructor() {
        super().loadImage('./img/3_enemies_chicken/chicken_normal/1_walk/1_w.png');
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
        }, slowMs)
    }


    animateByChangingImg() {
        this.changeImg(this.IMAGES_WALK);
        if (this.soundOn && !this.world.level.enemies[0].isAlert()) {
            this.noises(this.delay_noises, this.noise_volume);
        }
    }


    animateByChangingValue() {
        this.moveLeft();
    }

}