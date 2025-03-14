document.getElementById('alergias').addEventListener('change', function() {
    document.getElementById('alergiasDetalle').style.display = this.checked ? 'block':'none';
})
document.getElementById('sindromes').addEventListener('change', function() {
    document.getElementById('sindromesDetalle').style.display = this.checked ? 'block' : 'none';
});
document.getElementById('fatigaVisual').addEventListener('change', function() {
    document.getElementById('fatigaDetalle').style.display = this.checked ? 'block' : 'none';
});
document.getElementById('doloresComunes').addEventListener('change', function() {
    document.getElementById('doloresDetalle').style.display = this.checked ? 'block' : 'none';
});
document.getElementById('foto').addEventListener('change', function (event) {
    const input = event.target;
    const imagenPrevia = document.getElementById('imagenPrevia');

    if (input.files && input.files[0]) {
        const reader = new FileReader();

        reader.onload = function (e) {
            imagenPrevia.src = e.target.result;
            imagenPrevia.style.display = 'block'; // Mostrar la imagen
        };

        reader.readAsDataURL(input.files[0]); // Leer la imagen como URL
    } else {
        imagenPrevia.src = '#';
        imagenPrevia.style.display = 'none'; // Ocultar la imagen si no hay archivo
    }
});

function mostrarNotificacion(mensaje, tipo) {
    const notificacion = document.getElementById('notificacion');
    const mensajeNotificacion = document.getElementById('mensajeNotificacion');

    // Configurar el mensaje y el tipo de notificación (éxito o error)
    mensajeNotificacion.textContent = mensaje;
    notificacion.className = `notificacion ${tipo} mostrar`;

    // Ocultar la notificación después de 3 segundos
    setTimeout(() => {
        notificacion.classList.remove('mostrar');
    }, 3000);
}
// Función para validar la cédula (máximo 8 caracteres y solo números)
function validarCedula(cedula) {
    const regex = /^\d{7,8}$/; // Solo números y máximo 8 caracteres
    return regex.test(cedula);
}

// Función para validar nombre y apellido (máximo 40 caracteres y no números)
function validarNombreApellido(nombre) {
    const regex = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]{1,40}$/; // Solo letras y espacios, máximo 40 caracteres
    return regex.test(nombre);
}

// Función para validar la dirección (máximo 90 caracteres)
function validarDireccion(direccion) {
    return direccion.length <= 90; // Máximo 90 caracteres
}

// Función para validar el teléfono (máximo 11 caracteres y solo números)
function validarTelefono(telefono) {
    const regex = /^\d{1,11}$/; // Solo números y máximo 11 caracteres
    return regex.test(telefono);
}

// Función para validar el correo electrónico (debe contener @)
function validarCorreo(correo) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Debe contener @ y un dominio válido
    return regex.test(correo);
}

// Función para validar texto (carrera, alergias, síndromes, fatiga, dolores)
function validarTexto(texto) {
    const regex = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]{1,30}$/; // Solo letras y espacios, máximo 30 caracteres
    return regex.test(texto);
}

// Función para validar el contacto de emergencia (máximo 11 caracteres y solo números)
function validarContactoEmergencia(contacto) {
    const regex = /^\d{1,11}$/; // Solo números y máximo 11 caracteres
    return regex.test(contacto);
}
function limpiarFormulario() {
    const formulario = document.getElementById('registroForm');

    // Restablece los campos de texto, número, email y select
    formulario.querySelectorAll('input[type="text"], input[type="number"], input[type="email"],input[type="tel"], select').forEach(input => {
        input.value = '';
    });

    // Restablece los checkboxes
    formulario.querySelectorAll('input[type="checkbox"]').forEach(checkbox => {
        checkbox.checked = false;
    });

    // Restablece el campo de archivo (foto)
    formulario.querySelector('input[type="file"]').value = '';

    // Oculta los detalles adicionales de las condiciones médicas
    document.querySelectorAll('.hidden').forEach(div => {
        div.style.display = 'none';
    });

    // Limpia la vista previa de la imagen
    const imagenPrevia = document.getElementById('imagenPrevia');
    imagenPrevia.src = '#';
    imagenPrevia.style.display = 'none';
}
// Manejar el envío del formulario
document.getElementById('registroForm').addEventListener('submit', function (event) {
    event.preventDefault(); // Evitar el envío tradicional del formulario

    // Obtener el campo de la foto
    const fotoInput = document.getElementById('foto');
    const foto = fotoInput.files[0]; // Obtener el archivo seleccionado

    // Validar si se ha seleccionado una foto
    if (!foto) {
        mostrarNotificacion('Por favor, selecciona una foto.', 'error');
        return; // Detener el envío del formulario
    }

    // Obtener los valores de los campos
    const cedula = document.getElementById('cedula').value;
    const nombre = document.getElementById('nombre').value;
    const apellido = document.getElementById('apellido').value;
    const direccion = document.getElementById('direccion').value;
    const telefono = document.getElementById('telefono').value;
    const correo = document.getElementById('correo').value;
    const carrera = document.getElementById('carrera').value;
    const tipoAlergia = document.getElementById('tipoAlergia').value;
    const tipoSindrome = document.getElementById('tipoSindrome').value;
    const tipoFatiga = document.getElementById('tipoFatiga').value;
    const tipoDolores = document.getElementById('tipoDolores').value;
    const contactoEmergencia = document.getElementById('contactoEmergencia').value;

    // Validar cada campo
    if (!validarCedula(cedula)) {
        mostrarNotificacion('La cédula debe tener máximo 8 caracteres y solo números.', 'error');
        return;
    }

    if (!validarNombreApellido(nombre)) {
        mostrarNotificacion('El nombre debe tener máximo 40 caracteres y no puede contener números.', 'error');
        return;
    }

    if (!validarNombreApellido(apellido)) {
        mostrarNotificacion('El apellido debe tener máximo 40 caracteres y no puede contener números.', 'error');
        return;
    }

    if (!validarDireccion(direccion)) {
        mostrarNotificacion('La dirección no puede tener más de 90 caracteres.', 'error');
        return;
    }

    if (!validarTelefono(telefono)) {
        mostrarNotificacion('El teléfono debe tener máximo 11 caracteres y solo números.', 'error');
        return;
    }

    if (!validarCorreo(correo)) {
        mostrarNotificacion('El correo electrónico no es válido.', 'error');
        return;
    }

    if (!validarTexto(carrera)) {
        mostrarNotificacion('La carrera no puede contener números y debe tener máximo 30 caracteres.', 'error');
        return;
    }

    if (document.getElementById('alergias').checked && !validarTexto(tipoAlergia)) {
        mostrarNotificacion('El tipo de alergia no puede contener números y debe tener máximo 30 caracteres.', 'error');
        return;
    }

    if (document.getElementById('sindromes').checked && !validarTexto(tipoSindrome)) {
        mostrarNotificacion('El tipo de síndrome no puede contener números y debe tener máximo 30 caracteres.', 'error');
        return;
    }

    if (document.getElementById('fatigaVisual').checked && !validarTexto(tipoFatiga)) {
        mostrarNotificacion('El tipo de fatiga visual no puede contener números y debe tener máximo 30 caracteres.', 'error');
        return;
    }

    if (document.getElementById('doloresComunes').checked && !validarTexto(tipoDolores)) {
        mostrarNotificacion('El tipo de dolores comunes no puede contener números y debe tener máximo 30 caracteres.', 'error');
        return;
    }

    if (!validarContactoEmergencia(contactoEmergencia)) {
        mostrarNotificacion('El contacto de emergencia debe tener máximo 11 caracteres y solo números.', 'error');
        return;
    }

    // Si todas las validaciones pasan, enviar el formulario
    const formData = new FormData(this);

    fetch('/registro', {
        method: 'POST',
        body: formData,
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            mostrarNotificacion('Datos enviados con éxito', 'exito');
            limpiarFormulario(); // Limpia el formulario
        } else {
            mostrarNotificacion('Hubo un error al enviar los datos', 'error');
        }
    })
    .catch(error => {
        mostrarNotificacion('Hubo un error al enviar los datos', 'error');
    });
});