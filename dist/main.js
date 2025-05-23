var _a, _b, _c, _d, _e;
import { avaliableAlphabets } from "./functions.js";
import Matrix from "./Matrix.js";
const matrix = new Matrix(document.getElementById("matrix"));
matrix.start();
(_a = document.getElementById("change-font")) === null || _a === void 0 ? void 0 : _a.addEventListener("input", (event) => {
    const target = event.target;
    matrix.changeMatrixFont(target.value);
});
(_b = document.getElementById("change-color")) === null || _b === void 0 ? void 0 : _b.addEventListener("input", (event) => {
    const target = event.target;
    document.documentElement.style.setProperty("--main-color", target.value);
    document.documentElement.style.setProperty("--secundary-color", target.value);
    document.documentElement.style.setProperty("--secundary-hover-color", target.value.concat("60"));
    document.documentElement.style.setProperty("--secundary-active-color", target.value.concat("90"));
    matrix.changeMatrixColor(target.value);
});
(_c = document.getElementById("change-fps")) === null || _c === void 0 ? void 0 : _c.addEventListener("input", (event) => {
    const target = event.target;
    const value = Number(target.value);
    matrix.changeMatrixFPS(value);
});
(_d = document.getElementById("change-size")) === null || _d === void 0 ? void 0 : _d.addEventListener("input", (event) => {
    const target = event.target;
    const value = Number(target.value);
    matrix.changeMatrixSize(value);
});
(_e = document.getElementById("change-quality")) === null || _e === void 0 ? void 0 : _e.addEventListener("input", (event) => {
    const target = event.target;
    const value = Number(target.value);
    matrix.changeMatrixQuality(value, value);
});
const alphabetInput = document.getElementById("change-alphabet");
avaliableAlphabets.forEach((alphabet) => {
    const option = document.createElement("option");
    option.value = alphabet.name;
    option.textContent = alphabet.name;
    alphabetInput === null || alphabetInput === void 0 ? void 0 : alphabetInput.append(option);
});
alphabetInput === null || alphabetInput === void 0 ? void 0 : alphabetInput.addEventListener("input", (event) => {
    const target = event.target;
    const value = target.value;
    matrix.changeMatrixAlphabet(value);
});
// Background MATRIX
const backgroundMatrix = new Matrix(document.getElementById("background-matrix"));
backgroundMatrix.changeMatrixFPS(12);
backgroundMatrix.changeMatrixAlphabet("Latin Num.");
backgroundMatrix.start();
