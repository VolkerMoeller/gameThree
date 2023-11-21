class MoveableObject extends DrawableObject {
    speed = 1;

    otherDirection = false;
    soundOn = false;
    just_noises = false;
    speedY = 0;
    acceleration = 5;

    offsetL = 0;
    offsetR = 0;
    offsetT = 0;
    offsetB = 0;

    energy = 100;

    shownImg;





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
        this.shownImg = arrImg[i];
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


    isFalling(ground_y) {
        return this.speedY < 0 && this.isAboveGround(ground_y);
    }

    isNearby() {
        return this.world.character.x > this.x && this.world.character.x - this.x < 300 ||
            this.world.character.x < this.x && this.x - this.world.character.x < 300;
    }


    isColliding(obj) {
        return ((this.x + this.offsetL) + (this.width - this.offsetR)) >= (obj.x + obj.offsetL) &&
            (this.x + this.offsetL) <= ((obj.x + obj.offsetL) + (obj.width - obj.offsetR)) &&
            ((this.y + this.offsetT) + (this.height - this.offsetB)) >= (obj.y + obj.offsetT) &&
            ((this.y + this.offsetT)) <= ((obj.y + obj.offsetT) + (obj.height - obj.offsetB));
    }


    isOutOfStage(obj) {
        return obj.x < -100 || obj.x > 5000 || obj.y > 1000 || obj.y < -1000;
    }
}