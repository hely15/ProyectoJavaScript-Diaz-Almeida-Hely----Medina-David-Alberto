import { info } from "./html.js";
import { estadisticas } from "./html.js";

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


document.getElementById("buttonEstadisticas").addEventListener("click", () => {
    const htmlInfo = document.getElementById("containerOpcionesPersonaje");
    const verificarContenedorOpciones = document.getElementById("contenedorOpciones");
    if (htmlInfo) {
        if (verificarContenedorOpciones === null) {
            htmlInfo.insertAdjacentHTML("afterend", estadisticas);
        }else {
            verificarContenedorOpciones.remove();
            htmlInfo.insertAdjacentHTML("afterend", estadisticas);
        }

    } else {
        console.error("containerOpcionesPersonaje no existe.");
    }
});