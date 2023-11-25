let canvas;
let ctx;
let world

let fastMs = 20;
let normalMs = 70;
let slowMs = 120;
let slowerMs = 500;

let veryQuietVolume = 0.02;
let quietVolume = 0.04;
let mediumVolume = 0.08;
let loudVolume = 0.20;
let veryLoudVolume = 1.0;

let intervalIds = [];
let currentIntervalId;

let keyboard = new Keyboard();


function init() {
    canvas = document.getElementById('canvas');
    ctx = canvas.getContext('2d');
}


function start() {
    loadLevel1();
    setTimeout(() => {
        addClassToElement('introStart', 'display-none')
        addClassToElement('headline', 'visibility-none')
    }, 1000);
    world = new World(canvas, keyboard);
}

// 
function showInformation() {
    console.log('My World is: ', world);
    console.log('My Character is: ', world.character);
}
// 


function setStopableInterval(fn, ms) {
    let intervalId = setInterval(fn, ms);
    intervalIds.push(intervalId);
    currentIntervalId = intervalId;
}


function stopAnimation() {
    intervalIds.forEach((e) => {
        clearInterval(e);
    })
}


function gameWon() {
    removeClassFromElement('outroWin', 'display-none');
}

function gameLost() {
    removeClassFromElement('outroLost', 'display-none');
}


onkeydown = (e) => {
    switch (e.code) {
        case 'ArrowLeft':
            keyboard.KEY_LEFT = true;
            break;
        case 'ArrowRight':
            keyboard.KEY_RIGHT = true;
            break;
        case 'Space':
            keyboard.KEY_SPACE = true;
            break;
        case 'ArrowUp':
            keyboard.KEY_UP = true;
            break;
        case 'ArrowDown':
            keyboard.KEY_DOWN = true;
            break;
        case 'KeyD':
            keyboard.KEY_D = true;
            break;
        case 'KeyQ':
            keyboard.KEY_Q = true;
            break;
        case 'KeyW':
            keyboard.KEY_W = true;
            break;
        case 'KeyS':
            keyboard.KEY_S = true;
            break;
        case 'KeyA':
            keyboard.KEY_A = true;
            break;
        case 'KeyF':
            keyboard.KEY_F = true;
            break;
        case 'Enter':
            keyboard.KEY_ENTER = true;
            break;
    }
}


onkeyup = (event) => {
    switch (event.code) {
        case 'ArrowLeft':
            keyboard.KEY_LEFT = false;
            break;
        case 'ArrowRight':
            keyboard.KEY_RIGHT = false;
            break;
        case 'Space':
            keyboard.KEY_SPACE = false;
            break;
        case 'ArrowUp':
            keyboard.KEY_UP = false;
            break;
        case 'ArrowDown':
            keyboard.KEY_DOWN = false;
            break;
        case 'KeyD':
            keyboard.KEY_D = false;
            break;
        case 'KeyQ':
            keyboard.KEY_Q = false;
            break;
        case 'KeyW':
            keyboard.KEY_W = false;
            break;
        case 'KeyS':
            keyboard.KEY_S = false;
            break;
        case 'KeyA':
            keyboard.KEY_A = false;
            break;
        case 'KeyF':
            keyboard.KEY_F = false;
            break;
        case 'Enter':
            keyboard.KEY_ENTER = false;
            break;
    }
}