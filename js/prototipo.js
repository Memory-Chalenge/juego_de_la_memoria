/* =================================
   IMÁGENES
================================= */

const images = [

    "imagenes/imagen1.jpg",
    "imagenes/imagen2.jpg",
    "imagenes/imagen3.jpg",
    "imagenes/imagen4.jpg",
    "imagenes/imagen5.jpg",
    "imagenes/imagen6.jpg",
    "imagenes/imagen7.jpg",
    "imagenes/imagen8.jpg",
    "imagenes/imagen9.jpg",
    "imagenes/imagen10.jpg",
    "imagenes/imagen11.jpg",
    "imagenes/imagen12.jpg",
    "imagenes/imagen13.jpg",
    "imagenes/imagen14.jpg",
    "imagenes/imagen15.jpg"

];


/* =================================
   VARIABLES
================================= */

let rows = 3;

let columns = 4;

let currentLevel = "Fácil";

let cards = [];

let flippedCards = [];

let matchedPairs = 0;

let moves = 0;

let seconds = 0;

let timerInterval;

let gameStarted = false;

let victoryShown = false;


/* =================================
   CAMBIAR PANTALLA
================================= */

function showScreen(id) {

    document.querySelectorAll(".screen")
        .forEach(screen => {

            screen.classList.remove("active");

        });


    document
        .getElementById(id)
        .classList.add("active");

}


/* =================================
   VOLVER AL INICIO
================================= */

function goHome() {

    stopTimer();

    hideVictory();

    showScreen("homeScreen");

}


/* =================================
   DIFICULTAD
================================= */

function showDifficulty() {

    showScreen("difficultyScreen");

}


/* =================================
   COMENZAR JUEGO
================================= */

function startGame(newRows, newColumns) {

    rows = newRows;

    columns = newColumns;


    /* NIVEL */

    if (rows === 3 && columns === 4) {

        currentLevel = "Fácil";

    }

    else if (rows === 4 && columns === 5) {

        currentLevel = "Medio";

    }

    else {

        currentLevel = "Difícil";

    }


    matchedPairs = 0;

    moves = 0;

    seconds = 0;

    flippedCards = [];

    gameStarted = false;

    victoryShown = false;


    document.getElementById(
        "moves"
    ).textContent = moves;


    document.getElementById(
        "timer"
    ).textContent = "00:00";


    document.getElementById(
        "levelText"
    ).textContent = currentLevel;


    document.getElementById(
        "gameMessage"
    ).textContent = "";


    createBoard();

    showScreen("gameScreen");

}


/* =================================
   CREAR TABLERO
================================= */

function createBoard() {

    const board =
        document.getElementById(
            "gameBoard"
        );


    board.innerHTML = "";

    cards = [];


    /* TOTAL DE CARTAS */

    const totalCards =
        rows * columns;


    /* TOTAL DE PAREJAS */

    const pairCount =
        totalCards / 2;


    let selectedImages = [];


    /*
       Se seleccionan exactamente
       las imágenes necesarias.
    */

    for (
        let i = 0;
        i < pairCount;
        i++
    ) {

        const image =
            images[i % images.length];


        selectedImages.push(image);

        selectedImages.push(image);

    }


    /* MEZCLAR */

    shuffle(selectedImages);


    /* CONFIGURAR COLUMNAS */

    board.style.gridTemplateColumns =
        `repeat(${columns}, 1fr)`;


    /* CREAR CARTAS */

    selectedImages.forEach(
        (image, index) => {

            const card =
                document.createElement("div");


            card.classList.add("card");


            card.dataset.image =
                image;


            card.innerHTML = `

                <div class="card-inner">

                    <div class="card-front">

                        <img
                            src="${image}"
                            alt="Imagen de memoria"
                        >

                    </div>

                    <div class="card-back">
                        ?
                    </div>

                </div>

            `;


            card.addEventListener(
                "click",
                () => {

                    flipCard(card);

                }
            );


            board.appendChild(card);

            cards.push(card);

        }
    );

}


/* =================================
   MEZCLAR CARTAS
================================= */

function shuffle(array) {

    for (
        let i = array.length - 1;
        i > 0;
        i--
    ) {

        const j =
            Math.floor(
                Math.random() * (i + 1)
            );


        [
            array[i],
            array[j]
        ] =
        [
            array[j],
            array[i]
        ];

    }

}


/* =================================
   VOLTEAR CARTA
================================= */

function flipCard(card) {

    /* EVITAR CLICS INCORRECTOS */

    if (

        flippedCards.length >= 2 ||

        card.classList.contains(
            "flipped"
        ) ||

        card.classList.contains(
            "matched"
        ) ||

        victoryShown

    ) {

        return;

    }


    /* INICIAR CRONÓMETRO */

    if (!gameStarted) {

        startTimer();

        gameStarted = true;

    }


    /* VOLTEAR */

    card.classList.add(
        "flipped"
    );


    flippedCards.push(card);


    /* COMPROBAR */

    if (
        flippedCards.length === 2
    ) {

        moves++;


        document.getElementById(
            "moves"
        ).textContent = moves;


        checkMatch();

    }

}


/* =================================
   COMPROBAR PAREJA
================================= */

function checkMatch() {

    const card1 =
        flippedCards[0];


    const card2 =
        flippedCards[1];


    if (
        card1.dataset.image ===
        card2.dataset.image
    ) {

        /* PAREJA CORRECTA */

        card1.classList.add(
            "matched"
        );

        card2.classList.add(
            "matched"
        );


        flippedCards = [];


        matchedPairs++;


        const totalPairs =
            (rows * columns) / 2;


        /*
           COMPROBAR SI GANÓ
        */

        if (
            matchedPairs ===
            totalPairs
        ) {

            finishGame();

        }

    }

    else {

        /*
           SI NO COINCIDEN,
           VOLVER A OCULTAR
        */

        setTimeout(() => {

            card1.classList.remove(
                "flipped"
            );

            card2.classList.remove(
                "flipped"
            );


            flippedCards = [];

        }, 800);

    }

}


/* =================================
   CRONÓMETRO
================================= */

function startTimer() {

    stopTimer();


    timerInterval =
        setInterval(() => {

            seconds++;


            const minutes =
                Math.floor(
                    seconds / 60
                );


            const secs =
                seconds % 60;


            document.getElementById(
                "timer"
            ).textContent =

                String(minutes)
                    .padStart(2, "0")

                +

                ":"

                +

                String(secs)
                    .padStart(2, "0");

        }, 1000);

}


function stopTimer() {

    clearInterval(
        timerInterval
    );

}


/* =================================
   TERMINAR JUEGO
================================= */

function finishGame() {

    stopTimer();


    victoryShown = true;


    document.getElementById(
        "gameMessage"
    ).textContent =
        "🎉 ¡Felicidades! Completaste el tablero.";


    saveResult();


    /*
       PEQUEÑA ESPERA PARA QUE
       SE NOTE QUE TERMINÓ EL JUEGO
    */

    setTimeout(() => {

        showVictory();

    }, 500);

}


/* =================================
   MOSTRAR ANIMACIÓN DE VICTORIA
================================= */

function showVictory() {

    const overlay =
        document.getElementById(
            "victoryOverlay"
        );


    /*
       MOSTRAR RESULTADOS
    */

    document.getElementById(
        "victoryTime"
    ).textContent =
        document.getElementById(
            "timer"
        ).textContent;


    document.getElementById(
        "victoryMoves"
    ).textContent =
        moves;


    document.getElementById(
        "victoryLevel"
    ).textContent =
        currentLevel;


    /*
       MOSTRAR CARTEL
    */

    overlay.classList.add(
        "show"
    );


    /*
       CREAR CONFETI
    */

    createConfetti();

}


/* =================================
   OCULTAR VICTORIA
================================= */

function hideVictory() {

    const overlay =
        document.getElementById(
            "victoryOverlay"
        );


    overlay.classList.remove(
        "show"
    );


    document.getElementById(
        "confetti"
    ).innerHTML = "";

}


/* =================================
   CONFETI
================================= */

function createConfetti() {

    const container =
        document.getElementById(
            "confetti"
        );


    container.innerHTML = "";


    const confettiColors = [
        "#ff4081",
        "#ffeb3b",
        "#00e5ff",
        "#76ff03",
        "#ff9800",
        "#e040fb"
    ];


    for (
        let i = 0;
        i < 70;
        i++
    ) {

        const piece =
            document.createElement(
                "div"
            );


        piece.classList.add(
            "confetti"
        );


        piece.style.left =
            Math.random() * 100 + "%";


        piece.style.background =
            confettiColors[
                Math.floor(
                    Math.random() *
                    confettiColors.length
                )
            ];


        piece.style.animationDelay =
            Math.random() * 1.5 + "s";


        piece.style.transform =
            `rotate(${Math.random() * 360}deg)`;


        container.appendChild(
            piece
        );

    }

}


/* =================================
   IR A CLASIFICACIÓN
================================= */

function goToRanking() {

    hideVictory();

    showRanking();

}


/* =================================
   GUARDAR RESULTADO
================================= */

function saveResult() {

    let ranking =
        JSON.parse(
            localStorage.getItem(
                "memoryRanking"
            )
        ) || [];


    ranking.push({

        level: currentLevel,

        time: seconds,

        moves: moves

    });


    /*
       ORDENAR POR TIEMPO
    */

    ranking.sort(
        (a, b) =>
            a.time - b.time
    );


    /*
       GUARDAR SOLO LOS 10 MEJORES
    */

    ranking =
        ranking.slice(0, 10);


    localStorage.setItem(

        "memoryRanking",

        JSON.stringify(ranking)

    );

}


/* =================================
   MOSTRAR CLASIFICACIÓN
================================= */

function showRanking() {

    showScreen(
        "rankingScreen"
    );


    const list =
        document.getElementById(
            "rankingList"
        );


    let ranking =
        JSON.parse(
            localStorage.getItem(
                "memoryRanking"
            )
        ) || [];


    list.innerHTML = "";


    if (
        ranking.length === 0
    ) {

        list.innerHTML =
            "<p>Todavía no hay resultados.</p>";

        return;

    }


    ranking.forEach(
        (result, index) => {

            const minutes =
                Math.floor(
                    result.time / 60
                );


            const secs =
                result.time % 60;


            const formattedTime =

                String(minutes)
                    .padStart(2, "0")

                +

                ":"

                +

                String(secs)
                    .padStart(2, "0");


            const item =
                document.createElement(
                    "div"
                );


            item.classList.add(
                "ranking-item"
            );


            item.innerHTML = `

                <span>
                    #${index + 1}
                    - ${result.level}
                </span>

                <span>
                    ${formattedTime}
                    |
                    ${result.moves}
                    movimientos
                </span>

            `;


            list.appendChild(
                item
            );

        }
    );

}


/* =================================
   OPCIONES
================================= */

function showOptions() {

    showScreen(
        "optionsScreen"
    );

}


/* =================================
   CAMBIAR TEMA
================================= */

function changeTheme() {

    const theme =
        document.getElementById(
            "theme"
        ).value;


    if (
        theme === "dark"
    ) {

        document.body.style.background =
            "#080808";

    }

    else {

        document.body.style.background =
            "linear-gradient(135deg, #151b54, #4527a0, #7b1fa2)";

    }

}


/* =================================
   REINICIAR
================================= */

function restartGame() {

    startGame(
        rows,
        columns
    );

}
const music = document.getElementById("backgroundMusic");
const musicToggle = document.getElementById("musicToggle");
const volumeControl = document.getElementById("volume");
const volumeValue = document.getElementById("volumeValue");

// Volumen inicial
music.volume = 0.30;

// Activar o desactivar música
musicToggle.addEventListener("change", () => {
    if (musicToggle.value === "on") {
        music.play().catch(() => {
            console.log("Pulsa la página para iniciar la música.");
        });
    } else {
        music.pause();
    }
});

// Ajustar volumen
volumeControl.addEventListener("input", () => {
    music.volume = Number(volumeControl.value) / 100;

    volumeValue.textContent = volumeControl.value + "%";
});

// Iniciar música después de una interacción del usuario
document.addEventListener("click", () => {
    if (
        musicToggle.value === "on" &&
        music.paused
    ) {
        music.play().catch(() => {});
    }
});