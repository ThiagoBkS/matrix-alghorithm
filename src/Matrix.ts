import { getAlphabetByUnicodeRange } from "./functions.js";

export default class Matrix {
	private canvas: HTMLCanvasElement;
	private context: CanvasRenderingContext2D;
	private config: {
		fps: number;
		lastFrameTime: number | undefined;
		columns: number;
		style: { [key: string]: string };
	};
	private rainDrops: Array<number>;
	private alphabet: Array<string>;
	private unicodeAlphabets: Array<{
		name: string;
		startCode: number;
		endCode: number;
	}>;

	constructor(canvas: HTMLCanvasElement) {
		this.canvas = canvas;
		this.context = canvas.getContext("2d") as CanvasRenderingContext2D;

		this.config = {
			fps: 30,
			lastFrameTime: undefined,
			columns: 32,
			style: {
				color: "#00FF00",
				fontName: "monospace",
				backgroundColor: "rgba(0, 0, 0, 0.05)",
			},
		};

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

		this.rainDrops = new Array(this.config.columns).fill(-1);
		this.alphabet = this.getAlphabet("latin");
	}

	get fontSize() {
		return this.canvas.width / this.config.columns + 1;
	}

	public changeMatrixFPS(fps: number) {
		this.config.fps = fps;
	}

	public changeMatrixSize(columns: number) {
		this.config.columns = columns;
		this.rainDrops = new Array(this.config.columns).fill(-1);
	}

	public changeMatrixColor(color: string) {
		this.config.style.color = color;
	}

	public changeMatrixFont(fontName: string) {
		this.config.style.fontName = fontName;
	}

	public changeMatrixQuality(height: number, width: number) {
		this.canvas.height = height;
		this.canvas.width = width;
	}

	private getRandomCharacter() {
		const randomIndex = Math.floor(Math.random() * this.alphabet.length);
		return this.alphabet[randomIndex];
	}

	private getAlphabet(alphabetName: string) {
		const { startCode, endCode } = this.unicodeAlphabets.find(
			(alphabet) => alphabet.name === alphabetName
		) || {
			startCode: 0x0000,
			endCode: 0x007f,
		};

		return getAlphabetByUnicodeRange(startCode, endCode);
	}

	private renderRains() {
		this.context.fillStyle = this.config.style.backgroundColor;
		this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);

		for (let rainIndex = 0; rainIndex < this.rainDrops.length; rainIndex++) {
			const character = this.getRandomCharacter();

			this.context.fillStyle = this.config.style.color;
			this.context.font = `${this.fontSize}px ${this.config.style.fontName}`;
			this.context.fillText(
				character,
				rainIndex * this.fontSize - this.fontSize / 2,
				this.rainDrops[rainIndex] * this.fontSize
			);

			if (this.rainDrops[rainIndex] * this.fontSize > this.canvas.height && Math.random() > 0.9)
				this.rainDrops[rainIndex] = -1;

			this.rainDrops[rainIndex] += 1;
		}
	}

	private render() {
		this.renderRains();
	}

	private shouldRender(timestamp: number): boolean {
		if (!this.config.lastFrameTime) this.config.lastFrameTime = timestamp;
		const elapsedTime = timestamp - this.config.lastFrameTime;

		return elapsedTime > 1000 / this.config.fps;
	}

	private requestFrame(timestamp: number) {
		if (this.shouldRender(timestamp)) {
			this.config.lastFrameTime = timestamp;
			this.render();
		}

		requestAnimationFrame((time) => this.requestFrame(time));
	}

	public start() {
		requestAnimationFrame((time) => this.requestFrame(time));
	}
}
