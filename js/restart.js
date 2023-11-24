function setToBeginning() {
    addClassToElement('outroWin', 'display-none');
    cancelAnimationFrame(world.requestId);
    stopAnimation();

    world.character = new Character();
    world.level.enemies[0] = new Endboss();
    for (let i = 1; i < 4; i++) {
        world.level.enemies[i] = new Chicken();
    }

    for (let i = 4; i < 7; i++) {
        world.level.enemies[i] = new ChickenSmall();
    }

    for (let i = 0; i < 6; i++) {
        world.level.bottles[i] = new SalsaBottle();
    }

    for (let i = 0; i < 6; i++) {
        world.level.coins[i] = new Coin();
    }

    world.setWorldTo();
    world.draw();
}