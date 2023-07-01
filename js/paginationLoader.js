window.addEventListener('DOMContentLoaded', () => {

	//Señaladores de elementos ancla de la página principal
	const clinicasEl = document.querySelector('.lista-clinicas');
	const loadingEl = document.querySelector('.aviso-carga');

	//Función de carga del JSON (por si a futuro invoco una api externa con paginación)
	async function cargarJson(pagina, limite) {
		// Ruta del archivo JSON
		const jsonFile = `simulate/clinicas.json?page=${pagina}&limit=${limite}`;

		const respuesta = await fetch(jsonFile);

		if (!respuesta.ok) {
			throw new Error(`Error al obtener el archivo JSON: ${respuesta.status}` );
		}
		
		return await respuesta.json();
	}

	function mostrarClinicas(clinicas) {
		clinicas.forEach(clinica => {
			var aggregate = (clinica.rate_edil + clinica.rate_medi + clinica.rate_serv) / 3;

			const clinicaEl = document.createElement('div');
			clinicaEl.classList.add('clinica-cbox');
			clinicaEl.innerHTML = `
				<div id=${clinica.id}>
					<ul>
						<li>${clinica.nombre}</li>
						<ul>
							<li>${clinica.direccion}, ${clinica.localidad}</li>
							<li>${clinica.telefono}</li>
							<li>Puntaje: ${aggregate}</li>
								<ul>
									<li>Infraestructura: ${clinica.rate_edil}</li>
									<li>Calidad médica: ${clinica.rate_medi}</li>
									<li>Servicios y atención: ${clinica.rate_serv}</li>
								</ul>
						</ul>
					</ul>
					<iframe
                		width="350"
                		height="175"
                		frameborder="0" style="border:0"
                		referrerpolicy="no-referrer-when-downgrade"
                		src="https://www.google.com/maps/embed/v1/place?key=AIzaSyAis_Yld0JpPyQJaMnBGW8XP5ZGU7cm_CY&q=${clinica.direccion}, ${clinica.localidad}"
                		loading="lazy"
                		allowfullscreen>
            		</iframe>
				</div>
			`;

			clinicasEl.appendChild(clinicaEl);
		});

	}

	const ocultarLoad = () => {
        loadingEl.classList.remove('show');
    };

    const mostrarLoad = () => {
        loadingEl.classList.add('show');
    };

	// Función para controlar si se llegó al final de la lista de elementos. Compara el índice del próximo elemento hipotético (si quedaran páginas por cargar) con el valor de la variable "total" (recuperado por la API), porque si había menos elementos de los necesarios para llenar la última página, entonces no queda nada por cargar.
	function quedanElementos(pagina, limite, total) {
		// Variable para almacenar el índice del (hipotético) primer elemento de la próxima página. Utiliza "pagina - 1" porque se invoca luego de actualizar el valor de la variable, por lo que debe controlar respecto al valor anterior.
        const indiceIni = (pagina - 1) * limite + 1;
		// "indiceIni" retorna por lo menos 1, por lo que en la primera ejecución siempre va a ser mayor que "total" (que inicia siendo 0). La excepción es manejada con el condicional, que retorna verdadero si "total" es igual a 0.
        return total === 0 || indiceIni < total;
    };

	async function cargarClinicas(pagina, limite) {

        // Mostrar el indicador de carga
        mostrarLoad();

        // Esperar 0.5 segundos y ejecutar la carga
        setTimeout(async () => {
            try {
                // Revisar si quedan más clínicas en la lista
                if (quedanElementos(pagina, limite, total)) {
                    // Invocar la función de carga
                    const respuesta = await cargarJson(pagina, limite);
                    // Mostrar la nueva lista
					console.log(respuesta);
                    mostrarClinicas(respuesta);
                    // Actualziar el total
                    total = respuesta.length;
                }
            } catch (err) {
				if(typeof err.code === "undefined") {
					console.log(err.message);
				} else {
					console.log(err.name, ": ", err.message);
				}
            } finally {
				// Una vez cargados los elementos, volver a ocultar el indicador de carga
                ocultarLoad();
            }
        }, 500); //500 milisegundos. Punto para configurar el tiempo de carga

    };


// VARIABLES DE CONTROL
// Variable para almacenar la página actual. Será actualizada cada vez que se llame a la función "cargarClinicas", para asegurar que la próxima llamada a la misma función comience a buscar desde el elemento siguiente al último cargado (función "cargarJson")
    let paginaActual = 1; 
// Constante para establecer cuantos elementos (clínicas) queremos que se carguen cada vez que el usuario llega al final de la lista de elementos ya cargados. Editarla en función del volúmen final de la content box (Posible mejora: ajustar el valor en función de los puntos de corte)
    const limite = 10;
// Variable que almacena el total de elementos en la tabla de la base de datos.
    let total = 0;

	// Listener para controlar si el usuario llegó al final de la página. Si lo hizo se ejecutará el código
	window.addEventListener('scroll', () => {
        const {
            scrollTop,
            scrollHeight,
            clientHeight
        } = document.documentElement;

        if (scrollTop + clientHeight >= scrollHeight - 5 && quedanElementos(paginaActual, limite, total)) {
			paginaActual++;
            cargarClinicas(paginaActual, limite);
        }
    }, { passive: true });

	// Inicialización (primera carga, antes de tener nada que scrollear)
	cargarClinicas(paginaActual, limite);
});