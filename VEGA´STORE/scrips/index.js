// Manejo del menú responsive
function toggleMenu() {
  document.querySelector('.navbar').classList.toggle('active');
}


// Actualizar contador carrito visible en el header
function updateCartCount() {
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  const totalQuantity = cart.reduce((sum, item) => sum + item.quantity, 0);
  document.getElementById('cart-count').textContent = totalQuantity;
}

// Añadir productos al carrito
function addToCart(product) {
  let cart = JSON.parse(localStorage.getItem('cart')) || [];
  const existing = cart.find(item => item.id === product.id);
  if (existing) {
    existing.quantity++;
  } else {
    cart.push({ ...product, quantity: 1 });
  }
  localStorage.setItem('cart', JSON.stringify(cart));
  updateCartCount();
  showToast(`Agregaste ${product.name} al carrito.`);
}

// Mostrar carrito desde localStorage
function renderCart() {
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  const cartItemsDiv = document.getElementById('cart-items');
  const cartTotalDiv = document.getElementById('cart-total');
  const checkoutBtn = document.getElementById('checkout');

  cartItemsDiv.innerHTML = '';

  if (cart.length === 0) {
    cartItemsDiv.innerHTML = '<p>Tu carrito está vacío.</p>';
    cartTotalDiv.textContent = '';
    checkoutBtn.style.display = 'none';
    return;
  }

  cart.forEach(item => {
    const itemDiv = document.createElement('div');
    itemDiv.classList.add('cart-item');
    itemDiv.innerHTML = `
      <div><strong>${item.name}</strong></div>
      <div>$${item.price.toFixed(2)}</div>
      <div>Cantidad: ${item.quantity}</div>
      <div><button data-id="${item.id}" class="remove-item">Eliminar</button></div>
    `;
    cartItemsDiv.appendChild(itemDiv);
  });

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  cartTotalDiv.textContent = `Total: $${total.toFixed(2)}`;
  checkoutBtn.style.display = 'block';

  // Añadir evento a botones eliminar
  document.querySelectorAll('.remove-item').forEach(btn => {
    btn.addEventListener('click', e => {
      const id = e.target.getAttribute('data-id');
      removeFromCart(id);
    });
  });
}

// Eliminar producto del carrito
function removeFromCart(id) {
  let cart = JSON.parse(localStorage.getItem('cart')) || [];
  cart = cart.filter(item => item.id !== id);
  localStorage.setItem('cart', JSON.stringify(cart));
  updateCartCount();
  renderCart();
}

// Vaciar carrito
document.getElementById('clear-cart').addEventListener('click', () => {
  if (confirm('¿Seguro que quieres vaciar el carrito?')) {
    localStorage.removeItem('cart');
    updateCartCount();
    renderCart();
  }
});

// Mostrar mensajes toast
function showToast(message) {
  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.textContent = message;
  document.body.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    setTimeout(() => {
      toast.remove();
    }, 500);
  }, 2500);
}

// Agregar evento a botones "Agregar al carrito"
document.querySelectorAll('.add-to-cart').forEach(btn => {
  btn.addEventListener('click', () => {
    const product = {
      id: btn.getAttribute('data-id'),
      name: btn.getAttribute('data-name'),
      price: parseFloat(btn.getAttribute('data-price'))
    };
    addToCart(product);
  });
});

// Inicializar contador y render carrito al cargar la página
document.addEventListener('DOMContentLoaded', () => {
  updateCartCount();
  renderCart();
});

let prevScroll = window.pageYOffset;
const header = document.getElementById("main-header");

window.onscroll = () => {
  let currentScroll = window.pageYOffset;

  if (prevScroll > currentScroll) {
    // Scrolling up
    header.style.top = "0";
  } else {
    // Scrolling down
    header.style.top = "-100px"; // Oculta el header
  }

  prevScroll = currentScroll;
};
function mostrarProductos(lista) {
  const contenedor = document.getElementById('contenedor-productos');
  contenedor.innerHTML = '';

  lista.forEach(producto => {
    const div = document.createElement('div');
    div.className = 'producto';
    div.innerHTML = `
      <h3>${producto.name}</h3>
      <p>Precio: $${producto.price}</p>
      <button class="add-to-cart" data-id="${producto.id}" data-name="${producto.name}" data-price="${producto.price}">Agregar al carrito</button>
    `;
    contenedor.appendChild(div);
  });

  // 🔁 Agregar eventos a los botones recién creados
  document.querySelectorAll('.add-to-cart').forEach(btn => {
    btn.addEventListener('click', () => {
      const product = {
        id: btn.getAttribute('data-id'),
        name: btn.getAttribute('data-name'),
        price: parseFloat(btn.getAttribute('data-price'))
      };
      addToCart(product);
    });
  });
}
document.addEventListener("DOMContentLoaded", function () {
  const menuIcon = document.getElementById('menu-icon');
  const menuDesplegable = document.getElementById('menu-desplegable');

  menuIcon.addEventListener('click', () => {
    if (menuDesplegable.style.display === 'flex') {
      menuDesplegable.style.display = 'none';
    } else {
      menuDesplegable.style.display = 'flex';
    }
  });
});
