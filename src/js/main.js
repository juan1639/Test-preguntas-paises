// =================================================================
//  Test de preguntas de Paises del mundo (main.js)
// -----------------------------------------------------------------
import { Settings } from './settings.js';
import { loadData } from './load_data.js';
import { comenzar_partida } from './en_juego.js';
import { toggle_music, change_numero_preguntas } from './funciones_aux.js';

const context = { settings: undefined };

window.onload = () =>
{
    context.settings = new Settings();
    context.settings.initDOM();

    context.settings.doms.botonesInicio[0].addEventListener('click', () => comenzar_partida());
    context.settings.doms.botonMusic.addEventListener('click', () => toggle_music());
    context.settings.doms.selectPreguntas[0].addEventListener('change', (ev) => change_numero_preguntas(ev));

    loadData().then((paises) =>
    {
        context.settings.todosLosPaises = paises;
        console.log(context.settings.todosLosPaises.length);

        context.settings.estado.preFetch = false;
        context.settings.estado.preJuego = true;
        
        // Podés continuar usando `todosLosPaises` aquí
    });
}

export { context };
