import { info } from "./html.js";

document.getElementById("buttonInfo").addEventListener("click", () => {
    const htmlInfo = document.getElementById("containerOpcionesPersonaje");
    const verificarContenedorOpciones = document.getElementById("contenedorOpciones");
    if (htmlInfo) {
        if (verificarContenedorOpciones === null) {
            htmlInfo.insertAdjacentHTML("afterend", info);
        }

    } else {
        console.error("containerOpcionesPersonaje no existe.");
    }
});
