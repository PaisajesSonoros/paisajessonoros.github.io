
function resetAllCanvas() {
    //Reseteamos la cronología.
    document.getElementById("chronologyCanvas").innerHTML = '<canvas id="chronologyChart"></canvas>';
    //Reseteamos el canvas de los graficos del participante
    document.getElementById("participantCanvas").innerHTML = '<canvas id="participantChart"></canvas>';
}

function resetCanvasCities() {
    // Primer Gráfico izquierdo - reset
    document.getElementById("graphDescriptors").innerHTML = '<canvas id="renderRadarChartCities"></canvas>';
}

function resetAllResultCanvas() {
    //Reseteamos la cronología.
    document.getElementById("chronologyCanvas").innerHTML = '<canvas id="chronologyChart"></canvas>';
    //Reseteamos el canvas de los graficos del participante
    document.getElementById("participantCanvas").innerHTML = '<canvas id="participantChart"></canvas>';
    // Primer Gráfico izquierdo - reset
    document.getElementById("graphLeft1").innerHTML = '<canvas id="renderRadarChart1"></canvas>';
    //
    document.getElementById("graphRight1").innerHTML = '<canvas id="renderPieChart1"></canvas>';
    // Segundo Gráfico izquierdo - reset
    document.getElementById("graphLeft2").innerHTML = '<canvas id="renderRadarChart2"></canvas>';
    //
    document.getElementById("graphRight2").innerHTML = '<canvas id="renderPieChart2"></canvas>';
    // Tercero Gráfico izquierdo - reset
    document.getElementById("graphLeft3").innerHTML = '<canvas id="renderRadarChart3"></canvas>';
    //
    document.getElementById("graphRight3").innerHTML = '<canvas id="renderPieChart3"></canvas>';
}