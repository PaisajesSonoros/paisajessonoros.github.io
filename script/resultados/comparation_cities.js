/*

    Comparar entre ciudades.

*/
var load_quizs_opened = [];

// Variables sobre el Quizs a mostar.
var name_quiz = "";
var quiz_info = [];

function CompareQuizs() {
    resetCanvasCities();   
    document.getElementById("option_name_quiz").innerHTML = name_quiz.split(".")[0];
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
    drawRadarCitiesComparationGraph()
    drawQualityBarCitiesComparationGraphLeft()    
    drawQualityBarCitiesComparationGraphRight()
    drawSeasonBarCitiesComparationGraphLeft()
    drawSeasonBarCitiesComparationGraphRight() 
    drawContextBarCitiesComparationGraphLeft()
    drawContextBarCitiesComparationGraphRight() 
}   