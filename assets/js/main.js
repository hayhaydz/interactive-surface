const PIXEL_RATIO = (() => {
    let ctx = document.createElement("canvas").getContext("2d"),
        dpr = window.devicePixelRatio || 1,
        bsr = ctx.webkitBackingStorePixelRatio ||
              ctx.mozBackingStorePixelRatio ||
              ctx.msBackingStorePixelRatio ||
              ctx.oBackingStorePixelRatio ||
              ctx.backingStorePixelRatio || 1;

    return dpr / bsr;
})();

const createCanvas = (w, h, ratio) => {
    //https://stackoverflow.com/questions/15661339/how-do-i-fix-blurry-text-in-my-html5-canvas
    if (!ratio) { ratio = PIXEL_RATIO; }
    var can = document.createElement("canvas");
    document.body.appendChild(can);
    can.width = w * ratio;
    can.height = h * ratio;
    can.style.width = w + "px";
    can.style.height = h + "px";
    can.getContext("2d").setTransform(ratio, 0, 0, ratio, 0, 0);
    return can;
};

const canvasSize = (w, h, ratio) => {
    canvasWidth = w * ratio;
    canvasHeight = h * ratio;
    cnv.width = w * ratio;
    cnv.height = h * ratio;
    cnv.style.width = w + "px";
    cnv.style.height = h + "px";
};

// Resources to follow
// https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API
// https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Tutorial/Basic_animations