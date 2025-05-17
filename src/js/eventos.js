import { context } from "./main.js";
import { comenzar_partida, siguiente_pregunta } from "./en_juego.js";

// ======================================================================
//  EVENTOS Click
// 
// ----------------------------------------------------------------------
export const click = document.addEventListener('click', (event) =>
{
    console.log(event.target.id);
    //console.log(event);
    const clickar = event.target.id;
    const evento = event;

    // Si los settings todavia son null... return
    if (typeof context.settings === 'undefined') return;

    // ---------- Opciones click ------------
    const settings = context.settings;

    if (clickar === 'boton-toggle-music')
    {
        if (settings.sonidos.musicafondo.paused)
        {
            settings.sonidos.musicafondo.play();
        }
        else
        {
            settings.sonidos.musicafondo.pause();
        }
    }
    
    if (settings.estado.preJuego)
    {
        if (clickar === 'boton-comenzar')
        {
            console.log('comenzar partida!');
            comenzar_partida();
        }
    }
    else if (settings.estado.enJuego)
    {
        if (clickar === 'respuesta-9')
        {
            console.log("*** respuesta correcta ***");
            siguiente_pregunta(true, clickar);
        }
        else if (clickar.startsWith('respuesta-'))
        {
            console.log('*** respuesta erronea ***');
            siguiente_pregunta(false, clickar);
        }
    }
});

// ======================================================================
//  EVENTOS touchstart
// 
// ----------------------------------------------------------------------
export const touchStart = document.addEventListener('touchstart', (event) =>
{
    //console.log(event.target.id, event.targetTouches);
    const touch = event.target.id;
    const evento = event;

    // Si los settings todavia son null... return
    if (typeof context.settings === 'undefined') return;

    // ---------- Opciones touch ------------
    const settings = context.settings;

    if (touch === 'boton-toggle-music')
    {
        console.log(touch, 'touch');

        if (settings.sonidos.musicafondo.paused)
        {
            settings.sonidos.musicafondo.play();
        }
        else
        {
            settings.sonidos.musicafondo.pause();
        }
        siguiente_pregunta();
    }

    if (settings.estado.preJuego)
    {
        if (touch === 'boton-comenzar')
        {
            console.log('comenzar partida!');
            comenzar_partida();
        }
    }
    else if (settings.estado.enJuego)
    {
        if (touch === 'respuesta-9')
        {
            console.log("*** respuesta correcta! ***");
            siguiente_pregunta(true);
        }
        else if (touch.startsWith('respuesta-'))
        {
            console.log('*** respuesta erronea ***');
            siguiente_pregunta(false);
        }
    }
});

// ----------------------------------------------------------------------
//  EVENTOS touchend
// 
// ----------------------------------------------------------------------
/* export const touchEnd = document.addEventListener('touchend', (event) => {

    console.log(event.target.id, event.targetTouches);
    const keysTeclas = Object.keys(settings.tecla);
    const touchEnd = event.target.id;
    
    if (settings.estado.enJuego) {

        for (let idTecla of keysTeclas) {

            if (touchEnd === settings.tecla[idTecla][0] || touchEnd === settings.tecla[idTecla][1]) {
                settings.controles[idTecla] = false;
            }
        }
    }
}); */
