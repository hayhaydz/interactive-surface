class FadeEffect {
    constructor(fIn, fOut, duration) {
        this.fIn = fIn;
        this.fOut = fOut;
        this.duration = duration;
        this.startAlpha = 0;
        this.changeAlpha = 0;
        this.alpha = 0;
        this.targetAlpha = 0;
        this.elapsedTime = 0;
        this.startTime = 0;
        this.completed = false;
        this.firstRun = true;
    }

    setup() {
        if(this.fIn) {
            this.alpha = 0;
        } else {
            this.alpha = 1;
        }
        this.startAlpha = this.alpha;
    }

    easing(t, b, c, d) {
        return c * (t /= d) * t + b;
    }

    update() {
        if(this.firstRun) {
            this.startTime = new Date();
            this.firstRun = false;
        }
        if(this.fIn) {
            this.elapsedTime = Date.now() - this.startTime;
            if(this.elapsedTime <= this.duration) {
                this.targetAlpha = 1;
                this.changeAlpha =  this.targetAlpha - this.startAlpha;
                this.alpha = Math.round((this.easing(this.elapsedTime, this.startAlpha, this.changeAlpha, this.duration) + Number.EPSILON) * 100) / 100;
                // console.log('alpha: ' + this.alpha);
                // console.log('Time taken: ' + Math.abs(this.elapsedTime));
            } else {
                this.alpha = 1;
                this.completed = true;
            }
        } else if (this.fOut) {
            this.elapsedTime = Date.now() - this.startTime;
            if(this.elapsedTime <= this.duration) {
                this.targetAlpha = 0;
                this.changeAlpha =  this.targetAlpha - this.startAlpha;
                this.alpha = Math.round((this.easing(this.elapsedTime, this.startAlpha, this.changeAlpha, this.duration) + Number.EPSILON) * 100) / 100;
                // console.log('alpha: ' + this.alpha);
                // console.log('Time taken: ' + Math.abs(this.elapsedTime));
            } else {
                this.alpha = 0;
                this.completed = true;
            }
        } else {
            this.alpha = 1;
        }
    }
}

// https://www.kirupa.com/html5/animating_with_easing_functions_in_javascript.htm
// https://github.com/danro/jquery-easing/blob/master/jquery.easing.js
// https://stackoverflow.com/questions/35978915/easing-animations-in-canvas