const sliders = document.querySelectorAll(".slider");
const valores = document.querySelectorAll(".valorMostrado");
const botonGuardar = document.getElementById("guardarTodos");

let valoresGuardados = [];

sliders.forEach((slider, i) => {
  slider.addEventListener("input", () => {
    valores[i].textContent = slider.value;
  });
});

botonGuardar.addEventListener("click", () => {
  valoresGuardados = Array.from(sliders).map(slider => Number(slider.value));
  console.log("Valores guardados:", valoresGuardados);
});
