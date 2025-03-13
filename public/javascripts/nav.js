// Funciones de validación
function validarCedula(cedula) {
    const regex = /^\d{8}$/; // Exactamente 8 dígitos
    if (!regex.test(cedula)) {
        mostrarNotificacion('La cédula debe tener exactamente 8 dígitos numéricos.', 'error');
        return false;
    }
    return true;
}

function validarNombreApellido(texto, campo) {
    const regex = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]{1,30}$/; // Solo letras y espacios, máximo 30 caracteres
    if (!regex.test(texto)) {
        mostrarNotificacion(`El ${campo} debe tener máximo 30 caracteres y solo letras.`, 'error');
        return false;
    }
    return true;
}

function validarTelefono(telefono) {
    const regex = /^\d{1,11}$/; // Solo números, máximo 11 caracteres
    if (!regex.test(telefono)) {
        mostrarNotificacion('El teléfono debe tener máximo 11 dígitos numéricos.', 'error');
        return false;
    }
    return true;
}

function validarCarreraDireccion(texto, campo) {
    if (texto.length > 60) {
        mostrarNotificacion(`La ${campo} debe tener máximo 60 caracteres.`, 'error');
        return false;
    }
    return true;
}

function validarCorreo(correo) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Debe contener @ y un dominio válido
    if (!regex.test(correo)) {
        mostrarNotificacion('El correo electrónico no es válido.', 'error');
        return false;
    }
    return true;
}
function validarContactoEmergencia(contacto) {
    const regex = /^\d{1,11}$/; // Solo números, máximo 11 caracteres
    if (!regex.test(contacto)) {
        mostrarNotificacion('El contacto de emergencia debe tener máximo 11 dígitos numéricos.', 'error');
        return false;
    }
    return true;
}

// Función para mostrar notificaciones
function mostrarNotificacion(mensaje, tipo) {
    const notificacion = document.getElementById('notificacion');
    const mensajeNotificacion = document.getElementById('mensajeNotificacion');

    if (notificacion && mensajeNotificacion) {
        mensajeNotificacion.textContent = mensaje;
        notificacion.className = `notificacion ${tipo} mostrar`;

        setTimeout(() => {
            notificacion.classList.remove('mostrar');
        }, 3000);
    } else {
        console.error('No se encontró el elemento de notificación');
    }
}

// Búsqueda en tiempo real
document.getElementById('searchInput').addEventListener('input', function () {
    const searchValue = this.value.toLowerCase();
    const rows = document.querySelectorAll('#registrosTable tbody tr');

    rows.forEach(row => {
        const text = row.textContent.toLowerCase();
        if (text.includes(searchValue)) {
            row.style.display = '';
        } else {
            row.style.display = 'none';
        }
    });
});

// Ordenar registros
document.getElementById('sortSelect').addEventListener('change', function () {
    const sortValue = this.value;
    const rows = Array.from(document.querySelectorAll('#registrosTable tbody tr'));

    rows.sort((a, b) => {
        const aText = a.cells[sortValue.includes('name') ? 0 : 2].textContent;
        const bText = b.cells[sortValue.includes('name') ? 0 : 2].textContent;

        if (sortValue.includes('asc')) {
            return aText.localeCompare(bText);
        } else {
            return bText.localeCompare(aText);
        }
    });

    const tbody = document.querySelector('#registrosTable tbody');
    tbody.innerHTML = '';
    rows.forEach(row => tbody.appendChild(row));
});

// Funcionalidad de editar
let idRegistro; // Variable global para almacenar el ID del registro que se está editando

function editarRegistro(id) {
    idRegistro = id;
    fetch(`/auth/registros/${id}`)
        .then(response => {
            if (!response.ok) {
                if (response.status === 404) {
                    throw new Error('Registro no encontrado');
                } else {
                    throw new Error('Error al obtener los datos del registro');
                }
            }
            return response.json();
        })
        .then(data => {
            if (!data.success) {
                throw new Error(data.message || 'Error al obtener los datos del registro');
            }

            const registro = data.registro;

            // Asignar valores a los campos del formulario
            document.getElementById('editNombre').value = registro.nombre || '';
            document.getElementById('editApellido').value = registro.apellido || '';
            document.getElementById('editCedula').value = registro.cedula || '';
            document.getElementById('editDireccion').value = registro.direccion || '';
            document.getElementById('editTelefono').value = registro.telefono || '';
            document.getElementById('editCorreo').value = registro.correo || '';
            document.getElementById('editCarrera').value = registro.carrera || '';
            document.getElementById('editTipoAlergia').value = registro.tipoAlergia || '';
            document.getElementById('editTipoSindrome').value = registro.tipoSindrome || '';
            document.getElementById('editTipoFatiga').value = registro.tipoFatiga || '';
            document.getElementById('editTipoDolores').value = registro.tipoDolores || '';
            document.getElementById('editContactoEmergencia').value = registro.contactoEmergencia || '';
            document.getElementById('editTipoSangre').value = registro.tipoSangre || '';

            // Mostrar la foto anterior en la vista previa
            const fotoPreview = document.getElementById('fotoPreview');
            if (registro.foto) {
                fotoPreview.src = registro.foto;
                fotoPreview.style.display = 'block';
            } else {
                fotoPreview.src = '#';
                fotoPreview.style.display = 'none';
            }

            // Mostrar el modal
            const editModal = document.getElementById('editModal');
            if (editModal) editModal.style.display = 'block';
        })
        .catch(error => {
            console.error('Error al obtener los datos del registro:', error);
            mostrarNotificacion(error.message || 'Hubo un error al cargar los datos del registro', 'error');
        });
}

// Función para guardar los cambios
function guardarCambios() {
    const nombre = document.getElementById('editNombre').value;
    const apellido = document.getElementById('editApellido').value;
    const cedula = document.getElementById('editCedula').value;
    const direccion = document.getElementById('editDireccion').value;
    const telefono = document.getElementById('editTelefono').value;
    const correo = document.getElementById('editCorreo').value;
    const carrera = document.getElementById('editCarrera').value;
    const contactoEmergencia = document.getElementById('editContactoEmergencia').value;

    // Validar campos
    if (!validarNombreApellido(nombre, 'nombre')) return;
    if (!validarNombreApellido(apellido, 'apellido')) return;
    if (!validarCedula(cedula)) return;
    if (!validarCarreraDireccion(direccion, 'dirección')) return;
    if (!validarTelefono(telefono)) return;
    if (!validarCorreo(correo)) return;
    if (!validarCarreraDireccion(carrera, 'carrera')) return;
    if (!validarContactoEmergencia(contactoEmergencia)) return;

    const formData = new FormData(document.getElementById('editForm'));

    fetch(`/auth/editar/${idRegistro}`, {
        method: 'PUT',
        body: formData,
    })
    .then(response => {
        if (!response.ok) {
            return response.json().then(err => {
                throw new Error(err.message || 'Error al actualizar el registro');
            });
        }
        return response.json();
    })
    .then(data => {
        if (data.success) {
            mostrarNotificacion('Registro actualizado con éxito', 'exito');
            cerrarModal();
            location.reload(); // Recargar la página para ver los cambios
        } else {
            mostrarNotificacion(data.message || 'Hubo un error al actualizar el registro', 'error');
        }
    })
    .catch(error => {
        console.error('Error:', error);
        mostrarNotificacion(error.message || 'Hubo un error al actualizar el registro', 'error');
    });
}
let registroAEliminar;
// Función para eliminar un registro
function eliminarRegistro(id) {
    registroAEliminar = id; // Guarda el ID del registro a eliminar
    const confirmModal = document.getElementById('confirmModal');
    if (confirmModal) confirmModal.style.display = 'flex'; // Muestra el modal
}

// Evento para confirmar la eliminación
document.getElementById('confirmDelete').addEventListener('click', function () {
    if (registroAEliminar) {
        fetch(`/auth/eliminar/${registroAEliminar}`, {
            method: 'DELETE',
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                mostrarNotificacion('Registro eliminado con éxito', 'exito');
                location.reload(); // Recarga la página para ver los cambios
            } else {
                mostrarNotificacion(data.message || 'Hubo un error al eliminar el registro', 'error');
            }
        })
        .catch(error => {
            console.error('Error al eliminar el registro:', error);
            mostrarNotificacion('Hubo un error al eliminar el registro', 'error');
        });
    }
    cerrarConfirmModal(); // Cierra el modal
});

// Evento para cancelar la eliminación
document.getElementById('cancelDelete').addEventListener('click', function () {
    cerrarConfirmModal(); // Cierra el modal
});

// Función para cerrar el modal de confirmación
function cerrarConfirmModal() {
    const confirmModal = document.getElementById('confirmModal');
    if (confirmModal) confirmModal.style.display = 'none';
}

// Función para ver más detalles de un registro
async function verMas(id) {
    try {
        const response = await fetch(`/auth/registros/${id}`);
        if (!response.ok) {
            throw new Error('Error al obtener los detalles del registro');
        }

        const data = await response.json();
        if (!data.success) {
            throw new Error(data.message || 'Registro no encontrado');
        }

        const registro = data.registro;

        const viewMoreContent = document.getElementById('viewMoreContent');
        const viewMoreModal = document.getElementById('viewMoreModal');

        if (viewMoreContent && viewMoreModal) {
            viewMoreContent.innerHTML = `
                <img src="${registro.foto || '/img/default.jpg'}" alt="Foto" style="width: 100px; height: 100px; border-radius: 50%; margin: 10px 0;">
                <p><strong>Nombre:</strong> ${registro.nombre}</p>
                <p><strong>Apellido:</strong> ${registro.apellido}</p>
                <p><strong>Cédula:</strong> ${registro.cedula}</p>
                <p><strong>Dirección:</strong> ${registro.direccion}</p>
                <p><strong>Teléfono:</strong> ${registro.telefono}</p>
                <p><strong>Correo electrónico:</strong> ${registro.correo}</p>
                <p><strong>Carrera:</strong> ${registro.carrera}</p>
                <p><strong>Alergias:</strong> ${registro.tipoAlergia || 'Ninguna'}</p>
                <p><strong>Síndromes:</strong> ${registro.tipoSindrome || 'Ninguno'}</p>
                <p><strong>Fatiga visual:</strong> ${registro.tipoFatiga || 'No'}</p>
                <p><strong>Dolores comunes:</strong> ${registro.tipoDolores || 'No'}</p>
                <p><strong>Contacto de emergencia:</strong> ${registro.contactoEmergencia}</p>
                <p><strong>Tipo de sangre:</strong> ${registro.tipoSangre}</p>
            `;
            viewMoreModal.style.display = 'block';
        } else {
            throw new Error('No se encontró el modal de detalles');
        }
    } catch (error) {
        console.error('Error:', error);
        mostrarNotificacion('No se pudieron cargar los detalles del registro', 'error');
    }
}

// Función para cerrar el modal de detalles
function cerrarViewMoreModal() {
    const viewMoreModal = document.getElementById('viewMoreModal');
    if (viewMoreModal) viewMoreModal.style.display = 'none';
}

// Función para cerrar el modal de edición
function cerrarModal() {
    const editModal = document.getElementById('editModal');
    if (editModal) editModal.style.display = 'none';
}

// Previsualización de la foto
const inputFoto = document.getElementById('editFoto');
const fotoPreview = document.getElementById('fotoPreview');

if (inputFoto && fotoPreview) {
    inputFoto.addEventListener('change', function (event) {
        const file = event.target.files[0]; // Obtiene el archivo seleccionado

        if (file) {
            const reader = new FileReader(); // Crea un FileReader para leer el archivo

            // Cuando el archivo se cargue, muestra la vista previa
            reader.onload = function (e) {
                fotoPreview.src = e.target.result; // Asigna la imagen al src del elemento <img>
                fotoPreview.style.display = 'block'; // Muestra la vista previa
            };

            reader.readAsDataURL(file); // Lee el archivo como una URL de datos
        } else {
            fotoPreview.src = '#'; // Limpia la vista previa si no se selecciona ningún archivo
            fotoPreview.style.display = 'none'; // Oculta la vista previa
        }
    });
}