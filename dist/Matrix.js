export default class Matrix {
    constructor(canvas) {
        this.canvas = canvas;
        this.context = canvas.getContext("2d");
        this.config = {
            lastFrameTime: undefined,
            fps: 24,
            columns: 32,
            style: {
                color: "#00FF00",
                font: "monospace",
                backgroundColor: "rgba(0, 0, 0, 0.05)",
            },
        };
        //this.avaliableFonts = ["serif", "sans-serif", "monospace", "cursive", "fantasy", "system-ui"];
        this.unicodeAlphabets = [
            {
                name: "latin",
                startCode: 0x0000,
                endCode: 0x007f,
            },
            {
                name: "cyrillic",
                startCode: 0x0400,
                endCode: 0x04ff,
            },
        ];
        this.alphabet = this.getAlphabet("latine");
        this.rainDrops = new Array(this.config.columns).fill(1);
        this.changeQuality(512, 512);
    }
    get fontSize() {
        return this.canvas.width / this.config.columns;
    }
    changeFont(font) {
        this.config.style.font = font;
    }
    changeFPS(fps) {
        this.config.fps = fps;
    }
    changeColor(color) {
        this.config.style.color = color;
    }
    changeSize(size) {
        this.config.columns = size;
        this.rainDrops = new Array(this.config.columns).fill(1);
    }
    changeQuality(height, width) {
        this.canvas.height = height;
        this.canvas.width = width;
    }
    getRandomCharacter() {
        const randomIndex = Math.floor(Math.random() * this.alphabet.length);
        return this.alphabet[randomIndex];
    }
    getAlphabet(alphabetName) {
        const result = this.unicodeAlphabets.find((alphabet) => alphabet.name === alphabetName) || {
            startCode: 0x0000,
            endCode: 0x007f,
        };
        const { startCode, endCode } = result;
        const alphabet = [];
        for (let code = startCode; code <= endCode; code++)
            alphabet.push(String.fromCharCode(code));
        return alphabet;
    }
    renderRains() {
        this.context.fillStyle = this.config.style.backgroundColor;
        this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);
        for (let rainIndex = 0; rainIndex < this.rainDrops.length; rainIndex++) {
            const character = this.getRandomCharacter();
            this.context.fillStyle = this.config.style.color;
            this.context.font = `${this.fontSize}px ${this.config.style.font}`;
            this.context.fillText(character, rainIndex * this.fontSize, this.rainDrops[rainIndex] * this.fontSize);
            if (this.rainDrops[rainIndex] * this.fontSize > this.canvas.height && Math.random() > 0.9)
                this.rainDrops[rainIndex] = 0;
            this.rainDrops[rainIndex] += 1;
        }
    }
    render() {
        this.renderRains();
    }
    shouldRender(timestamp) {
        if (!this.config.lastFrameTime)
            this.config.lastFrameTime = timestamp;
        const elapsedTime = timestamp - this.config.lastFrameTime;
        return elapsedTime > 1000 / this.config.fps;
    }
    requestFrame(timestamp) {
        if (this.shouldRender(timestamp)) {
            this.config.lastFrameTime = timestamp;
            this.render();
        }
        requestAnimationFrame((time) => this.requestFrame(time));
    }
    start() {
        requestAnimationFrame((time) => this.requestFrame(time));
    }
}
