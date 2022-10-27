//seleccionar imágenes
var pelota = document.getElementById("pelota1");
var jugador_1 = document.getElementById("jugador1");
var jugador_2 = document.getElementById("jugador2");
//tomar los elementos creados en la interface y almacenarlos en variables
const video = document.getElementById('video');
const canvas = document.getElementById('canvas');
const errorMsgElement = document.getElementById('span#errorMsg');
var turno = 0;
var gol_jugador1 =0;
var gol_jugador2 =0;
var texto_1 = document.getElementById("gol1");
var texto_2 = document.getElementById("gol2");
var texto_3 = document.getElementById("pos1");
var texto_4 = document.getElementById("pos2");
          
//posiciones iniciales de la pelota y los 2 jugadores
var x_pelota = 10;
var y_jugador_1 = 0;
var y_jugador_2 = 0;
var bandera = 0;

function iniciar_WEBCAM(){ //iniciar la cámara
    //asignar dimensionalidad al área de video
    const constraints = {
        audio: false,
        video: {width: 100, height: 100}
    };
    //solicitar permiso para acceder a la webcam
    async function init() {
        try{
            const stream = await navigator.mediaDevices.getUserMedia(constraints);
            handleSuccess(stream);
        }catch(e){
            errorMsgElement.innerHTML = 'navigator.getUserMedia error:${e.toString()}';    
        }
    }
    function handleSuccess(stream){
        window.stream = stream;
        video.srcObject = stream;
    }
    init();
    video.classList.add('div_hide');
    var context = canvas.getContext('2d');
    context.drawImage(video, 100, 100, 100, 100);
    }

//cargar audio que será reproducido cuando haya anotaciones o goles

let sound = new Audio('Recording.m4a');

//función para lanzar la pelota
function lanzar() {
    bandera = 0;
    if((turno%2)==0) {
    setInterval(myTimer, 30); //activa función para turno 1
    }
    if((turno%2)!=0) {
        setInterval(myTimer1, 30);        
        }
        turno = turno+1;  
}

function myTimer() {
    if (((turno%2)!=0) && x_pelota>= 0  &&  x_pelota < 81 ) { //condición para que se mueva la pelota entre estos valores de la pantalla
        x_pelota = x_pelota + 2; //movimiento del valor x
        pelota.style.left = x_pelota + "%"; //aplicar el valor obtenido al left del elemento
        video.classList.remove('div_hide'); //inicia el juego e inicia la cámara
    }
    if(((turno%2)!=0) && turno>0 && y_jugador_1>=42 && y_jugador_1<=46 && x_pelota > 80){//validar si metió gol 32 y 60, pelota == 92
        if(bandera==0){
        sound.play();
        gol_jugador1 =gol_jugador1+1;
        texto_1.textContent="Player A:"+gol_jugador1;
        bandera=1;
        }
    }
}

function myTimer1() {
    if (x_pelota >= 18 &&  x_pelota<= 92 && turno%2==0 ) { //si la pelota está en la parte de la derecha
        x_pelota = x_pelota - 2; //la pelota se mueve a la izquierda
        pelota.style.left = x_pelota + "%"; //aplicar el valor obtenido al left del elemento
    }
    if(((turno%2)==0) && turno>0 && y_jugador_2>=42 && y_jugador_2<=46 && x_pelota < 30){//validar si metió gol o anotación 
        if(bandera==0){
        video.classList.remove('div_hide'); //inicia el juego e inicia la cámara
        sound.play();
        gol_jugador2 =gol_jugador2+1;
        texto_2.textContent="Player B:"+gol_jugador2;
        bandera=1;
        }
    }
}

function bajar() {    //movimiento del jugador
if((turno%2)==0) {
    video.classList.remove('div_hide');
//prompt("Texto descriptivo","Turno jugador 1");
    if (y_jugador_1 <= 80 &&  y_jugador_1>= 0) { //condición para que se mueva entre estos valores de la pantalla
        y_jugador_1 = y_jugador_1 + 2; //movimiento del valor x
        jugador_1.style.top = y_jugador_1 + "%";}
    pelota.style.top = y_jugador_1 + "%"; //aplicar el valor obtenido al left del elemento     
}
if((turno%2)!=0) {
    video.classList.remove('div_hide'); //inicia el juego e inicia la cámara
    //prompt("Texto descriptivo","Turno jugador 2")
    if (y_jugador_2 <= 300 &&  y_jugador_2>= 0) { //condición para que se mueva entre estos valores de la pantalla
        y_jugador_2 = y_jugador_2 + 2; //movimiento del valor x
        jugador_2.style.top = y_jugador_2 + "%";}
    pelota.style.top = y_jugador_2 + "%"; //aplicar el valor obtenido al left del elemento     
}
texto_3.textContent="Posición A:"+y_jugador_1; //mostrar la posición del jugador A
texto_4.textContent="Posición B:"+y_jugador_2; //mostrar la posición del jugador B
}

function subir() {
    video.classList.remove('div_hide'); //inicia el juego e inicia la cámara
if((turno%2)==0) {
    if (y_jugador_1 <= 300 &&  y_jugador_1>= 0) { //condición para que se mueva entre estos valores de la pantalla
        y_jugador_1 = y_jugador_1 - 2; //movimiento del valor x
        jugador_1.style.top = y_jugador_1 + "%";}
    pelota.style.top = y_jugador_1 + "%"; //aplicar el valor obtenido al left del elemento     
}
if((turno%2)!=0) {
    if (y_jugador_2 <= 300 &&  y_jugador_2>= 0) { //condición para que se mueva entre estos valores de la pantalla
        y_jugador_2 = y_jugador_2 - 2; //movimiento del valor x
        jugador_2.style.top = y_jugador_2 + "%";}
    pelota.style.top = y_jugador_2 + "%"; //aplicar el valor obtenido al left del elemento     
}
texto_3.textContent="Posición A:"+y_jugador_1; //mostrar la posición del jugador A
texto_4.textContent="Posición B:"+y_jugador_2; //mostrar la posición del jugador B
}