class Border {
    constructor(width, height, posX, posY, colour) {
        this.width = width;
        this.height = height;
        this.posX = posX;
        this.posY = posY;
        this.colour = colour;
        this.health = 100;
    }

    setup() {

    }

    update(width, height, posX, posY) {
        this.width = width;
        this.height = height;
        this.posX = posX;
        this.posY = posY;
    }

    draw() {
        ctx.fillStyle = this.colour;
        ctx.fillRect(this.posX, this.posY, this.width, this.height);
    }
}