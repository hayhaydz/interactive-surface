class Stage {
    constructor(isParagraph, isImage, theme, bFadeIn, bFadeOut, delay, fadeInDuration, fadeOutDuration, pContent = false, pFontWeight = false) {
        this.isParagraph = isParagraph;
        this.isImage = isImage;
        this.theme = theme;
        this.delay = delay;
        this.fadeInDuration = fadeInDuration;
        this.fadeOutDuration = fadeOutDuration;

        // Paragraph
        this.paragraph = null;
        this.pContent = pContent;
        this.pFontWeight = pFontWeight;

        // Image

        // Background
        this.bFadeIn = bFadeIn;
        this.bFadeOut = bFadeOut;
        this.background = new Background(theme, bFadeIn, bFadeOut, this.fadeInDuration, this.fadeOutDuration);
    }

    setup(canvasWidth, canvasHeight) {
        // Stage Background
        this.background.setup({state: true, width: canvasWidth, height: canvasHeight});

        if(this.isParagraph) {
            // Stage will include paragraph
            this.paragraph = new Paragraph(this.pContent, this.pFontWeight, this.theme,this.fadeInDuration, this.fadeOutDuration);
            this.paragraph.setup({state: true, width: canvasWidth, height: canvasHeight});
        } else {
            // Stage will include image
        }
    }

    update(canvasWidth, canvasHeight, canvasSizeChange) {
        this.background.update({state: canvasSizeChange, width: canvasWidth, height: canvasHeight});
        this.paragraph.update({state: canvasSizeChange, width: canvasWidth, height: canvasHeight});
    }

    draw() {
        this.background.draw();
        this.paragraph.draw();
    }
}