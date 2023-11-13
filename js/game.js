let canvas;
let ctx;
let world

function init() {
    canvas = document.getElementById('canvas');
    ctx = canvas.getContext('2d');
    world = new World(canvas);


    console.log('My Character is: ', world.character);
    console.log('My Enemies are: ', world.enemies);
    console.log('My Clouds are: ', world.clouds);
    console.log('My Backgrounds are: ', world.backgrounds);

}