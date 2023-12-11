class BackgroundObject extends MoveableObject {
    y = 0;
    width = 720;
    height = 480;

    /**
     * This function causes a new background image to be loaded 
     * when an object of this class is created.
     * 
     * @param {string} imagePath – This is the path name under which the corresponding image is found and loaded. 
     * @param {number} x – This is the x-coordinate of the position at which the background image is displayed.
     */
    constructor(imagePath, x) {
        super().loadImage(imagePath);
        this.x = x;
    }
}