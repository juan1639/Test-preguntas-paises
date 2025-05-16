const URL_API_RESTCOUNTRIES = 'https://restcountries.com/v3.1/';
const URL_API_RESTCOUNTRIES_ALL = 'https://restcountries.com/v3.1/all';
let todosLosPaises = [];

const contenedor = document.getElementById('paises');
const buscador = document.getElementById('buscador');
const orden = document.getElementById('orden');
const continente = document.getElementById('continente');

fetch(URL_API_RESTCOUNTRIES_ALL)
    .then(res => res.json())
    .then(data => {
        todosLosPaises = data;
        mostrarPaises();
    })
    .catch(err => {
        contenedor.innerHTML = 'Error al cargar países.';
        console.error(err);
    });

function mostrarPaises()
{
    const textoBusqueda = buscador.value.toLowerCase();
    const ordenSeleccionado = orden.value;

    let filtrados = todosLosPaises.filter(p =>
        p.name.common.toLowerCase().includes(textoBusqueda)
    );

    if (continente.value !== 'todos')
    {
        filtrados = filtrados.filter(p => p.region === continente.value);
    }

    filtrados.sort((a, b) =>
    {
        const nombreA = a.name.common.toLowerCase();
        const nombreB = b.name.common.toLowerCase();

        return ordenSeleccionado === 'az'
        ? nombreA.localeCompare(nombreB)
        : nombreB.localeCompare(nombreA);
    });

    contenedor.innerHTML = '';
    
    filtrados.forEach(pais =>
    {
        const div = document.createElement('div');
        div.className = 'pais';

        const idiomas = pais.languages
        ? Object.values(pais.languages).join(', ')
        : 'N/A';

        const detallesHTML = `
        <div class="detalles" style="display: none; margin-top: 10px; font-size: 0.95em;">
            <div>🧑‍🤝‍🧑 <strong>Población:</strong> ${pais.population.toLocaleString()}</div>
            <div>🗣️ <strong>Idiomas:</strong> ${idiomas}</div>
        </div>
        `;

        div.innerHTML = `
        <img class="bandera" src="${pais.flags.svg}" alt="Bandera de ${pais.name.common}" />
        <div>
            <strong>${pais.name.common}</strong><br>
            Capital: ${pais.capital ? pais.capital[0] : 'N/A'}<br>
            Región: ${pais.region}
            ${detallesHTML}
        </div>
        `;

        // Añadir evento para mostrar/ocultar detalles
        div.addEventListener('click', () => {
        const detalles = div.querySelector('.detalles');
        detalles.style.display = detalles.style.display === 'none' ? 'block' : 'none';
        });

        contenedor.appendChild(div);
    });
}

buscador.addEventListener('input', mostrarPaises);
orden.addEventListener('change', mostrarPaises);
continente.addEventListener('change', mostrarPaises);
