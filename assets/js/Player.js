class Player {
    constructor(radius, posX, posY, colour) {
        this.radius = radius;
        this.posX = posX;
        this.posY = posY;
        this.colour = colour;
        this.damage = 25;
        this.theme = "light";

        this.mouseX = 0;
        this.mouseY = 0;

        this.damageDealt = false;
        this.prvSquareSide = "";
        this.insidePrvSquare = false;

        // Event Listener
        addEventListener('mousemove', this.mouseMove.bind(this), false);
    }

    update(squares, squareIndex, finished, theme) {
        this.theme = theme;
        if(this.theme === "light") {
            this.colour = "rgb(0, 0, 0)";
        } else {
            this.colour = "rgb(255, 255, 255)";
        }

        this.playerMovement(squares, squareIndex, finished);
    }

    draw() {
        ctx.fillStyle = this.colour;
        ctx.beginPath();
        ctx.arc(this.posX, this.posY, this.radius, 0, 2 * Math.PI);
        ctx.fill();
        ctx.closePath(); 
    }

    playerMovement(squares, squareIndex, finished) {
        if(!finished) {
            if(this.mouseCollisionWith(squares[squareIndex]) === true) {
                this.damageDealt = false;
                // Mouse is within square so player stays within square
                this.posX = this.mouseX;
                this.posY = this.mouseY;
            } else if (this.mouseCollisionWith(squares[squareIndex]) == 'x' && !this.insidePrvSquare) {
                // Mouse is outside of squares x coordinate boundaries
                if(this.mouseX - this.radius < squares[squareIndex].posX) {
                    // Mouse is outside of the left of the square
                    this.posX = squares[squareIndex].posX + this.radius;
                    // Deal damage to border
                    if(this.theme === "light" && squares[squareIndex].completed) {
                        if(!this.damageDealt) {
                            if(squares[squareIndex].borders[3] !== undefined) {
                                squares[squareIndex].borders[3].health -= this.damage;
                                squares[squareIndex].borders[3].hit = true;
                            }
                            this.damageDealt = true;
                        }
                    }
                } else if (this.mouseX + this.radius > squares[squareIndex].posX + squares[squareIndex].width) {
                    // Mouse is outside the right of the square
                    this.posX = squares[squareIndex].posX + squares[squareIndex].width - this.radius;
                    // Deal damage to border
                    if(this.theme === "light" && squares[squareIndex].completed) {
                        if(!this.damageDealt) {
                            if(squares[squareIndex].borders[1] !== undefined) {
                                squares[squareIndex].borders[1].health -= this.damage;
                                squares[squareIndex].borders[1].hit = true;
                            }
                            this.damageDealt = true;
                        }
                    }
                }
                this.posY = this.mouseY;
            } else if (this.mouseCollisionWith(squares[squareIndex]) == 'y' && !this.insidePrvSquare) {
                // Mouse is outside of squares Y coordinate boundaries
                if(this.mouseY < squares[squareIndex].posY) {
                    // Mouse is outside above the square
                    this.posY = squares[squareIndex].posY + this.radius;
                    // Deal damage to border
                    if(this.theme === "light" && squares[squareIndex].completed) {
                        if(!this.damageDealt) {
                            if(squares[squareIndex].borders[0] !== undefined) {
                                squares[squareIndex].borders[0].health -= this.damage;
                                squares[squareIndex].borders[0].hit = true;
                            }
                            this.damageDealt = true;
                        }
                    }
                } else if (this.mouseY > squares[squareIndex].posY + squares[squareIndex].height) {
                    // Mouse is outside below the square
                    this.posY = squares[squareIndex].posY + squares[squareIndex].height - this.radius;
                    // Deal damage to border
                    if(this.theme === "light" && squares[squareIndex].completed) {
                        if(!this.damageDealt) {
                            if(squares[squareIndex].borders[2] !== undefined) {
                                squares[squareIndex].borders[2].health -= this.damage;
                                squares[squareIndex].borders[2].hit = true;
                            }
                            this.damageDealt = true;
                        }
                    }
                }
                this.posX = this.mouseX;
            } else if (this.mouseCollisionWith(squares[squareIndex]) == 'xy' && !this.insidePrvSquare) {
                // Mouse is outside of both x and y coordinates
                if(this.mouseX < squares[squareIndex].posX && this.mouseY < squares[squareIndex].posY) {
                    // Mouse is to top left of square
                    this.posX = squares[squareIndex].posX + this.radius;
                    this.posY = squares[squareIndex].posY + this.radius;
                } else if (this.mouseX > squares[squareIndex].posX + squares[squareIndex].width && this.mouseY < squares[squareIndex].posY) {
                    // Mouse is to top right of square
                    this.posX = squares[squareIndex].posX + squares[squareIndex].width - this.radius;
                    this.posY = squares[squareIndex].posY;
                } else if (this.mouseX > squares[squareIndex].posX + squares[squareIndex].width && this.mouseY > squares[squareIndex].posY + squares[squareIndex].height) {
                    // Mouse is to bottom right of square
                    this.posX = squares[squareIndex].posX + squares[squareIndex].width - this.radius;
                    this.posY = squares[squareIndex].posY + squares[squareIndex].height - this.radius;
                } else if (this. mouseX > squares[squareIndex].posX && this.mouseY > squares[squareIndex].posY + squares[squareIndex].height) {
                    // Mouse is to bottom left of square
                    this.posX = squares[squareIndex].posX + this.radius;
                    this.posY = squares[squareIndex].posY + squares[squareIndex].height - this.radius;
                }
            }

            if(squares[squareIndex].completed) {
                for (let i = 0; i < squares.length - 1; i++) {
                    if(!squares[i].playerInside) {
                        if(this.mouseCollisionWith(squares[i], true) == 'x') {
                            if(this.mouseX + this.radius < squares[i].posX) {
                                this.prvSquareSide = "left";
                            } else if (this.mouseX - this.radius > squares[i].posX + squares[i].width) {
                                this.prvSquareSide = "right";
                            }
                        } else if (this.mouseCollisionWith(squares[i], true) == 'y') {
                            if(this.mouseY + this.radius < squares[i].posY) {
                                // Mouse is above square and player is outside
                                this.prvSquareSide = "top";
                            } else if (this.mouseY - this.radius > squares[i].posY + squares[i].height) {
                                // Mouse is below square and player is outside
                                this.prvSquareSide = "bottom";
                            }
                        } else if(this.mouseCollisionWith(squares[i], true) == 'xy') {
                            if(this.mouseX + this.radius < squares[i].posX && this.mouseY + this.radius < squares[i].posY) {
                                this.prvSquareSide = "top left";
                            } else if(this.mouseX - this.radius > squares[i].posX + squares[i].width && this.mouseY + this.radius < squares[i].posY) {
                                this.prvSquareSide = "top right";
                            } else if(this.mouseX - this.radius > squares[i].posX + squares[i].width && this.mouseY - this.radius > squares[i].posY + squares[i].height) {
                                this.prvSquareSide = "bottom right";
                            } else if(this.mouseX + this.radius < squares[i].posX && this.mouseY - this.radius > squares[i].posY + squares[i].height) {
                                this.prvSquareSide = "bottom left";
                            }
                        }

                        if(this.mouseCollisionWith(squares[i], true) === true) {
                            if(this.prvSquareSide === "left" && squares[i].borders[3].health !== 0) {
                                this.posX = squares[i].posX - this.radius;
                                this.posY = this.mouseY;
                            } else if (this.prvSquareSide === "right" && squares[i].borders[1].health !== 0) {
                                this.posX = squares[i].posX + squares[i].width + this.radius;
                                this.posY = this.mouseY;
                            } else if (this.prvSquareSide === "top" && squares[i].borders[0].health !== 0) {
                                this.posY = squares[i].posY - this.radius;
                                this.posX = this.mouseX;
                            } else if (this.prvSquareSide === "bottom" && squares[i].borders[2].health !== 0) {
                                this.posY = squares[i].posY + squares[i].height + this.radius;
                                this.posX = this.mouseX;
                            } else if (this.prvSquareSide === "top left" && squares[i].borders[3].health !== 0 && squares[i].borders[0].health !== 0) {
                                this.posX = squares[i].posX - this.radius;
                                this.posY = squares[i].posY - this.radius;
                            } else if (this.prvSquareSide === "top right" && squares[i].borders[0].health !== 0 && squares[i].borders[1].health !== 0) {
                                this.posX = squares[i].posX + squares[i].width + this.radius;
                                this.posY = squares[i].posY - this.radius;
                            } else if (this.prvSquareSide === "bottom right" && squares[i].borders[1] !== 0 && squares[i].borders[2].health !== 0) {
                                this.posX = squares[i].posX + squares[i].width + this.radius;
                                this.posY = squares[i].posY + squares[i].height + this.radius;
                            } else if (this.prvSquareSide === "bottom left" && squares[i].borders[3] !== 0 && squares[i].borders[2].health !== 0) {
                                this.posX = squares[i].posX - this.radius;
                                this.posY = squares[i].posY + squares[i].height + this.radius;
                            } else {
                                squares[i].playerInside = true;
                                this.insidePrvSquare = true;
                            }
                        }
                    }

                    let index;
                    squares.some((el, i) => {
                        if(el.playerInside) {
                            index = i;
                            return true;
                        }
                    });

                    if(index !== undefined) {
                        if(squares[index].playerInside && this.mouseCollisionWith(squares[index]) == 'x') {
                            if(this.mouseX - this.radius < squares[index].posX && squares[index].borders[3].health !== 0) {
                                this.posX = squares[index].posX + this.radius;
                                this.posY = this.mouseY;
                            } else if (this.mouseX + this.radius > squares[index].posX + squares[index].width && squares[index].borders[1].health !== 0) {
                                this.posX = squares[index].posX + squares[index].width - this.radius;
                                this.posY = this.mouseY;
                            } else {
                                squares[index].playerInside = false;
                                this.insidePrvSquare = false;
                            }
                        } else if (squares[index].playerInside && this.mouseCollisionWith(squares[index]) == 'y') {
                            if(this.mouseY - this.radius < squares[index].posY && squares[index].borders[0].health !== 0) {
                                this.posX = this.mouseX;
                                this.posY = squares[index].posY + this.radius;
                            } else if (this.mouseY + this.radius > squares[index].posY + squares[index].height && squares[index].borders[2].health !== 0) {
                                this.posX = this.mouseX;
                                this.posY = squares[index].posY + squares[index].height - this.radius;
                            } else {
                                squares[index].playerInside = false;
                                this.insidePrvSquare = false;
                            }
                        } else if (squares[index].playerInside && this.mouseCollisionWith(squares[index]) == 'xy') {
                            if(this.mouseX < squares[index].posX && this.mouseY < squares[index].posY && squares[index].borders[3].health !== 0 && squares[index].borders[0].health !== 0) {
                                // Mouse is to top left of square
                                this.posX = squares[index].posX + this.radius;
                                this.posY = squares[index].posY + this.radius;
                            } else if (this.mouseX > squares[index].posX + squares[index].width && this.mouseY < squares[index].posY && squares[index].borders[0].health !== 0 && squares[index].borders[1].health !== 0) {
                                // Mouse is to top right of square
                                this.posX = squares[index].posX + squares[index].width - this.radius;
                                this.posY = squares[index].posY;
                            } else if (this.mouseX > squares[index].posX + squares[index].width && this.mouseY > squares[index].posY + squares[index].height && squares[index].borders[1] !== 0 && squares[index].borders[2].health !== 0) {
                                // Mouse is to bottom right of square
                                this.posX = squares[index].posX + squares[index].width - this.radius;
                                this.posY = squares[index].posY + squares[index].height - this.radius;
                            } else if (this. mouseX > squares[index].posX && this.mouseY > squares[index].posY + squares[index].height && squares[index].borders[3] !== 0 && squares[index].borders[2].health !== 0) {
                                // Mouse is to bottom left of square
                                this.posX = squares[index].posX + this.radius;
                                this.posY = squares[index].posY + squares[index].height - this.radius;
                            }
                        }
                    }
                }
                
                if(squares.length >= 2) {
                    if(squares[squareIndex - 1].playerInside && this.theme === "dark") {
                        this.colour = "rgb(0, 0, 0)";
                    }
                }
            }
        } else {
            this.posX = this.mouseX;
            this.posY = this.mouseY;
        }
    }

    // https://stackoverflow.com/questions/20885297/collision-detection-in-html5-canvas
    mouseCollisionWith(element, inside = false) {
        let distX = Math.abs(this.mouseX - element.posX-element.width/2);
        let distY = Math.abs(this.mouseY - element.posY-element.height/2);

        if(!inside) {
            if (distX > (element.width/2 - this.radius) && distY > (element.width/2 + this.radius)) { return "xy";}
            if (distX > (element.width/2 - this.radius)) { return "x"; }
            if (distY > (element.height/2 - this.radius)) { return "y"; }
        } else {
            if (distX > (element.width/2 + this.radius) && distY > (element.width/2 + this.radius)) { return "xy";}
            if (distX > (element.width/2 + this.radius)) { return "x"; }
            if (distY > (element.height/2 + this.radius)) { return "y"; }
        }

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