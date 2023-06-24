
function resetAllCanvas() {
    //Reseteamos la cronología.
    document.getElementById("chronologyCanvas").innerHTML = '<canvas id="chronologyChart"></canvas>';
    //Reseteamos el canvas de los graficos del participante
    document.getElementById("participantCanvas").innerHTML = '<canvas id="participantChart"></canvas>';
}