function drawParticipantGraph(option) {
    var uniqueModels;
    document.getElementById("participantCanvas").innerHTML = '<canvas id="participantChart"></canvas>';
    if (option == 0) {
        document.getElementById("participantChart").style = "width:100vh;"
        var statement = 'La puntuación obtenida en el test HearWHO:'
        const label = [...new Set(quiz_info.map(quiz_info => quiz_info[0]["Introduce aquí tu puntuación auditiva obtenida en el test hearWHO"]))].sort();
        var uniqueModels = [];
        for (let index = 0; index < quiz_info.length; index++) {
            uniqueModels[index] =  quiz_info[index][0]["Introduce aquí tu puntuación auditiva obtenida en el test hearWHO"];
        }
        
        const testWHONumbers = label.filter((number, i) => i == 0 ? true : uniqueModels[i - 1] != number);
        const counterTestWHO = testWHONumbers.map(spec => {
            return {number: spec, count: 0};
        });
    
        counterTestWHO.map((countSpec, i) =>{
            const actualSpecLength = uniqueModels.filter(number => number === countSpec.number).length;
            countSpec.count = actualSpecLength;
        })
        const data = {
            labels: label,
            datasets: [{
                data: counterTestWHO.map(testWHO => testWHO.count),
                tension: .9,
                borderColor: getDataColors()[3],
                backgroundColor: getDataColors(90)[4],
                fill: true,
                pointBorderWidth: 5
            }]
        }
    
        const options = {
            plugins: {
                legend: { display: false,labels:{color:'white',fontStyle:'bolder'} }
            },
            scales: {
                x: {
                    title: {
                        display: true,
                        color: 'white',
                        text: 'Notas del Cuestionario TESTWHO',
                        font: {
                            size: 30,
                            family:"'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif"
                        }
                      }
                },
                y: {
                  beginAtZero: true,
                  title: {
                    display: true,
                    color: 'white',
                    text: 'Cantidad de Cuestionarios TESTWHO con esa nota',
                    font: {
                        size: 10,
                        family:"'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif"
                    }
                  }
                }
              }
        }
        new Chart('participantChart',{type: 'bar',data,options})
    }else{
        const uniqueStatement = [...new Set(quiz_info.map(statement => statement[2]))]
        var statement = Object.keys(Object.values(uniqueStatement)[0][0])[option-1]

        var labelOptions = [...new Set(quiz_info.map(quiz_info => quiz_info[2][0][statement]))];
        var label = [];
        for (let index = 0; index < labelOptions.length; index++) {
            final = labelOptions[index];
            final = final.replace('_', ' ').charAt(0).toUpperCase() + final.replace('_', ' ').slice(1)
            label[index] = final;
        }

        var uniqueModels = [];
        for (let index = 0; index < quiz_info.length; index++) {
            uniqueModels[index] =  quiz_info[index][2][0][statement];
        }
        const participantNumbers = labelOptions.filter((number, i) => i == 0 ? true : uniqueModels[i - 1] != number);
        const counterParticipant = participantNumbers.map(spec => {
            return {number: spec, count: 0};
        });
    
        counterParticipant.map((countSpec, i) =>{
            const actualSpecLength = uniqueModels.filter(number => number === countSpec.number).length;
            countSpec.count = actualSpecLength;
        })
        var newData = [];
        for (let index = 0; index < counterParticipant.length; index++) {
            newData[index] = counterParticipant[index].count;            
        }
        const data = {
            //labels: uniqueModels,
            labels: label,
            datasets: [{
                //-- Extrae del array de modelos de montañas rusas, el número que hay por cada una.
                label:statement,
                data:newData,
                borderColor: getDataColors(),
                backgroundColor: getDataColors(20),
                aspectRatio: 1
            }]
        }
    
        const options = {
            plugins: {
                labels:{
                    render: 'percentage',
                    fontColor: 'white',
                    fontStyle: 'bolder'
                },
                legend: { position: 'top',labels:{color:'white',fontStyle:'bolder'}}
            }
        }
        new Chart('participantChart',{type: 'doughnut',data,options})
    }
    let text = "";
    switch (Math.floor(option)) {
        case 0:
            text = "• En el gráfico de arriba se muestra la puntuación obtenida en los test de la OMS sobre detección auditiva. Este test va de cero (NO REALIZADO) a 100.";
            break;
        case 1:
            text = "• En el gráfico de arriba se muestra el conocimiento sobre la región o la zona de la realización del estudio."
            break; 
        case 2:
            text = "• En el gráfico de arriba se muestra la formación en acústica de los participantes."
            break;   

    }
    document.getElementById("participantSummery").innerHTML = text;
    document.getElementById("statementQuestion").innerHTML = statement;

}

function drawComparationParticipantGraph(option) {
    var uniqueModels;
    document.getElementById("participantCanvas").innerHTML = '<canvas id="participantChart"></canvas>';
    document.getElementById("participantChart").style = "width:100vh;"
    var statement = 'La puntuación obtenida en el test HearWHO:'
    
    var uniqueModels1 = [...new Set(quiz_info.map(quiz_info => quiz_info[0]["Introduce aquí tu puntuación auditiva obtenida en el test hearWHO"]))].sort();

    var uniqueModels2 = [...new Set(quiz_Marcos_info.map(quiz_Marcos_info => quiz_Marcos_info[0]["Introduce aquí tu puntuación auditiva obtenida en el test hearWHO"]))].sort();

    var uniqueModels = uniqueModels1.concat(uniqueModels2).sort();
    const label = [...new Set(uniqueModels.map(uniqueModels => uniqueModels))];

    for (let index = 0; index < quiz_info.length; index++) {
        uniqueModels1[index] =  quiz_info[index][0]["Introduce aquí tu puntuación auditiva obtenida en el test hearWHO"];
    }
    for (let index = 0; index < quiz_Marcos_info.length; index++) {
        uniqueModels2[index] =  quiz_Marcos_info[index][0]["Introduce aquí tu puntuación auditiva obtenida en el test hearWHO"];
    }
    uniqueModels = uniqueModels1.concat(uniqueModels2).sort();

    const testWHONumbers1 = label.filter((number, i) => i == 0 ? true : uniqueModels[i - 1] != number);
    const counterTestWHO1 = testWHONumbers1.map(spec => {
        return {number: spec, count: 0};
    });

    counterTestWHO1.map((countSpec, i) =>{
        const actualSpecLength = uniqueModels1.filter(number => number === countSpec.number).length;
        countSpec.count = actualSpecLength;
    })


    const testWHONumbers2 = label.filter((number, i) => i == 0 ? true : uniqueModels[i - 1] != number);
    const counterTestWHO2 = testWHONumbers2.map(spec => {
        return {number: spec, count: 0};
    });

    counterTestWHO2.map((countSpec, i) =>{
        const actualSpecLength = uniqueModels2.filter(number => number === countSpec.number).length;
        countSpec.count = actualSpecLength;
    })


    const data = {
        labels: label,
        datasets: [{
            label:"Manuel",
            data: counterTestWHO1.map(testWHO => testWHO.count),
            tension: .9,
            borderColor: getDataColors()[5],
            backgroundColor: getDataColors(90)[6],
            fill: true,
            pointBorderWidth: 5
        },{
            label:"Marcos",
            data: counterTestWHO2.map(testWHO => testWHO.count),
            tension: .9,
            borderColor: getDataColors()[2],
            backgroundColor: getDataColors(90)[2],
            fill: true,
            pointBorderWidth: 5
        }]
    }

    const options = {
        plugins: {
            legend: { display: false,labels:{color:'white',fontStyle:'bolder'} }
        },
        scales: {
            x: {
                title: {
                    display: true,
                    color: 'white',
                    text: 'Notas del Cuestionario TESTWHO',
                    font: {
                        size: 30,
                        family:"'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif"
                    }
                  }
            },
            y: {
              beginAtZero: true,
              title: {
                display: true,
                color: 'white',
                text: 'Cantidad de Cuestionarios TESTWHO con esa nota',
                font: {
                    size: 10,
                    family:"'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif"
                }
              }
            }
          }
    }
    new Chart('participantChart',{type: 'bar',data,options})
    let text = "• En el gráfico de arriba se muestra la puntuación obtenida en los test de la OMS sobre detección auditiva. Este test va de cero (NO REALIZADO) a 100.";
    document.getElementById("participantSummery").innerHTML = text;
    document.getElementById("statementQuestion").innerHTML = statement;

}

document.querySelector('#generalOptions').onchange = e => {

    const { value: property, text: label } = e.target.selectedOptions[0]

    document.getElementById("participantCanvas").innerHTML = '<canvas id="participantChart" height="15vh" width="30vw"></canvas>'

    drawParticipantGraph(property)
}