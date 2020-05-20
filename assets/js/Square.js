class Square {
    constructor(size, posX, posY, colour, backgroundColour) {
        this.size = size;
        this.width = size;
        this.height = size;
        this.posX = posX;
        this.posY = posY;
        this.colour = colour;
        this.backgroundColour = backgroundColour;

        this.borders = [];
        this.borderWidth = 5;

        this.broken = false;
    }

    setup() {
        this.borders[0] = new Border(this.size, this.borderWidth, this.posX, this.posY, this.colour);
        this.borders[1] = new Border(this.borderWidth, this.size, this.posX + this.size - this.borderWidth, this.posY, this.colour);
        this.borders[2] = new Border(this.size, this.borderWidth, this.posX, this.posY + this.size - this.borderWidth, this.colour);
        this.borders[3] = new Border(this.borderWidth, this.size, this.posX, this.posY, this.colour);
    }

    update() {
        for (let i = 0; i < this.borders.length; i++) {
            if(this.borders[i].health <= 0) {
                this.borders[i].colour = this.backgroundColour;
                this.broken = true;
            }
        }

        this.borders[0].update(this.size, this.borderWidth, this.posX, this.posY);
        this.borders[1].update(this.borderWidth, this.size, this.posX + this.size - this.borderWidth, this.posY);
        this.borders[2].update(this.size, this.borderWidth, this.posX, this.posY + this.size - this.borderWidth);
        this.borders[3].update(this.borderWidth, this.size, this.posX, this.posY);
    }

    draw() {
        ctx.fillStyle = this.backgroundColour;
        ctx.fillRect(this.posX, this.posY, this.width, this.height);
        for (let i = 0; i < this.borders.length; i++) {
            this.borders[i].draw();
        }
    }
}