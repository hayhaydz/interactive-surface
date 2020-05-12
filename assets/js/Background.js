class Background {
    constructor(theme, bFadeIn, bFadeOut, fadeInDuration, fadeOutDuration) {
        this.theme = theme;
        this.colour = "rgba(255,255,255,";
        this.alpha = 0;

        this.fadeInDuration = fadeInDuration;
        this.fadeOutDuration = fadeOutDuration;
        this.fadeInEffect = new FadeEffect(true, false, this.fadeInDuration);
        this.fadeOutEffect = new FadeEffect(false, true, this.fadeOutDuration);
        this.fadedIn = false;
        this.fadedOut = false;
        this.fadeIn = true;
        this.fadeOut = false;

        this.bFadeIn = bFadeIn;
        this.bFadeOut = bFadeOut;
        
        this.canvasWidth = 0;
        this.canvasHeight = 0;
    }

    setup(canvasSizeChange) {
        if(this.bFadeIn) {
            this.fadeInEffect.setup();
        } else if (this.bFadeOut) {
            this.fadeOutEffect.setup();
            this.fadeIn = false;
            this.alpha = 1;
        } else {
            this.alpha = 1;
        }

        if(canvasSizeChange.state) {
            this.canvasWidth = canvasSizeChange.width;
            this.canvasHeight = canvasSizeChange.height;
        }

        if(this.theme === "light") {
            this.colour = "rgba(255,255,255,";
        } else if (this.theme === "dark") {
            this.colour = "rgba(0,0,0,";
        }
    }

    update(canvasSizeChange) {
        if(this.bFadeIn) {
            if(this.fadeIn && !this.fadeInEffect.completed) {
                this.fadeInEffect.update();
                this.alpha = this.fadeInEffect.alpha;
                if(this.fadeInEffect.completed) {
                    // this.fadeOutEffect.reset();
                    this.fadedIn = true;
                    this.fadeIn = false;
                    this.fadedOut = false;
                }
            }
        } else if (this.bFadeOut) {
            if(this.fadeOut && !this.fadeOutEffect.completed) {
                this.fadeOutEffect.update();
                this.alpha = this.fadeOutEffect.alpha;
                if(this.fadeOutEffect.completed) {
                    // this.fadeOutEffect.reset();
                    this.fadedOut = true;
                    this.fadeOut = false;
                }
            }
        }

        if(canvasSizeChange.state) {
            this.canvasWidth = canvasSizeChange.width;
            this.canvasHeight = canvasSizeChange.height;
        }
    }
    
    draw() {
        ctx.fillStyle = this.colour + this.alpha + ")";
        ctx.fillRect(0, 0, this.canvasWidth, this.canvasHeight);
    }
}