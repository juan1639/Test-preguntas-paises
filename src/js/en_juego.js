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

    // Hacemos un Object_keys de los tipos de pregunta posibles:
    const tipoPreguntaKeys = Object.keys(tipoPregunta);
    console.log(tipoPreguntaKeys);

    // Obtenemos el objeto con todo lo necesario para construir una pregunta aleatoria: 
    const tipoPreguntaRnd = tipoPregunta[tipoPreguntaKeys[Math.floor(Math.random() * tipoPreguntaKeys.length)]];
    console.log(tipoPreguntaRnd);

    // Obtenemos el texto correspondiente al tipo de pregunta:
    const textoPregunta = tipoPreguntaRnd['texto'];
    console.log(textoPregunta);

    // Sorteamos un pais aleatorio (de los 250 posibles):
    let paisRnd = Math.floor(Math.random() * todosLosPaises.length);

    // Generamos el texto completo de la pregunta (concatenando el texto + pais-elegido):
    doms.pregunta.innerHTML = `${textoPregunta} ${todosLosPaises[paisRnd]['translations']['spa']['common']}`;
}

function crear_opciones_respuestas()
{

}

export { comenzar_partida };
