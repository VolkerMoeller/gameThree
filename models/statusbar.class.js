class Statusbar extends DrawableObject {
    x = 20;
    y = 40;
    width = 125;
    height = Math.floor(158 / 4);
    
    IMAGE_EMPTY = 'img/7_statusbars/4_bar_elements/statusbar_empty.png';

    IMAGES_ICONS = [
        'img/7_statusbars/3_icons/icon_coin.png',
        'img/7_statusbars/3_icons/icon_health_endboss.png',
        'img/7_statusbars/3_icons/icon_health.png',
        'img/7_statusbars/3_icons/icon_salsa_bottle.png'
    ];

    /**
     * When creating the bottle object, 
     * this function loads the required images and 
     * sets the position.
     * This object is not animated.
     * 
     */
    constructor(posX, posY) {
        super().loadImage(this.IMAGE_EMPTY);
        this.loadImages(this.IMAGES_ICONS); 
        this.x = posX; 
        this.y = posY; 
    }
}