class Chicken extends MoveableObject {
    y = 340;
    width = Math.floor(248 / 4);
    height = Math.floor(243 / 4);

    constructor() {
        super().loadImage('../img/3_enemies_chicken/chicken_normal/1_walk/1_w.png');
        this.x = Math.random() * 600 + 200;
    }
}