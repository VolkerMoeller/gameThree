class Character extends MoveableObject {
    x = 10;
    y = 130;
    width = Math.floor(610 / 4);
    height = Math.floor(1200 / 4);

    constructor() {
        super().loadImage('./img/2_character_pepe/2_walk/W-21.png');
    }

    jump() {


    }
}