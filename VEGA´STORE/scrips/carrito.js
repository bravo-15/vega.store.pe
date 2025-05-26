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
  renderCart();
}

// Vaciar carrito
document.getElementById('clear-cart').addEventListener('click', () => {
  if (confirm('¿Seguro que quieres vaciar el carrito?')) {
    localStorage.removeItem('cart');
    renderCart();
  }
});

document.addEventListener('DOMContentLoaded', renderCart);
