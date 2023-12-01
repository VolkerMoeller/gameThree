class Cloud extends MoveableObject {
    y = 0;
    width = 720;
    height = 480;
    speed = 0.2;

    constructor(imagePath, x) {
        super().loadImage(imagePath);
        this.x = x;
        this.animate();
    }


    animate() {
        setStopableInterval(() => {
            this.moveLeft();
        }, fastMs);
    }
}