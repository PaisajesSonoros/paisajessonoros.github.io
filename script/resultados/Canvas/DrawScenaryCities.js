function editLabel(label) {
    let text;
    switch (label) {
        case "malo":
            text = "Malo"
            break;
        case "bueno":
            text = "Bueno"
            break;
        case "muy_malo":
            text = "Muy malo"
            break;
        case "muy_bueno":
            text = "Muy bueno"
            break;
        case "neutro":
            text = "Ni bueno ni malo"
            break;
        case "comercial":
            text = "Comercial"
            break;
        case "residencial":
            text = "Residencial"
            break;
        case "recreativo":
            text = "Recreativo"
            break;
        case "otro":
            text = "Otro"
            break;
        case "invierno":
            text = "Invierno"
            break;
        case "verano":
            text = "Verano"
            break;
    }

    return text
}
function drawQualityBarCitiesComparationGraphLeft() {
    document.getElementById("graphQualityLeft").innerHTML = '<canvas id="CitiesrenderBarQualityChartLeft"></canvas>'
    const uniqueDescriptor1 = [...new Set(quiz_info.map(descriptor => descriptor[1][0]))]
    const uniqueDescriptor2 = [...new Set(quiz_info.map(descriptor => descriptor[1][1]))]
    const uniqueDescriptor3 = [...new Set(quiz_info.map(descriptor => descriptor[1][2]))]
    const uniqueDescriptorCiutadella = uniqueDescriptor1.concat(uniqueDescriptor2).concat(uniqueDescriptor3)

    const uniqueDescriptor4 = [...new Set(quiz_info.map(descriptor => descriptor[1][3]))]
    const uniqueDescriptor5 = [...new Set(quiz_info.map(descriptor => descriptor[1][4]))]
    const uniqueDescriptor6 = [...new Set(quiz_info.map(descriptor => descriptor[1][5]))]
    const uniqueDescriptorMao = uniqueDescriptor4.concat(uniqueDescriptor5).concat(uniqueDescriptor6)

    const uniqueDescriptor = uniqueDescriptorCiutadella.concat(uniqueDescriptorMao)
    const labelOptions = [...new Set(uniqueDescriptor.map(uniqueDescriptor => uniqueDescriptor["En general, ¿Cómo describirías la calidad acústica del entorno que escuchas?"]))].sort();
    var label = [];

    for (let index = 0; index < labelOptions.length; index++) {
        label[index] = editLabel(labelOptions[index])
    }

    var uniqueModelsCiutadella = [];
    var uniqueModelsMao = [];
    for (let index = 0; index < uniqueDescriptorCiutadella.length; index++) {
        uniqueModelsCiutadella[index] = uniqueDescriptorCiutadella[index]["En general, ¿Cómo describirías la calidad acústica del entorno que escuchas?"]
    }
    for (let index = 0; index < uniqueDescriptorMao.length; index++) {
        uniqueModelsMao[index] = uniqueDescriptorMao[index]["En general, ¿Cómo describirías la calidad acústica del entorno que escuchas?"]
    }

    var newDataCiutadella = [];
    for (let index = 0; index < uniqueModelsCiutadella.length; index++) {
        const element = uniqueModelsCiutadella[index];
        //-- Recorremos los descriptores. Si coincide, sumamos uno en su contador
        for (let descriptor = 0; descriptor < labelOptions.length; descriptor++) {

            if (element == labelOptions[descriptor]) {
                if (newDataCiutadella[descriptor] == undefined) {
                    let initValue = Math.floor(1);
                    newDataCiutadella[descriptor] = initValue;
                }else{
                    newDataCiutadella[descriptor] +=1;
                }
            }
        }
    }


    const data = {
        labels: label,
        datasets: [{
            data: newDataCiutadella,
            borderColor: getDataColors(),
            backgroundColor: getDataColors(70),
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
    const idChart = 'CitiesrenderBarQualityChartLeft'
    
    // Creamos un nuevo Chart con el identificador del canvas en el html y el tipo (tipo donut), además luego van los datos y las opciones.
     new Chart(idChart, {type: 'doughnut',data, options })
}

function drawQualityBarCitiesComparationGraphRight() {
    document.getElementById("graphQualityRight").innerHTML = '<canvas id="CitiesrenderBarQualityChartRight"></canvas>'
    const uniqueDescriptor1 = [...new Set(quiz_info.map(descriptor => descriptor[1][0]))]
    const uniqueDescriptor2 = [...new Set(quiz_info.map(descriptor => descriptor[1][1]))]
    const uniqueDescriptor3 = [...new Set(quiz_info.map(descriptor => descriptor[1][2]))]
    const uniqueDescriptorCiutadella = uniqueDescriptor1.concat(uniqueDescriptor2).concat(uniqueDescriptor3)

    const uniqueDescriptor4 = [...new Set(quiz_info.map(descriptor => descriptor[1][3]))]
    const uniqueDescriptor5 = [...new Set(quiz_info.map(descriptor => descriptor[1][4]))]
    const uniqueDescriptor6 = [...new Set(quiz_info.map(descriptor => descriptor[1][5]))]
    const uniqueDescriptorMao = uniqueDescriptor4.concat(uniqueDescriptor5).concat(uniqueDescriptor6)

    const uniqueDescriptor = uniqueDescriptorCiutadella.concat(uniqueDescriptorMao)
    const labelOptions = [...new Set(uniqueDescriptor.map(uniqueDescriptor => uniqueDescriptor["En general, ¿Cómo describirías la calidad acústica del entorno que escuchas?"]))].sort();
    var label = [];

    for (let index = 0; index < labelOptions.length; index++) {
        label[index] = editLabel(labelOptions[index])
    }

    var uniqueModelsCiutadella = [];
    var uniqueModelsMao = [];
    for (let index = 0; index < uniqueDescriptorCiutadella.length; index++) {
        uniqueModelsCiutadella[index] = uniqueDescriptorCiutadella[index]["En general, ¿Cómo describirías la calidad acústica del entorno que escuchas?"]
    }
    for (let index = 0; index < uniqueDescriptorMao.length; index++) {
        uniqueModelsMao[index] = uniqueDescriptorMao[index]["En general, ¿Cómo describirías la calidad acústica del entorno que escuchas?"]
    }

    var newDataMao = [];
    for (let index = 0; index < uniqueModelsMao.length; index++) {
        const element = uniqueModelsMao[index];
        //-- Recorremos los descriptores. Si coincide, sumamos uno en su contador
        for (let descriptor = 0; descriptor < labelOptions.length; descriptor++) {

            if (element == labelOptions[descriptor]) {
                if (newDataMao[descriptor] == undefined) {
                    let initValue = Math.floor(1);
                    newDataMao[descriptor] = initValue;
                }else{
                    newDataMao[descriptor] +=1;
                }
            }
        }
    }

    const data = {
        labels: label,
        datasets: [{
            data: newDataMao,
            borderColor: getDataColors(),
            backgroundColor: getDataColors(70),
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
    const idChart = 'CitiesrenderBarQualityChartRight'
    
    // Creamos un nuevo Chart con el identificador del canvas en el html y el tipo (tipo donut), además luego van los datos y las opciones.
     new Chart(idChart, {type: 'doughnut',data, options })
}

function drawSeasonBarCitiesComparationGraphLeft() {
    document.getElementById("graphSeasonLeft").innerHTML = '<canvas id="CitiesrenderBarSeasonChartLeft"></canvas>'
    const uniqueDescriptor1 = [...new Set(quiz_info.map(descriptor => descriptor[1][0]))]
    const uniqueDescriptor2 = [...new Set(quiz_info.map(descriptor => descriptor[1][1]))]
    const uniqueDescriptor3 = [...new Set(quiz_info.map(descriptor => descriptor[1][2]))]
    const uniqueDescriptorCiutadella = uniqueDescriptor1.concat(uniqueDescriptor2).concat(uniqueDescriptor3)

    const uniqueDescriptor4 = [...new Set(quiz_info.map(descriptor => descriptor[1][3]))]
    const uniqueDescriptor5 = [...new Set(quiz_info.map(descriptor => descriptor[1][4]))]
    const uniqueDescriptor6 = [...new Set(quiz_info.map(descriptor => descriptor[1][5]))]
    const uniqueDescriptorMao = uniqueDescriptor4.concat(uniqueDescriptor5).concat(uniqueDescriptor6)

    const uniqueDescriptor = uniqueDescriptorCiutadella.concat(uniqueDescriptorMao)
    const labelOptions = [...new Set(uniqueDescriptor.map(uniqueDescriptor => uniqueDescriptor["¿A qué período del año crees que se corresponde el entorno sonoro que escuchas?"]))].sort();
    var label = [];

    for (let index = 0; index < labelOptions.length; index++) {
        label[index] = editLabel(labelOptions[index])
    }

    var uniqueModelsCiutadella = [];
    var uniqueModelsMao = [];
    for (let index = 0; index < uniqueDescriptorCiutadella.length; index++) {
        uniqueModelsCiutadella[index] = uniqueDescriptorCiutadella[index]["¿A qué período del año crees que se corresponde el entorno sonoro que escuchas?"]
    }
    for (let index = 0; index < uniqueDescriptorMao.length; index++) {
        uniqueModelsMao[index] = uniqueDescriptorMao[index]["¿A qué período del año crees que se corresponde el entorno sonoro que escuchas?"]
    }

    var newDataCiutadella = [];
    for (let index = 0; index < uniqueModelsCiutadella.length; index++) {
        const element = uniqueModelsCiutadella[index];
        //-- Recorremos los descriptores. Si coincide, sumamos uno en su contador
        for (let descriptor = 0; descriptor < labelOptions.length; descriptor++) {

            if (element == labelOptions[descriptor]) {
                if (newDataCiutadella[descriptor] == undefined) {
                    let initValue = Math.floor(1);
                    newDataCiutadella[descriptor] = initValue;
                }else{
                    newDataCiutadella[descriptor] +=1;
                }
            }
        }
    }


    const data = {
        labels: label,
        datasets: [{
            data: newDataCiutadella,
            borderColor: getDataColors(),
            backgroundColor: getDataColors(70),
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
    const idChart = 'CitiesrenderBarSeasonChartLeft'
    
    // Creamos un nuevo Chart con el identificador del canvas en el html y el tipo (tipo donut), además luego van los datos y las opciones.
     new Chart(idChart, {type: 'doughnut',data, options })
}

function drawSeasonBarCitiesComparationGraphRight() {
    document.getElementById("graphSeasonRight").innerHTML = '<canvas id="CitiesrenderBarSeasonChartRight"></canvas>'
    const uniqueDescriptor1 = [...new Set(quiz_info.map(descriptor => descriptor[1][0]))]
    const uniqueDescriptor2 = [...new Set(quiz_info.map(descriptor => descriptor[1][1]))]
    const uniqueDescriptor3 = [...new Set(quiz_info.map(descriptor => descriptor[1][2]))]
    const uniqueDescriptorCiutadella = uniqueDescriptor1.concat(uniqueDescriptor2).concat(uniqueDescriptor3)

    const uniqueDescriptor4 = [...new Set(quiz_info.map(descriptor => descriptor[1][3]))]
    const uniqueDescriptor5 = [...new Set(quiz_info.map(descriptor => descriptor[1][4]))]
    const uniqueDescriptor6 = [...new Set(quiz_info.map(descriptor => descriptor[1][5]))]
    const uniqueDescriptorMao = uniqueDescriptor4.concat(uniqueDescriptor5).concat(uniqueDescriptor6)

    const uniqueDescriptor = uniqueDescriptorCiutadella.concat(uniqueDescriptorMao)
    const labelOptions = [...new Set(uniqueDescriptor.map(uniqueDescriptor => uniqueDescriptor["¿A qué período del año crees que se corresponde el entorno sonoro que escuchas?"]))].sort();
    var label = [];

    for (let index = 0; index < labelOptions.length; index++) {
        label[index] = editLabel(labelOptions[index])
    }

    var uniqueModelsCiutadella = [];
    var uniqueModelsMao = [];
    for (let index = 0; index < uniqueDescriptorCiutadella.length; index++) {
        uniqueModelsCiutadella[index] = uniqueDescriptorCiutadella[index]["¿A qué período del año crees que se corresponde el entorno sonoro que escuchas?"]
    }
    for (let index = 0; index < uniqueDescriptorMao.length; index++) {
        uniqueModelsMao[index] = uniqueDescriptorMao[index]["¿A qué período del año crees que se corresponde el entorno sonoro que escuchas?"]
    }

    var newDataMao = [];
    for (let index = 0; index < uniqueModelsMao.length; index++) {
        const element = uniqueModelsMao[index];
        //-- Recorremos los descriptores. Si coincide, sumamos uno en su contador
        for (let descriptor = 0; descriptor < labelOptions.length; descriptor++) {

            if (element == labelOptions[descriptor]) {
                if (newDataMao[descriptor] == undefined) {
                    let initValue = Math.floor(1);
                    newDataMao[descriptor] = initValue;
                }else{
                    newDataMao[descriptor] +=1;
                }
            }
        }
    }

    const data = {
        labels: label,
        datasets: [{
            data: newDataMao,
            borderColor: getDataColors(),
            backgroundColor: getDataColors(70),
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
    const idChart = 'CitiesrenderBarSeasonChartRight'
    
    // Creamos un nuevo Chart con el identificador del canvas en el html y el tipo (tipo donut), además luego van los datos y las opciones.
     new Chart(idChart, {type: 'doughnut',data, options })
}

function drawContextBarCitiesComparationGraphLeft() {
    document.getElementById("graphContextLeft").innerHTML = '<canvas id="CitiesrenderBarContextChartLeft"></canvas>'
    const uniqueDescriptor1 = [...new Set(quiz_info.map(descriptor => descriptor[1][0]))]
    const uniqueDescriptor2 = [...new Set(quiz_info.map(descriptor => descriptor[1][1]))]
    const uniqueDescriptor3 = [...new Set(quiz_info.map(descriptor => descriptor[1][2]))]
    const uniqueDescriptorCiutadella = uniqueDescriptor1.concat(uniqueDescriptor2).concat(uniqueDescriptor3)

    const uniqueDescriptor4 = [...new Set(quiz_info.map(descriptor => descriptor[1][3]))]
    const uniqueDescriptor5 = [...new Set(quiz_info.map(descriptor => descriptor[1][4]))]
    const uniqueDescriptor6 = [...new Set(quiz_info.map(descriptor => descriptor[1][5]))]
    const uniqueDescriptorMao = uniqueDescriptor4.concat(uniqueDescriptor5).concat(uniqueDescriptor6)

    const uniqueDescriptor = uniqueDescriptorCiutadella.concat(uniqueDescriptorMao)
    const labelOptions = [...new Set(uniqueDescriptor.map(uniqueDescriptor => uniqueDescriptor["¿Para cuál de los siguientes contextos urbanos crees que es adecuado el entorno acústico que escuchas?"]))].sort();
    var label = [];

    for (let index = 0; index < labelOptions.length; index++) {
        label[index] = editLabel(labelOptions[index])
    }

    var uniqueModelsCiutadella = [];
    var uniqueModelsMao = [];
    for (let index = 0; index < uniqueDescriptorCiutadella.length; index++) {
        uniqueModelsCiutadella[index] = uniqueDescriptorCiutadella[index]["¿Para cuál de los siguientes contextos urbanos crees que es adecuado el entorno acústico que escuchas?"]
    }
    for (let index = 0; index < uniqueDescriptorMao.length; index++) {
        uniqueModelsMao[index] = uniqueDescriptorMao[index]["¿Para cuál de los siguientes contextos urbanos crees que es adecuado el entorno acústico que escuchas?"]
    }

    var newDataCiutadella = [];
    for (let index = 0; index < uniqueModelsCiutadella.length; index++) {
        const element = uniqueModelsCiutadella[index];
        //-- Recorremos los descriptores. Si coincide, sumamos uno en su contador
        for (let descriptor = 0; descriptor < labelOptions.length; descriptor++) {

            if (element == labelOptions[descriptor]) {
                if (newDataCiutadella[descriptor] == undefined) {
                    let initValue = Math.floor(1);
                    newDataCiutadella[descriptor] = initValue;
                }else{
                    newDataCiutadella[descriptor] +=1;
                }
            }
        }
    }


    const data = {
        labels: label,
        datasets: [{
            data: newDataCiutadella,
            borderColor: getDataColors(),
            backgroundColor: getDataColors(70),
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
    const idChart = 'CitiesrenderBarContextChartLeft'
    
    // Creamos un nuevo Chart con el identificador del canvas en el html y el tipo (tipo donut), además luego van los datos y las opciones.
     new Chart(idChart, {type: 'doughnut',data, options })
}

function drawContextBarCitiesComparationGraphRight() {
    document.getElementById("graphContextRight").innerHTML = '<canvas id="CitiesrenderBarContextChartRight"></canvas>'
    const uniqueDescriptor1 = [...new Set(quiz_info.map(descriptor => descriptor[1][0]))]
    const uniqueDescriptor2 = [...new Set(quiz_info.map(descriptor => descriptor[1][1]))]
    const uniqueDescriptor3 = [...new Set(quiz_info.map(descriptor => descriptor[1][2]))]
    const uniqueDescriptorCiutadella = uniqueDescriptor1.concat(uniqueDescriptor2).concat(uniqueDescriptor3)

    const uniqueDescriptor4 = [...new Set(quiz_info.map(descriptor => descriptor[1][3]))]
    const uniqueDescriptor5 = [...new Set(quiz_info.map(descriptor => descriptor[1][4]))]
    const uniqueDescriptor6 = [...new Set(quiz_info.map(descriptor => descriptor[1][5]))]
    const uniqueDescriptorMao = uniqueDescriptor4.concat(uniqueDescriptor5).concat(uniqueDescriptor6)

    const uniqueDescriptor = uniqueDescriptorCiutadella.concat(uniqueDescriptorMao)
    const labelOptions = [...new Set(uniqueDescriptor.map(uniqueDescriptor => uniqueDescriptor["¿Para cuál de los siguientes contextos urbanos crees que es adecuado el entorno acústico que escuchas?"]))].sort();
    var label = [];

    for (let index = 0; index < labelOptions.length; index++) {
        label[index] = editLabel(labelOptions[index])
    }

    var uniqueModelsCiutadella = [];
    var uniqueModelsMao = [];
    for (let index = 0; index < uniqueDescriptorCiutadella.length; index++) {
        uniqueModelsCiutadella[index] = uniqueDescriptorCiutadella[index]["¿Para cuál de los siguientes contextos urbanos crees que es adecuado el entorno acústico que escuchas?"]
    }
    for (let index = 0; index < uniqueDescriptorMao.length; index++) {
        uniqueModelsMao[index] = uniqueDescriptorMao[index]["¿Para cuál de los siguientes contextos urbanos crees que es adecuado el entorno acústico que escuchas?"]
    }

    var newDataMao = [];
    for (let index = 0; index < uniqueModelsMao.length; index++) {
        const element = uniqueModelsMao[index];
        //-- Recorremos los descriptores. Si coincide, sumamos uno en su contador
        for (let descriptor = 0; descriptor < labelOptions.length; descriptor++) {

            if (element == labelOptions[descriptor]) {
                if (newDataMao[descriptor] == undefined) {
                    let initValue = Math.floor(1);
                    newDataMao[descriptor] = initValue;
                }else{
                    newDataMao[descriptor] +=1;
                }
            }
        }
    }

    const data = {
        labels: label,
        datasets: [{
            data: newDataMao,
            borderColor: getDataColors(),
            backgroundColor: getDataColors(70),
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
    const idChart = 'CitiesrenderBarContextChartRight'
    
    // Creamos un nuevo Chart con el identificador del canvas en el html y el tipo (tipo donut), además luego van los datos y las opciones.
     new Chart(idChart, {type: 'doughnut',data, options })
}