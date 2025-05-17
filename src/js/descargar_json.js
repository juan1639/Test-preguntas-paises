// ====================================================================
//  Obtener un archivo Json (para trabajar en local)
// --------------------------------------------------------------------
const URL_API_RESTCOUNTRIES = 'https://restcountries.com/v3.1/';
const URL_API_RESTCOUNTRIES_ALL = 'https://restcountries.com/v3.1/all';
let todosLosPaises = [];

const botonDownload = document.getElementById("boton-download");
botonDownload.addEventListener("click", () => descargarJSON(todosLosPaises));

fetch(URL_API_RESTCOUNTRIES_ALL)
    .then(res => res.json())
    .then(data => {
        todosLosPaises = data;
        //mostrarPaises();
    })
    .catch(err => {
        contenedor.innerHTML = 'Error al cargar países.';
        console.error(err);
    });


const descargarJSON = datos =>
{
    const jsonStr = JSON.stringify(datos, null, 2)
    const blob = new Blob([jsonStr], { type: "application/json" })
    const url = URL.createObjectURL(blob)

    const enlace = document.createElement("a")
    enlace.href = url
    enlace.download = "proyectos.json"
    enlace.click()

    URL.revokeObjectURL(url)
}
