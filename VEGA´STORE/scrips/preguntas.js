// preguntas.js

document.addEventListener("DOMContentLoaded", () => {
  const preguntas = document.querySelectorAll(".faq-question");

  preguntas.forEach(pregunta => {
    pregunta.addEventListener("click", () => {
      const respuesta = pregunta.nextElementSibling;
      pregunta.classList.toggle("active");
      respuesta.classList.toggle("show");
    });
  });
});

