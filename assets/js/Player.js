class Player {
    constructor(radius, posX, posY, colour) {
        this.radius = radius;
        this.posX = posX;
        this.posY = posY;
        this.colour = colour;
        this.damage = 25;

        this.mouseX = 0;
        this.mouseY = 0;

        this.damageDealt = false;

        // Event Listener
        addEventListener('mousemove', this.mouseMove.bind(this), false);
    }

    update(square) {
        this.playerMovement(square);
    }

    draw() {
        ctx.fillStyle = this.colour;
        ctx.beginPath();
        ctx.arc(this.posX, this.posY, this.radius, 0, 2 * Math.PI);
        ctx.fill();
        ctx.closePath(); 
    }

    playerMovement(square) {
        if(this.mouseCollisionWith(square) === true) {
            this.damageDealt = false;
            // Mouse is within square so player stays within square
            this.posX = this.mouseX;
            this.posY = this.mouseY;
        } else if (this.mouseCollisionWith(square) == 'x') {
            // Mouse is outside of squares x coordinate boundaries
            if(this.mouseX < square.posX) {
                // Mouse is outside of the left of the square
                this.posX = square.posX + this.radius;
                // Deal damage to border
                if(!this.damageDealt) {
                    if(square.borders[3] !== undefined) {
                        square.borders[3].health -= this.damage;
                    }
                    this.damageDealt = true;
                }
            } else if (this.mouseX > square.posX + square.width) {
                // Mouse is outside the right of the square
                this.posX = square.posX + square.width - this.radius;
                // Deal damage to border
                if(!this.damageDealt) {
                    if(square.borders[1] !== undefined) {
                        square.borders[1].health -= this.damage;
                    }
                    this.damageDealt = true;
                }
            }
            this.posY = this.mouseY;
        } else if (this.mouseCollisionWith(square) == 'y') {
            // Mouse is outside of squares Y coordinate boundaries
            if(this.mouseY < square.posY) {
                // Mouse is outside above the square
                this.posY = square.posY + this.radius;
                // Deal damage to border
                if(!this.damageDealt) {
                    if(square.borders[0] !== undefined) {
                        square.borders[0].health -= this.damage;
                    }
                    this.damageDealt = true;
                }
            } else if (this.mouseY > square.posY + square.height) {
                // Mouse is outside below the square
                this.posY = square.posY + square.height - this.radius;
                // Deal damage to border
                if(!this.damageDealt) {
                    if(square.borders[2] !== undefined) {
                        square.borders[2].health -= this.damage;
                    }
                    this.damageDealt = true;
                }
            }
            this.posX = this.mouseX;
        } else if (this.mouseCollisionWith(square) == 'xy') {
            // Mouse is outside of both x and y coordinates
            if(this.mouseX < square.posX && this.mouseY < square.posY) {
                // Mouse is to top left of square
                this.posX = square.posX + this.radius;
                this.posY = square.posY + this.radius;
            } else if (this.mouseX > square.posX + square.width && this.mouseY < square.posY) {
                // Mouse is to top right of square
                this.posX = square.posX + square.width - this.radius;
                this.posY = square.posY;
            } else if (this.mouseX > square.posX + square.width && this.mouseY > square.posY + square.height) {
                // Mouse is to bottom right of square
                this.posX = square.posX + square.width - this.radius;
                this.posY = square.posY + square.height - this.radius;
            } else if (this. mouseX > square.posX && this.mouseY > square.posY + square.height) {
                // Mouse is to bottom left of square
                this.posX = square.posX + this.radius;
                this.posY = square.posY + square.height - this.radius;
            }
        }
    }

    // https://stackoverflow.com/questions/20885297/collision-detection-in-html5-canvas
    mouseCollisionWith(element) {
        let distX = Math.abs(this.mouseX - element.posX-element.width/2);
        let distY = Math.abs(this.mouseY - element.posY-element.height/2);

        if (distX > (element.width/2 + this.radius) && distY > (element.width/2 + this.radius)) { return "xy";}
        if (distX > (element.width/2 + this.radius)) { return "x"; }
        if (distY > (element.height/2 + this.radius)) { return "y"; }

        if (distX <= (element.width/2)) { return true; } 
        if (distY <= (element.height/2)) { return true; }

        let dx=distX-element.width/2;
        let dy=distY-element.height/2;
        return (dx*dx+dy*dy<=(this.radius*this.radius));
    }

    mouseMove(e) {
        this.mouseX = e.offsetX * PIXEL_RATIO;
        this.mouseY = e.offsetY * PIXEL_RATIO;
    }
}