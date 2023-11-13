class MoveableObject {
    x = 100;
    y = 100;
    height = 100;
    width = 200;
    img;
    speed = 1;


    loadImage(path) {
        this.img = new Image();
        this.img.src = path;
    }


    moveRight() {
        this.x += this.speed;
    }

    
    moveLeft() {
        this.x -= this.speed;
    }

}