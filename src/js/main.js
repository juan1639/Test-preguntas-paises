// =================================================================
//  Test de preguntas de Paises del mundo (main.js)
// -----------------------------------------------------------------
import { Settings } from './settings.js';
import { loadData } from './load_data.js';
import { touchStart, click } from './eventos.js';

const context = { settings: undefined };

let todosLosPaises = [];

window.onload = () =>
{
    context.settings = new Settings();
    context.settings.initDOM();

    loadData().then((paises) =>
    {
        todosLosPaises = paises;
        console.log(todosLosPaises.length);

        context.settings.estado.preFetch = false;
        context.settings.estado.preJuego = true;

        // Podés continuar usando `todosLosPaises` aquí
    });
}

export { context };
