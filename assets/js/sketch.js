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
    isTiming,
    timerStart,
    stage;

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

        stage = new Stage(canvasWidth, canvasHeight);

        fetch('/assets/json/stages.json')
            .then(response => response.json())
            .then(data => {
                for (let i = 0; i < data.stages.length; i++) {
                    stage.pushParagraphs(data.stages[i].theme, data.stages[i].delay, data.stages[i].fadeInDuration, data.stages[i].fadeOutDuration, data.stages[i].content, data.stages[i].fontWeight);
                }
                // stageIndex = 32;
                stage.setup();
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

    stage.update(canvasWidth, canvasHeight, canvasSizeChanged);
};

const draw = () => {
    // Clearing canvas
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);

    // Displaying current FPS
    // ctx.fillStyle = "#c9c9c9";
    // ctx.textAlign = 'left';
    // ctx.font = '48px Roboto-Regular';
    // ctx.fillText('FPS:' + FPS, 50, 50);

    // Middle line
    // ctx.fillStyle = "c9c9c9";
    // ctx.fillRect(0, canvasHeight/2, canvasWidth, 1);
    // ctx.fillRect(canvasWidth/2, 0, 1, canvasHeight);

    // Drawing paragraph class
    stage.draw();
};

document.body.onload = setup;