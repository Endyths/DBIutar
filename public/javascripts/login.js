document.addEventListener('DOMContentLoaded', () => {
    class LoginForm {
      constructor(formId, errorMessageId) {
        this.form = document.getElementById(formId);
        this.errorMessage = document.getElementById(errorMessageId);
        this.usernameInput = this.form.username;
        this.passwordInput = this.form.password;
  
        // Vincular el evento de envío
        this.form.addEventListener('submit', (event) => this.validateForm(event));
      }
  
      validateForm(event) {
        // Evitar el envío del formulario por defecto
        event.preventDefault();
  
      
  
        // Obtener valores de los campos
        const username = this.usernameInput.value.trim();
        const password = this.passwordInput.value.trim();
  
        // Validar campos
        if (username === '' || password === '') {
          this.errorMessage.textContent = 'Por favor, complete todos los campos.';
          return; // No enviar el formulario
        }
  
        // Si todo está bien, puedes enviar el formulario
        this.form.submit(); // Descomentar si deseas enviar el formulario
      }
    }
  
    // Crear una instancia de LoginForm
    const loginForm = new LoginForm('loginForm', 'error-message');
  });