document.addEventListener('DOMContentLoaded', () => {
  const buscador = document.getElementById('buscador');
  const productos = document.querySelectorAll('#productos .producto');

  buscador.addEventListener('input', () => {
    const texto = buscador.value.toLowerCase().trim();

    productos.forEach(producto => {
      const nombre = producto.textContent.toLowerCase();

      if (nombre.includes(texto)) {
        producto.style.display = '';
      } else {
        producto.style.display = 'none';
      }
    });
  });
});
