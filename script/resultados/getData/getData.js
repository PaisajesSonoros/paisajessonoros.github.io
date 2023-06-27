var audio_info = [];
var video_info = [];
var all_info = [];
var audio_Marcos_info = [];
var video_Marcos_info = [];
var all_Marcos_info = [];
// Obtenemos los ficheros de audio, video y ambos realizados por Manuel Salcedo Alonso
let urlAudio = 'https://raw.githubusercontent.com/SalcedoManuel/Paisajes-Sonoros/main/resultados/Audio.json'
fetch(urlAudio)
    .then(response => response.json())
    .then(data => saveAudioData(data))
    .catch(error => console.log(error));
function saveAudioData(data) {
    audio_info = data;
}
let urlVideo = 'https://raw.githubusercontent.com/SalcedoManuel/Paisajes-Sonoros/main/resultados/Video.json'
fetch(urlVideo)
    .then(response => response.json())
    .then(data => saveVideoData(data))
    .catch(error => console.log(error));
function saveVideoData(data) {
    video_info = data;
}

let urlAllQuizs = 'https://raw.githubusercontent.com/SalcedoManuel/Paisajes-Sonoros/main/resultados/SinDiferencia.json'
fetch(urlAllQuizs)
    .then(response => response.json())
    .then(data => saveAllData(data))
    .catch(error => console.log(error));
function saveAllData(data) {
    all_info = data;
}

// Obtenemos los resultados de ficheros ajenos a Manuel Salcedo Alonso
let urlMarcosAudio = 'https://raw.githubusercontent.com/SalcedoManuel/Paisajes-Sonoros/main/resultados/MarcosAudio.json'
fetch(urlMarcosAudio)
    .then(response => response.json())
    .then(data => saveMAudioData(data))
    .catch(error => console.log(error));
function saveMAudioData(data) {
    audio_Marcos_info = data;
}
let urlMarcosVideo = 'https://raw.githubusercontent.com/SalcedoManuel/Paisajes-Sonoros/main/resultados/MarcosVideo.json'
fetch(urlMarcosVideo)
    .then(response => response.json())
    .then(data => saveMVideoData(data))
    .catch(error => console.log(error));
function saveMVideoData(data) {
    video_Marcos_info = data;
}

let urlMarcosAllQuizs = 'https://raw.githubusercontent.com/SalcedoManuel/Paisajes-Sonoros/main/resultados/MarcosTodos.json'
fetch(urlMarcosAllQuizs)
    .then(response => response.json())
    .then(data => saveMAllData(data))
    .catch(error => console.log(error));
function saveMAllData(data) {
    all_Marcos_info = data;
}

function resetButtonsColors(number) {

    if (number < 3) {
        init  = 0;
        finish = 3;
    }else{
        init = 3;
        finish = 6
    }
    for (let index = init; index < finish; index++) {
        document.getElementById("button_select_quiz"+index).style = "background-color: rgb(34, 34, 34);color: #ffff;"         
    }
}

// Seleccionamos el fichero de entre todos los que se quieren mostar.
function SelectQuiz(nameQuiz,number) {
    resetButtonsColors(number)
    document.getElementById("button_select_quiz"+number).style = "background-color: rgb(139, 139, 139);color: black;"
    if (number < 3) {
        if (nameQuiz == "Audio") {
            quiz_info = audio_info;
        }else if (nameQuiz == "Ambos") {
            quiz_info = all_info;
        }else{
            quiz_info = video_info;
        }
    }else{
        if (nameQuiz == "MarcosAudio") {
            quiz_Marcos_info = audio_Marcos_info;
        }else if (nameQuiz == "MarcosAmbos") {
            quiz_Marcos_info = all_Marcos_info;
        }else{
            quiz_Marcos_info = video_Marcos_info;
        }
    }
}