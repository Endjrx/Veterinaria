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
// Agregar esto al objeto "secciones" en scripts.js, después de "consultar:"

vacunacion: `
    <div class="contenedor-principal">
        
        <div class="header">
            <h1>💉 Vacunación y Tratamientos</h1>
            <p>Consulta el historial médico completo de cada mascota</p>
        </div>

        <!-- Selector de Mascota -->
        <div class="selector-mascota-container">
            <div class="selector-header">
                <h3>🐾 Selecciona una Mascota</h3>
            </div>
            <div class="selector-content">
                <select id="selectorMascota" class="mascota-select">
                    <option value="">-- Seleccione una mascota --</option>
                </select>
                <button id="btnCargarHistorial" class="btn btn-primary">
                    📋 Cargar Historial
                </button>
            </div>
        </div>

        <!-- Información de la Mascota Seleccionada -->
        <div id="infoMascotaSeleccionada" class="mascota-info-card" style="display: none;">
            <div class="mascota-info-header">
                <h3>🐶 <span id="nombreMascotaInfo"></span></h3>
                <span class="mascota-badge" id="especieMascotaInfo"></span>
            </div>
            <p><strong>Raza:</strong> <span id="razaMascotaInfo"></span></p>
            <p><strong>Dueño:</strong> <span id="clienteMascotaInfo"></span></p>
        </div>

        <!-- Pestañas: Vacunas / Tratamientos -->
        <div id="contenedorHistorial" class="historial-container" style="display: none;">
            
            <!-- Tabs -->
            <div class="tabs-container">
                <button class="tab-btn active" data-tab="vacunas">
                    💉 Vacunas
                </button>
                <button class="tab-btn" data-tab="tratamientos">
                    💊 Tratamientos
                </button>
            </div>

            <!-- Contenido Tab Vacunas -->
            <div id="tab-vacunas" class="tab-content active">
                <div class="tab-header">
                    <h3>💉 Historial de Vacunación</h3>
                    <button id="btnNuevaVacuna" class="btn btn-success">
                        ➕ Nueva Vacuna
                    </button>
                </div>
                
                <div id="tablaVacunas" class="tabla-responsive">
                    <table>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Vacuna</th>
                                <th>Fecha Aplicación</th>
                                <th>Fecha Vencimiento</th>
                                <th>Lote</th>
                                <th>Estado</th>
                            </tr>
                        </thead>
                        <tbody id="cuerpoTablaVacunas">
                            <tr>
                                <td colspan="6" style="text-align: center; padding: 40px;">
                                    Selecciona una mascota para ver su historial
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>

            <!-- Contenido Tab Tratamientos -->
            <div id="tab-tratamientos" class="tab-content">
                <div class="tab-header">
                    <h3>💊 Historial de Tratamientos</h3>
                    <button id="btnNuevoTratamiento" class="btn btn-success">
                        ➕ Nuevo Tratamiento
                    </button>
                </div>
                
                <div id="tablaTratamientos" class="tabla-responsive">
                    <table>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Descripción</th>
                                <th>Medicamento</th>
                                <th>Dosis</th>
                                <th>Duración</th>
                                <th>Fecha Inicio</th>
                                <th>Cita</th>
                            </tr>
                        </thead>
                        <tbody id="cuerpoTablaTratamientos">
                            <tr>
                                <td colspan="7" style="text-align: center; padding: 40px;">
                                    Selecciona una mascota para ver sus tratamientos
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>

        </div>

    </div>

    <!-- Modal Nueva Vacuna -->
    <div id="modalNuevaVacuna" class="modal">
        <div class="modal-content">
            <span class="close" onclick="cerrarModalVacuna()">&times;</span>
            <h2>💉 Registrar Nueva Vacuna</h2>
            <form id="formNuevaVacuna">
                <input type="hidden" id="vacunaMascotaId" name="mascota_id">
                
                <div class="form-group">
                    <label>Nombre de la Vacuna <span class="required">*</span></label>
                    <input type="text" id="nombreVacuna" name="nombre_vacuna" required 
                           placeholder="Ej: Rabia, Parvovirus, Triple Felina">
                </div>

                <div class="form-grid">
                    <div class="form-group">
                        <label>Fecha de Aplicación <span class="required">*</span></label>
                        <input type="date" id="fechaAplicacion" name="fecha_aplicacion" required>
                    </div>
                    <div class="form-group">
                        <label>Fecha de Vencimiento <span class="required">*</span></label>
                        <input type="date" id="fechaVencimiento" name="fecha_vencimiento" required>
                    </div>
                </div>

                <div class="form-group">
                    <label>Lote <span class="required">*</span></label>
                    <input type="text" id="loteVacuna" name="lote" required 
                           placeholder="Número de lote del fabricante">
                </div>

                <div class="button-group">
                    <button type="button" class="btn btn-secondary" onclick="cerrarModalVacuna()">
                        Cancelar
                    </button>
                    <button type="button" id="btnGuardarVacuna" class="btn btn-primary">
                        Guardar Vacuna
                    </button>
                </div>
            </form>
        </div>
    </div>

    <!-- Modal Nuevo Tratamiento -->
    <div id="modalNuevoTratamiento" class="modal">
        <div class="modal-content modal-large">
            <span class="close" onclick="cerrarModalTratamiento()">&times;</span>
            <h2>💊 Registrar Nuevo Tratamiento</h2>
            <form id="formNuevoTratamiento">
                <input type="hidden" id="tratamientoMascotaId" name="mascota_id">
                
                <div class="form-group">
                    <label>Cita Asociada <span class="required">*</span></label>
                    <select id="citaTratamiento" name="cita_id" required>
                        <option value="">Seleccione una cita...</option>
                    </select>
                </div>

                <div class="form-group full-width">
                    <label>Descripción del Tratamiento <span class="required">*</span></label>
                    <textarea id="descripcionTratamiento" name="descripcion" required 
                              placeholder="Describe el diagnóstico y tratamiento"></textarea>
                </div>

                <div class="form-grid">
                    <div class="form-group">
                        <label>Medicamento <span class="required">*</span></label>
                        <input type="text" id="medicamentoTratamiento" name="medicamento" required>
                    </div>
                    <div class="form-group">
                        <label>Dosis <span class="required">*</span></label>
                        <input type="text" id="dosisTratamiento" name="dosis" required 
                               placeholder="Ej: 10mg cada 12h">
                    </div>
                </div>

                <div class="form-grid">
                    <div class="form-group">
                        <label>Duración <span class="required">*</span></label>
                        <input type="text" id="duracionTratamiento" name="duracion" required 
                               placeholder="Ej: 7 días, 2 semanas">
                    </div>
                    <div class="form-group">
                        <label>Fecha de Inicio <span class="required">*</span></label>
                        <input type="date" id="fechaInicioTratamiento" name="fecha_inicio" required>
                    </div>
                </div>

                <div class="button-group">
                    <button type="button" class="btn btn-secondary" onclick="cerrarModalTratamiento()">
                        Cancelar
                    </button>
                    <button type="button" id="btnGuardarTratamiento" class="btn btn-primary">
                        Guardar Tratamiento
                    </button>
                </div>
            </form>
        </div>
    </div>
`,
reportes: `
    <div class="contenedor-principal">
        
        <div class="header">
            <h1>📊 Reportes y Gestión de Facturas</h1>
            <p>Administra las facturas y visualiza reportes de ingresos</p>
        </div>

        <!-- Tarjetas de Resumen -->
        <div class="stats-grid">
            <div class="stat-card">
                <div class="stat-icon">💰</div>
                <div class="stat-info">
                    <div class="stat-label">Ingresos Totales</div>
                    <div class="stat-number" id="totalIngresos">$0.00</div>
                    <div class="stat-subtitle">Facturas pagadas</div>
                </div>
            </div>
            
            <div class="stat-card orange">
                <div class="stat-icon">⏳</div>
                <div class="stat-info">
                    <div class="stat-label">Por Cobrar</div>
                    <div class="stat-number" style="color: #ff9800;" id="totalPendiente">$0.00</div>
                    <div class="stat-subtitle">Facturas pendientes</div>
                </div>
            </div>
            
            <div class="stat-card purple">
                <div class="stat-icon">📄</div>
                <div class="stat-info">
                    <div class="stat-label">Total Facturas</div>
                    <div class="stat-number" style="color: #9c27b0;" id="totalFacturas">0</div>
                    <div class="stat-subtitle">Emitidas en total</div>
                </div>
            </div>
        </div>

        <!-- Filtros y Acciones -->
        <div class="search-seccion">
            <div class="bar-search">
                <select id="filtroEstado" class="filtro-select">
                    <option value="">Todos los estados</option>
                    <option value="Pagada">Pagadas</option>
                    <option value="Pendiente">Pendientes</option>
                    <option value="Cancelada">Canceladas</option>
                </select>
                <button id="btnNuevaFactura" class="btn btn-success">
                    ➕ Nueva Factura
                </button>
            </div>
        </div>

        <!-- Tabla de Facturas -->
        <div class="contenedor-tablas">
            <div class="tabla-header">
                <h3 class="tabla-title">📋 Lista de Facturas</h3>
            </div>

            <table id="tablaFacturas">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Fecha</th>
                        <th>Cliente</th>
                        <th>Motivo</th>
                        <th>Monto</th>
                        <th>Estado</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody id="cuerpoTablaFacturas">
                    <tr>
                        <td colspan="7" style="text-align: center; padding: 40px;">
                            Cargando facturas...
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>

    </div>

    <!-- Modal Ver Detalles -->
    <div id="modalDetalleFactura" class="modal">
        <div class="modal-content">
            <span class="close" onclick="cerrarModalDetalle()">&times;</span>
            <h2>📄 Detalle de Factura</h2>
            <div id="detalleFacturaContenido"></div>
        </div>
    </div>

    <!-- Modal Nueva Factura -->
    <div id="modalNuevaFactura" class="modal">
        <div class="modal-content modal-large">
            <span class="close" onclick="cerrarModalNuevaFactura()">&times;</span>
            <h2>💰 Registrar Nueva Factura</h2>
            <form id="formNuevaFactura">
                
                <div class="form-group">
                    <label>Cita <span class="required">*</span></label>
                    <select id="citaFactura" name="cita_id" required>
                        <option value="">Seleccione una cita...</option>
                    </select>
                </div>

                <div class="form-grid">
                    <div class="form-group">
                        <label>Fecha de Emisión <span class="required">*</span></label>
                        <input type="date" id="fechaEmision" name="fecha_emision" required>
                    </div>
                    <div class="form-group">
                        <label>Monto Total <span class="required">*</span></label>
                        <input type="number" id="montoTotal" name="monto_total" 
                               min="0" step="0.01" required placeholder="0.00">
                    </div>
                </div>

                <div class="form-grid">
                    <div class="form-group">
                        <label>Estado de Pago <span class="required">*</span></label>
                        <select id="estadoPago" name="estado_pago" required>
                            <option value="">Seleccione...</option>
                            <option value="Pagada">Pagada</option>
                            <option value="Pendiente">Pendiente</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label>Administrador <span class="required">*</span></label>
                        <select id="administradorFactura" name="administrador_id" required>
                            <option value="">Seleccione...</option>
                        </select>
                    </div>
                </div>

                <input type="hidden" id="clienteIdFactura" name="cliente_id">

                <div class="button-group">
                    <button type="button" class="btn btn-secondary" onclick="cerrarModalNuevaFactura()">
                        Cancelar
                    </button>
                    <button type="button" id="btnGuardarFactura" class="btn btn-primary">
                        Guardar Factura
                    </button>
                </div>
            </form>
        </div>
    </div>

    <!-- Modal Cambiar Estado -->
    <div id="modalCambiarEstado" class="modal">
        <div class="modal-content">
            <span class="close" onclick="cerrarModalEstado()">&times;</span>
            <h2>✏️ Cambiar Estado de Pago</h2>
            <form id="formCambiarEstado">
                <input type="hidden" id="facturaIdEstado" name="factura_id">
                
                <div class="form-group">
                    <label>Nuevo Estado <span class="required">*</span></label>
                    <select id="nuevoEstadoPago" name="estado_pago" required>
                        <option value="Pagada">Pagada</option>
                        <option value="Pendiente">Pendiente</option>
                        <option value="Cancelada">Cancelada</option>
                    </select>
                </div>

                <div class="button-group">
                    <button type="button" class="btn btn-secondary" onclick="cerrarModalEstado()">
                        Cancelar
                    </button>
                    <button type="button" id="btnActualizarEstado" class="btn btn-primary">
                        Actualizar Estado
                    </button>
                </div>
            </form>
        </div>
    </div>
`,
    configuracion: `
        <h2>Configuración</h2>
        <p>Ajustes del sistema.</p>
    `
};

// 🔥 Cargar el Dashboard al iniciar
contenedor.innerHTML = dashboard_template;
inicializarDashboard ();

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
        if (section == "dashboard") inicializarDashboard ();
        if (section === "registrar") registrarFuncionalidad ();
        if (section === "agendar") {
            cargarSelects();
            agendamiento ();
        }

        if (section === "consultar")  {
            configurarBuscador ();
            cargarMascotas ();
        }

        if (section === "vacunacion") {
            inicializarVacunacion();
        }

        if (section === "reportes") {
             inicializarReportes();
        }
    });
});






function inicializarDashboard() {
    const btnConsultar = document.getElementById("btnConsultar");

    btnConsultar.addEventListener("click", () => {
        contenedor.innerHTML = secciones["consultar"];
        configurarBuscador();
        cargarMascotas();
    });
}





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

// ============================================
// 💉 FUNCIONALIDAD VACUNACIÓN Y TRATAMIENTOS
// ============================================

let mascotaSeleccionadaId = null;
let mascotaSeleccionadaData = null;

// Función principal que se ejecuta al cargar la sección
function inicializarVacunacion() {
    cargarMascotasSelector();
    configurarEventosVacunacion();
}

// Cargar lista de mascotas en el selector
async function cargarMascotasSelector() {
    try {
        const response = await fetch("/inicio/api/mascotas-selector/");
        const data = await response.json();
        
        const selector = document.getElementById("selectorMascota");
        selector.innerHTML = '<option value="">-- Seleccione una mascota --</option>';
        
        data.mascotas.forEach(m => {
            const option = document.createElement("option");
            option.value = m.id;
            option.textContent = `${m.nombre} (${m.especie}) - Dueño: ${m.cliente}`;
            option.dataset.mascota = JSON.stringify(m);
            selector.appendChild(option);
        });
    } catch (error) {
        console.error("Error al cargar mascotas:", error);
    }
}

// Configurar todos los eventos de la sección
function configurarEventosVacunacion() {
    // Botón cargar historial
    document.getElementById("btnCargarHistorial").addEventListener("click", cargarHistorialMascota);
    
    // Selector de mascota (cargar automáticamente al cambiar)
    document.getElementById("selectorMascota").addEventListener("change", function() {
        const selectedOption = this.options[this.selectedIndex];
        if (selectedOption.value) {
            mascotaSeleccionadaData = JSON.parse(selectedOption.dataset.mascota);
        }
    });
    
    // Tabs
    document.querySelectorAll(".tab-btn").forEach(btn => {
        btn.addEventListener("click", function() {
            cambiarTab(this.dataset.tab);
        });
    });
    
    // Botones modal
    document.getElementById("btnNuevaVacuna").addEventListener("click", abrirModalVacuna);
    document.getElementById("btnNuevoTratamiento").addEventListener("click", abrirModalTratamiento);
    
    // Guardar vacuna/tratamiento
    document.getElementById("btnGuardarVacuna").addEventListener("click", guardarVacuna);
    document.getElementById("btnGuardarTratamiento").addEventListener("click", guardarTratamiento);
}

// Cargar historial completo de la mascota
async function cargarHistorialMascota() {
    const selector = document.getElementById("selectorMascota");
    mascotaSeleccionadaId = selector.value;
    
    if (!mascotaSeleccionadaId) {
        alert("⚠️ Por favor selecciona una mascota");
        return;
    }
    
    // Mostrar info de la mascota
    mostrarInfoMascota();
    
    // Cargar vacunas y tratamientos
    await cargarVacunas(mascotaSeleccionadaId);
    await cargarTratamientos(mascotaSeleccionadaId);
    
    // Mostrar contenedor de historial
    document.getElementById("contenedorHistorial").style.display = "block";
}

// Mostrar información de la mascota seleccionada
function mostrarInfoMascota() {
    if (!mascotaSeleccionadaData) return;
    
    document.getElementById("nombreMascotaInfo").textContent = mascotaSeleccionadaData.nombre;
    document.getElementById("especieMascotaInfo").textContent = mascotaSeleccionadaData.especie;
    document.getElementById("razaMascotaInfo").textContent = mascotaSeleccionadaData.raza;
    document.getElementById("clienteMascotaInfo").textContent = mascotaSeleccionadaData.cliente;
    
    document.getElementById("infoMascotaSeleccionada").style.display = "block";
}

// Cargar vacunas de la mascota
async function cargarVacunas(mascotaId) {
    try {
        const response = await fetch(`/inicio/api/vacunas-mascota/${mascotaId}/`);
        const data = await response.json();
        
        const tbody = document.getElementById("cuerpoTablaVacunas");
        tbody.innerHTML = "";
        
        if (data.vacunas.length === 0) {
            tbody.innerHTML = `
                <tr>
                    <td colspan="6" style="text-align: center; padding: 40px;">
                        <div class="empty-state-icon">💉</div>
                        <h3>No hay vacunas registradas</h3>
                        <p>Comienza agregando la primera vacuna de ${data.mascota.nombre}</p>
                    </td>
                </tr>
            `;
            return;
        }
        
        data.vacunas.forEach(v => {
            const estado = v.dias_para_vencer < 0 
                ? '<span class="status-badge status-vencida">Vencida</span>'
                : v.dias_para_vencer < 30
                ? '<span class="status-badge status-proxima">Próxima a vencer</span>'
                : '<span class="status-badge status-vigente">Vigente</span>';
            
            tbody.innerHTML += `
                <tr>
                    <td>${v.id}</td>
                    <td>${v.nombre}</td>
                    <td>${v.fecha_aplicacion}</td>
                    <td>${v.fecha_vencimiento}</td>
                    <td>${v.lote}</td>
                    <td>${estado}</td>
                </tr>
            `;
        });
    } catch (error) {
        console.error("Error al cargar vacunas:", error);
    }
}

// Cargar tratamientos de la mascota
async function cargarTratamientos(mascotaId) {
    try {
        const response = await fetch(`/inicio/api/tratamientos-mascota/${mascotaId}/`);
        const data = await response.json();
        
        const tbody = document.getElementById("cuerpoTablaTratamientos");
        tbody.innerHTML = "";
        
        if (data.tratamientos.length === 0) {
            tbody.innerHTML = `
                <tr>
                    <td colspan="7" style="text-align: center; padding: 40px;">
                        <div class="empty-state-icon">💊</div>
                        <h3>No hay tratamientos registrados</h3>
                        <p>${data.mascota.nombre} no tiene tratamientos en su historial</p>
                    </td>
                </tr>
            `;
            return;
        }
        
        data.tratamientos.forEach(t => {
            tbody.innerHTML += `
                <tr>
                    <td>${t.id}</td>
                    <td>${t.descripcion}</td>
                    <td>${t.medicamento}</td>
                    <td>${t.dosis}</td>
                    <td>${t.duracion}</td>
                    <td>${t.fecha_inicio}</td>
                    <td>
                        <small>${t.cita_fecha}<br>${t.cita_motivo}</small>
                    </td>
                </tr>
            `;
        });
    } catch (error) {
        console.error("Error al cargar tratamientos:", error);
    }
}

// Cambiar entre tabs
function cambiarTab(tabName) {
    // Actualizar botones
    document.querySelectorAll(".tab-btn").forEach(btn => {
        btn.classList.remove("active");
    });
    document.querySelector(`[data-tab="${tabName}"]`).classList.add("active");
    
    // Actualizar contenido
    document.querySelectorAll(".tab-content").forEach(content => {
        content.classList.remove("active");
    });
    document.getElementById(`tab-${tabName}`).classList.add("active");
}

// ============================================
// MODALES
// ============================================

function abrirModalVacuna() {
    if (!mascotaSeleccionadaId) {
        alert("⚠️ Primero selecciona una mascota");
        return;
    }
    
    document.getElementById("vacunaMascotaId").value = mascotaSeleccionadaId;
    document.getElementById("formNuevaVacuna").reset();
    document.getElementById("modalNuevaVacuna").style.display = "block";
}

function cerrarModalVacuna() {
    document.getElementById("modalNuevaVacuna").style.display = "none";
}

async function abrirModalTratamiento() {
    if (!mascotaSeleccionadaId) {
        alert("⚠️ Primero selecciona una mascota");
        return;
    }
    
    // Cargar citas de la mascota
    await cargarCitasMascota(mascotaSeleccionadaId);
    
    document.getElementById("tratamientoMascotaId").value = mascotaSeleccionadaId;
    document.getElementById("formNuevoTratamiento").reset();
    document.getElementById("modalNuevoTratamiento").style.display = "block";
}

function cerrarModalTratamiento() {
    document.getElementById("modalNuevoTratamiento").style.display = "none";
}

// Cargar citas de la mascota para el selector de tratamiento
async function cargarCitasMascota(mascotaId) {
    try {
        // Aquí necesitarías una API que devuelva las citas de esta mascota
        // Por ahora, ponemos un placeholder
        const selector = document.getElementById("citaTratamiento");
        selector.innerHTML = '<option value="">Cargando citas...</option>';
        
        // TODO: Implementar API de citas por mascota
        selector.innerHTML = '<option value="">Seleccione una cita...</option>';
    } catch (error) {
        console.error("Error al cargar citas:", error);
    }
}

// ============================================
// GUARDAR REGISTROS
// ============================================

async function guardarVacuna() {
    const form = document.getElementById("formNuevaVacuna");
    const formData = new FormData(form);
    const csrf = getCookie("csrftoken");
    
    try {
        const response = await fetch("/inicio/api/registrar-vacuna/", {
            method: "POST",
            headers: { "X-CSRFToken": csrf },
            body: formData
        });
        
        const data = await response.json();
        
        if (data.status === "ok") {
            alert("✅ Vacuna registrada correctamente");
            cerrarModalVacuna();
            await cargarVacunas(mascotaSeleccionadaId);
        } else {
            alert("❌ Error: " + data.message);
        }
    } catch (error) {
        console.error("Error:", error);
        alert("❌ Error al guardar la vacuna");
    }
}

async function guardarTratamiento() {
    const form = document.getElementById("formNuevoTratamiento");
    const formData = new FormData(form);
    const csrf = getCookie("csrftoken");
    
    try {
        const response = await fetch("/inicio/api/registrar-tratamiento/", {
            method: "POST",
            headers: { "X-CSRFToken": csrf },
            body: formData
        });
        
        const data = await response.json();
        
        if (data.status === "ok") {
            alert("✅ Tratamiento registrado correctamente");
            cerrarModalTratamiento();
            await cargarTratamientos(mascotaSeleccionadaId);
        } else {
            alert("❌ Error: " + data.message);
        }
    } catch (error) {
        console.error("Error:", error);
        alert("❌ Error al guardar el tratamiento");
    }
}

// ============================================
// 📊 FUNCIONALIDAD REPORTES Y FACTURAS
// ============================================

let facturasOriginales = [];

function inicializarReportes() {
    cargarResumenFacturas();
    cargarFacturas();
    configurarEventosReportes();
}

// Cargar resumen estadístico
async function cargarResumenFacturas() {
    try {
        const response = await fetch("/inicio/api/resumen-facturas/");
        const data = await response.json();
        
        if (data.status === "ok") {
            const r = data.resumen;
            document.getElementById("totalIngresos").textContent = `$${r.total_ingresos.toFixed(2)}`;
            document.getElementById("totalPendiente").textContent = `$${r.total_pendiente.toFixed(2)}`;
            document.getElementById("totalFacturas").textContent = r.total_facturas;
        }
    } catch (error) {
        console.error("Error al cargar resumen:", error);
    }
}

// Cargar todas las facturas
async function cargarFacturas() {
    try {
        const response = await fetch("/inicio/api/listar-facturas/");
        const data = await response.json();
        
        if (data.status === "ok") {
            facturasOriginales = data.facturas;
            renderTablaFacturas(facturasOriginales);
        }
    } catch (error) {
        console.error("Error al cargar facturas:", error);
    }
}

// Renderizar tabla de facturas
function renderTablaFacturas(facturas) {
    const tbody = document.getElementById("cuerpoTablaFacturas");
    tbody.innerHTML = "";
    
    if (facturas.length === 0) {
        tbody.innerHTML = `
            <tr>
                <td colspan="7" style="text-align: center; padding: 40px;">
                    <div class="empty-state-icon">📄</div>
                    <h3>No hay facturas registradas</h3>
                    <p>Comienza creando tu primera factura</p>
                </td>
            </tr>
        `;
        return;
    }
    
    facturas.forEach(f => {
        let estadoBadge = '';
        if (f.estado === 'Pagada') {
            estadoBadge = '<span class="status-badge status-vigente">Pagada</span>';
        } else if (f.estado === 'Pendiente') {
            estadoBadge = '<span class="status-badge status-proxima">Pendiente</span>';
        } else {
            estadoBadge = '<span class="status-badge status-vencida">Cancelada</span>';
        }
        
        tbody.innerHTML += `
            <tr>
                <td>${f.id}</td>
                <td>${f.fecha}</td>
                <td>${f.cliente}</td>
                <td>${f.cita_motivo}</td>
                <td>$${f.monto.toFixed(2)}</td>
                <td>${estadoBadge}</td>
                <td>
                    <div class="action-buttons">
                        <button class="btn-icon btn-view" title="Ver detalles" onclick="verDetalleFactura(${f.id})">👁️</button>
                        <button class="btn-icon btn-edit" title="Cambiar estado" onclick="abrirModalCambiarEstado(${f.id}, '${f.estado}')">✏️</button>
                    </div>
                </td>
            </tr>
        `;
    });
}

// Configurar eventos
function configurarEventosReportes() {
    // Filtro por estado
    document.getElementById("filtroEstado").addEventListener("change", function() {
        const estado = this.value;
        if (estado === "") {
            renderTablaFacturas(facturasOriginales);
        } else {
            const filtradas = facturasOriginales.filter(f => f.estado === estado);
            renderTablaFacturas(filtradas);
        }
    });
    
    // Botón nueva factura
    document.getElementById("btnNuevaFactura").addEventListener("click", abrirModalNuevaFactura);
    
    // Botón guardar factura
    document.getElementById("btnGuardarFactura").addEventListener("click", guardarFactura);
    
    // Botón actualizar estado
    document.getElementById("btnActualizarEstado").addEventListener("click", actualizarEstadoFactura);
}

// ============================================
// VER DETALLE DE FACTURA
// ============================================
async function verDetalleFactura(facturaId) {
    try {
        const response = await fetch(`/inicio/api/detalle-factura/${facturaId}/`);
        const data = await response.json();
        
        if (data.status === "ok") {
            const d = data.detalle;
            
            let estadoColor = d.estado_pago === 'Pagada' ? 'green' : 
                            d.estado_pago === 'Pendiente' ? 'orange' : 'red';
            
            document.getElementById("detalleFacturaContenido").innerHTML = `
                <div class="detalle-seccion">
                    <h3>📄 Información de la Factura</h3>
                    <div class="detalle-grid">
                        <div class="detalle-item">
                            <strong>ID Factura:</strong> ${d.id}
                        </div>
                        <div class="detalle-item">
                            <strong>Fecha Emisión:</strong> ${d.fecha_emision}
                        </div>
                        <div class="detalle-item">
                            <strong>Monto Total:</strong> <span style="color: green; font-size: 18px; font-weight: bold;">$${d.monto_total.toFixed(2)}</span>
                        </div>
                        <div class="detalle-item">
                            <strong>Estado:</strong> <span style="color: ${estadoColor}; font-weight: bold;">${d.estado_pago}</span>
                        </div>
                    </div>
                </div>

                <div class="detalle-seccion">
                    <h3>👤 Información del Cliente</h3>
                    <div class="detalle-grid">
                        <div class="detalle-item">
                            <strong>Nombre:</strong> ${d.cliente_nombre}
                        </div>
                        <div class="detalle-item">
                            <strong>Email:</strong> ${d.cliente_email}
                        </div>
                        <div class="detalle-item">
                            <strong>Teléfono:</strong> ${d.cliente_telefono}
                        </div>
                    </div>
                </div>

                <div class="detalle-seccion">
                    <h3>📅 Información de la Cita</h3>
                    <div class="detalle-grid">
                        <div class="detalle-item">
                            <strong>Fecha Cita:</strong> ${d.cita_fecha}
                        </div>
                        <div class="detalle-item">
                            <strong>Mascota:</strong> ${d.mascota_nombre}
                        </div>
                        <div class="detalle-item full-width">
                            <strong>Motivo:</strong> ${d.cita_motivo}
                        </div>
                    </div>
                </div>

                <div class="detalle-seccion">
                    <h3>🔧 Información Administrativa</h3>
                    <div class="detalle-grid">
                        <div class="detalle-item">
                            <strong>Administrador:</strong> ${d.administrador}
                        </div>
                    </div>
                </div>
            `;
            
            document.getElementById("modalDetalleFactura").style.display = "block";
        }
    } catch (error) {
        console.error("Error:", error);
        alert("Error al cargar detalles de la factura");
    }
}

function cerrarModalDetalle() {
    document.getElementById("modalDetalleFactura").style.display = "none";
}

// ============================================
// NUEVA FACTURA
// ============================================
async function abrirModalNuevaFactura() {
    try {
        // Cargar datos para el formulario
        const response = await fetch("/inicio/api/datos-factura/");
        const data = await response.json();
        
        if (data.status === "ok") {
            // Llenar selector de citas
            const citaSelect = document.getElementById("citaFactura");
            citaSelect.innerHTML = '<option value="">Seleccione una cita...</option>';
            data.citas.forEach(c => {
                const option = document.createElement("option");
                option.value = c.id;
                option.textContent = `${c.fecha} - ${c.cliente_nombre} (${c.mascota}) - ${c.motivo}`;
                option.dataset.clienteId = c.cliente_id;
                citaSelect.appendChild(option);
            });
            
            // Llenar selector de administradores
            const adminSelect = document.getElementById("administradorFactura");
            adminSelect.innerHTML = '<option value="">Seleccione...</option>';
            data.administradores.forEach(a => {
                const option = document.createElement("option");
                option.value = a.id;
                option.textContent = a.nombre;
                adminSelect.appendChild(option);
            });
            
            // Configurar fecha actual por defecto
            document.getElementById("fechaEmision").valueAsDate = new Date();
            
            // Listener para autocompletar cliente_id al seleccionar cita
            citaSelect.addEventListener("change", function() {
                const selectedOption = this.options[this.selectedIndex];
                if (selectedOption.value) {
                    document.getElementById("clienteIdFactura").value = selectedOption.dataset.clienteId;
                }
            });
        }
        
        document.getElementById("formNuevaFactura").reset();
        document.getElementById("modalNuevaFactura").style.display = "block";
    } catch (error) {
        console.error("Error:", error);
        alert("Error al cargar datos del formulario");
    }
}

function cerrarModalNuevaFactura() {
    document.getElementById("modalNuevaFactura").style.display = "none";
}

async function guardarFactura() {
    const form = document.getElementById("formNuevaFactura");
    const formData = new FormData(form);
    const csrf = getCookie("csrftoken");
    
    try {
        const response = await fetch("/inicio/api/registrar-factura/", {
            method: "POST",
            headers: { "X-CSRFToken": csrf },
            body: formData
        });
        
        const data = await response.json();
        
        if (data.status === "ok") {
            alert("✅ Factura registrada correctamente");
            cerrarModalNuevaFactura();
            await cargarResumenFacturas();
            await cargarFacturas();
        } else {
            alert("❌ Error: " + data.message);
        }
    } catch (error) {
        console.error("Error:", error);
        alert("❌ Error al guardar la factura");
    }
}

// ============================================
// CAMBIAR ESTADO DE FACTURA
// ============================================
function abrirModalCambiarEstado(facturaId, estadoActual) {
    document.getElementById("facturaIdEstado").value = facturaId;
    document.getElementById("nuevoEstadoPago").value = estadoActual;
    document.getElementById("modalCambiarEstado").style.display = "block";
}

function cerrarModalEstado() {
    document.getElementById("modalCambiarEstado").style.display = "none";
}

async function actualizarEstadoFactura() {
    const form = document.getElementById("formCambiarEstado");
    const formData = new FormData(form);
    const csrf = getCookie("csrftoken");
    
    try {
        const response = await fetch("/inicio/api/actualizar-estado-factura/", {
            method: "POST",
            headers: { "X-CSRFToken": csrf },
            body: formData
        });
        
        const data = await response.json();
        
        if (data.status === "ok") {
            alert("✅ Estado actualizado correctamente");
            cerrarModalEstado();
            await cargarResumenFacturas();
            await cargarFacturas();
        } else {
            alert("❌ Error: " + data.message);
        }
    } catch (error) {
        console.error("Error:", error);
        alert("❌ Error al actualizar el estado");
    }
}



// Cargar citas de la mascota para el selector de tratamiento
async function cargarCitasMascota(mascotaId) {
    try {
        const selector = document.getElementById("citaTratamiento");
        selector.innerHTML = '<option value="">Cargando citas...</option>';
        
        // Llamar a la API para obtener las citas de esta mascota
        const response = await fetch(`/inicio/api/citas-mascota/${mascotaId}/`);
        const data = await response.json();
        
        selector.innerHTML = '<option value="">Seleccione una cita...</option>';
        
        if (data.status === "ok" && data.citas.length > 0) {
            data.citas.forEach(cita => {
                const option = document.createElement("option");
                option.value = cita.id;
                option.textContent = `${cita.fecha} - ${cita.motivo} (${cita.veterinario})`;
                selector.appendChild(option);
            });
        } else {
            const option = document.createElement("option");
            option.value = "";
            option.textContent = "No hay citas registradas para esta mascota";
            option.disabled = true;
            selector.appendChild(option);
        }
    } catch (error) {
        console.error("Error al cargar citas:", error);
        const selector = document.getElementById("citaTratamiento");
        selector.innerHTML = '<option value="">Error al cargar citas</option>';
    }
}