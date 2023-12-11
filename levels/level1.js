let level1 = [];

/**
 * This function loads the game level.
 * The required objects, such as enemies, items and the final boss, are created
 * 
 */
function loadLevel1() {
    level1 = new Level(
        createEnemies(),
        createClouds(),
        createAir(),
        createThirdLayer(),
        createSecondLayer(),
        createFirstLayer(),
        createBottles(),
        createCoins(),
    );
}


/**
 * 
 * @returns – the enemie objects
 */
function createEnemies() {
    return [
        new Endboss(),
        new Chicken(),
        new Chicken(),
        new Chicken(),
        new ChickenSmall(),
        new ChickenSmall(),
        new ChickenSmall(),
    ];
}


/**
 * 
 * @returns – the cloud background
 */
function createClouds() {
    return [
        new Cloud('img/5_background/layers/4_clouds/1.png', 0),
        new Cloud('img/5_background/layers/4_clouds/2.png', 719),
        new Cloud('img/5_background/layers/4_clouds/1.png', 719 * 2),
        new Cloud('img/5_background/layers/4_clouds/2.png', 719 * 3),
        new Cloud('img/5_background/layers/4_clouds/1.png', 719 * 4),
        new Cloud('img/5_background/layers/4_clouds/2.png', 719 * 5),
    ];
}


/**
 * 
 * @returns – the air background
 */
function createAir() {
    return [
        new BackgroundObject('img/5_background/layers/air.png', -719),
        new BackgroundObject('img/5_background/layers/air.png', 0),
        new BackgroundObject('img/5_background/layers/air.png', 719),
        new BackgroundObject('img/5_background/layers/air.png', 719 * 2),
        new BackgroundObject('img/5_background/layers/air.png', 719 * 3),
        new BackgroundObject('img/5_background/layers/air.png', 719 * 4),
        new BackgroundObject('img/5_background/layers/air.png', 719 * 5)
    ];
}


/**
 * 
 * @returns – the third layer background
 */
function createThirdLayer() {
    return [
        new BackgroundObject('img/5_background/layers/3_third_layer/2.png', -719),
        new BackgroundObject('img/5_background/layers/3_third_layer/1.png', 0),
        new BackgroundObject('img/5_background/layers/3_third_layer/2.png', 719),
        new BackgroundObject('img/5_background/layers/3_third_layer/1.png', 719 * 2),
        new BackgroundObject('img/5_background/layers/3_third_layer/2.png', 719 * 3),
        new BackgroundObject('img/5_background/layers/3_third_layer/1.png', 719 * 4),
        new BackgroundObject('img/5_background/layers/3_third_layer/2.png', 719 * 5)
    ];
}


/**
 * 
 * @returns – the second layer background
 */
function createSecondLayer() {
    return [
        new BackgroundObject('img/5_background/layers/2_second_layer/2.png', -719),
        new BackgroundObject('img/5_background/layers/2_second_layer/1.png', 0),
        new BackgroundObject('img/5_background/layers/2_second_layer/2.png', 719),
        new BackgroundObject('img/5_background/layers/2_second_layer/1.png', 719 * 2),
        new BackgroundObject('img/5_background/layers/2_second_layer/2.png', 719 * 3),
        new BackgroundObject('img/5_background/layers/2_second_layer/1.png', 719 * 4),
        new BackgroundObject('img/5_background/layers/2_second_layer/2.png', 719 * 5)
    ];
}


/**
 * 
 * @returns – the first layer background
 */
function createFirstLayer() {
    return [
        new BackgroundObject('img/5_background/layers/1_first_layer/2.png', -719),
        new BackgroundObject('img/5_background/layers/1_first_layer/1.png', 0),
        new BackgroundObject('img/5_background/layers/1_first_layer/2.png', 719),
        new BackgroundObject('img/5_background/layers/1_first_layer/1.png', 719 * 2),
        new BackgroundObject('img/5_background/layers/1_first_layer/2.png', 719 * 3),
        new BackgroundObject('img/5_background/layers/1_first_layer/1.png', 719 * 4),
        new BackgroundObject('img/5_background/layers/1_first_layer/2.png', 719 * 5)
    ];
}


/**
 * 
 * @returns – the bottle objects on the floor
 */
function createBottles() {
    return [
        new SalsaBottle(),
        new SalsaBottle(),
        new SalsaBottle(),
        new SalsaBottle(),
        new SalsaBottle(),
        new SalsaBottle(),
        new SalsaBottle(),
        new SalsaBottle(),
        new SalsaBottle(),
        new SalsaBottle()
    ];
}


/**
 * 
 * @returns – the coin objects above the ground
 */
function createCoins() {
    return [
        new Coin(),
        new Coin(),
        new Coin(),
        new Coin(),
        new Coin()
    ];
}