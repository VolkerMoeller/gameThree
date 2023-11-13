class Cloud extends MoveableObject {
    x = 0;
    y = 0;
    width = 720;
    height = 480;
    speed = 1;

    constructor(imagePath) {
        super().loadImage(imagePath);
        this.animate();
    }

    animate() {
        setStopableInterval(() => {
            this.animByChangingParam()
        }, standardMs);

        // setInterval(() => {
        // this.animByChangingParam();
        // }, standardMs);
    }

    animByChangingParam() {
        this.moveLeft();
    }

}