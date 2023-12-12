class DrawableObject {
    x = 100;
    y = 0;
    height = 100;
    width = 200;

    img;
    imgCache = [];
    currentImage = 0;

    soundOn = false;

    startAnim;
    justStartAnim = false;
    startChangeImg;
    timePast;

    /**
     * This function creates a new image object and 
     * assigns the transferred path to it as the source.
     * 
     * @param {string} path – This parameter is the source path of the new image object.
     */
    loadImage(path) {
        this.img = new Image();
        this.img.src = path;
    }


    /**
     * This function creates a JSON-Object with all the necessary image objects
     * labelled as imgCache.
     * The values from the transferred array become the source paths 
     * of the image objects that were created.
     * The image source paths are also used as keys 
     * in the JSON object for the respective image - ingenious.
     * 
     * @param {array} arr – This array contains all the necessary image source paths.
     */
    loadImages(arr) {
        arr.forEach((path) => {
            let img = new Image();
            img.src = path;
            this.imgCache[path] = img;
        });
    }


    /**
     * This function is the central drawing function for drawing on a canvas.
     * 
     * @param {object} ctx – This object is the necessary context for drawing on a canvas.
     */
    drawThisImg(ctx) {
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    }


    // The following three functions allow you to control the end boss animation if it has been hit.

    /**
     * This function sets the start time of an animation. 
     * 
     */
    setStartAnim() {
        this.startAnim = Date.now();
        this.justStartAnim = true;
    };


    /**
     * This function calculates the time since the animation was triggered.
     * 
     * @param {number} startTime – This value is the start time.
     * @param {number} endTime – This value ist the end time.
     */
    timePastMs(startTime, endTime) {
        this.timePast = endTime - startTime;
    }


    /**
     * This function checks whether the accepted time period has been exceeded and
     * whether the final image is displayed.
     * 
     * @param {number} time – This number is the accepted time period.
     * @param {string} img – This string is the image path of the last image.
     * @returns - true if the minimum time span has been exceeded and the last image is displayed.
     */
    animFinished(time, img) {
        return this.timePast > time &&
            this.shownImg == img;
    }
}