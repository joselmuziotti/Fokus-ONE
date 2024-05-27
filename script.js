const html = document.querySelector('html');

/*botones*/
const btnCorto = document.querySelector('.app__card-button--corto');
const btnEnfoque = document.querySelector('.app__card-button--enfoque');
const btnLargo = document.querySelector('.app__card-button--largo');
const btnStart = document.querySelector('#start-pause');
const btns = document.querySelectorAll('.app__card-button');
/*fin de botones*/

const banner = document.querySelector('.app__image');
const title = document.querySelector('.app__title');
const inputEnfoque = document.querySelector('#alternar-musica');
const textStartPause = document.querySelector('#start-pause span');
const iconStarPause = document.querySelector('.app__card-primary-butto-icon');
const tiempoPantalla = document.querySelector('#timer');


/*audios*/
const music = new Audio('./sonidos/luna-rise-part-one.mp3');
const beep = new Audio('./sonidos/beep.mp3');
const audioPlay = new Audio('./sonidos/play.wav');
const audioPause = new Audio('./sonidos/pause.mp3');
/*fin de audios*/

let tiempoTranscurrido = 1500;
let intervalo = null;


music.loop = true;

inputEnfoque.addEventListener('change', () => {
    if (music.paused) {
            music.play();
        } else {
            music.pause();
        }
})

btnCorto.addEventListener('click', () =>{
    tiempoTranscurrido = 300;
    cambioContexto('descanso-corto');
    btnCorto.classList.add('active');
})

btnEnfoque.addEventListener ('click', () =>{
    tiempoTranscurrido = 1500;
    cambioContexto('enfoque');
    btnEnfoque.classList.add('active');
})

btnLargo.addEventListener('click', () =>{
    tiempoTranscurrido= 900;
    cambioContexto('descanso-largo');
    btnLargo.classList.add('active');
})

function cambioContexto(contexto){

    mostrarTiempo();
    btns.forEach(function(contexto){
        contexto.classList.remove('active');
    })

    html.setAttribute('data-contexto', contexto);
    banner.setAttribute('src', `./imagenes/${contexto}.png`);

    switch (contexto) {
        case 'enfoque':
            title.innerHTML = `
            Optimiza tu productividad,<br>
                <strong class="app__title-strong">sumérgete en lo que importa.</strong>
            `
            break;

        case "descanso-corto":
            title.innerHTML = `
            ¿Que tal tomar un respiro?<br>
                <strong class="app__title-strong">¡Haz una pausa corta!</strong>
            `
            break;

        case "descanso-largo":
            title.innerHTML = `
            Hora de volver a la superficie<br>
                <strong class="app__title-strong">Haz una pausa larga.</strong>
            `
            break;
    }
}


const cuentaRegresiva = () =>{
    if(tiempoTranscurrido <= 0){
        beep.play();
        restar()
        return
    }
    textStartPause.textContent = "Pausar";
    iconStarPause.setAttribute('src', `./imagenes/pause.png`);
    tiempoTranscurrido -= 1;
    mostrarTiempo();
    console.log(tiempoTranscurrido)
}

btnStart.addEventListener('click', startPause)

function startPause(){
    if(intervalo){
        audioPause.play();
        restar();
        return
    } else {
        audioPlay.play();
    }
    
    intervalo = setInterval(cuentaRegresiva,1000);
}

function restar(){
    clearInterval(intervalo);
    textStartPause.textContent = "Comenzar";
    iconStarPause.setAttribute('src', `./imagenes/play_arrow.png`);
    intervalo = null;
    
}

function mostrarTiempo(){
    const tiempo = new Date(tiempoTranscurrido * 1000);
    const tiempoFormateado = tiempo.toLocaleTimeString('es-MX', {minute: '2-digit', second: '2-digit'})
    tiempoPantalla.innerHTML = `${tiempoFormateado}`;
}

mostrarTiempo();