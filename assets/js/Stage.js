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
        this.playerTheme = "light";

        // Square
        this.squareIndex = 0;
        this.squareSize = this.canvasWidth/4;
        this.previousSquareSize = 0;
        this.previousSquareDifference = 2;
        this.squares = [];
        this.squareX = this.canvasWidth/2 - this.canvasWidth/2;
        this.squareY = this.canvasHeight/2 - this.canvasHeight/2;
        this.squareColour = "rgba(0, 0, 0, ";
        this.squareBackgroundColour = "rgba(255, 255, 255, ";
        this.squares[0] = new Square(this.squareSize, this.canvasWidth, this.squareX, this.squareY, this.squareColour, this.squareBackgroundColour);

        // Paragraph
        this.paragraphs = [];
        this.paragraphIndex = 0;
        this.changingParagraph = false;
        this.isTiming = false;
        this.timerStart = 0;

        this.finished = false;
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
            for (let i = this.squares.length - 1; i >= 0; i--) {
                this.squares[this.squareIndex].updatePos(this.canvasWidth, this.canvasHeight);                
            }
        }

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
                if(this.paragraphs[this.paragraphIndex].theme === "light") {
                    this.squares[this.squareIndex].backgroundColour = this.squareBackgroundColour;
                    this.squares[this.squareIndex].colour = this.squareColour;
                    this.playerTheme = "light";
                    if(this.paragraphIndex >= 36) {
                        this.player.damage -= 1;
                    }
                }
            }
        }

        if(this.paragraphs[this.paragraphIndex].theme === "dark" && !this.changingParagraph && this.paragraphs[this.paragraphIndex].fadedIn) {
            this.nextParagraph();
        }

        if(this.paragraphIndex < this.paragraphs.length - 1) {
            for (let i = this.squares.length - 1; i >= 0; i--) {
                if(this.squares[i].size < 15) {
                    this.squares.splice(i, 1);
                    this.squareIndex--;
                }
                this.squares[i].update(this.canvasWidth, this.canvasHeight);
            }
            if(this.squares[this.squareIndex].broken) {
                this.squares[this.squareIndex].broken = false;
                if(this.squares.length > 1) {
                    this.previousSquareSize = this.squareSize;
                    for (let i = this.squares.length - 1; i >= 0; i--) {
                        this.squares[i].reset(this.previousSquareSize/this.previousSquareDifference, this.squares[i].size);
                        this.previousSquareSize = this.previousSquareSize/this.previousSquareDifference;
                    }
                } else {
                    this.squares[this.squareIndex].reset(this.squareSize/this.previousSquareDifference, this.squareSize);
                }
                if(this.paragraphs[this.paragraphIndex + 1].theme === "light") {
                    this.playerTheme = "light";
                    this.squares.push(new Square(this.squareSize, this.canvasWidth, this.squareX, this.squareY, this.squareColour, this.squareBackgroundColour));
                } else if (this.paragraphs[this.paragraphIndex + 1].theme === "dark") {
                    this.playerTheme = "dark";
                    this.squares.push(new Square(this.squareSize, this.canvasWidth, this.squareX, this.squareY, this.squareBackgroundColour, this.squareColour));
                }
                this.squareIndex++;
                this.squares[this.squareIndex].setup();
                this.nextParagraph();
            }
        } else {
            this.finished = true;
        }

        this.paragraphs[this.paragraphIndex].update();
        this.player.update(this.squares, this.squareIndex, this.finished, this.playerTheme);
    }

    draw() {
        for (let i = this.squares.length - 1; i >= 0; i--) {
            this.squares[i].draw();
        }
        this.player.draw();
        this.paragraphs[this.paragraphIndex].draw();
    }

    pushParagraphs(theme, delay, fadeInDuration, fadeOutDuration, content, fontWeight) {
        this.paragraphs.push(new Paragraph(theme, delay, content, 50, fontWeight, this.canvasWidth/2, this.canvasHeight - 100, fadeInDuration, fadeOutDuration));
    }

    nextParagraph() {
        if(this.paragraphIndex < this.paragraphs.length - 1) {
            this.paragraphs[this.paragraphIndex].fadeOut = true;
            this.changingParagraph = true;
        }
    }
}