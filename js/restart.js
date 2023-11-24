function setToBeginning() {
    cancelAnimationFrame(world.requestId);
    world.character.x = 10;
    world.character.otherDirection = false;
    world.character.justIdle = false;
    world.character.justHurt = false;
    world.character.justDead = false;
    world.character.just = false;
    world.character.gameOver = false;
    world.character.nrCollectedBottles = 0;
    world.character.nrThrownBottles = 0;
    world.character.bottleBarLength = 0;
    world.character.nrCollectedCoins = 0;
    world.character.nrEndbossHits = 0;
    world.character.energy = 100;

    world.level.enemies[0].x = 3800;
    world.level.enemies[0].justTimeSet = false;
    world.level.enemies[0].justWalk = true;
    world.level.enemies[0].justAlert = false;
    world.level.enemies[0].justLongAlert = false;
    world.level.enemies[0].justHurt = false;
    world.level.enemies[0].justDead = false;
    world.level.enemies[0].allHits = false;
    world.level.enemies[0].setBeginLeap = false;
    world.level.enemies[0].energy = 100;

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
    world.draw();
}