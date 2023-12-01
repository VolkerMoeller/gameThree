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

    
    drawThisImg(ctx) {
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    }   
    

    reFlipImg(mo) {
        mo.x = mo.x * -1;
        this.ctx.restore();
    }
   
   
    setStartAnim(){
        this.startAnim = Date.now();
        this.justStartAnim = true;
    };


    timePastMs(startTime, endTime) {
        this.timePast = endTime - startTime;
    }


    animFinished(time, img) {
        return this.timePast > time &&
            this.shownImg == img;
    }       
}