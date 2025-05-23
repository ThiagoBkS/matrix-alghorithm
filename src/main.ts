import { avaliableAlphabets } from "./functions.js";
import Matrix from "./Matrix.js";

const matrix = new Matrix(document.getElementById("matrix") as HTMLCanvasElement);
matrix.start();

document.getElementById("change-font")?.addEventListener("input", (event) => {
	const target = event.target as HTMLSelectElement;

	matrix.changeMatrixFont(target.value);
});

document.getElementById("change-color")?.addEventListener("input", (event) => {
	const target = event.target as HTMLSelectElement;

	document.documentElement.style.setProperty("--main-color", target.value);
	document.documentElement.style.setProperty("--secundary-color", target.value);
	document.documentElement.style.setProperty("--secundary-hover-color", target.value.concat("60"));
	document.documentElement.style.setProperty("--secundary-active-color", target.value.concat("90"));

	matrix.changeMatrixColor(target.value);
});

document.getElementById("change-fps")?.addEventListener("input", (event) => {
	const target = event.target as HTMLSelectElement;
	const value = Number(target.value);

	matrix.changeMatrixFPS(value);
});

document.getElementById("change-size")?.addEventListener("input", (event) => {
	const target = event.target as HTMLSelectElement;
	const value = Number(target.value);

	matrix.changeMatrixSize(value);
});

document.getElementById("change-quality")?.addEventListener("input", (event) => {
	const target = event.target as HTMLSelectElement;
	const value = Number(target.value);

	matrix.changeMatrixQuality(value, value);
});

const alphabetInput = document.getElementById("change-alphabet");

avaliableAlphabets.forEach((alphabet) => {
	const option = document.createElement("option");
	option.value = alphabet.name;
	option.textContent = alphabet.name;

	alphabetInput?.append(option);
});

alphabetInput?.addEventListener("input", (event) => {
	const target = event.target as HTMLSelectElement;
	const value = target.value;

	matrix.changeMatrixAlphabet(value);
});

// Background MATRIX
const backgroundMatrix = new Matrix(
	document.getElementById("background-matrix") as HTMLCanvasElement
);

backgroundMatrix.changeMatrixFPS(12);
backgroundMatrix.changeMatrixAlphabet("Latin Num.");
backgroundMatrix.start();
