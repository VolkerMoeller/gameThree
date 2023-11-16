class Statusbar extends MoveableObject {
    x = 20;
    y = 40;
    width = 125;
    height = Math.floor(158 / 4);

    IMAGE_EMPTY = 'img/7_statusbars/4_bar_elements/statusbar_empty.png';
    IMAGES_HEART = [
        'img/7_statusbars/4_bar_elements/statusbar_empty.png',
        'img/7_statusbars/3_icons/icon_health.png'
    ]


    constructor() {
        super().loadImage(this.IMAGE_EMPTY);
        this.loadImages(this.IMAGES_HEART);
        
    }
}