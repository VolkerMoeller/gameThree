class MoveableObject {
    x = 100;
    y = 100;
    height = 100;
    width = 200;
    img;
    imgCache = [];
    speed = 1;
    currentImage = 0;
    intervalId;


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

}