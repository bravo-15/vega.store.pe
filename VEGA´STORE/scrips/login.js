document.getElementById('login-form').addEventListener('submit', function(e) {
  e.preventDefault();

  const email = document.getElementById('email').value.trim();
  const password = document.getElementById('password').value.trim();
  const errorMessage = document.getElementById('error-message');

  // Limpiar mensaje de error previo
  errorMessage.textContent = '';

  // Validar campos vacíos
  if (!email || !password) {
    errorMessage.textContent = 'Por favor completa todos los campos.';
    return;
  }

  // Usuario simulado para validación
  const fakeUser = {
    email: 'cliente@vegastore.com',
    password: '123456'
  };

  // Validar credenciales
  if (email === fakeUser.email && password === fakeUser.password) {
    // Guardar usuario en localStorage
    localStorage.setItem('user', JSON.stringify({ email, role: 'cliente' }));

    alert('¡Bienvenido a Vega\'Store!');
    // Redirigir a la página principal
    window.location.href = 'index.html';
  } else {
    errorMessage.textContent = 'Correo o contraseña incorrectos.';
  }
});
