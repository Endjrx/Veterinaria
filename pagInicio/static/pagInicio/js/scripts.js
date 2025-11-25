// Seleccionar todos los botones del sidebar
const botones = document.querySelectorAll(".menu-item");

// Contenedor donde se actualizará el contenido
const contenedor = document.getElementById("contenido-dinamico");

// cargamos el Dashboard desde el template sin duplicarlo
const dashboard_template = document.getElementById("template-dashboard").innerHTML;

// Plantillas HTML para cada sección para que se actualice dinamicamente cuando presiono una opcion en el sidebar
const secciones = {
    dashboard: dashboard_template,
    registrar: `

        <div class="main-contentRegistrar">
            <div class="header">
                <h1>Registro de Cliente y Mascota 🐶</h1>
                <p>Complete todos los campos para registrar un nuevo cliente con su mascota</p>
            </div>

            <div id="alertBox" class="alert"></div>

            <div class="form-container">
                <form id="formRegistrarCliente" method="POST">  

                    <!-- Sección Cliente -->
                    <div class="section-title">
                        👤 Datos del Cliente
                    </div>
                    
                    <div class="form-grid">
                        <div class="form-group">
                            <label for="nombre">Nombre <span class="required">*</span></label>
                            <input type="text" id="nombre" name="nombre" required>
                        </div>
                        
                        <div class="form-group">
                            <label for="apellido">Apellido <span class="required">*</span></label>
                            <input type="text" id="apellido" name="apellido" required>
                        </div>
                        
                        <div class="form-group full-width">
                            <label for="direccion">Dirección <span class="required">*</span></label>
                            <input type="text" id="direccion" name="direccion" required>
                        </div>
                        
                        <div class="form-group">
                            <label for="email">Email <span class="required">*</span></label>
                            <input type="email" id="email" name="email" required>
                        </div>
                        
                        <div class="form-group">
                            <label for="telefono">Teléfono <span class="required">*</span></label>
                            <input type="tel" id="telefono" name="telefono" required>
                        </div>
                    </div>

                    <!-- Sección Mascota -->
                    <div class="section-title">
                        🐾 Datos de la Mascota
                    </div>
                    
                    <div class="form-grid">
                        <div class="form-group">
                            <label for="nombreMascota">Nombre <span class="required">*</span></label>
                            <input type="text" id="nombreMascota" name="nombreMascota" required>
                        </div>
                        
                        <div class="form-group">
                            <label for="especie">Especie <span class="required">*</span></label>
                            <select id="especie" name="especie" required>
                                <option value="">Seleccione...</option>
                                <option value="Perro">Perro</option>
                                <option value="Gato">Gato</option>
                                <option value="Ave">Ave</option>
                                <option value="Conejo">Conejo</option>
                                <option value="Otro">Otro</option>
                            </select>
                        </div>
                        
                        <div class="form-group">
                            <label for="raza">Raza <span class="required">*</span></label>
                            <input type="text" id="raza" name="raza" required>
                        </div>
                        
                        <div class="form-group">
                            <label for="edad">Edad (años) <span class="required">*</span></label>
                            <input type="number" id="edad" name="edad" min="0" step="1" required>
                        </div>
                        
                        <div class="form-group full-width">
                            <label for="peso">Peso (kg) <span class="required">*</span></label>
                            <input type="number" id="peso" name="peso" min="0" step="0.1" required>
                        </div>
                    </div>

                    <div class="button-group">
                        <button type="button" class="btn btn-secondary">Cancelar</button>
                        <button type="button" id="btnRegistrar" class="btn btn-primary">Registrar</button>
                    </div>

                    
                </form>
            </div>
        </div>

    `,
    agendar: `
        <div class="main-contentAgendar">

            <div class="header">
                <h1> Agendar Cita Veterinaria 📅 </h1>
                <p>Complete todos los campos para agendar una nueva cita veterinaria</p>
            </div>

            <div class="formContainer">

                <div class="seccion-header"> 📝 Datos de la Cita </div>
                <form id="citaForm">
                    <div class="filaForm">

                        <div class="form-group">
                            <label>Fecha <span class="required">*</span></label>
                            <input type="date" id="fecha" name="fecha" required>
                        </div>
                        <div class="form-group">
                            <label>Hora <span class="required">*</span></label>
                            <input type="time" id="hora" name="hora" required>
                        </div>

                    </div>


                    <div class="filaForm">

                        <div class="form-group">
                            <label>Mascota <span class="required">*</span></label>
                            <select id="mascota" name="mascota" required>
                                <option value="">Seleccione una mascota...</option>
                            </select>
                        </div>
                        <div class="form-group">
                            <label>Veterinario <span class="required">*</span></label>
                            <select id="veterinario" name="veterinario" required>
                                <option value="">Seleccione un veterinario...</option>
                            </select>
                        </div>

                    </div>



                    <div class="filaForm full">
                        <div class="form-group">
                            <label>Motivo de la Cita <span class="required">*</span></label>
                            <textarea id="motivo" name="motivo" placeholder="Describa el motivo de la consulta..." required></textarea>
                        </div>
                    </div>


                    <div class="filaForm">
                        <div class="form-group">
                            <label>Estado <span class="required">*</span></label>
                            <select id="estado" name="estado" required>
                                <option value="">Seleccione un estado...</option>
                                <option value="Pendiente">Pendiente</option>
                                <option value="Confirmada">Confirmada</option>
                                <option value="Programada">Programada</option>
                                <option value="Atendida">Atendida</option>
                                <option value="Cancelada">Cancelada</option>
                            </select>
                        </div>
                    </div>


                    <div class="button-group">
                        <button type="button" class="btn btn-secondary" onclick="">Cancelar</button>
                        <button type="button" id="btnRegistrarCita" class="btn btn-primary">Registrar Cita</button>
                    </div>


                </form>
            </div>
        </div>
    `,
    consultar: `
    
    
        <div class="contenedor-principal">

            <div class="header">
                <h1>Consultar Clientes y Mascotas🔍</h1>
                <p>Busca, visualiza, edita o elimina registros de clientes y sus mascotas</p>
            </div>

            <div class="search-seccion">
                <div class="bar-search">
                    <input type="text" id="entradaBusqueda" class="search-input" placeholder="Buscar por nombre de cliente, mascota, email o telefono">
                    <button id="buscarBoton" class="btn btnBuscar">🔍 Buscar</button>
                    <button id="btnLimpiar" class="btn btnLimpiar">✖ Limpiar</button>
                </div>
            </div>

            <div class="contenedor-tablas">

                <div class="tabla-header">
                    <h3 class="tabla-title">📋 Registros de Clientes y Mascotas</h3>
                </div>

                <table id="datosTabla">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Cliente</th>
                            <th>Email</th>
                            <th>Teléfono</th>
                            <th>Mascota</th>
                            <th>Especie</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody id="cuerpoTabla"></tbody>
                </table>

            </div>

        </div>

        <!-- Modal Ver Detalles -->
        <div id="modalVerDetalles" class="modal">
            <div class="modal-content">
                <span class="close" onclick="cerrarModal('modalVerDetalles')">&times;</span>
                <h2>📋 Detalles del Registro</h2>
                <div id="detallesContenido"></div>
            </div>
        </div>

        <!-- Modal Editar -->
        <div id="modalEditar" class="modal">
            <div class="modal-content modal-large">
                <span class="close" onclick="cerrarModal('modalEditar')">&times;</span>
                <h2>✏️ Editar Registro</h2>
                <form id="formEditar">
                    <input type="hidden" id="editClienteId" name="clienteId">
                    <input type="hidden" id="editMascotaId" name="mascotaId">
                    
                    <div class="section-title">👤 Datos del Cliente</div>
                    <div class="form-grid">
                        <div class="form-group">
                            <label>Nombre <span class="required">*</span></label>
                            <input type="text" id="editNombre" name="nombre" required>
                        </div>
                        <div class="form-group">
                            <label>Apellido <span class="required">*</span></label>
                            <input type="text" id="editApellido" name="apellido" required>
                        </div>
                        <div class="form-group full-width">
                            <label>Dirección <span class="required">*</span></label>
                            <input type="text" id="editDireccion" name="direccion" required>
                        </div>
                        <div class="form-group">
                            <label>Email <span class="required">*</span></label>
                            <input type="email" id="editEmail" name="email" required>
                        </div>
                        <div class="form-group">
                            <label>Teléfono <span class="required">*</span></label>
                            <input type="tel" id="editTelefono" name="telefono" required>
                        </div>
                    </div>

                    <div class="section-title">🐾 Datos de la Mascota</div>
                    <div class="form-grid">
                        <div class="form-group">
                            <label>Nombre <span class="required">*</span></label>
                            <input type="text" id="editNombreMascota" name="nombreMascota" required>
                        </div>
                        <div class="form-group">
                            <label>Especie <span class="required">*</span></label>
                            <select id="editEspecie" name="especie" required>
                                <option value="">Seleccione...</option>
                                <option value="Perro">Perro</option>
                                <option value="Gato">Gato</option>
                                <option value="Ave">Ave</option>
                                <option value="Conejo">Conejo</option>
                                <option value="Otro">Otro</option>
                            </select>
                        </div>
                        <div class="form-group">
                            <label>Raza <span class="required">*</span></label>
                            <input type="text" id="editRaza" name="raza" required>
                        </div>
                        <div class="form-group">
                            <label>Edad (años) <span class="required">*</span></label>
                            <input type="number" id="editEdad" name="edad" min="0" step="1" required>
                        </div>
                        <div class="form-group full-width">
                            <label>Peso (kg) <span class="required">*</span></label>
                            <input type="number" id="editPeso" name="peso" min="0" step="0.1" required>
                        </div>
                    </div>

                    <div class="button-group">
                        <button type="button" class="btn btn-secondary" onclick="cerrarModal('modalEditar')">Cancelar</button>
                        <button type="button" id="btnGuardarEdicion" class="btn btn-primary">Guardar Cambios</button>
                    </div>
                </form>
            </div>
        </div>

    `,
    vacunacion: `
        <h2>Vacunación</h2>
        <p>Control de vacunas.</p>
    `,
    reportes: `
        <h2>Reportes</h2>
        <p>Informes y reportes del sistema.</p>
    `,
    configuracion: `
        <h2>Configuración</h2>
        <p>Ajustes del sistema.</p>
    `
};

// 🔥 Cargar el Dashboard al iniciar
contenedor.innerHTML = dashboard_template;

// Evento para cada botón del menú
botones.forEach(boton => {
    boton.addEventListener("click", () => {

        // 1. Quitar clase active a todos
        botones.forEach(b => b.classList.remove("active"));

        // 2. Activar el botón tocado
        boton.classList.add("active");

        // 3. Obtener la sección seleccionada
        const section = boton.getAttribute("data-section");

        // 4. Actualizar contenido
        contenedor.innerHTML = secciones[section];
        if (section === "registrar") registrarFuncionalidad ();
        if (section === "agendar") {
            cargarSelects();
            agendamiento ();
        }

        if (section === "consultar")  {
            configurarBuscador ();
            cargarMascotas ();
        }
    });
});







/*Funcion que nos permitira hacer que el contenido de nuestra tabla cargue segun los datos que reciban de la bdd
utilizando la obtencion de los datos por medio de una URL exclusiva para el envio de datos */

let mascotasOriginales = []; //Arreglo que contiene los datos sin filtrado para evitar realizar consultas innecesarias.

function cargarMascotas () {

    fetch ("/inicio/api/mascotas/")
        .then (response => response.json())
        .then (data => {
            mascotasOriginales = data.mascotas;
            renderTabla (mascotasOriginales);
        })
        .catch (error => console.log ("Error:", error));
}

/* Funcion modular que se va a encargar de mostrar los registros en la tabla, por motivos de reutilizacion de logica,
se crea la funcion renderTabla, para al momento de mostrar registros filtrados, reuitlizar la logica de mostrar todos los
registros sin filtrar*/

function renderTabla (lista) {

    const cuerpo = document.getElementById("cuerpoTabla");
    cuerpo.innerHTML = ""; //Para limpiar la tabla

    if (lista.length === 0) {
        cuerpo.innerHTML = `
                    <tr>
                        <td colspan="7" style="text-align: center; padding: 40px;">
                            <div class="empty-state-icon">🔍</div>
                            <h3>No hay registros disponibles</h3>
                            <p>Comienza registrando tu primer cliente y mascota</p>
                        </td>
                    </tr>
                `;
        return;
    }

    lista.forEach(m => {
        cuerpo.innerHTML += `
            <tr>
                <td>${m.id}</td>
                <td>${m.cliente}</td>
                <td>${m.email}</td>
                <td>${m.telefono}</td>
                <td>${m.mascota}</td>
                <td>${m.especie}</td>
                <td>
                    <div class="action-buttons">
                        <button class="btn-icon btn-view" title="Ver detalles" onclick="verDetalles(${m.id})">👁️</button>
                        <button class="btn-icon btn-edit" title="Editar" onclick="editarRegistro(${m.id})">✏️</button>
                        <button class="btn-icon btn-delete" title="Eliminar" onclick="eliminarRegistro(${m.id}, '${m.mascota}', '${m.cliente}')">🗑️</button>
                    </div>
                </td>
            </tr>
        `;
    });

}

/*Esta funcion simplemente se encargara de configurar los botones, de tal manera que tengan un listener
asociado que este atento a la actividad que tenga los elementos y se dispare el evento */

function configurarBuscador() {

    const input = document.getElementById("entradaBusqueda");
    const boton = document.getElementById("buscarBoton");
    const btnLimpiar = document.getElementById("btnLimpiar");

    input.addEventListener("input", filtrarTabla);
    boton.addEventListener("click", filtrarTabla);
    btnLimpiar.addEventListener("click", limpiarBusqueda);

}

function filtrarTabla() {
    const texto = document.getElementById("entradaBusqueda").value.toLowerCase();

    const filtrados = mascotasOriginales.filter(m => 
        m.cliente.toLowerCase().includes(texto) ||
        m.email.toLowerCase().includes(texto) ||
        m.telefono.toLowerCase().includes(texto) ||
        m.mascota.toLowerCase().includes(texto) ||
        m.especie.toLowerCase().includes(texto) ||
        m.id.toString().includes(texto)
    );

    renderTabla(filtrados);
}

function limpiarBusqueda() {
    document.getElementById("entradaBusqueda").value = "";
    renderTabla(mascotasOriginales);
}




// ============================================
// 🔍 FUNCIONALIDAD VER DETALLES
// ============================================
async function verDetalles(mascotaId) {
    try {
        const response = await fetch(`/inicio/api/detalle-mascota/${mascotaId}/`);
        const data = await response.json();

        if (data.status === "ok") {
            const detalle = data.detalle;
            
            document.getElementById("detallesContenido").innerHTML = `
                <div class="detalle-seccion">
                    <h3>👤 Información del Cliente</h3>
                    <div class="detalle-grid">
                        <div class="detalle-item">
                            <strong>ID Cliente:</strong> ${detalle.cliente_id}
                        </div>
                        <div class="detalle-item">
                            <strong>Nombre:</strong> ${detalle.cliente_nombre} ${detalle.cliente_apellido}
                        </div>
                        <div class="detalle-item">
                            <strong>Email:</strong> ${detalle.cliente_email}
                        </div>
                        <div class="detalle-item">
                            <strong>Teléfono:</strong> ${detalle.cliente_telefono}
                        </div>
                        <div class="detalle-item full-width">
                            <strong>Dirección:</strong> ${detalle.cliente_direccion}
                        </div>
                    </div>
                </div>

                <div class="detalle-seccion">
                    <h3>🐾 Información de la Mascota</h3>
                    <div class="detalle-grid">
                        <div class="detalle-item">
                            <strong>ID Mascota:</strong> ${detalle.mascota_id}
                        </div>
                        <div class="detalle-item">
                            <strong>Nombre:</strong> ${detalle.mascota_nombre}
                        </div>
                        <div class="detalle-item">
                            <strong>Especie:</strong> ${detalle.mascota_especie}
                        </div>
                        <div class="detalle-item">
                            <strong>Raza:</strong> ${detalle.mascota_raza}
                        </div>
                        <div class="detalle-item">
                            <strong>Edad:</strong> ${detalle.mascota_edad} años
                        </div>
                        <div class="detalle-item">
                            <strong>Peso:</strong> ${detalle.mascota_peso} kg
                        </div>
                    </div>
                </div>
            `;

            document.getElementById("modalVerDetalles").style.display = "block";
        } else {
            alert("Error al cargar los detalles: " + data.message);
        }
    } catch (error) {
        console.error("Error:", error);
        alert("Error al cargar los detalles");
    }
}




// ============================================
// ✏️ FUNCIONALIDAD EDITAR
// ============================================
async function editarRegistro(mascotaId) {
    try {
        const response = await fetch(`/inicio/api/detalle-mascota/${mascotaId}/`);
        const data = await response.json();

        if (data.status === "ok") {
            const d = data.detalle;
            
            // Llenar formulario de edición
            document.getElementById("editClienteId").value = d.cliente_id;
            document.getElementById("editMascotaId").value = d.mascota_id;
            document.getElementById("editNombre").value = d.cliente_nombre;
            document.getElementById("editApellido").value = d.cliente_apellido;
            document.getElementById("editDireccion").value = d.cliente_direccion;
            document.getElementById("editEmail").value = d.cliente_email;
            document.getElementById("editTelefono").value = d.cliente_telefono;
            document.getElementById("editNombreMascota").value = d.mascota_nombre;
            document.getElementById("editEspecie").value = d.mascota_especie;
            document.getElementById("editRaza").value = d.mascota_raza;
            document.getElementById("editEdad").value = d.mascota_edad;
            document.getElementById("editPeso").value = d.mascota_peso;

            // Configurar botón de guardar
            document.getElementById("btnGuardarEdicion").onclick = guardarEdicion;

            // Mostrar modal
            document.getElementById("modalEditar").style.display = "block";
        } else {
            alert("Error al cargar los datos: " + data.message);
        }
    } catch (error) {
        console.error("Error:", error);
        alert("Error al cargar los datos para editar");
    }
}

async function guardarEdicion() {
    const form = document.getElementById("formEditar");
    const formData = new FormData(form);
    const csrf = getCookie("csrftoken");

    try {
        const response = await fetch("/inicio/api/editar-registro/", {
            method: "POST",
            headers: {
                "X-CSRFToken": csrf,
            },
            body: formData
        });

        const data = await response.json();

        if (data.status === "ok") {
            alert("✅ Registro actualizado correctamente");
            cerrarModal("modalEditar");
            cargarMascotas(); // Recargar tabla
        } else {
            alert("❌ Error: " + data.message);
        }
    } catch (error) {
        console.error("Error:", error);
        alert("❌ Error al guardar los cambios");
    }
}




// ============================================
// 🗑️ FUNCIONALIDAD ELIMINAR (EN CASCADA)
// ============================================
async function eliminarRegistro(mascotaId, nombreMascota, nombreCliente) {
    const confirmacion = confirm(
        `⚠️ ¿ESTÁS SEGURO DE ELIMINAR ESTE REGISTRO?\n\n` +
        `Cliente: ${nombreCliente}\n` +
        `Mascota: ${nombreMascota}\n\n` +
        `Esta acción eliminará:\n` +
        `- El registro del cliente\n` +
        `- El registro de la mascota\n` +
        `- Todas las citas asociadas\n\n` +
        `⚠️ ESTA ACCIÓN NO SE PUEDE DESHACER ⚠️`
    );

    if (!confirmacion) {
        console.log("Eliminación cancelada por el usuario");
        return;
    }

    const csrf = getCookie("csrftoken");

    try {
        const response = await fetch(`/inicio/api/eliminar-registro/${mascotaId}/`, {
            method: "DELETE",
            headers: {
                "X-CSRFToken": csrf,
                "Content-Type": "application/json"
            }
        });

        const data = await response.json();

        if (data.status === "ok") {
            alert("🗑️ ELIMINADO EXITOSAMENTE\n\n" + data.message);
            cargarMascotas(); // Recargar tabla
        } else {
            alert("❌ ERROR AL ELIMINAR\n\n" + data.message);
        }
    } catch (error) {
        console.error("Error:", error);
        alert("❌ ERROR AL ELIMINAR EL REGISTRO\n\nOcurrió un error inesperado. Por favor, intenta nuevamente.");
    }
}




// ============================================
// 🔧 FUNCIONES AUXILIARES PARA MODALES
// ============================================
function cerrarModal(modalId) {
    document.getElementById(modalId).style.display = "none";
}

// Cerrar modal al hacer clic fuera de él
window.onclick = function(event) {
    if (event.target.classList.contains('modal')) {
        event.target.style.display = "none";
    }
}











/**------------------------------------APARTADO DE FUNCIONALIDAD REGISTRAR CLIENTES-MASCOTAS---------------------------------------- */

/**Funcion proporcionada por DJango: */
function getCookie(name) {
    let cookieValue = null;
    if (document.cookie && document.cookie !== "") {
        const cookies = document.cookie.split(";");
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();
            if (cookie.substring(0, name.length + 1) === (name + "=")) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}

/** Funcion que se va a encargar para la logica de la session registrar clientes, se encarga de recibir  */
function registrarFuncionalidad () {
    
    document.getElementById("btnRegistrar").addEventListener("click", async function () {

        const form = document.getElementById("formRegistrarCliente");
        const formData = new FormData(form);

        // CSRF
        const csrf = getCookie("csrftoken");

        const response = await fetch("/inicio/api/registrar/cliente-mascota/", {
            method: "POST",
            headers: {
                "X-CSRFToken": csrf,
            },
            body: formData
        });

        const data = await response.json();

        if (data.status === "ok") {
            alert("Registro creado exitosamente");

            // Opcional: resetear formulario
            form.reset();

            // Opcional: actualizar tu tabla dinámica
            // cargarClientes(); // si tienes esta función
        } else {
            alert("Error: " + data.message);
        }
    });


}








/**----------------------------------------APARTADO DE FUNCIONALIDAD SECCION AGENDAR CITAS------------------------------------- */

function agendamiento () {

    document.getElementById("btnRegistrarCita").addEventListener ("click", async () => {

        const form = document.getElementById("citaForm");
        const formData = new FormData(form);

        // obtener CSRF token
        const csrf = getCookie("csrftoken");

        const response = await fetch("/inicio/api/registrar/cita/", {
            method: "POST",
            headers: { "X-CSRFToken": csrf },
            body: formData
        });

        const data = await response.json();

        if (data.status === "ok") {
            alert("Cita registrada exitosamente");
            form.reset();
        } else {
            alert("Error: " + data.message);
        }
    });
    
}




async function cargarSelects() {
    const response = await fetch('/inicio/api/cargar-datos-agenda/');
    const data = await response.json();

    const mascotaSelect = document.getElementById("mascota");
    const veterinarioSelect = document.getElementById("veterinario");

    // Llenar las mascotas dinámicamente
    data.mascotas.forEach(m => {
        const option = document.createElement("option");
        option.value = m.id_mascota;
        option.textContent = m.nombre;
        mascotaSelect.appendChild(option);
    });

    // Llenar los veterinarios dinámicamente
    data.veterinarios.forEach(v => {
        const option = document.createElement("option");
        option.value = v.id;
        option.textContent = v.nombre;
        veterinarioSelect.appendChild(option);
    });
}