let canvas;
let ctx;
let world
let standardMs = 20;
let intervalIds = []; 


function init() {
    canvas = document.getElementById('canvas');
    ctx = canvas.getContext('2d');
    world = new World(canvas); 
}


function showInformation(){
    console.log('My World is: ', world);
    console.log('My Character is: ', world.character);
    console.log('My Enemies are: ', world.enemies);
    console.log('My Clouds are: ', world.clouds);
    console.log('My Backgrounds are: ', world.backgrounds);
    console.log('intervalIds: ',intervalIds);
    console.log('imageCache-Character: ', world.character.imgCache);
}


function setStopableInterval(fn, ms){
    let intervalId = setInterval(fn, ms);
    intervalIds.push(intervalId);
}


function stopAnimation() {
    intervalIds.forEach((e)=>{
        clearInterval(e);
    })
}


function resetGame() {
    stopAnimation();
    init();
}