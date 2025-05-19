import Matrix from "./Matrix.js";

const matrix = new Matrix(document.getElementById("matrix") as HTMLCanvasElement);
matrix.start();

document.getElementById("change-font")?.addEventListener("input", (event) => {
	const target = event.target as HTMLSelectElement;

	matrix.changeFont(target.value);
});

document.querySelectorAll("[data-color]").forEach((element) => {
	if (!(element instanceof HTMLElement)) return;
	const color = element.dataset.color;

	element.addEventListener("click", () => matrix.changeColor(String(color)));
});

document.getElementById("change-fps")?.addEventListener("input", (event) => {
	const target = event.target as HTMLSelectElement;
	const value = Number(target.value);

	matrix.changeFPS(value);
});

document.getElementById("change-quality")?.addEventListener("input", (event) => {
	const target = event.target as HTMLSelectElement;
	const value = Number(target.value);

	matrix.changeQuality(value, value);
});
