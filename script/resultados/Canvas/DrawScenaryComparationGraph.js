function changeScenarySituation(property) {
    const [place, recording] = property.split('-')
    //-- Cambiamos los valores de las opciones de la derecha al cambiar el escenario.
    document.getElementById("featuresOptions"+place).innerHTML = '<option value="yearPeriod-'+place+'-'+recording+'">Periodo del Año</option>'+
                                                            '<option value="urbanContext-'+place+'-'+recording+'">Contexto Urbano</option>'+
                                                            '<option value="acousticQuality-'+place+'-'+recording+'">Calidad Acústica</option>'+
                                                            '<option value="soundscapeTime-'+place+'-'+recording+'">Tiempo en el Ambiente Sonoro</option>';

    document.getElementById("graphLeft"+place).innerHTML = '<canvas id="renderRadarChart'+place+'"></canvas>'
    document.getElementById("graphRight"+place).innerHTML = '<canvas id="renderPieChart'+place+'"></canvas>'
    document.getElementById("changeChart2Radio"+place).value = place + "-"+recording;
    document.getElementById("changeChart2Scatter"+place).value = place + "-"+recording;
    
    //drawInformationScenary(Math.floor(place),Math.floor(recording),"yearPeriod")
    drawScatterComparationGraph(place,recording)
}