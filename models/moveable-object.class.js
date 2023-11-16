class MoveableObject {
    x = 100;
    y = 0;
    height = 100;
    width = 200;
    img;
    imgCache = [];
    speed = 1;
    currentImage = 0;
    intervalId;
    otherDirection = false;
    soundOn = false;
    just_noises = false;
    speedY = 0;
    acceleration = 5;


    loadImage(path) {
        this.img = new Image();
        this.img.src = path;
    }


    loadImages(arr) {
        arr.forEach((path) => {
            let img = new Image();
            img.src = path;
            this.imgCache[path] = img;
        });
    }


    moveRight() {
        this.x += this.speed;
    }


    moveLeft() {
        this.x -= this.speed;
    }


    wait(start, ms) {
        return Date.now() - start > ms;
    }


    jump() {
            this.speedY = 40;
    }


    changeImg(arrImg) {
        let i = this.currentImage % arrImg.length;
        let path = arrImg[i];
        this.img = this.imgCache[path];
        this.currentImage++;
    }


    sound(obj, volume) {
        obj.volume = volume;
        obj.play();
    }


    noises(wait_ms, vol) {
        if (!this.just_noises) {
            this.startTime = Date.now();
            this.noise_sound.play();
            this.noise_sound.volume = vol;
            this.just_noises = true;
        } else {
            if (this.just_noises && this.wait(this.startTime, wait_ms)) {
                this.just_noises = false;
            }
        }
    }


    applyGravity(ground_y) {
        setStopableInterval(() => {
            if (this.isAboveGround(ground_y) || this.speedY > 0) {
                this.y -= this.speedY;
                this.speedY -= this.acceleration;
            }
            if (this.y > ground_y) {
                this.y = ground_y;
            }
        }, normalMs);
    }


    isAboveGround(ground_y) {
        return this.y < ground_y;
    }




}