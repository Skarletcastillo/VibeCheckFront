// src/helpers/funciones.js
import Swal from "sweetalert2";

export function alertRedirection(title, url, navigate) {
  let timerInterval;
  Swal.fire({
    title,
    html: "Usted será redireccionado en <b></b> milisegundos ⌛.",
    timer: 1500,
    icon: "success",
    timerProgressBar: true,
    didOpen: () => {
      Swal.showLoading();
      const timer = Swal.getPopup().querySelector("b");
      timerInterval = setInterval(() => {
        if (timer) timer.textContent = `${Swal.getTimerLeft()}`;
      }, 100);
    },
    willClose: () => {
      clearInterval(timerInterval);
      navigate(url);
    },
  }).then((result) => {
    if (result.dismiss === Swal.DismissReason.timer) {
      console.log("Redirección completada.");
    }
  });
}

export function alertError(titulo, mensaje, icono = "error") {
  console.log("DEBUG: alertError function called!"); // <-- ¡Añade esta línea!
  Swal.fire({
    title: titulo,
    text: mensaje,
    icon: icono,
  });
}

export function alertSuccessful(titulo, mensaje) {
  Swal.fire({
    title: titulo,
    text: mensaje,
    icon: "success",
  });
}

export function generateTokens() {
  const part = () => Math.random().toString(36).substring(2, 10);
  return `token-<span class="math-inline">\{part\(\)\}\-</span>{part()}`;
}