import { getAlphabetByName } from "./functions.js";
export default class Matrix {
    constructor(canvas) {
        this.canvas = canvas;
        this.context = canvas.getContext("2d");
        this.config = {
            fps: 30,
            lastFrameTime: undefined,
            columns: this.canvas.width / 16,
            style: {
                color: "#00FF00",
                fontName: "monospace",
                backgroundColor: "rgba(0, 0, 0, 0.05)",
                alphabet: "latin",
            },
        };
        this.rainDrops = new Array(this.config.columns).fill(-1);
        this.alphabet = getAlphabetByName(this.config.style.alphabet);
    }
    get fontSize() {
        return this.canvas.width / this.config.columns + 1;
    }
    changeMatrixFPS(fps) {
        this.config.fps = fps;
    }
    changeMatrixSize(columns) {
        this.config.columns = columns;
        this.rainDrops = new Array(this.config.columns).fill(-1);
    }
    changeMatrixColor(color) {
        this.config.style.color = color;
    }
    changeMatrixFont(fontName) {
        this.config.style.fontName = fontName;
    }
    changeMatrixAlphabet(alphabetName) {
        this.alphabet = getAlphabetByName(alphabetName);
    }
    changeMatrixQuality(height, width) {
        this.canvas.height = height;
        this.canvas.width = width;
    }
    getRandomCharacter() {
        const randomIndex = Math.floor(Math.random() * this.alphabet.length);
        return this.alphabet[randomIndex];
    }
    renderRains() {
        this.context.fillStyle = this.config.style.backgroundColor;
        this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);
        for (let rainIndex = 0; rainIndex < this.rainDrops.length; rainIndex++) {
            const character = this.getRandomCharacter();
            this.context.fillStyle = this.config.style.color;
            this.context.font = `${this.fontSize}px ${this.config.style.fontName}`;
            this.context.fillText(character, rainIndex * this.fontSize - this.fontSize / 2, this.rainDrops[rainIndex] * this.fontSize);
            if (this.rainDrops[rainIndex] * this.fontSize > this.canvas.height && Math.random() > 0.9)
                this.rainDrops[rainIndex] = -1;
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
