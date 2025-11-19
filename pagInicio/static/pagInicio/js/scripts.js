// Seleccionamos todos los items de la sidebar
const menuItems = document.querySelectorAll('.sidebar .menu-item');

menuItems.forEach(item => {
    item.addEventListener('click', function() {
        const opcion = this.getAttribute('data-opcion'); // obtenemos la opción
        const contenido = document.getElementById('contenido-dinamico');

        // Cambiamos el contenido según la opción
        switch(opcion){
            case 'dashboard':
                contenido.innerHTML = ` 

                `;
                break;

            case 'registrar':
                contenido.innerHTML = `

                `;
                break;
                
            case 'agendar':
                contenido.innerHTML = `

                    <div class="seccion-agendarJS">
                        <h1> Hola mi gente</h1>
                    </div>

                `;
                break;
            case 'consultar':
                contenido.innerHTML = `<h2>Consultar</h2><p>Contenido de la opción Consultar...</p>`;
                break;
            case 'vacunacion':
                contenido.innerHTML = `<h2>Vacunación</h2><p>Contenido de la opción Vacunación...</p>`;
                break;
            case 'reportes':
                contenido.innerHTML = `<h2>Reportes</h2><p>Contenido de la opción Reportes...</p>`;
                break;
            case 'configuracion':
                contenido.innerHTML = `<h2>Configuración</h2><p>Contenido de la opción Configuración...</p>`;
                break;
        }

        // Actualizamos la clase "active"
        menuItems.forEach(i => i.classList.remove('active'));
        this.classList.add('active');
    });
});
