let canvas;
let ctx;
let world

function init() {
    canvas = document.getElementById('canvas');
    ctx = canvas.getContext('2d');
    world = new World(canvas);


    console.log('My Character is: ', world.character);
    console.log('My Enemie is: ', world.enemies);
    console.log('My Cloud is: ', world.clouds);

}