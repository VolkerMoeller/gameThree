let canvas;
let ctx;
let world;

let fastMs = 20;
let mediumFastMs = 45;
let normalMs = 70;
let slowMs = 120;
let mediumSlowMs = 155;
let slowerMs = 500;

let veryQuietVolume = 0.02;
let quietVolume = 0.04;
let mediumVolume = 0.08;
let loudVolume = 0.20;
let louderVolume = 0.50;
let veryLoudVolume = 1.0;

let intervalIds = [];
let currentIntervalId;

let keyboard = new Keyboard();

let screenOr = 'portrait-primary';

let countToOne = 0;
let timerCounter = 0;


/**
 * This is the initial file. The canvas object is defined and a 2D context is assigned.
 * This function is called up when the game is loaded for the first time.
 * 
 */
function init() {
    canvas = document.getElementById('canvas');
    ctx = canvas.getContext('2d');
}


/**
 * This is the start function. It is triggered by the start button.
 * The level is preloaded, the stage is shown and the buttons for mobile play are loaded. 
 * The superordinate game world object is then initialised.
 * 
 */
function start() {
    loadLevel1();
    setTimeout(() => {
        setTheScene();
        initTouchBtns();
    }, 500);
    world = new World(canvas, keyboard);

}


/**
 * This function checks that the display is in portrait format. 
 * If this is the case, a recommendation to switch to landscape format is displayed 
 * if the resolution is less than 1000 pixels.
 * The check is performed continuously by an interval 
 * that is triggered in the higher-level game world object when it is initialised.
 * 
*/
function checkOrientation() {
    let w = window.innerWidth;
    if (screen.orientation.type == 'portrait-primary' && w < 1000)
        removeClassFromElement('rotate', 'display-none');
}


/**
 * This function switches the display of the message for changing 
 * the display setting on and off. Depending on requirements.
 * 
 */
function screenOrientation() {
    let w = window.innerWidth;
    screen.orientation.addEventListener("change", (event) => {
        screenOr = event.target.type;
        if (screenOr == 'portrait-primary' && w < 1000)
            removeClassFromElement('rotate', 'display-none');
        if (screenOr == 'landscape-primary' && w < 1000)
            addClassToElement('rotate', 'display-none');
    });
}


/**
 * This function sets the scene.
 * 
 */
function setTheScene() {
    addClassToElement('introStart', 'display-none');
    removeClassFromElement('headline', 'visibility-none');
    removeClassFromElement('instruc', 'display-none');
    removeClassFromElement('hud', 'display-none');
}


/**
 * This function saves all individual animation interval IDs in a single array.
 * In addition, the current interval ID is transferred to a variable. 
 * This value is passed to the calling objects to uniquely address the object. 
 * This establishes the premise that each object only executes one main interval function.
 * 
 * @param {function} fn – This is a function that should be repeated at intervals.
 * @param {value} ms – This is the duration in milliseconds after which 
 * the function is to be called up again continuously.
*/
function setStopableInterval(fn, ms) {
    let intervalId = setInterval(fn, ms);
    intervalIds.push(intervalId);
    currentIntervalId = intervalId;
}


/**
 * This function allows you to stop all animation intervals. 
 * 
 */
function stopAnimation() {
    intervalIds.forEach((e) => {
        clearInterval(e);
    });
}


/**
 * This function is used to display the winning scene.
 * 
 */
function gameWon() {
    removeClassFromElement('outroWin', 'display-none');
    addClassToElement('instruc', 'display-none');
    addClassToElement('hud', 'display-none');
}


/**
 * This function is used to display the lost scene.
 * 
 */
function gameLost() {
    removeClassFromElement('outroLost', 'display-none');
    addClassToElement('instruc', 'display-none');
    addClassToElement('hud', 'display-none');
}


/**
 * This function is used to display the sound-on button.
 * 
 */
function showOnBtn() {
    removeClassFromElement('btn-music-on', 'display-none');
    addClassToElement('btn-music-off', 'display-none');
}


/**
 * This function is used to display the sound-off button.
 * 
 */
function showOffBtn() {
    removeClassFromElement('btn-music-off', 'display-none');
    addClassToElement('btn-music-on', 'display-none');
}


/**
 * This help function is used to add a named class to a named element.
 * 
 * @param {string} objectId  – This is the name of the element that is to receive the class.
 * @param {string} className – This is the name of the class that is to receive the element.
*/
function addClassToElement(objectId, className) {
    document.getElementById(objectId).classList.add(className);
}


/**
 * This help function is used to remove a named class to a named element.
 * 
 * 
 * @param {string} objectId – This is the name of the element from which the class is to be removed.
 * @param {string} className – This is the name of the class that is to be removed.
 */
function removeClassFromElement(objectId, className) {
    document.getElementById(objectId).classList.remove(className);
}


/**
 * This function repeatedly sets the variable "countToOne" from 0 to 1.
 * 
 * 
 */
function startTimerCounter() {
    setStopableInterval(() => {
        countToOne = timerCounter % 2;
        timerCounter++;
    }, mediumSlowMs);
}


/**
 * This function is used to initialise the play buttons when using mobile devices.
 * 
 */
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


/**
 * This function is used to recognise the player's keystrokes. 
 * Here when the button is pressed.
 */
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


/**
 * This function is used to recognise the player's keystrokes. 
 * Here when the button is released.
 */
onkeyup = (e) => {
    switch (e.code) {
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