// Seleccionar todos los botones del sidebar
const botones = document.querySelectorAll(".menu-item");

// Contenedor donde se actualizará el contenido
const contenedor = document.getElementById("contenido-dinamico");

// Plantillas HTML para cada sección
const secciones = {
    dashboard: `
        <h2>Dashboard</h2>
        <p>Bienvenido al panel principal.</p>
    `,
    registrar: `
        <h2>Registrar</h2>
        <p>Formulario de registro próximamente...</p>
    `,
    agendar: `
        <h2>Agendar</h2>
        <p>Agenda tus citas aquí.</p>
    `,
    consultar: `
        <h2>Consultar</h2>
        <p>Consulta la información registrada.</p>
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
    });
});
