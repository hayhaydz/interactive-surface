class Border {
    constructor(width, height, posX, posY, colour) {
        this.width = width;
        this.height = height;
        this.posX = posX;
        this.posY = posY;
        this.colour = colour;
        this.health = 100;
        this.opacity = 1;

        this.timerStart = 0;
        this.timerStarted = false;
        this.hitDuration = 200;
        this.hit = false;
    }

    setup() {

    }

    update(width, height, posX, posY, colour) {
        this.width = width;
        this.height = height;
        this.posX = posX;
        this.posY = posY;
        this.colour = colour;

        if(this.hit) {
            if(!this.timerStarted) {
                this.timerStart = Date.now();
                this.timerStarted = true;
            }
            this.colour = "rgb(255, 0, 0, ";
        }

        if(this.hit && Date.now() - this.timerStart >= this.hitDuration) {
            this.hit = false;
            this.timerStarted = false;
        }
    }

    draw() {
        ctx.fillStyle = this.colour + this.opacity + ")";
        ctx.fillRect(this.posX, this.posY, this.width, this.height);
    }
}