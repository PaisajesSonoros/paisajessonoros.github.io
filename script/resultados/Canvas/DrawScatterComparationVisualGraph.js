function getCoordenates(uniqueDescriptor,descriptor1,descriptor2) {
    let data = [];
    const MAX_VALUE = 4;
    for (let index = 0; index < uniqueDescriptor.length; index++) {
        let descriptorValue1 = getDescriptorNumber(uniqueDescriptor[index][descriptor1])
        let descriptorValue2 = getDescriptorNumber(uniqueDescriptor[index][descriptor2])
        
        if (descriptorValue1 > descriptorValue2) {
            data[index] = descriptorValue1/MAX_VALUE;  
        }else if (descriptorValue1 < descriptorValue2) {
            data[index] = -(descriptorValue2/MAX_VALUE);
        }else{
            data[index] = 0;
        } 
    }
    return data
}

function convertXYCoordenates(xCoordenates,yCoordenates) {
    let data = [];
    for (let index = 0; index < xCoordenates.length; index++) {
        data[index] = {x: xCoordenates[index],y: yCoordenates[index], }
    }
    return data;
}
function getMediumValue(uniqueDescriptor,descriptor) {
    let data = [];
    const MAX_VALUE = 4;
    for (let index = 0; index < uniqueDescriptor.length; index++) {
       data[index] =  getDescriptorNumber(uniqueDescriptor[index][descriptor])/MAX_VALUE       
    }
    let value = (data.reduce((a, b) => a + b, 0))/uniqueDescriptor.length
    return value
}

function drawScatterComparationGraph(numberPlace,numberRecording) {
    console.info("graphLeft"+numberPlace+numberRecording)
    document.getElementById("graphLeft"+numberPlace+numberRecording).innerHTML = '<canvas id="renderRadarChart'+numberPlace+numberRecording+'"></canvas>'
    const numberTotalRecordings = quiz_info[0][0]["Recordings_Number"];    
    let position = ((numberPlace-1)*numberTotalRecordings)+Math.floor(numberRecording);
    position = Math.floor(position)
    const uniqueDescriptorManuel = [...new Set(quiz_info.map(descriptor => descriptor[1][position]))]
    const uniqueDescriptorMarcos = [...new Set(quiz_Marcos_info.map(descriptor => descriptor[1][position]))]
    console.info(position)
    // Obtenemos los descriptores.
    var descriptorManuel1 = Object.keys(uniqueDescriptorManuel[0])[6]
    var descriptorManuel2 = Object.keys(uniqueDescriptorManuel[0])[3]
    var descriptorManuel3 = Object.keys(uniqueDescriptorManuel[0])[4]
    var descriptorManuel4 = Object.keys(uniqueDescriptorManuel[0])[5]

    // Obtenemos los descriptores.
    var descriptorMarcos1 = Object.keys(uniqueDescriptorMarcos[0])[6]
    var descriptorMarcos2 = Object.keys(uniqueDescriptorMarcos[0])[3]
    var descriptorMarcos3 = Object.keys(uniqueDescriptorMarcos[0])[4]
    var descriptorMarcos4 = Object.keys(uniqueDescriptorMarcos[0])[5]
    
    // Obtenemos los datos.   
    const yCoordenatesManuel = getCoordenates(uniqueDescriptorManuel,descriptorManuel1,descriptorManuel3)
    const xCoordenatesManuel = getCoordenates(uniqueDescriptorManuel,descriptorManuel2,descriptorManuel4) 
    // Obtenemos los datos.   
    const yCoordenatesMarcos = getCoordenates(uniqueDescriptorMarcos,descriptorMarcos1,descriptorMarcos3)
    const xCoordenatesMarcos = getCoordenates(uniqueDescriptorMarcos,descriptorMarcos2,descriptorMarcos4) 

    const DataManuel = convertXYCoordenates(xCoordenatesManuel,yCoordenatesManuel)
    const DataMarcos = convertXYCoordenates(xCoordenatesMarcos,yCoordenatesMarcos)
    // Calculamos el valor medio de cada componente.
    var mediumDataManuel = [];
    var mediumDataMarcos = [];
    //const MAX_VALUE = 4;
    mediumDataManuel[0] = getMediumValue(uniqueDescriptorManuel,descriptorManuel1)
    mediumDataManuel[1] = getMediumValue(uniqueDescriptorManuel,descriptorManuel2)
    mediumDataManuel[2] = getMediumValue(uniqueDescriptorManuel,descriptorManuel3)
    mediumDataManuel[3] = getMediumValue(uniqueDescriptorManuel,descriptorManuel4)

    mediumDataMarcos[0] = getMediumValue(uniqueDescriptorMarcos,descriptorMarcos1)
    mediumDataMarcos[1] = getMediumValue(uniqueDescriptorMarcos,descriptorMarcos2)
    mediumDataMarcos[2] = getMediumValue(uniqueDescriptorMarcos,descriptorMarcos3)
    mediumDataMarcos[3] = getMediumValue(uniqueDescriptorMarcos,descriptorMarcos4)

    var colorManuel = numberRecording;
    var colorMarcos = numberRecording+3;
    const data = {
        labels: ['Dinámico', 'Agradable','Estático','Molesto'],
        datasets: [{
            label:"Coordenadas de Evaluación Solo Audio",
            type: 'scatter',
            data: DataManuel,
            borderColor: getDataColors()[colorManuel],
            backgroundColor: getDataColors(90)[colorManuel],
            order:3
        },{
            label:"Coordenadas de Evaluación Audio+Video",
            type: 'scatter',
            data: DataMarcos,
            borderColor: getDataColors()[colorMarcos],
            backgroundColor: getDataColors(90)[colorMarcos],
            order:3
        },{
            label:"Coordenadas de ambos tipos de cuestionarios",
            type:"radar",
            data:[],
            borderColor: getDataColors()[10],
            backgroundColor: getDataColors(100)[10],
            order:1
        }]
    }

    const options = {
        responsive: true,
        aspectRatio:1,
        plugins: {
            legend: { display:true,labels:{color:'white',fontStyle:'bolder'}},
            tooltip:{
                callbacks:{
                    label:(context) =>{
                        let text;
                        if (context.raw.x === undefined && context.raw.y === undefined) {
                            text = context.raw;
                        }else{
                            text = "x: " + context.raw.x +",y: "+context.raw.y;
                        }
                        
                        return text;
                    }
                }
            }
        },
        scales:{
            x:{
                min:-1.2,
                max:1.2,
                ticks:{
                    stepSize: 0.1,
                    color: "white"
                },
                grid: {
                    display: true,
                    lineWidth:0.1,
                    color: "white"
                  }
            },
            y:{
                min:-1.2,
                max:1.2,
                ticks:{
                    stepSize: 0.1,
                    color:"white"
                },
                grid: {
                    display: true,
                    lineWidth:0.1,
                    color: "white"
                  }
            },
            r:{
                min:0,
                max:1,
                angleLines: {
                    display: false
                }, 
                ticks: {
                    display:false
                },
                pointLabels: {
                    color: 'white'
                  },
            },
            tricks:{
                display: false
            }
        }
    }
    const idChart = 'renderRadarChart'+(numberPlace)+(numberRecording)
    
    // Creamos un nuevo Chart con el identificador del canvas en el html y el tipo (tipo donut), además luego van los datos y las opciones.
     new Chart(idChart, {data, options })
}

function drawRadarComparationGraph(numberPlace,numberRecording) {
    console.info("graphLeft"+numberPlace+numberRecording)
    document.getElementById("graphLeft"+numberPlace+numberRecording).innerHTML = '<canvas id="renderRadarChart'+numberPlace+numberRecording+'"></canvas>'
    const numberTotalRecordings = quiz_info[0][0]["Recordings_Number"];    
    let position = ((numberPlace-1)*numberTotalRecordings)+Math.floor(numberRecording);
    console.info(position)
    position = Math.floor(position)
    const uniqueDescriptorManuel = [...new Set(quiz_info.map(descriptor => descriptor[1][position]))]
    const uniqueDescriptorMarcos = [...new Set(quiz_Marcos_info.map(descriptor => descriptor[1][position]))]

    // Obtenemos los descriptores.
    var descriptorManuel1 = Object.keys(uniqueDescriptorManuel[0])[6]
    var descriptorManuel2 = Object.keys(uniqueDescriptorManuel[0])[3]
    var descriptorManuel3 = Object.keys(uniqueDescriptorManuel[0])[4]
    var descriptorManuel4 = Object.keys(uniqueDescriptorManuel[0])[5]

    // Obtenemos los descriptores.
    var descriptorMarcos1 = Object.keys(uniqueDescriptorMarcos[0])[6]
    var descriptorMarcos2 = Object.keys(uniqueDescriptorMarcos[0])[3]
    var descriptorMarcos3 = Object.keys(uniqueDescriptorMarcos[0])[4]
    var descriptorMarcos4 = Object.keys(uniqueDescriptorMarcos[0])[5]
    
    // Calculamos el valor medio de cada componente.
    var mediumDataManuel = [];
    var mediumDataMarcos = [];

    mediumDataManuel[0] = getMediumValue(uniqueDescriptorManuel,descriptorManuel1)
    mediumDataManuel[1] = getMediumValue(uniqueDescriptorManuel,descriptorManuel2)
    mediumDataManuel[2] = getMediumValue(uniqueDescriptorManuel,descriptorManuel3)
    mediumDataManuel[3] = getMediumValue(uniqueDescriptorManuel,descriptorManuel4)

    mediumDataMarcos[0] = getMediumValue(uniqueDescriptorMarcos,descriptorMarcos1)
    mediumDataMarcos[1] = getMediumValue(uniqueDescriptorMarcos,descriptorMarcos2)
    mediumDataMarcos[2] = getMediumValue(uniqueDescriptorMarcos,descriptorMarcos3)
    mediumDataMarcos[3] = getMediumValue(uniqueDescriptorMarcos,descriptorMarcos4)

    const data = {
        labels: ['Dinámico', 'Agradable','Estático','Molesto'],
        datasets: [{
            label:"Diagrama Evaluación Solo Audio",
            type: 'radar',
            data: mediumDataManuel,
            borderColor: getDataColors()[numberRecording],
            backgroundColor: getDataColors(10)[numberRecording],
            order:2
        },{
            label:"Diagrama Evaluación Audio+Visual",
            type: 'radar',
            data: mediumDataMarcos,
            borderColor: getDataColors()[numberRecording+3],
            backgroundColor: getDataColors(10)[numberRecording+3],
            order:1
        }]
    }

    const options = {
        responsive: true,
        aspectRatio:1,
        plugins: {
            legend: { display:true,labels:{color:'white',fontStyle:'bolder'}},
            tooltip:{
                callbacks:{
                    label:(context) =>{
                        let text;
                        if (context.raw.x === undefined && context.raw.y === undefined) {
                            text = context.raw;
                        }else{
                            text = "x: " + context.raw.x +",y: "+context.raw.y;
                        }
                        
                        return text;
                    }
                }
            }
        },
        scales:{
            r:{
                min:0,
                max:1,
                angleLines: {
                    display: false,
                    color: "white"
                },
                grid:{
                    color: "white"
                },
                ticks: {
                    display:false,
                    stepSize: 0.1,
                },
                pointLabels: {
                    color: 'white'
                  },
            }
        }
    }
    const idChart = 'renderRadarChart'+(numberPlace)+numberRecording
    
    // Creamos un nuevo Chart con el identificador del canvas en el html y el tipo (tipo donut), además luego van los datos y las opciones.
     new Chart(idChart, {data, options })
}

function drawScatterOrRadar(type,numberPlace,numberRecording) {
    document.getElementById("graphLeft"+numberPlace+numberRecording).innerHTML = "";
    if (type == "scatter") {
        drawScatterComparationGraph(numberPlace,numberRecording)
    }else{
        console.info(numberPlace,numberRecording)
        drawRadarComparationGraph(numberPlace,numberRecording)
    }
}