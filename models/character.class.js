class Character extends MoveableObject {
    x = 10;
    y = 130;
    width = Math.floor(610 / 4);
    height = Math.floor(1200 / 4);
    speed = 40;
    world;
    startIdle;
    justIdle = false;
    walking_sound = new Audio('audio/walking.mp3');
    snoring_sound = new Audio('audio/snoring.mp3');

    IMAGES_IDLE = [
        'img/2_character_pepe/1_idle/idle/I-1.png',
        'img/2_character_pepe/1_idle/idle/I-2.png',
        'img/2_character_pepe/1_idle/idle/I-3.png',
        'img/2_character_pepe/1_idle/idle/I-4.png',
        'img/2_character_pepe/1_idle/idle/I-5.png',
        'img/2_character_pepe/1_idle/idle/I-6.png',
        'img/2_character_pepe/1_idle/idle/I-7.png',
        'img/2_character_pepe/1_idle/idle/I-8.png',
        'img/2_character_pepe/1_idle/idle/I-9.png',
        'img/2_character_pepe/1_idle/idle/I-10.png'
    ];

    IMAGES_LONG_IDLE = [
        'img/2_character_pepe/1_idle/long_idle/I-11.png',
        'img/2_character_pepe/1_idle/long_idle/I-12.png',
        'img/2_character_pepe/1_idle/long_idle/I-13.png',
        'img/2_character_pepe/1_idle/long_idle/I-14.png',
        'img/2_character_pepe/1_idle/long_idle/I-15.png',
        'img/2_character_pepe/1_idle/long_idle/I-16.png',
        'img/2_character_pepe/1_idle/long_idle/I-17.png',
        'img/2_character_pepe/1_idle/long_idle/I-18.png',
        'img/2_character_pepe/1_idle/long_idle/I-19.png',
        'img/2_character_pepe/1_idle/long_idle/I-20.png',
        'img/2_character_pepe/1_idle/long_idle/I-11.png'
    ];

    IMAGES_WALK = [
        'img/2_character_pepe/2_walk/W-21.png',
        'img/2_character_pepe/2_walk/W-22.png',
        'img/2_character_pepe/2_walk/W-23.png',
        'img/2_character_pepe/2_walk/W-24.png',
        'img/2_character_pepe/2_walk/W-25.png',
        'img/2_character_pepe/2_walk/W-26.png',
    ]

    IMAGES_JUMP = [
        'img/2_character_pepe/3_jump/J-31.png',
        'img/2_character_pepe/3_jump/J-32.png',
        'img/2_character_pepe/3_jump/J-33.png',
        'img/2_character_pepe/3_jump/J-34.png',
        'img/2_character_pepe/3_jump/J-35.png',
        'img/2_character_pepe/3_jump/J-36.png',
        'img/2_character_pepe/3_jump/J-37.png',
        'img/2_character_pepe/3_jump/J-38.png',
        'img/2_character_pepe/3_jump/J-39.png'
    ]

    IMAGES_HURT = [
        'img/2_character_pepe/4_hurt/H-41.png',
        'img/2_character_pepe/4_hurt/H-42.png',
        'img/2_character_pepe/4_hurt/H-43.png',
    ]

    IMAGES_DEAD = [
        'img/2_character_pepe/5_dead/D-51.png',
        'img/2_character_pepe/5_dead/D-52.png',
        'img/2_character_pepe/5_dead/D-53.png',
        'img/2_character_pepe/5_dead/D-54.png',
        'img/2_character_pepe/5_dead/D-55.png',
        'img/2_character_pepe/5_dead/D-56.png',
        'img/2_character_pepe/5_dead/D-57.png'
    ]


    constructor() {
        super().loadImage('./img/2_character_pepe/2_walk/W-21.png');
        this.loadImages(this.IMAGES_IDLE);
        this.loadImages(this.IMAGES_LONG_IDLE);
        this.loadImages(this.IMAGES_WALK);
        this.loadImages(this.IMAGES_JUMP);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_DEAD);
        this.animate();
    }

    animate() {
        setStopableInterval(() => {
            this.animateByChangingImg();
            this.animateByChangingValue();
            this.shiftBackground();
        }, normalMs)
        this.intervalId = currentIntervalId;
    }


    animateByChangingImg() {
        this.soundsPause();
        if (this.isWalking()) {
            this.walk();
        } else {
            if (this.isIdle && !this.justIdle) {
                this.idle();
            } else {
                if (this.isIdle && this.justIdle) {
                    this.longIdle();
                }
            }
        }
    }


    walk() {
        this.justIdle = false;
        this.changeImg(this.IMAGES_WALK);
        if (this.soundOn) {
            this.playSound(this.walking_sound, quietVolume);
        }
    }


    idle() {
        this.startIdle = Date.now();
        this.justIdle = true;
        this.changeImg(this.IMAGES_IDLE);
    }


    longIdle() {
        if (this.isLongIdle()) {
            this.changeImg(this.IMAGES_LONG_IDLE);
            if (this.soundOn) {
                this.sound(this.snoring_sound, quietVolume);
            }
        }
    }


    animateByChangingValue() {
        if (this.isWalkingLeft()) {
            this.otherDirection = true;
            this.moveLeft();
        } else {
            if (this.isWalkingRight()) {
                this.otherDirection = false;
                this.moveRight();
            }
        }
    }


    shiftBackground() {
        this.world.camera_x = -this.x + 70;
        this.world.camera_bgLayer3 = (-this.x * 0.1) + 70;
        this.world.camera_bgLayer2 = (-this.x * 0.3) + 70;
        this.world.camera_bgLayer1 = (-this.x * 0.6) + 70;
    }


    soundsPause() {
        this.walking_sound.pause();
        this.snoring_sound.pause();
    }


    isWalking() {
        return this.world.keyboard.KEY_LEFT || this.world.keyboard.KEY_RIGHT;
    }


    isWalkingLeft() {
        return this.world.keyboard.KEY_LEFT && this.x > 0;
    }


    isWalkingRight() {
        return this.world.keyboard.KEY_RIGHT && this.x < this.world.level.level_end_x;
    }


    isIdle() {
        return !this.isWalking;
    }


    isLongIdle() {
        return Date.now() - this.startIdle > 5000;
    }


    jump() {


    }
}