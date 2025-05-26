document.getElementById('payment-form').addEventListener('submit', function(e) {
  e.preventDefault();

  // Obtener valores y limpiar espacios
  const nombre = e.target.nombre.value.trim();
  const direccion = e.target.direccion.value.trim();
  const tarjeta = e.target.tarjeta.value.trim();
  const expiracion = e.target.expiracion.value.trim();
  const cvv = e.target.cvv.value.trim();

  // Validar que no haya campos vacíos
  if (!nombre || !direccion || !tarjeta || !expiracion || !cvv) {
    mostrarMensaje('Por favor completa todos los campos.', 'error');
    return;
  }

  // Mostrar mensaje de procesamiento
  mostrarMensaje('Procesando pago...', 'info');

  // Simular retardo en procesamiento del pago
  setTimeout(() => {
    // Vaciar carrito tras pago exitoso
    localStorage.removeItem('cart');

    // Mensaje de éxito
    mostrarMensaje('Pago realizado con éxito. ¡Gracias por tu compra!', 'success');

    // Redirigir a la página principal luego de 3 segundos
    setTimeout(() => {
      window.location.href = 'index.html';
    }, 3000);
  }, 2000);
});

// Función para mostrar mensajes al usuario
function mostrarMensaje(texto, tipo) {
  const mensajeDiv = document.getElementById('mensaje');
  mensajeDiv.textContent = texto;

  switch (tipo) {
    case 'error':
      mensajeDiv.style.color = 'red';
      break;
    case 'success':
      mensajeDiv.style.color = 'green';
      break;
    default:
      mensajeDiv.style.color = '#333';
  }
}
