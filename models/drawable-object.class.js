class DrawableObject {
    x = 100;
    y = 0;
    height = 100;
    width = 200;

    img;
    imgCache = [];
    currentImage = 0;

    soundOn = false;

    
    drawThisImg(ctx){
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height); 
    }

    drawFrame(mo) {
        if (
            mo instanceof Character ||
            mo instanceof Chicken ||
            mo instanceof ChickenSmall ||
            mo instanceof Endboss
        ) {
            this.rectangleRed(mo);
            this.rectangleBlue(mo);
        }
    }


    reFlipImg(mo) {
        mo.x = mo.x * -1;
        this.ctx.restore();
    }


    rectangleRed(mo) {
        this.ctx.beginPath();
        this.ctx.lineWidth = '1';
        this.ctx.strokeStyle = 'red';
        this.ctx.rect(mo.x + mo.offsetL, mo.y + mo.offsetT, mo.width - mo.offsetR, mo.height - mo.offsetB);
        this.ctx.stroke();
    }

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
}