import { context } from "./main.js";
import
{
    check_respuesta_correcta_es_array,
    generar_opciones_incorrectas,
    modal_fin_test
} from "./funciones_aux.js";

function comenzar_partida()
{
    console.log("*** comienza test ***");

    const { estado, resultado, doms, clickRespuesta, sonidos} = context.settings;

    estado.preJuego = false;
    estado.enJuego = true;

    resultado.acertadas = 0;
    resultado.contadorPreguntas ++;
    clickRespuesta.bandera = false;

    doms.botonesInicio[0].classList.remove("no-oculto");
    doms.botonesInicio[0].classList.add("oculto");

    doms.selectPreguntas[0].classList.remove("no-oculto");
    doms.selectPreguntas[0].classList.add("oculto");

    doms.botonMusic.classList.remove('oculto');
    doms.botonMusic.classList.add("no-oculto");

    doms.restCountriesLink[0].classList.remove('no-oculto');
    doms.restCountriesLink[0].classList.add('oculto');

    renderizar_info();

    sonidos.musicafondo.play();

    crear_pregunta();
}

function crear_pregunta()
{
    const { constantes, tipoPregunta, doms, todosLosPaises, clickRespuesta } = context.settings;

    clickRespuesta.bandera = false;

    // Hacemos visible el elemento-DOM contenedor de la 'pregunta':
    doms.pregunta.classList.add('no-oculto-flex');
    doms.pregunta.innerHTML = '';

    // Hacemos un Object_keys de los tipos de pregunta posibles:
    const tipoPreguntaKeys = Object.keys(tipoPregunta);
    console.log(tipoPreguntaKeys);

    // Sorteamos el tipo de pregunta (entre las keys obtenidas):
    const sorteo = Math.floor(Math.random() * tipoPreguntaKeys.length);

    // Obtenemos la key (string), para pasarla como argumento a 'crear_opciones_respuestas':
    const keyRnd = tipoPreguntaKeys[sorteo];
    console.log("Key:", keyRnd);

    // Obtenemos el objeto con todo lo necesario para construir una pregunta aleatoria: 
    const tipoPreguntaRnd = tipoPregunta[tipoPreguntaKeys[sorteo]];
    console.log(tipoPreguntaRnd);

    // Obtenemos el texto correspondiente al tipo de pregunta:
    const textoPregunta = tipoPreguntaRnd['texto'];
    console.log(textoPregunta);

    // Sorteamos un pais aleatorio (de los 250 posibles):
    let paisRnd = Math.floor(Math.random() * todosLosPaises.length);

    // Generamos el texto completo de la pregunta (concatenando el texto + pais-elegido):
    doms.pregunta.innerHTML = `${textoPregunta} ${todosLosPaises[paisRnd]['translations']['spa']['common']}`;

    // Obtenemos la respuesta correcta y la pasamos como argumento:
    const respuestaCorrectaKey = tipoPreguntaRnd.campoRespuesta;
    const respuestaCorrecta = todosLosPaises[paisRnd][respuestaCorrectaKey];

    // Generamos las respuestas incorrectas:
    const arrayIncorrectas = generar_opciones_incorrectas(respuestaCorrectaKey, paisRnd);

    // Creamos las opciones-respuestas (delay):
    setTimeout(() => crear_opciones_respuestas(respuestaCorrecta, arrayIncorrectas), constantes.DELAY_APARECEN_RESPUESTAS);
}

function crear_opciones_respuestas(respuestaCorrecta, arrayIncorrectas)
{
    const { constantes, doms } = context.settings;

    doms.infoContainer[0].classList.remove("oculto");
    doms.infoContainer[0].classList.add("no-oculto-flex");

    const NUMERO_OPCIONES = constantes.NUMERO_OPCIONES_RESPUESTAS;
    const ubicarCorrectaRnd = Math.floor(Math.random() * NUMERO_OPCIONES);

    let respuestaCorrectaChecked = check_respuesta_correcta_es_array(respuestaCorrecta);
    // console.log(respuestaCorrectaChecked);

    for (let i = 0; i < NUMERO_OPCIONES; i ++)
    {
        const nuevaOpcionRespuesta = document.createElement('li');
        nuevaOpcionRespuesta.setAttribute('class', 'respuesta');

        if (ubicarCorrectaRnd === i)
        {
            const generarId = 'respuesta-9';
            nuevaOpcionRespuesta.setAttribute('id', generarId);
            nuevaOpcionRespuesta.textContent = respuestaCorrectaChecked;
            nuevaOpcionRespuesta.addEventListener('click', () => siguiente_pregunta(true, generarId));
        }
        else
        {
            const generarId = `respuesta-${i}`;
            nuevaOpcionRespuesta.setAttribute('id', generarId);
            let respuestaIncorrectaChecked = check_respuesta_correcta_es_array(arrayIncorrectas[i]);
            nuevaOpcionRespuesta.textContent = respuestaIncorrectaChecked;
            nuevaOpcionRespuesta.addEventListener('click', () => siguiente_pregunta(false, generarId));
        }

        doms.opciones.appendChild(nuevaOpcionRespuesta);
    }
}

function siguiente_pregunta(acertadaBool, elegida)
{
    const { constantes, estado, resultado, doms, clickRespuesta, sonidos } = context.settings;

    if (clickRespuesta.bandera)
    {
        return;
    }

    clickRespuesta.bandera = true;

    if (acertadaBool)
    {
        resultado.acertadas ++;
        document.querySelector('#respuesta-9').classList.add('respuesta-correcta');
        sonidos.correct.play();
    }
    else
    {
        document.querySelector(`#${elegida}`).classList.add('respuesta-incorrecta');
        document.querySelector('#respuesta-9').classList.add('respuesta-correcta');
        sonidos.wrong.play();
    }

    setTimeout(() =>
    {
        console.log(`Acertadas: ${resultado.acertadas}/${resultado.totalPreguntas}`);

        if (resultado.contadorPreguntas >= resultado.totalPreguntas)
        {
            console.log("*** Fin del test ***");
            renderizar_info();

            estado.enJuego = false;
            estado.gameOver = true;

            doms.infoContainer[0].classList.remove("no-oculto-flex");
            doms.infoContainer[0].classList.add("oculto");

            modal_fin_test();
        }
        else
        {
            resultado.contadorPreguntas ++;
            doms.opciones.innerHTML = '';

            doms.infoContainer[0].classList.remove("no-oculto-flex");
            doms.infoContainer[0].classList.add("oculto");

            renderizar_info();
            crear_pregunta();
        }
    }, constantes.DELAY_ENTRE_PREGUNTAS);
}

function renderizar_info()
{
    const { resultado, doms } = context.settings;

    doms.info[0].textContent = `Pregunta: ${resultado.contadorPreguntas}/${resultado.totalPreguntas}`;
    doms.info[1].textContent = `Acertadas: ${resultado.acertadas}`;
}

export { comenzar_partida, siguiente_pregunta };
