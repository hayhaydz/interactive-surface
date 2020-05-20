class Stage {
    constructor(canvasWidth, canvasHeight) {
        this.canvasWidth = canvasWidth;
        this.canvasHeight = canvasHeight;

        // Player
        this.playerRadius = 15;
        this.playerX = this.canvasWidth/2;
        this.playerY = this.canvasHeight/2;
        this.playerColour = "rgb(0,0,0)";
        this.player = new Player(this.playerRadius, this.playerX, this.playerY, this.playerColour);

        // Square
        this.squareIndex = 0;
        this.squareSize = this.canvasWidth/4;
        this.squares = [];
        this.squareX = this.canvasWidth/2 - this.squareSize/2;
        this.squareY = this.canvasHeight/2 - this.squareSize/2;
        this.squareColour = "rgb(0,0,0)";
        this.squareBackgroundColour = "rgb(255,255,255)";
        this.squares[0] = new Square(this.squareSize, this.squareX, this.squareY, this.squareColour, this.squareBackgroundColour);

        // Paragraph
        this.paragraphs = [];
        this.paragraphIndex = 20;
        this.changingParagraph = false;
        this.isTiming = false;
        this.timerStart = 0;
    }

    setup() {
        this.squares[0].setup();
        for (let i = 0; i < this.paragraphs.length; i++) {
            this.paragraphs[i].setup();
        }
    }

    update(canvasWidth, canvasHeight, canvasSizeChanged) {
        if(canvasSizeChanged) {
            this.canvasWidth = canvasWidth;
            this.canvasHeight = canvasHeight;
            this.paragraphs[this.paragraphIndex].updatePos(this.canvasWidth/2, this.canvasHeight - 100);
        }
        this.paragraphs[this.paragraphIndex].update();
        this.player.update(this.squares[this.squareIndex]);

        if(this.paragraphs[this.paragraphIndex].fadedOut) {
            if(!this.isTiming) {
                this.timerStart = Date.now();
                this.isTiming = true;
            }
        }

        if(this.isTiming) {
            if(Date.now() - this.timerStart >= this.paragraphs[this.paragraphIndex].delay) {
                this.changingParagraph = false;
                this.paragraphIndex++;
                this.isTiming = false;
                console.log(this.paragraphs[this.paragraphIndex].theme);
                if(this.paragraphs[this.paragraphIndex].theme === "dark") {
                    this.nextParagraph();
                }
            }
        }

        if(this.paragraphs[this.paragraphIndex].theme === "light") {
            this.player.colour = "rgb(0, 0, 0)";
        } else {
            this.player.colour = "rgb(255, 255, 255)";
        }

        if(this.paragraphs[this.paragraphIndex].theme === "light") {
            this.squares[this.squareIndex].update();
            if(this.squareIndex >= 1 ) {
                this.squares[this.squareIndex - 1].update();
            }

            if(this.squares[this.squareIndex].broken && !this.isTiming) {
                this.squares[this.squareIndex].broken = false;
                if(this.paragraphs[this.paragraphIndex + 1].theme === "light") {
                    this.squares.push(new Square(this.squareSize, this.squareX, this.squareY, this.squareColour, this.squareBackgroundColour));
                } else if (this.paragraphs[this.paragraphIndex + 1].theme === "dark") {
                    this.squares.push(new Square(this.squareSize, this.squareX, this.squareY, this.squareBackgroundColour, this.squareColour));
                }
                this.squares[this.squareIndex].size = this.canvasWidth/12;
                this.squares[this.squareIndex].width = this.canvasWidth/12;
                this.squares[this.squareIndex].height = this.canvasWidth/12;
                this.squares[this.squareIndex].posX = this.canvasWidth/2 - this.squares[this.squareIndex].width/2;
                this.squares[this.squareIndex].posY = this.canvasHeight/2 - this.squares[this.squareIndex].height/2;
                this.squareIndex++;
                this.squares[this.squareIndex].setup();
                this.nextParagraph();
            }

        }
    }

    draw() {
        this.squares[this.squareIndex].draw();
        if(this.squareIndex >= 1) {
            this.squares[this.squareIndex-1].draw();
        }
        this.player.draw();
        this.paragraphs[this.paragraphIndex].draw();
    }

    pushParagraphs(theme, delay, fadeInDuration, fadeOutDuration, content, fontWeight) {
        this.paragraphs.push(new Paragraph(theme, delay, content, 50, fontWeight, this.canvasWidth/2, this.canvasHeight - 100, fadeInDuration, fadeOutDuration));
    }

    nextParagraph() {
        if(!this.changingParagraph && this.paragraphs[this.paragraphIndex].fadedIn && this.paragraphIndex < this.paragraphs.length - 1) {
            this.paragraphs[this.paragraphIndex].fadeOut = true;
            this.changingParagraph = true;
        }
    }
}