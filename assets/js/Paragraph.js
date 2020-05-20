class Paragraph {
    constructor(theme, delay, content, fontSize, fontWeight, PosX, PosY, fadeInDuration, fadeOutDuration) {
        this.theme = theme;
        this.delay = delay;
        this.content = content; 
        this.fontSize = fontSize;
        this.fontWeight = fontWeight;
        this.colour = "rgba(0,0,0,";
        this.alpha = 0;

        this.PosX = PosX;
        this.PosY = PosY;

        this.fadeInDuration = fadeInDuration;
        this.fadeOutDuration = fadeOutDuration;
        this.fadeInEffect = new FadeEffect(true, false, this.fadeInDuration);
        this.fadeOutEffect = new FadeEffect(false, true, this.fadeOutDuration);
        this.fadedIn = false;
        this.fadedOut = false;
        this.fadeIn = true;
        this.fadeOut = false;
    }

    setup() {
        this.fadeInEffect.setup();
        this.fadeOutEffect.setup();
    }
    
    update() {
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
    }

    draw() {
        ctx.fillStyle = this.colour + this.alpha + ")";
        ctx.font =  this.fontSize + 'px Roboto-' + this.fontWeight;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(this.content, this.PosX, this.PosY);
    }

    updatePos(PosX, PosY) {
        this.PosX = PosX;
        this.PosY = PosY;
    }
}