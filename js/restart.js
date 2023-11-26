let nrChickens = 3;
let nrChickenSmalls = 3;
let nrSalsaBottles = 10;
let nrCoins = 6;

function restart() {
    addClassToElement('outroWin', 'display-none');
    addClassToElement('outroLost', 'display-none');
    cancelAnimationFrame(world.requestId);
    stopAnimation();
    setPlayFigures();
    world.setWorldTo();
    world.draw();
}


function setPlayFigures() {
    world.character = new Character();
    world.level.enemies[0] = new Endboss();
    for (let i = 1; i < nrChickens + 1; i++) {
        world.level.enemies[i] = new Chicken();
    }
    for (let i = 4; i < nrChickens + nrChickenSmalls + 1; i++) {
        world.level.enemies[i] = new ChickenSmall();
    }
    for (let i = 0; i < nrSalsaBottles; i++) {
        world.level.bottles[i] = new SalsaBottle();
    }
    for (let i = 0; i < nrCoins; i++) {
        world.level.coins[i] = new Coin();
    }
}
