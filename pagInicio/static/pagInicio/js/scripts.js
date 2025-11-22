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
        <h2>Agendar</h2>
        <p>Agenda tus citas aquí.</p>
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
                    <button class="btn btnLimpiar" onclick="">✖ Limpiar</button>
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
        if (section === "consultar")  {
            configurarBuscador ();
            cargarMascotas ();
        }
    });
});







/*Funcion que nos permitira hacer que el contenido de nuestra tabla cargue segun los datos que reciban de la bdd
utilizando la obtencion de los datos por medio de una URL exclusiva para el envio de datos */

let mascotasOriginales = [];

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
                        <button class="btn-icon btn-view" title="Ver detalles">👁️</button>
                        <button class="btn-icon btn-edit" title="Editar">✏️</button>
                        <button class="btn-icon btn-delete" title="Eliminar">🗑️</button>
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

    input.addEventListener("input", filtrarTabla);
    boton.addEventListener("click", filtrarTabla);

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