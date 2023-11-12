class MoveableObject {
    x = 100;
    y = 100;
    height = 100;
    width = 200;
    img;


    loadImage(path) {
        this.img = new Image();
        this.img.src = path;
    }


    moveRight() {
        console.log('moveRight');
    }

    
    moveLeft() {
        console.log('moveLeft');
    }

}