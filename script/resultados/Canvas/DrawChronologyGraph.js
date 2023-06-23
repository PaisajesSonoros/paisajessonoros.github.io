function drawChronologyGraph() {
    // Activamos el apartado de Canvas
    document.getElementById("canvasResult").style.display = "block";
    // Creamos el canvas.
    const canvas = document.getElementById("chronologyChart");
    const ctx = canvas.getContext("2d");
    // Obtenemos las fechas de ambos cuestionarios y las unimos en un solo array.
    var uniqueModels = [...new Set(quiz_info.map(quiz_info => new Date(quiz_info[0]["Date"]).getTime()))];
    uniqueModels.sort();
    // Eliminamos las repetidas. Con salir una vez es suficiente.
    for (let index = 0; index < uniqueModels.length; index++) {
        uniqueModels[index] = new Date(uniqueModels[index]).toLocaleDateString();
    }
    const label = [...new Set(uniqueModels.map(uniqueModels => uniqueModels))];

    const datesNumbers = uniqueModels.filter((number, i) => i == 0 ? true : uniqueModels[i - 1] != number);
    const counterDates = datesNumbers.map(spec => {
        return {number: spec, count: 0};
    });

    counterDates.map((countSpec, i) =>{
        const actualSpecLength = uniqueModels.filter(number => number === countSpec.number).length;
        countSpec.count = actualSpecLength;
    })
    
    const data = {
        labels: label,
        datasets: [{
            data: counterDates.map(dates => dates.count),
            tension: .5,
            borderColor: getDataColors()[1],
            backgroundColor: getDataColors(20)[1],
            fill: true,
            pointBorderWidth: 5
        }]
    }

    const options = {
        plugins: {
            legend: { display: false }
        },
        scales: {
            x: {
                ticks:{
                    color:'white'
                },
                title: {
                    display: true,
                    text: 'Fechas de realización de los cuestionarios',
                    color: 'white',
                    font: {
                        size: 30,
                        family:"'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif"
                    }
                  }
            },
            y: {
              color:'white',
              ticks:{
                color:'white'
              },
              min: 0,
              title: {
                display: true,
                text: 'Cuestionarios realizados por día',
                color:'white',
                font: {
                    size: 25,
                    family:"'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif"
                }
              }
            }
          }
    }
    new Chart('chronologyChart',{type: 'line',data,options})
}

function drawComparationChronologyGraph() {
    // Activamos el apartado de Canvas
    document.getElementById("canvasResult").style.display = "block";
    // Creamos el canvas.
    const canvas = document.getElementById("chronologyChart");
    const ctx = canvas.getContext("2d");
    // Obtenemos las fechas de ambos cuestionarios y las unimos en un solo array.
    var uniqueModels1 = [...new Set(quiz_info.map(quiz_info => new Date(quiz_info[0]["Date"]).getTime()))];
    uniqueModels1.sort();
    var uniqueModels2 = [...new Set(quiz_Marcos_info.map(quiz_Marcos_info => new Date(quiz_Marcos_info[0]["Date"]).getTime()))];
    uniqueModels2.sort();
    var uniqueModels = uniqueModels1.concat(uniqueModels2)
    uniqueModels.sort();
    // Ordenamos por aparición cronológica las fechas
    for (let index = 0; index < uniqueModels1.length; index++) {
        uniqueModels1[index] = new Date(uniqueModels1[index]).toLocaleDateString();
    }


    for (let index = 0; index < uniqueModels2.length; index++) {
        uniqueModels2[index] = new Date(uniqueModels2[index]).toLocaleDateString();
    }


    for (let index = 0; index < uniqueModels.length; index++) {
        uniqueModels[index] = new Date(uniqueModels[index]).toLocaleDateString();
    }

    const label = [...new Set(uniqueModels.map(uniqueModels => uniqueModels))];

    // Todas juntas
    const datesNumbers = uniqueModels.filter((number, i) => i == 0 ? true : uniqueModels[i - 1] != number);
    const counterDates = datesNumbers.map(spec => {
        return {number: spec, count: 0};
    });

    counterDates.map((countSpec, i) =>{
        const actualSpecLength = uniqueModels.filter(number => number === countSpec.number).length;
        countSpec.count = actualSpecLength;
    })

    // Preparamos para el primer Quiz.
    const datesNumbers1 = uniqueModels.filter((number, i) => i == 0 ? true : uniqueModels[i - 1] != number);
    const counterDates1 = datesNumbers1.map(spec => {
        return {number: spec, count: 0};
    });

    counterDates1.map((countSpec, i) =>{
        const actualSpecLength = uniqueModels1.filter(number => number === countSpec.number).length;
        countSpec.count = actualSpecLength;
    })

    // Preparamos para el segundo Quiz.
    const datesNumbers2 = uniqueModels.filter((number, i) => i == 0 ? true : uniqueModels[i - 1] != number);
    const counterDates2 = datesNumbers2.map(spec => {
        return {number: spec, count: 0};
    });

    counterDates2.map((countSpec, i) =>{
        const actualSpecLength = uniqueModels2.filter(number => number === countSpec.number).length;
        countSpec.count = actualSpecLength;
    })

    
    const data = {
        labels: label,
        datasets: [{
            label:'Todos los cuestionarios',
            data: counterDates.map(dates => dates.count),
            tension: .2,
            borderColor: getDataColors()[0],
            backgroundColor: getDataColors(10)[0],
            fill: true,
            pointBorderWidth: 5
        },{
            label:'Manuel',
            data: counterDates1.map(dates => dates.count),
            tension: .5,
            borderColor: getDataColors()[1],
            backgroundColor: getDataColors(20)[1],
            fill: true,
            pointBorderWidth: 5
        },{
            label:'Marcos',
            data: counterDates2.map(dates => dates.count),
            tension: .5,
            borderColor: getDataColors()[2],
            backgroundColor: getDataColors(20)[2],
            fill: true,
            pointBorderWidth: 5
        }
    ]
    }

    const options = {
        plugins: {
            legend: { display: false }
        },
        scales: {
            x: {
                ticks:{
                    color:'white'
                },
                title: {
                    display: true,
                    text: 'Fechas de realización de los cuestionarios',
                    color: 'white',
                    font: {
                        size: 30,
                        family:"'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif"
                    }
                  }
            },
            y: {
              color:'white',
              ticks:{
                color:'white'
              },
              min: 0,
              title: {
                display: true,
                text: 'Cuestionarios realizados por día',
                color:'white',
                font: {
                    size: 25,
                    family:"'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif"
                }
              }
            }
          }
    }
    new Chart('chronologyChart',{type: 'line',data,options})
}