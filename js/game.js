let canvas;
let ctx;
let world;

let fastMs = 20;
let mediumFastMs = 45;
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

let screenOr = 'portrait-primary';


function init() {
    canvas = document.getElementById('canvas');
    ctx = canvas.getContext('2d');
}


function start() {
    loadLevel1();
    setTimeout(() => {
        setTheScene();
        initTouchBtns();
    }, 500);
    world = new World(canvas, keyboard);

}


function checkOrientation() {
    let w = window.innerWidth;
    if (screen.orientation.type == 'portrait-primary' && w < 800)
        removeClassFromElement('rotate', 'display-none');
}


function screenOrientation() {
    let w = window.innerWidth;
    screen.orientation.addEventListener("change", (event) => {
        screenOr = event.target.type;
        if (screenOr == 'portrait-primary' && w < 800)
            removeClassFromElement('rotate', 'display-none');
        if (screenOr == 'landscape-primary' && w < 800)
            addClassToElement('rotate', 'display-none');
    });
}


function setTheScene() {
    addClassToElement('introStart', 'display-none');
    removeClassFromElement('headline', 'visibility-none');
    removeClassFromElement('instruc', 'display-none');
    removeClassFromElement('hud', 'display-none');
}


function setStopableInterval(fn, ms) {
    let intervalId = setInterval(fn, ms);
    intervalIds.push(intervalId);
    currentIntervalId = intervalId;
}


function stopAnimation() {
    intervalIds.forEach((e) => {
        clearInterval(e);
    });
}


function gameWon() {
    removeClassFromElement('outroWin', 'display-none');
    addClassToElement('instruc', 'display-none');
    addClassToElement('hud', 'display-none');
}


function gameLost() {
    removeClassFromElement('outroLost', 'display-none');
    addClassToElement('instruc', 'display-none');
    addClassToElement('hud', 'display-none');
}


function showOnBtn() {
    removeClassFromElement('btn-music-on', 'display-none');
    addClassToElement('btn-music-off', 'display-none');
}


function showOffBtn() {
    removeClassFromElement('btn-music-off', 'display-none');
    addClassToElement('btn-music-on', 'display-none');
}


function initTouchBtns() {
    document.getElementById('btn-right').addEventListener('touchstart', (e) => {
        e.preventDefault();
        keyboard.KEY_RIGHT = true;
    });

    document.getElementById('btn-right').addEventListener('touchend', (e) => {
        e.preventDefault();
        keyboard.KEY_RIGHT = false;
    });

    document.getElementById('btn-left').addEventListener('touchstart', (e) => {
        e.preventDefault();
        keyboard.KEY_LEFT = true;
    });

    document.getElementById('btn-left').addEventListener('touchend', (e) => {
        e.preventDefault();
        keyboard.KEY_LEFT = false;
    });

    document.getElementById('btn-jump').addEventListener('touchstart', (e) => {
        e.preventDefault();
        keyboard.KEY_SPACE = true;
    });

    document.getElementById('btn-jump').addEventListener('touchend', (e) => {
        e.preventDefault();
        keyboard.KEY_SPACE = false;
    });

    document.getElementById('btn-throw').addEventListener('touchstart', (e) => {
        e.preventDefault();
        keyboard.KEY_D = true;
    });

    document.getElementById('btn-throw').addEventListener('touchend', (e) => {
        e.preventDefault();
        keyboard.KEY_D = false;
    });

    document.getElementById('btn-start').addEventListener('touchend', (e) => {
        e.preventDefault();
        showLevel1();
    });

    document.getElementById('btn-music-on').addEventListener('touchend', (e) => {
        e.preventDefault();
        showOffBtn();
        world.soundsOn();
    });

    document.getElementById('btn-music-off').addEventListener('touchend', (e) => {
        e.preventDefault();
        showOnBtn();
        world.soundsOff();
    });
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
        case 'KeyD':
            keyboard.KEY_D = true;
            break;
        case 'KeyQ':
            keyboard.KEY_Q = true;
            break;
        case 'KeyW':
            keyboard.KEY_W = true;
            break;
        case 'KeyF':
            keyboard.KEY_F = true;
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
        case 'KeyD':
            keyboard.KEY_D = false;
            break;
        case 'KeyQ':
            keyboard.KEY_Q = false;
            break;
        case 'KeyW':
            keyboard.KEY_W = false;
            break;
        case 'KeyF':
            keyboard.KEY_F = false;
            break;
    }
}