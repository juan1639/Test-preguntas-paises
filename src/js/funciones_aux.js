import { context } from "./main.js";

export function check_respuesta_correcta_es_array(respuestaCorrecta)
{
    console.log(typeof respuestaCorrecta);

    if (typeof respuestaCorrecta === 'object')
    {
        return respuestaCorrecta[0];
    }
    
    return respuestaCorrecta;
}

export function generar_opciones_incorrectas(respuestaCorrectaKey, paisRnd)
{
    const { constantes, todosLosPaises } = context.settings;

    if (respuestaCorrectaKey === 'continents')
    {
        const arrayIncorrectas = generar_opciones_continentes(paisRnd);
        return arrayIncorrectas;
    }
    
    const arrayIndices = [];
    arrayIndices.push(paisRnd);// 1er elemento la correcta
    
    const arrayIncorrectas = [];

    let rnd;

    for (let i = 0; i < constantes.NUMERO_OPCIONES_RESPUESTAS; i ++)
    {
        do {
            rnd = Math.floor(Math.random() * todosLosPaises.length);
        }
        while (arrayIndices.includes(rnd));

        arrayIndices.push(rnd);
        arrayIncorrectas.push(todosLosPaises[rnd][respuestaCorrectaKey]);
    }
    
    return arrayIncorrectas;
}

function generar_opciones_continentes(paisRnd)
{
    const { constantes, todosLosPaises } = context.settings;

    const arrayContinentes = ['Europe', 'Asia', 'Africa', 'Antarctica', 'North America', 'South America', 'Oceania'];

    const correctas = todosLosPaises[paisRnd]['continents'];
    const correcta = check_respuesta_correcta_es_array(correctas);

    const arrayIncorrectas = [];

    let rnd;

    for (let i = 0; i < constantes.NUMERO_OPCIONES_RESPUESTAS; i ++)
    {
        do {
            rnd = Math.floor(Math.random() * arrayContinentes.length);
        }
        while (correcta.toLowerCase() === arrayContinentes[rnd].toLowerCase() || arrayIncorrectas.includes(arrayContinentes[rnd]));

        arrayIncorrectas.push(arrayContinentes[rnd]);
    }

    return arrayIncorrectas;
}

export function volver_menu_principal(modal)
{
    const { estado, resultado, doms } = context.settings;

    estado.gameOver = false;
    estado.preJuego = true;

    resultado.contadorPreguntas = 0;

    doms.opciones.innerHTML = '';
    doms.pregunta.innerHTML = '';

    modal.remove();

    doms.botonesInicio[0].classList.remove("oculto");
    doms.botonesInicio[0].classList.add("no-oculto");

    doms.selectPreguntas[0].classList.remove("oculto");
    doms.selectPreguntas[0].classList.add("no-oculto");

    doms.botonMusic.classList.remove('no-oculto');
    doms.botonMusic.classList.add('oculto');

    doms.pregunta.classList.remove('no-oculto-flex');
    doms.pregunta.classList.add('oculto');

    doms.restCountriesLink[0].classList.remove('oculto');
    doms.restCountriesLink[0].classList.add('no-oculto');

    doms.infoContainer[0].classList.remove("no-oculto-flex");
    doms.infoContainer[0].classList.add("oculto");
}

export function modal_fin_test()
{
    const { resultado, doms } = context.settings;

    resultado.porcentaje = (resultado.acertadas * 10) / resultado.totalPreguntas;

    const modal = document.createElement('div');
    modal.setAttribute('class', 'modal');
    modal.setAttribute('id', 'modal-fin-test');
    modal.textContent = "Resultado del Test";
    doms.main.appendChild(modal);

    const separador = document.createElement('hr');
    modal.appendChild(separador);
    
    const acertadas = document.createElement('p');
    acertadas.setAttribute('class', 'info');
    acertadas.classList.add('margen-top');
    acertadas.textContent = `Acertadas: ${resultado.acertadas} / ${resultado.totalPreguntas}`;
    modal.appendChild(acertadas);
    
    const nota = document.createElement('p');
    nota.setAttribute('class', 'info');
    nota.textContent = `Nota: ${resultado.porcentaje}`;
    modal.appendChild(nota);

    const boton = document.createElement('button');
    boton.setAttribute('class', 'botones-acciones');
    boton.classList.add('no-oculto');
    boton.setAttribute('id', 'boton-continuar');
    boton.classList.add('margen-top');
    boton.textContent = 'Continuar';
    boton.addEventListener('click', () => volver_menu_principal(modal));
    modal.appendChild(boton);
}

export function change_numero_preguntas(ev)
{
    console.log(ev.target.value);
    //console.log(ev);
    //console.log(typeof ev.target.value);

    // Si los settings todavia son null... return
    if (typeof context.settings === 'undefined') return;

    // -------------------- Opciones change ------------------------
    /* if (ev.target.classList.contains('selector-numero-preguntas'))
    {
        // Asignamos el numero de preguntas a la variable 'totalPreguntas':
        context.settings.resultado.totalPreguntas = Number.parseInt(ev.target.value);
        console.log("Numero preguntas: ", Number.parseInt(ev.target.value));
    } */
    
    context.settings.resultado.totalPreguntas = Number.parseInt(ev.target.value);
    console.log("Numero preguntas: ", Number.parseInt(ev.target.value));
}

export function toggle_music()
{
    const { sonidos } = context.settings;

    if (sonidos.musicafondo.paused)
    {
        sonidos.musicafondo.play();
    }
    else
    {
        sonidos.musicafondo.pause();
    }
}
