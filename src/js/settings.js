
export class Settings
{
    constructor()
    {
        this.constantes =
        {
            NUMERO_PARTICULAS_CONFETI: 1200,
            ESCALAR_PARTICULAS: 1,
            VP_WIDTH: window.innerWidth,
            VP_HEIGHT: window.innerHeight,
            DELAY_WINNER_MODAL: 500,
            DELAY_GAMEOVER: 3900,
            FPS: 50
        };

        this.tipoPregunta =
        {
            capital:
            {
                pais: ['string', 'translations', 'spa', 'common'],
                capital: ['array', 'capital'],
                texto: 'Cual es la capital de '
            },
            continente:
            {
                pais: ['string', 'translations', 'spa', 'common'],
                continente: ['array', 'continents'],
                texto: 'En que continente se encuentra '
            },
            habitantes:
            {
                pais: ['string', 'translations', 'spa', 'common'],
                habitantes: ['integer', 'population'],
                texto: 'Cuantos habitantes (aprox.) tiene '
            }
        };

        this.todosLosPaises = [];

        this.estado =
        {
            preFetch: true,
            preJuego: false,
            enJuego: false,
            gameOver: false
        };

        this.resultado =
        {
            totalPreguntas: 10,
            acertadas: 0,
            porcentaje: 0
        };

        this.colores =
        {
            FONDO: "#373736",
            TABLERO: "#0084BD",
            FICHA_ROJA: "#9E0018",
            FICHA_VERDE: "#F7A20F"
        };

        this.sonidos =
        {
            gameover: new Audio('assets/audio/gameover.mp3'),
            boooh: new Audio('assets/audio/boooh.mp3'),
            winner: new Audio('assets/audio/aplausoseagle.mp3'),
            musicafondo: new Audio('assets/audio/music-puzzle-game1.mp3')
        };

        this.volumen =
        {
            gameover: 0.9,
            boooh: 0.5,
            winner: 0.7,
            musicafondo: 0.2
        };

        this.detectarAnchoPantalla();
    }

    detectarAnchoPantalla()
    {
        if (window.innerWidth <= 768)
        {
            console.log("Comienzo con pantalla pequeña");
            this.constantes.ESCALAR_PARTICULAS = 2;
            return;
        }

        console.log("Comienzo con pantalla grande")
        this.constantes.ESCALAR_PARTICULAS = 1;
    }

    initDOM()
    {
        this.doms =
        {
            main: document.getElementById('main'),
            pregunta: document.getElementById('pregunta'),
            respuestaContainer: document.getElementById('respuesta-container'),
            opciones: document.getElementById('opciones'),
            info: document.getElementById('info'),
            botonesInicio: document.getElementsByClassName('botones-inicio')
        };
    }
}
