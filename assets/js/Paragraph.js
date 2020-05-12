class Paragraph {
    constructor(content, fontWeight, theme, fadeInDuration, fadeOutDuration) {
        this.content = content; 
        this.fontSize = 0;
        this.fontWeight = fontWeight;
        this.colour = "rgba(0,0,0,";
        this.alpha = 0;
        this.theme = theme;

        this.fadeInDuration = fadeInDuration;
        this.fadeOutDuration = fadeOutDuration;
        this.fadeInEffect = new FadeEffect(true, false, this.fadeInDuration);
        this.fadeOutEffect = new FadeEffect(false, true, this.fadeOutDuration);
        this.fadedIn = false;
        this.fadedOut = false;
        this.fadeIn = true;
        this.fadeOut = false;

        this.canvasWidth = 0;
        this.canvasHeight = 0;
    }

    fontCalculation() {
        if(this.fontWeight === "Black") {
            ctx.font =  this.fontSize + 'px Roboto-' + this.fontWeight;
            let text = ctx.measureText(this.content);
            while(text.width < this.canvasWidth/2 && this.fontSize < this.canvasHeight/2) {
                ctx.font =  this.fontSize + 'px Roboto-' + this.fontWeight;
                text = ctx.measureText(this.content);
                this.fontSize += 1;
            }
        } else {
            if(window.innerWidth > 768) {
                this.fontSize = this.canvasWidth/30;
            } else {
                this.fontSize = this.canvasWidth/25;
            }
        }
    }

    setup(canvasSizeChange) {
        this.fadeInEffect.setup();
        this.fadeOutEffect.setup();

        if(canvasSizeChange.state) {
            this.canvasWidth = canvasSizeChange.width;
            this.canvasHeight = canvasSizeChange.height;
        }

        this.fontCalculation();

        if(this.theme === "light") {
            this.colour = "rgba(0,0,0,";
        } else if (this.theme === "dark") {
            this.colour = "rgba(255,255,255,";
        }
    }
    
    update(canvasSizeChange) {
        if(this.fadeIn && !this.fadeInEffect.completed) {
            this.fadeInEffect.update();
            this.alpha = this.fadeInEffect.alpha;
            if(this.fadeInEffect.completed) {
                // this.fadeOutEffect.reset();
                this.fadedIn = true;
                this.fadeIn = false;
                this.fadedOut = false;
            }
        } else if(this.fadeOut && !this.fadeOutEffect.completed) {
            this.fadeOutEffect.update();
            this.alpha = this.fadeOutEffect.alpha;
            if(this.fadeOutEffect.completed) {
                // this.fadeOutEffect.reset();
                this.fadedOut = true;
                this.fadeOut = false;
                this.fadeIn = true;
                this.fadedIn = false;
            }
        }

        if(canvasSizeChange.state) {
            this.canvasWidth = canvasSizeChange.width;
            this.canvasHeight = canvasSizeChange.height;
            this.fontCalculation();
        }
    }

    draw() {
        ctx.fillStyle = this.colour + this.alpha + ")";
        ctx.font =  this.fontSize + 'px Roboto-' + this.fontWeight;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(this.content, this.canvasWidth/2, this.canvasHeight/2);
    }
}