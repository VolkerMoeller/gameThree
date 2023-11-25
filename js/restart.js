let nrChickens = 8;
let nrChickenSmalls = 14;
let nrSalsaBottles = 6;
let nrCoins = 6;

function restart() {
    addClassToElement('outroWin', 'display-none');
    addClassToElement('outroLost', 'display-none');
    cancelAnimationFrame(world.requestId);
    stopAnimation();
    world.character = new Character();
    world.level.enemies[0] = new Endboss();
    for (let i = 1; i < nrChickens; i++) {
        world.level.enemies[i] = new Chicken();
    }
    for (let i = 4; i < nrChickenSmalls; i++) {
        world.level.enemies[i] = new ChickenSmall();
    }
    for (let i = 0; i < nrSalsaBottles; i++) {
        world.level.bottles[i] = new SalsaBottle();
    }
    for (let i = 0; i < nrCoins; i++) {
        world.level.coins[i] = new Coin();
    }
    world.setWorldTo();
    world.draw();
}