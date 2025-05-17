const URL_API_RESTCOUNTRIES = 'https://restcountries.com/v3.1/';
const URL_API_RESTCOUNTRIES_ALL = 'https://restcountries.com/v3.1/all';
let todosLosPaises = [];

export const loadData = async () =>
{
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 3200); // 3,2 segundos

    try
    {
        const res = await fetch(URL_API_RESTCOUNTRIES_ALL, {
            signal: controller.signal,
        });

        clearTimeout(timeoutId); // Si responde, cancelamos el timeout

        if (!res.ok)
        {
            console.log('Error! al acceder a la API...');
            throw new Error("No se pudo acceder a la API");
        }

        const response = await res.json();
        todosLosPaises = response;

        console.log("Datos cargados correctamente...");
        console.log(todosLosPaises);
        
        return todosLosPaises;
    }
    catch (err)
    {
        const BASE_PATH = window.location.pathname.split('/')[1]; // obtener el path-base en produccion

        const resBackup = await fetch(`/${BASE_PATH}/json/paises_backup.json`);
        // const resBackup = await fetch('../../json/paises_backup.json'); // path-base local

        todosLosPaises = await resBackup.json();

        console.log(todosLosPaises);
        console.error("Fallo el acceso a la API, usando backup local:", err);

        return todosLosPaises;
    }
}
