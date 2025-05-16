import { context } from "./main.js";

function comenzar_partida()
{
    console.log("*** comienza test ***");

    const { estado, doms, resultado } = context.settings;

    estado.preJuego = false;
    estado.enJuego = true;

    doms.botonesInicio[0].style.display = "none";
    resultado.acertadas = 0;

    crear_pregunta();
}

function crear_pregunta()
{
    const { todosLosPaises, doms, tipoPregunta } = context.settings;

    // Hacemos visible el elemento-DOM contenedor de la 'pregunta':
    doms.pregunta.style.display = 'flex';
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

    // Creamos las opciones-respuestas:
    crear_opciones_respuestas(respuestaCorrecta);
}

function crear_opciones_respuestas(respuestaCorrecta)
{
    const { constantes, doms } = context.settings;

    const NUMERO_OPCIONES = constantes.NUMERO_OPCIONES_RESPUESTAS;
    const ubicarCorrectaRnd = Math.floor(Math.random() * NUMERO_OPCIONES);

    let respuestaCorrectaChecked = check_respuesta_correcta_es_array(respuestaCorrecta);
    console.log(respuestaCorrectaChecked);

    for (let i = 0; i < NUMERO_OPCIONES; i ++)
    {
        const nuevaOpcionRespuesta = document.createElement('li');
        nuevaOpcionRespuesta.setAttribute('class', 'respuesta');

        if (ubicarCorrectaRnd === i)
        {
            nuevaOpcionRespuesta.setAttribute('id', `respuesta-${i}`);
            nuevaOpcionRespuesta.textContent = respuestaCorrectaChecked;
        }
        else
        {
            nuevaOpcionRespuesta.setAttribute('id', `respuesta-${i}`);
            nuevaOpcionRespuesta.textContent = "Karranza";
        }

        doms.opciones.appendChild(nuevaOpcionRespuesta);
    }
}

function siguiente_pregunta()
{
    const { doms } = context.settings;
    doms.opciones.innerHTML = '';

    crear_pregunta();
}

function check_respuesta_correcta_es_array(respuestaCorrecta)
{
    console.log(typeof respuestaCorrecta);

    if (typeof respuestaCorrecta === 'object')
    {
        return respuestaCorrecta[0];
    }
    
    return respuestaCorrecta;
}

export { comenzar_partida, siguiente_pregunta };
