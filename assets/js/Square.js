class Square {
    constructor(size, startSize, posX, posY, colour, backgroundColour) {
        this.size = startSize;
        this.width = size;
        this.height = size;
        this.posX = posX;
        this.posY = posY;
        this.colour = colour;
        this.backgroundColour = backgroundColour;

        this.playerInside = false;

        // Animation
        this.firstRun = true;
        this.completed = false;
        this.startTime = 0;
        this.elapsedTime = 0;
        this.startSize = startSize;
        this.targetSize = size;
        this.changeSize = 0;
        this.duration = 500;
        this.progress = 0;

        this.borders = [];
        this.borderWidth = 5;

        this.broken = false;
    }

    setup() {
        this.borders[0] = new Border(this.size, this.borderWidth, this.posX - this.borderWidth, this.posY, this.colour);
        this.borders[1] = new Border(this.borderWidth, this.size, this.posX + this.size - this.borderWidth, this.posY, this.colour);
        this.borders[2] = new Border(this.size, this.borderWidth, this.posX, this.posY + this.size - this.borderWidth, this.colour);
        this.borders[3] = new Border(this.borderWidth, this.size, this.posX, this.posY, this.colour);
    }

    update(canvasWidth, canvasHeight) {
        if(this.firstRun) {
            this.startTime = new Date();
            this.firstRun = false;
        }
        this.elapsedTime = Date.now() - this.startTime;
        this.progress = (100 / this.size) * this.targetSize;
        if(this.progress < 100) {
            this.changeSize =  this.targetSize - this.startSize;
            this.size = Math.round((this.easing(this.elapsedTime, this.startSize, this.changeSize, this.duration) + Number.EPSILON) * 100) / 100;
            this.posX = canvasWidth/2 - this.size/2;
            this.posY = canvasHeight/2 - this.size/2;
            this.width = this.size;
            this.height = this.size;
        } else {
            this.completed = true;
            this.size = this.targetSize;
            this.width = this.size;
            this.height = this.size;
            this.posX = canvasWidth/2 - this.size/2;
            this.posY = canvasHeight/2 - this.size/2;
        }

        this.borders[0].update(this.size, this.borderWidth, this.posX, this.posY, this.colour);
        this.borders[1].update(this.borderWidth, this.size, this.posX + this.size - this.borderWidth, this.posY, this.colour);
        this.borders[2].update(this.size, this.borderWidth, this.posX, this.posY + this.size - this.borderWidth, this.colour);
        this.borders[3].update(this.borderWidth, this.size, this.posX, this.posY, this.colour);
        
        for (let i = 0; i < this.borders.length; i++) {
            if(this.borders[i].health <= 0) {
                this.borders[i].colour = this.backgroundColour;
                this.borders[i].opacity = 0;
                this.broken = true;
            }
        }
    }

    reset(size, startSize) {
        this.firstRun = true;
        this.completed = false;
        this.startTime = 0;
        this.elapsedTime = 0;
        this.startSize = startSize;
        this.targetSize = size;
        this.changeSize = 0;
    }

    updatePos(canvasWidth, canvasHeight) {
        this.posX = canvasWidth/2 - this.size/2;
        this.posY = canvasHeight/2 - this.size/2;
    }

    draw() {
        ctx.fillStyle = this.backgroundColour + 1 + ")";
        ctx.fillRect(this.posX, this.posY, this.size, this.size);
        for (let i = 0; i < this.borders.length; i++) {
            this.borders[i].draw();
        }
    }

    easing(t, b, c, d) {
        return c * (t /= d) * t + b;
    }
}