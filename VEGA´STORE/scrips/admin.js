// Función para cargar productos y mostrarlos
function cargarProductos() {
  fetch('backend/admin_productos.php')
    .then(res => {
      if (!res.ok) throw new Error('Error al cargar productos');
      return res.json();
    })
    .then(data => {
      const lista = document.getElementById('lista-productos');
      lista.innerHTML = ''; // limpiar antes
      data.forEach(p => {
        const pElem = document.createElement('p');
        pElem.textContent = `${p.nombre} - $${p.precio}`;
        lista.appendChild(pElem);
      });
    })
    .catch(err => {
      console.error(err);
      alert('No se pudieron cargar los productos');
    });
}

// Cargar productos al iniciar
cargarProductos();

// Agregar nuevo producto
document.getElementById('form-producto').addEventListener('submit', e => {
  e.preventDefault();
  const datos = new FormData(e.target);

  fetch('backend/admin_productos.php', {
    method: 'POST',
    body: datos
  })
    .then(res => {
      if (!res.ok) throw new Error('Error en la respuesta del servidor');
      return res.json();
    })
    .then(res => {
      if (res.success) {
        alert("Producto agregado correctamente");
        cargarProductos(); // recargar lista con nuevo producto
        e.target.reset();  // limpiar formulario
      } else {
        alert("Error al agregar producto");
      }
    })
    .catch(err => {
      console.error(err);
      alert('No se pudo agregar el producto');
    });
});

// Función para cargar pedidos y mostrarlos
function cargarPedidos() {
  fetch('backend/admin_pedidos.php')
    .then(res => {
      if (!res.ok) throw new Error('Error al cargar pedidos');
      return res.json();
    })
    .then(data => {
      const lista = document.getElementById('lista-pedidos');
      lista.innerHTML = ''; // limpiar antes
      data.forEach(p => {
        const pElem = document.createElement('p');
        pElem.textContent = `Pedido #${p.id} - ${p.correo} - ${p.fecha} - Producto: ${p.producto_id} x ${p.cantidad}`;
        lista.appendChild(pElem);
      });
    })
    .catch(err => {
      console.error(err);
      alert('No se pudieron cargar los pedidos');
    });
}

// Cargar pedidos al iniciar
cargarPedidos();
