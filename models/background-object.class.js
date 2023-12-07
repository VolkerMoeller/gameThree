class BackgroundObject extends MoveableObject {
    y = 0;
    width = 720;
    height = 480;

    /**
     * 
     * 
     * @param {*} imagePath 
     * @param {*} x 
     */
    constructor(imagePath, x) {
        super().loadImage(imagePath);
        this.x = x;
    }
}