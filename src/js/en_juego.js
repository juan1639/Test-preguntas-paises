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
    context.settings.doms.pregunta.style.backgroundColor = 'red';

}

export { comenzar_partida };
