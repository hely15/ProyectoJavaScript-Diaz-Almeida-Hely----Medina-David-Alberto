const slider = document.getElementById("valorSlider");
const spanValor = document.getElementById("valorSeleccionado");
const botonGuardar = document.getElementById("guardarValor");

let valorGuardado = null;

// Actualiza el número mostrado en tiempo real
slider.addEventListener("input", () => {
  spanValor.textContent = slider.value;
});