class Level {
    enemies;
    clouds;
    air;
    layer3rd;
    layer2nd;
    layer1st;
    bottles;
    coins;
    level_end_x = 3650;
    amountBottles;
    amountCoins;


    constructor(enemies, clouds, air, layer3rd, layer2nd, layer1st, bottles, coins) {
        this.enemies = enemies;
        this.clouds = clouds;
        this.air = air;
        this.layer3rd = layer3rd;
        this.layer2nd = layer2nd;
        this.layer1st = layer1st;
        this.bottles = bottles;
        this.coins = coins;
        this.amountBottles = this.bottles.length;
        this.amountCoins = this.coins.length;
    };

}