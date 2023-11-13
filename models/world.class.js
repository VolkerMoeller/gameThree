class World {
    character = new Character();
    enemies = [
        new Chicken(),
        new Chicken(),
        new Chicken(),
        new ChickenSmall(),
        new ChickenSmall(),
        new ChickenSmall()
    ];
    clouds = [
        new Cloud('./img/5_background/layers/4_clouds/1.png'),
        new Cloud('./img/5_background/layers/4_clouds/2.png')
    ];
    backgrounds = [
        new BackgroundObject('./img/5_background/layers/air.png'),
        new BackgroundObject('./img/5_background/layers/3_third_layer/1.png'),
        new BackgroundObject('./img/5_background/layers/2_second_layer/1.png'),
        new BackgroundObject('./img/5_background/layers/1_first_layer/1.png')
    ];
    canvas;
    ctx;

    constructor(canvas) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.draw();
    }

    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.backgrounds.forEach((background)=> {
            this.addToMap(background);
        })
        this.clouds.forEach((cloud) => {
            this.addToMap(cloud);
        })
        this.addToMap(this.character);
        this.enemies.forEach((enemie) => {
            this.addToMap(enemie);
        })
        let self = this;
        requestAnimationFrame(() => {
            self.draw();
        });
    }

    addToMap(mo) {
        this.ctx.drawImage(mo.img, mo.x, mo.y, mo.width, mo.height);
    }

}