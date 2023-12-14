class MoveableObject extends DrawableObject {
    speed = 1;
    otherDirection = false;
    just_noises = false;
    speedY = 0;
    acceleration = 5;

    offsetL = 0;
    offsetR = 0;
    offsetT = 0;
    offsetB = 0;

    energy = 100;
    shownImg;
    shownImgNr;

    /**
     * This function moves the picture object to the right.
     * 
     */
    moveRight() {
        this.x += this.speed;
    }


    /**
     * This function moves the picture object to the left.
     * 
     */
    moveLeft() {
        this.x -= this.speed;
    }


    /**
     * This function checks whether a period of time has passed.
     * 
     * @param {number} start – This value represents the start time.
     * @param {*} ms – This value represents the waiting time in milliseconds.
     * @returns – true if the time between the start time and Now is greater than the specified duration.
     */
    wait(start, ms) {
        return Date.now() - start > ms;
    }


    /**
     * This parameter sets the speed to a value greater than zero. 
     * The image object is "pushed" upwards.
     * 
     */
    jump() {
        this.speedY = 40;
    }


    /**
     * This function allows you to assign a specific image to the image object. 
     * The image paths are stored in an array.
     * 
     * @param {array} arrImg – This is the array in which the specific image path is located.
     * @param {number} nr – This is the index of the specific image path within the array.
     */
    changeImgByNr(arrImg, nr) {
        let path = arrImg[nr];
        this.img = this.imgCache[path];
    }

    /**
     * This function allows you to assign an image to the image object. 
     * The image paths are stored in an array.
     * Within a continuous loop, the image is therefore replaced after a continuous counter. 
     * The counter determines the number of the image path index. 
     * The image with which the animation begins with a new call is therefore random.
     * 
     * @param {array} arrImg – This is the array with the image paths matching the desired animation.
     */
    changeImg(arrImg) {
        let i = this.currentImage % arrImg.length;
        let path = arrImg[i];
        this.shownImg = arrImg[i];
        this.shownImgNr = i;
        this.img = this.imgCache[path];
        this.currentImage++;
    }

    /**
     * This function is used to play a noise or sound.
     * 
     * @param {object} obj – This is the audio object which is to be played.
     * @param {number} volume – This is the volume level.
     */
    sound(obj, volume) {
        obj.volume = volume;
        obj.play();
    }


    /**
     * This function is used to play (only) the noise sounds.
     * It is ensured that the sounds of the many objects are 
     * not played at the same time.
     *
     * @param {number} wait_ms – This parameter determines the milliseconds that 
     * are waited between repeated playback of the sound.
     * @param {number} vol – This is the volume level.
     */
    noises(wait_ms, vol) {
        if (!this.just_noises)
            this.startNoises(vol);
        else if (this.noisesStartedAWhileAgo(wait_ms))
            this.just_noises = false;
    }

    /**
     * This function starts the noises.
     * 
     * @param {number} vol – This is the volume level.
     */
    startNoises(vol) {
        this.startTime = Date.now();
        this.sound(this.noise_sound, vol);
        this.just_noises = true;
    };


    /**
     * This function checks whether the sound is currently running and 
     * whether a certain time has elapsed in milliseconds.
     * 
     * @param {number} wait_ms – The time that should pass.
     * @returns – true if the sound is currently running and 
     * whether a certain time has elapsed in milliseconds.
     */
    noisesStartedAWhileAgo(wait_ms) {
        return this.just_noises && this.wait(this.startTime, wait_ms);
    };


    /**
     *This function implements a gravitational effect and
     *does not allow the object to fall too far.
     * 
     * @param {number} ground_y – This parameter is the Y-position of the image object when 
     * it looks as if the object is standing on the floor.
     */
    applyGravity(ground_y) {
        setStopableInterval(() => {
            this.theGravity(ground_y);
            this.doNotFallTooLow(ground_y);
        }, normalMs);
    }


    /**
     * This function implements a gravitational effect
     * 
     * @param {number} ground_y – This parameter is the Y-position of the image object when 
     * it looks as if the object is standing on the floor.
     */
    theGravity(ground_y) {
        if (this.gravityIsRequired(ground_y)) {
            this.y -= this.speedY;
            this.speedY -= this.acceleration;
        }
    }

    /**
     * This function does not allow the object to fall too far.
     * 
     * @param {number} ground_y – This parameter is the Y-position of the image object when 
     * it looks as if the object is standing on the floor.
     */
    doNotFallTooLow(ground_y) {
        if (this.y > ground_y)
            this.y = ground_y;
    }


    /**
     * This function checks whether an object is above the ground.
     * 
     * @param {number} ground_y – This parameter is the Y-position of the image object when 
     * it looks as if the object is standing on the floor.
     * @returns – true if the current y-value of the position coordinate is 
     * below the value that makes the object appear on the floor.
     */
    isAboveGround(ground_y) {
        return this.y < ground_y;
    }


    /**
     * This function checks whether the gravity effect is required.
     * 
     * @param {number} ground_y – This parameter is the Y-position of the image object when 
     * it looks as if the object is standing on the floor.
     * @returns – true if the object appears above the ground or if there is a positiv speed.
     */
    gravityIsRequired(ground_y) {
        return this.isAboveGround(ground_y) || this.speedY > 0;
    }


    /**
     * This function checks whether the object is falling. 
     * 
     * @param {number} ground_y  – This parameter is the Y-position of the image object when 
     * it looks as if the object is standing on the floor.
     * @returns – true if the object appears above ground and if there is a negativ speed.
     */
    isFalling(ground_y) {
        return this.isAboveGround(ground_y) && this.speedY < 0;
    }

    /**
     * This function checks whether the object is rising.
     * 
     * @param {number} ground_y  – This parameter is the Y-position of the image object when 
     * it looks as if the object is standing on the floor.
     * @returns – true if the object appears above ground and if there is a positiv speed.
     */
    isRising(ground_y) {
        return this.isAboveGround(ground_y) && this.speedY > 0;
    }


    /**
     * This function checks whether the main character is nearby the current object.
     * 
     * @returns – if the X-position of the image object is located within a certain distance
     * in each case.
     */
    isNearby() {
        return this.world.character.x > this.x &&
            this.world.character.x - this.x < 300 ||
            this.world.character.x < this.x &&
            this.x - this.world.character.x < 300;
    }


    /**
     * This function checks whether the end boss is nearby the current object.
     * 
     * @returns – if the X-position of the image object is located within a certain distance
     * in each case.
     */
    isNearbyEndboss() {
        if (this.world.level.enemies[0].x) {
            return this.world.level.enemies[0].x > this.x &&
                this.world.level.enemies[0].x - this.x < 300 ||
                this.world.level.enemies[0].x < this.x &&
                this.x - this.world.level.enemies[0].x < 300;
        }
    }

    /**
     * This function checks if some object is colliding with the current object.
     * 
     * @param {object} obj – This is the object that collides.
     * @returns – true if the position coordinates of the objects involved overlap.
     */
    isColliding(obj) {
        return ((this.x + this.offsetL) + (this.width - this.offsetR)) >= (obj.x + obj.offsetL) &&
            (this.x + this.offsetL) <= ((obj.x + obj.offsetL) + (obj.width - obj.offsetR)) &&
            ((this.y + this.offsetT) + (this.height - this.offsetB)) >= (obj.y + obj.offsetT) &&
            ((this.y + this.offsetT)) <= ((obj.y + obj.offsetT) + (obj.height - obj.offsetB));
    }


    /**
     * This function checks if some object is out of stage.
     * 
     * @param {object} obj – This is the object that may leave the stage.
     * @returns - true if the position coordinates of the object is out of a specific area. 
     */
    isOutOfStage(obj) {
        return obj.x < -100 ||
            obj.x > 5000 ||
            obj.y > 1000 ||
            obj.y < -1000;
    }
}