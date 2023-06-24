
var load_quizs_opened = [];

// Variables sobre el Quizs a mostar.
var name_quiz = "";
var quiz_info = [];
var quiz_Marcos_info = [];

function CompareQuizs() {

    resetAllCanvas();   
    TreatmentFileQuiz(quiz_info,quiz_Marcos_info)
}

function TreatmentFileQuiz(informationFirstQuiz,informationSecondQuiz) {
    document.getElementById("option_name_quiz").innerHTML = name_quiz.split(".")[0];
    //-- Pasamos a una variable global toda la información sobre los cuestionarios realizados.
    quiz_info = informationFirstQuiz;
    quiz_Marcos_info = informationSecondQuiz;

    // Creamos la tabla para que se introduzcan los elementos más relevantes en ella.
    // La tabla estará ordenada de la forma 'First-In First-Out', el primer cuestionario en rellenarse será
    // el primero en aperecer en la lista.
    //info_table.innerHTML = create_table_info_init_string();
    // Añadimos los valores de cada partipante a la tabla.
    //add_data_table_info();

    // COMENZAMOS CON EL DESARROLLO Y MUESTRA DE LOS VALORES GLOBALES
    // Cargamos ahora los resultados globales.
    // Comenzamos con la información de los cuestionarios.
    //document.getElementById("hearWhoResults").innerHTML = WHO_score_global_results();

    // AÑADIMOS LA INFORMACIÓN SOBRE LOS LUGARES.
    //document.getElementById("tablePlacesResults").innerHTML = places_global_results();
    // Añadimos los resultados sobre las preguntas finales.
    //document.getElementById("lastQuestion").innerHTML = last_user_results();

    // Añadimos las gráficas.
    Draw();
}


function OpenFileQuiz() {
    document.getElementById("getInputQuizFile").style.display = "block";
}
function CloseFileQuiz() {
    document.getElementById("getInputQuizFile").style.display = "none";
}



/*--------------------------CANVAS---------------------------------- */
/* Este apartado se encarga de dibujar las gráficas con los resultados */

function Draw() {
    numberTotalPlaces = quiz_info[0][0]["Places_Number"];
    numberTotalRecordings = quiz_info[0][0]["Recordings_Number"];
    numberTotalReplies = numberTotalPlaces*numberTotalRecordings;

    drawComparationChronologyGraph();
    drawComparationParticipantGraph(0);

    for (let numberPlace = 1; numberPlace <= numberTotalPlaces; numberPlace++) {
        document.getElementById("scenaryGraph"+(numberPlace)).style.display = "block";
        let position = (numberPlace-1)*numberTotalRecordings;
        document.getElementById("scenaryName"+numberPlace).innerHTML = quiz_info[0][1][position]["Name_Scenary"];
        for (let numberRecording = 1; numberRecording <= numberTotalRecordings; numberRecording++) {
            drawRadarComparationGraph(numberPlace,numberRecording-1)    
        }
       
    }
}   