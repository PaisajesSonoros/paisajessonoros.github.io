var newTemplateData = [];
var oldTemplateData = [];
var newData = [];
document.addEventListener("DOMContentLoaded", function() {
    const fileInput = document.getElementById("fileInput");
    const downloadButton = document.getElementById("downloadButton");

    fileInput.addEventListener("change", function(event) {
        const selectedFile = event.target.files[0];
        if (selectedFile) {
            readFileContent(selectedFile);
        }
    });

    function readFileContent(file) {
        const reader = new FileReader();

        reader.onload = function(event) {
            const content = event.target.result;
            try {
                const jsonData = JSON.parse(content);
                processJsonData(jsonData);
                downloadButton.style.display = "block";
                downloadButton.addEventListener("click", function() {
                    downloadJSONFile(newData);
                });
            } catch (error) {
                console.error(error);
            }
        };

        reader.readAsText(file);
    }

    function processJsonData(data) {
        // Primero averiguamos si es del tipo antiguo o del nuevo.
        if (data[0][0]["Date"] == undefined) { // Del nuevo al viejo.
            console.log("Contenido JSON:", data);
        }else{ // Del viejo al nuevo.
            //-- Añadimos al newData tantos cuestionarios como se hiciesen.
            for (let index = 0; index < data.length; index++) {
                newData[index] = {
                    "Inicial": {
                    "Fecha_Realización": "Fri Mar 18 2023 1:25:47 GMT+01",
                    "Introduce aquí tu puntuación auditiva obtenida en el test hearWHO": "0",
                    "Nombre del Cuestionario": "Online-Audio"
                    },
                    "PS1Ciu":{
                        "PS1Ciu/Agradable/Placentero": "muy_desacuerdo",
                        "PS1Ciu/Sin Actividad/Estático": "muy_desacuerdo",
                        "PS1Ciu/Desagradable/Molesto": "acuerdo",
                        "PS1Ciu/Con Actividad/Dinámico": "acuerdo",
                        "PS1Ciu/En general, ¿Cómo describirías la calidad acústica del entorno que escuchas?": "malo",
                        "PS1Ciu/¿Cuánto tiempo permanecerías en un lugar con un ambiente sonoro como este?": "bien",
                        "PS1Ciu/¿Para cuál de los siguientes contextos urbanos crees que es adecuado el entorno acústico que escuchas?": "comercial",
                        "PS1Ciu/¿A qué período del año crees que se corresponde el entorno sonoro que escuchas?": "invierno"
                    },
                    "PS2Ciu":{
                        "PS2Ciu/Agradable/Placentero": "acuerdo",
                        "PS2Ciu/Sin Actividad/Estático": "desacuerdo",
                        "PS2Ciu/Desagradable/Molesto": "desacuerdo",
                        "PS2Ciu/Con Actividad/Dinámico": "acuerdo",
                        "PS2Ciu/En general, ¿Cómo describirías la calidad acústica del entorno que escuchas?": "neutro",
                        "PS2Ciu/¿Cuánto tiempo permanecerías en un lugar con un ambiente sonoro como este?": "bastante",
                        "PS2Ciu/¿Para cuál de los siguientes contextos urbanos crees que es adecuado el entorno acústico que escuchas?": "recreativo",
                        "PS2Ciu/¿A qué período del año crees que se corresponde el entorno sonoro que escuchas?": "verano"
                    },
                    "PS3Ciu":{
                        "PS3Ciu/Agradable/Placentero": "desacuerdo",
                        "PS3Ciu/Sin Actividad/Estático": "desacuerdo",
                        "PS3Ciu/Desagradable/Molesto": "acuerdo",
                        "PS3Ciu/Con Actividad/Dinámico": "acuerdo",
                        "PS3Ciu/En general, ¿Cómo describirías la calidad acústica del entorno que escuchas?": "malo",
                        "PS3Ciu/¿Cuánto tiempo permanecerías en un lugar con un ambiente sonoro como este?": "molesto",
                        "PS3Ciu/¿Para cuál de los siguientes contextos urbanos crees que es adecuado el entorno acústico que escuchas?": "recreativo",
                        "PS3Ciu/¿A qué período del año crees que se corresponde el entorno sonoro que escuchas?": "invierno"
                    },
                    "PS1Mao":{
                        "PS1Mao/Agradable/Placentero": "acuerdo",
                        "PS1Mao/Sin Actividad/Estático": "acuerdo",
                        "PS1Mao/Desagradable/Molesto": "desacuerdo",
                        "PS1Mao/Con Actividad/Dinámico": "desacuerdo",
                        "PS1Mao/En general, ¿Cómo describirías la calidad acústica del entorno que escuchas?": "bueno",
                        "PS1Mao/¿Cuánto tiempo permanecerías en un lugar con un ambiente sonoro como este?": "bastante",
                        "PS1Mao/¿Para cuál de los siguientes contextos urbanos crees que es adecuado el entorno acústico que escuchas?": "residencial",
                        "PS1Mao/¿A qué período del año crees que se corresponde el entorno sonoro que escuchas?": "invierno"
                        },
                    "PS2Mao":{
                        "PS2Mao/Agradable/Placentero": "neutro",
                        "PS2Mao/Sin Actividad/Estático": "acuerdo",
                        "PS2Mao/Desagradable/Molesto": "desacuerdo",
                        "PS2Mao/Con Actividad/Dinámico": "desacuerdo",
                        "PS2Mao/En general, ¿Cómo describirías la calidad acústica del entorno que escuchas?": "neutro",
                        "PS2Mao/¿Cuánto tiempo permanecerías en un lugar con un ambiente sonoro como este?": "bastante",
                        "PS2Mao/¿Para cuál de los siguientes contextos urbanos crees que es adecuado el entorno acústico que escuchas?": "comercial",
                        "PS2Mao/¿A qué período del año crees que se corresponde el entorno sonoro que escuchas?": "otro"
                    },
                    "PS3Mao":{
                        "PS3Mao/Agradable/Placentero": "acuerdo",
                        "PS3Mao/Sin Actividad/Estático": "desacuerdo",
                        "PS3Mao/Desagradable/Molesto": "desacuerdo",
                        "PS3Mao/Con Actividad/Dinámico": "acuerdo",
                        "PS3Mao/En general, ¿Cómo describirías la calidad acústica del entorno que escuchas?": "bueno",
                        "PS3Mao/¿Cuánto tiempo permanecerías en un lugar con un ambiente sonoro como este?": "bien",
                        "PS3Mao/¿Para cuál de los siguientes contextos urbanos crees que es adecuado el entorno acústico que escuchas?": "recreativo",
                        "PS3Mao/¿A qué período del año crees que se corresponde el entorno sonoro que escuchas?": "verano"
                        },
                    "Finales": [
                        {
                            "¿Conoces Menorca?¿En qué grado estás familiarizado/a o relacionado/a con la isla?": "si_poco",
                            "¿Tienes algún tipo de conocimiento o formación en Acústica?": "no"
                        }
                    ]
                
                };               
            }
            console.info(data.length)
            for (let index = 0; index < newData.length; index++) {
                console.info(index)
                // Primero hay que pasar la fecha de realización de uno a otro.
                newData[index]["Inicial"]["Fecha_Realización"] = data[index][0]["Date"];
                // Luego hay que pasar la puntuación en el test HearWHO.
                newData[index]["Inicial"]["Introduce aquí tu puntuación auditiva obtenida en el test hearWHO"] = data[index][0]["Introduce aquí tu puntuación auditiva obtenida en el test hearWHO"];
                // Por último del Inicial, pasar el nombre del ceustionario.
                newData[index]["Inicial"]["Nombre del Cuestionario"] = data[index][0]["Name_Quiz"];
                // Una vez acabadas las preguntas iniciales pasamos a las de las grabaciones
                //Hay dos escenarios por lo que haremos dos bucles que recorran ambas ciudades.
                SwitchScenaryData(newData,data,index,"Ciu",3)
                SwitchScenaryData(newData,data,index,"Mao",3)

                // Por último, hacemos las preguntas finales.
                // Primero hay que pasar la fecha de realización de uno a otro.
                newData[index]["Finales"][0]["¿Conoces Menorca?¿En qué grado estás familiarizado/a o relacionado/a con la isla?"] = data[index][2][0]["¿Conoces Menorca?¿En qué grado estás familiarizado/a o relacionado/a con la isla?"];
                // Luego hay que pasar la puntuación en el test HearWHO.
                newData[index]["Finales"][0]["¿Tienes algún tipo de conocimiento o formación en Acústica?"] = data[index][2][0]["¿Tienes algún tipo de conocimiento o formación en Acústica?"];

            }
            console.table(newData)
        }
        
    }

    function SwitchScenaryData(newData,data,index,nameScenary,numberRecordings) {
        const NUMBER_RECORDINGS = numberRecordings;
        for (let recording = 1; recording <= NUMBER_RECORDINGS; recording++) {
            var positionRecording;
            if (nameScenary == "Mao") {
                positionRecording = NUMBER_RECORDINGS + recording - 1;
            }else{
                positionRecording = recording - 1;
            }
            console.info(index,"PS"+recording+nameScenary)
            newData[index]["PS"+recording+nameScenary]["PS"+recording+nameScenary+"/Agradable/Placentero"] = data[index][1][positionRecording]["Agradable/Placentero"];
            newData[index]["PS"+recording+nameScenary]["PS"+recording+nameScenary+"/Sin Actividad/Estático"] = data[index][1][positionRecording]["Sin Actividad/Estático"];                 
            newData[index]["PS"+recording+nameScenary]["PS"+recording+nameScenary+"/Desagradable/Molesto"] = data[index][1][positionRecording]["Desagradable/Molesto"];
            newData[index]["PS"+recording+nameScenary]["PS"+recording+nameScenary+"/Con Actividad/Dinámico"] = data[index][1][positionRecording]["Con Actividad/Dinámico"];
            console.table(newData[index]["PS"+recording+nameScenary])
            console.table(data[index][1][recording-1])
            newData[index]["PS"+recording+nameScenary]["PS"+recording+nameScenary+"/En general, ¿Cómo describirías la calidad acústica del entorno que escuchas?"] = data[index][1][recording-1]["En general, ¿Cómo describirías la calidad acústica del entorno que escuchas?"];

            newData[index]["PS"+recording+nameScenary]["PS"+recording+nameScenary+"/¿Cuánto tiempo permanecerías en un lugar con un ambiente sonoro como este?"] = data[index][1][recording-1]["¿Cuánto tiempo permanecerías en un lugar con un ambiente sonoro como este?"];

            newData[index]["PS"+recording+nameScenary]["PS"+recording+nameScenary+"/¿Para cuál de los siguientes contextos urbanos crees que es adecuado el entorno acústico que escuchas?"] = data[index][1][recording-1]["¿Para cuál de los siguientes contextos urbanos crees que es adecuado el entorno acústico que escuchas?"];

            newData[index]["PS"+recording+nameScenary]["PS"+recording+nameScenary+"/¿A qué período del año crees que se corresponde el entorno sonoro que escuchas?"] = data[index][1][recording-1]["¿A qué período del año crees que se corresponde el entorno sonoro que escuchas?"];
            
        }
    }

    function downloadJSONFile(jsonData) {
        const jsonContent = JSON.stringify(jsonData, null, 2);
        const blob = new Blob([jsonContent], { type: "application/json" });
        const url = URL.createObjectURL(blob);

        const a = document.createElement("a");
        a.href = url;
        a.download = "data.json";
        a.click();

        URL.revokeObjectURL(url);
    }
});


let urlOldTemplate = 'https://raw.githubusercontent.com/PaisajesSonoros/paisajessonoros.github.io/main/resources/templates/oldTemplate.json'
fetch(urlOldTemplate)
    .then(response => response.json())
    .then(data => saveOldTemplate(data))
    .catch(error => console.log(error));
function saveOldTemplate(data) {
    oldTemplateData = data;
}

let urlNewTemplate = 'https://raw.githubusercontent.com/PaisajesSonoros/paisajessonoros.github.io/main/resources/templates/newTemplate.json'
fetch(urlNewTemplate)
    .then(response => response.json())
    .then(data => saveNewTemplate(data))
    .catch(error => console.log(error));
function saveNewTemplate(data) {
    newTemplateData = data;
}