class Cloud extends MoveableObject {
    y = 0;
    width = 720;
    height = 480;
    speed = 0.2;


    /**
     * This function causes a new cloud image to be loaded 
     * when an object of this class is created.
     * 
     * @param {string} imagePath – This is the path name under which the corresponding image is found and loaded. 
     * @param {number} x – This is the x-coordinate of the position at which the cloud image is displayed.
     */
    constructor(imagePath, x) {
        super().loadImage(imagePath);
        this.x = x;
        this.animate();
    }


    /**
     * This function enables the animation.
     * The clouds move to the left.
     */
    animate() {
        setStopableInterval(() => {
            this.moveLeft();
        }, fastMs);
    }
}