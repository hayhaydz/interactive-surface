let cnv, 
    ctx, 
    canvasWidth, 
    canvasHeight,
    canvasSizeChanged = false,
    resizeTimeout,
    secondsPassed,
    oldTimeStamp = 0,
    FPS,
    maximalUpdateDelay = 25,
    updateTimeout,
    dateNow,
    stageIndex = 0,
    clicked = false,
    isTiming,
    timerStart;
let stages = [];

const setup = () => {
    cnv = createCanvas(window.innerWidth, window.innerHeight);
    
    if(cnv.getContext) {
        ctx = cnv.getContext('2d');
        canvasSize(window.innerWidth, window.innerHeight, PIXEL_RATIO);
        window.addEventListener('resize', () => {
            clearTimeout(resizeTimeout);
            // canvasSizeChanged = false;
            canvasSizeChanged = false;
            resizeTimeout = setTimeout(() => {
                canvasSize(window.innerWidth, window.innerHeight, PIXEL_RATIO);
                canvasSizeChanged = true;
            }, 500);
        }, false);
        cnv.addEventListener('click', mouseClick, false);

        fetch('/assets/json/stages.json')
            .then(response => response.json())
            .then(data => {
                for (let i = 0; i < data.stages.length; i++) {
                    let bFadeIn = false;
                    let bFadeOut = false;
                    if(i > 0) {
                        if(data.stages[i-1].theme === "light" && data.stages[i].theme === "dark") {
                            bFadeIn = true;
                        }
                        if(data.stages[i].theme === "dark" && data.stages[i+1].theme === "light") {
                            bFadeOut = true;
                        }
                    }
                    stages.push(new Stage(data.stages[i].isParagraph, data.stages[i].isImage, data.stages[i].theme, bFadeIn, bFadeOut, data.stages[i].delay, data.stages[i].fadeInDuration, data.stages[i].fadeOutDuration, data.stages[i].pContent, data.stages[i].pFontWeight));
                    stages[i].setup(canvasWidth, canvasHeight);
                }
                // stageIndex = 32;

                window.requestAnimationFrame(gameLoop);
            });
    } else {
        // If the canvas is not supported by a browser
        const element = document.createElement('p');
        const node = document.createTextNode('Your browser does not support the canvas');
        element.appendChild(node);
        document.body.appendChild(element);
    }
};

// https://spicyyoghurt.com/tutorials/html5-javascript-game-development/create-a-proper-game-loop-with-requestanimationframe
const gameLoop = (timeStamp) => {
    // Computing FPS and time elasped
    secondsPassed = (timeStamp - oldTimeStamp) / 1000;
    oldTimeStamp = timeStamp;
    FPS = Math.round(1 / secondsPassed);

    clearTimeout(updateTimeout);
    update(); // update the scene
    draw(); // render the scene

    // Calling loop function again to loop animation state
    window.requestAnimationFrame(gameLoop);
};

const update = () => {
    updateTimeout = setTimeout(update, maximalUpdateDelay);
    let delta = -dateNow + (dateNow = Date.now());

    stages[stageIndex].update(canvasWidth, canvasHeight, canvasSizeChanged);
    if(stages[stageIndex].paragraph.fadedOut) {
        if(!isTiming) {
            timerStart = Date.now();
            isTiming = true;
        }
    }

    if(isTiming) {
        if(Date.now() - timerStart >= stages[stageIndex].delay) {
            clicked = false;
            stageIndex++;
            isTiming = false;
        }
    }
};

const draw = () => {
    // Clearing canvas
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);

    // Displaying current FPS
    ctx.fillStyle = "#c9c9c9";
    ctx.textAlign = 'left';
    ctx.font = '48px Roboto-Regular';
    ctx.fillText('FPS:' + FPS, 50, 50);

    // Middle line
    // ctx.fillStyle = "c9c9c9";
    // ctx.fillRect(0, canvasHeight/2, canvasWidth, 1);

    // Drawing paragraph class
    stages[stageIndex].draw();
};

const nextStage = () => {
    if(!clicked && stages[stageIndex].paragraph.fadedIn && stageIndex < stages.length - 1) {
        stages[stageIndex].paragraph.fadeOut = true;
        stages[stageIndex].background.fadeOut = true;
        clicked = true;
    }
};

const mouseClick = () => {
    nextStage();
};

document.body.onload = setup;