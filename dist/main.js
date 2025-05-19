var _a, _b, _c;
import Matrix from "./Matrix.js";
const matrix = new Matrix(document.getElementById("matrix"));
matrix.start();
(_a = document.getElementById("change-font")) === null || _a === void 0 ? void 0 : _a.addEventListener("input", (event) => {
    const target = event.target;
    matrix.changeFont(target.value);
});
document.querySelectorAll("[data-color]").forEach((element) => {
    if (!(element instanceof HTMLElement))
        return;
    const color = element.dataset.color;
    element.addEventListener("click", () => matrix.changeColor(String(color)));
});
(_b = document.getElementById("change-fps")) === null || _b === void 0 ? void 0 : _b.addEventListener("input", (event) => {
    const target = event.target;
    const value = Number(target.value);
    matrix.changeFPS(value);
});
(_c = document.getElementById("change-quality")) === null || _c === void 0 ? void 0 : _c.addEventListener("input", (event) => {
    const target = event.target;
    const value = Number(target.value);
    matrix.changeQuality(value, value);
});
