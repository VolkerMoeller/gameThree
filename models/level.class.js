class Level {
    enemies;
    clouds;
    air;
    layer3rd;
    layer2nd;
    layer1st;
    bottles
    level_end_x = 3500;
    // coins;
    // amountBottles;
    // amountCoins;



    constructor(enemies, clouds, air, layer3rd, layer2nd, layer1st, bottles) {
        this.enemies = enemies;
        this.clouds = clouds;
        this.air = air;
        this.layer3rd = layer3rd;
        this.layer2nd = layer2nd;
        this.layer1st = layer1st;
        this.bottles = bottles;
        // this.amountBottles = this.bottles.length;
        // this.coins = coins;
        // this.amountCoins = this.coins.length;
    };

}