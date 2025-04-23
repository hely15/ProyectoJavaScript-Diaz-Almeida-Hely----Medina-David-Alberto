import { info } from "./html.js";

document.getElementById("buttonInfo").addEventListener("click", () => {
    const htmlInfo = document.getElementById("containerOpcionesPersonaje");
    if (htmlInfo) {
        htmlInfo.insertAdjacentHTML("afterend", info);
    } else {
        console.error("containerOpcionesPersonaje no existe.");
    }
});
