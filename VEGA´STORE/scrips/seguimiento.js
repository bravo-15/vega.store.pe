// scrips/seguimiento.js

document.getElementById('formSeguimiento').addEventListener('submit', function(e) {
  e.preventDefault();
  
  const pedido = document.getElementById('pedido').value;
  const correo = document.getElementById('correo').value;
  const resultado = document.getElementById('resultado');
  
  // Simulación de verificación (en un caso real harías una petición al servidor)
  if (pedido && correo) {
    resultado.className = 'success';
    resultado.innerHTML = `
      <h3>Pedido encontrado</h3>
      <p>Número de pedido: <strong>${pedido}</strong></p>
      <p>Estado: <strong style="color: var(--success)">En camino</strong></p>
      <p>Fecha estimada de entrega: <strong>15 de Mayo, 2025</strong></p>
    `;
  } else {
    resultado.className = 'error';
    resultado.textContent = 'No se encontró el pedido. Verifica los datos e intenta nuevamente.';
  }
});