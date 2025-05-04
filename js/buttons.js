import { loop } from "./script.js";

document.getElementById("start").addEventListener("click", () => {
    loop();
});

document.getElementById("restart").addEventListener("click", () => {
    loop();
});