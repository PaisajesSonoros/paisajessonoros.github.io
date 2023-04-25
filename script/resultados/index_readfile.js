
var load_quizs_opened = [];

// Variables sobre el Quizs a mostar.
var name_quiz = "";
var quiz_info = [];
var audio_info = [];
var video_info = [];
var info_table = document.getElementById("info_table");

let urlAudio = 'https://raw.githubusercontent.com/SalcedoManuel/Paisajes-Sonoros/main/resultados/Audio.json'
fetch(urlAudio)
    .then(response => response.json())
    .then(data => saveAudioData(data))
    .catch(error => console.log(error));
function saveAudioData(data) {
    audio_info = data;
}
let urlVideo = 'https://raw.githubusercontent.com/SalcedoManuel/Paisajes-Sonoros/main/resultados/Video.json'
fetch(urlVideo)
    .then(response => response.json())
    .then(data => saveVideoData(data))
    .catch(error => console.log(error));
function saveVideoData(data) {
    video_info = data;
}

function SelectQuiz(nameQuiz) {
    let quiz = [];
    if (nameQuiz == "Audio") {
        quiz = audio_info;
    }else{
        quiz = video_info;
    }
    TreatmentFileQuiz(quiz);
}

function TreatmentFileQuiz(informationQuiz) {
    document.getElementById("option_name_quiz").innerHTML = name_quiz.split(".")[0];
    //-- Pasamos a una variable global toda la información sobre los cuestionarios realizados.
    quiz_info = informationQuiz;
    // Creamos la tabla para que se introduzcan los elementos más relevantes en ella.
    // La tabla estará ordenada de la forma 'First-In First-Out', el primer cuestionario en rellenarse será
    // el primero en aperecer en la lista.
    info_table.innerHTML = create_table_info_init_string();
    // Añadimos los valores de cada partipante a la tabla.
    add_data_table_info();

    // COMENZAMOS CON EL DESARROLLO Y MUESTRA DE LOS VALORES GLOBALES
    // Cargamos ahora los resultados globales.
    // Comenzamos con la información de los cuestionarios.
    document.getElementById("hearWhoResults").innerHTML = WHO_score_global_results();

    // AÑADIMOS LA INFORMACIÓN SOBRE LOS LUGARES.
    document.getElementById("tablePlacesResults").innerHTML = places_global_results();
    // Añadimos los resultados sobre las preguntas finales.
    document.getElementById("lastQuestion").innerHTML = last_user_results();

    // Añadimos las gráficas.
    Draw();
}


function OpenFileQuiz() {
    document.getElementById("getInputQuizFile").style.display = "block";
}
function CloseFileQuiz() {
    document.getElementById("getInputQuizFile").style.display = "none";
}


function create_table_info_init_string() {
    let string = '<tr valign="top" class="top_cell">'+
    '<th scope="row" id="number_quiz">Número</th>'+
    '<th id="date_quiz">Fecha de realización</th>'+
    '<th id="score_quiz">Nota en el test HearWHO</th>'+
    '</tr>';
    return string;
}
function add_data_table_info() {
    for (let i = 0; i < quiz_info.length; i++) {
        info_table.innerHTML += '<tr id="table_value">'+
        '<th id="number_quiz">'+(i+1)+'</th>'+
        '<th id="date_quiz">' + quiz_info[i][0]["Date"] + '</th>'+
        '<th id="score_quiz">'+quiz_info[i][0]["Introduce aquí tu puntuación auditiva obtenida en el test hearWHO"]+'</th>'
        +'</tr>';
    }
    info_table.innerHTML = info_table.innerHTML.split("NaN").join('');
}

/* FUNCIONES COMPLEMENTARIAS DEL APARTADO DE RESULTADOS GLOBALES */

function table_global_results_string(params,i) {
    let string = '<table class="table_global_results">';
    if (params == "WHO_score") {        
        string += '<caption id="caption_table"><h2>Puntuación en los test HearWHO</h2></caption>';
        string += '<tr style="font-size:large;">';
        string += '<th scope="col">Grupo de Notas</th>';
        string += '<th>Número</th>';
        string += '<th>Porcentaje</th>';
        string += '</tr>';
    }else if (params == "gender") {
        string += '<caption id="caption_table"><h2>Géneros de los Participantes</h2></caption>';
        string += '<tr style="font-size:large;">';
        string += '<th scope="col">Géneros</th>';
        string += '<th>Número</th>';
        string += '<th>Porcentaje</th>';
        string += '</tr>';
    }else if (params == "scenary") {
        string += '<caption id="caption_table"><h4>Preguntas sobre el Escenario:'+quiz_info[0][1][i]["Name_Scenary"]+'</h4></caption>';
        string += '<tr style="font-size:large;">';
        string += '<th scope="col">Preguntas</th>';
        string += '<th>Número de Respuestas por opción</th>';
        string += '<th>Porcetaje de las Respuestas por opción</th>';
        string += '</tr>';
    }

    return string;
}

/* FUNCIONES  DEL APARATADO de RESULTADOS GLOBALES*/

function WHO_score_global_results() {
    //-- Mostaremos ahora la franja de los resultados del test.
    //-- Guardamos en un array cuanta gente hay con esa puntuación.
    // Los rangos son 4:
    // <18 años, de 18 a 25, de 26 a 35, de 36 a 45, de 46 a 55, de 56 a 65 y 65<.
    let score_array_results = [0,0,0,0,0];
    let score_array_porcentaje = [0,0,0,0,0];
    for (let i = 0; i < quiz_info.length; i++) {
        if (quiz_info[i][0]["Introduce aquí tu puntuación auditiva obtenida en el test hearWHO"] == 0){
            number = 0
        }else if (quiz_info[i][0]["Introduce aquí tu puntuación auditiva obtenida en el test hearWHO"] < 50) {
            number = 1;
        }else if (quiz_info[i][0]["Introduce aquí tu puntuación auditiva obtenida en el test hearWHO"] < 65) {
            number = 2;
        }else if (quiz_info[i][0]["Introduce aquí tu puntuación auditiva obtenida en el test hearWHO"] < 76) {
            number = 3;
        }else{ //-- Por encima de 76 puntos.
            number = 4;
        }
        score_array_results[number] += 1;     
    }
    //-- Calculamos los porcentajes.
    for (let i = 0; i < score_array_porcentaje.length; i++) {
        //-- Dividimos la cantidad de notas que hay en ese intervalo con el número de participantes.
        score_array_porcentaje[i]=(Math.round((score_array_results[i]/quiz_info.length)*10000))/100 + "%";        
    }
    let string = table_global_results_string("WHO_score",0);
    //-- Bucle que sirve para colocar en la APP la información de las edades.
    for (let i = 0; i < score_array_results.length; i++) {
        switch (i) {
            case 0:
                string += "<tr><th> Sin Cuestionario: </th>";
                break;
            case 1:
                string += "<tr><th> Menos de 50 puntos: </th>";
            break;
            case 2:
                string += "<tr><th> Entre 50 y 64 puntos: </th>";
            break;
            case 3:
                string += "<tr><th> Entre 65 y 75 puntos: </th>";
            break;
            default:
                string += "<tr><th> Por encima de 75 puntos: </th>";
            break;
        }
        string += '<td id="value_table">';
        string += score_array_results[i] + '</td><td id="value_table">'+score_array_porcentaje[i]+"</td></tr>";
    }
    string += '</table><br>';
    //global_results.innerHTML += string + "<br>";
    return string;
}

function places_global_results() {
    const number_people = quiz_info.length;
    const number_places = quiz_info[0][0]["Places_Number"];
    const number_recordings = quiz_info[0][0]["Recordings_Number"];
    const VALUE = 1/number_people;

    const name_Scenaries = get_names_places();   

    var string = "";

    /* Crearemos un array que contendrá las partes de las preguntas.*/

    var array = new Array()
    for (let index = 0; index < number_places*number_recordings; index++) {
        array.push(create_map())
    }

    for (let e = 0; e < number_places*number_recordings; e++) {
        for (let i = 0; i < number_people; i++) {
            if (quiz_info[i][1][e]['Agradable/Placentero'] == "muy_desacuerdo") {
                let value = array[e].get("Agradable/Placentero")
                value[0] += VALUE;
            }else if(quiz_info[i][1][e]['Agradable/Placentero'] == "desacuerdo"){
                let value = array[e].get("Agradable/Placentero")
                value[1] += VALUE;
            }else if(quiz_info[i][1][e]['Agradable/Placentero'] == "neutro"){
                let value = array[e].get("Agradable/Placentero")
                value[2] += VALUE;
            }else if(quiz_info[i][1][e]['Agradable/Placentero'] == "acuerdo"){
                let value = array[e].get("Agradable/Placentero")
                value[3] += VALUE;
            }else if(quiz_info[i][1][e]['Agradable/Placentero'] == "muy_acuerdo"){
                let value = array[e].get("Agradable/Placentero")
                value[4] += VALUE;
            }

            if (quiz_info[i][1][e]['Sin Actividad/Estático'] == "muy_desacuerdo") {
                let value = array[e].get('Sin Actividad/Estático')
                value[0] += VALUE;
            }else if (quiz_info[i][1][e]['Sin Actividad/Estático'] == "desacuerdo") {
                let value = array[e].get('Sin Actividad/Estático')
                value[1] += VALUE;
            }else if (quiz_info[i][1][e]['Sin Actividad/Estático'] == "neutro") {
                let value = array[e].get('Sin Actividad/Estático')
                value[2] += VALUE;                
            }else if (quiz_info[i][1][e]['Sin Actividad/Estático'] == "acuerdo") {
                let value = array[e].get('Sin Actividad/Estático')
                value[3] += VALUE;
            }else if (quiz_info[i][1][e]['Sin Actividad/Estático'] == "muy_acuerdo") {
                let value = array[e].get('Sin Actividad/Estático')
                value[4] += VALUE;
            }
            if (quiz_info[i][1][e]['Desagradable/Molesto'] == "muy_desacuerdo") {
                let value = array[e].get('Desagradable/Molesto')
                value[0] += VALUE;
            }else if (quiz_info[i][1][e]['Desagradable/Molesto'] == "desacuerdo") {
                let value = array[e].get('Desagradable/Molesto')
                value[1] += VALUE;
            }else if (quiz_info[i][1][e]['Desagradable/Molesto'] == "neutro") {
                let value = array[e].get('Desagradable/Molesto')
                value[2] += VALUE;                
            }else if (quiz_info[i][1][e]['Desagradable/Molesto'] == "acuerdo") {
                let value = array[e].get('Desagradable/Molesto')
                value[3] += VALUE;
            }else if (quiz_info[i][1][e]['Desagradable/Molesto'] == "muy_acuerdo") {
                let value = array[e].get('Desagradable/Molesto')
                value[4] += VALUE;
            }

            if (quiz_info[i][1][e]['Con Actividad/Dinámico'] == "muy_desacuerdo") {
                let value = array[e].get('Con Actividad/Dinámico')
                value[0] += VALUE;
            }else if (quiz_info[i][1][e]['Con Actividad/Dinámico'] == "desacuerdo") {
                let value = array[e].get('Con Actividad/Dinámico')
                value[1] += VALUE;
            }else if (quiz_info[i][1][e]['Con Actividad/Dinámico'] == "neutro") {
                let value = array[e].get('Con Actividad/Dinámico')
                value[2] += VALUE;                
            }else if (quiz_info[i][1][e]['Con Actividad/Dinámico'] == "acuerdo") {
                let value = array[e].get('Con Actividad/Dinámico')
                value[3] += VALUE;
            }else if (quiz_info[i][1][e]['Con Actividad/Dinámico'] == "muy_acuerdo") {
                let value = array[e].get('Con Actividad/Dinámico')
                value[4] += VALUE;
            }

            if (quiz_info[i][1][e]['En general, ¿Cómo describirías la calidad acústica del entorno que escuchas?'] == "muy_malo") {
                let value = array[e].get('En general, ¿Cómo describirías la calidad acústica del entorno que escuchas?')
                value[0] += VALUE;
            }else if (quiz_info[i][1][e]['En general, ¿Cómo describirías la calidad acústica del entorno que escuchas?'] == "malo") {
                let value = array[e].get('En general, ¿Cómo describirías la calidad acústica del entorno que escuchas?')
                value[1] += VALUE;
            }else if (quiz_info[i][1][e]['En general, ¿Cómo describirías la calidad acústica del entorno que escuchas?'] == "neutro") {
                let value = array[e].get('En general, ¿Cómo describirías la calidad acústica del entorno que escuchas?')
                value[2] += VALUE;                
            }else if (quiz_info[i][1][e]['En general, ¿Cómo describirías la calidad acústica del entorno que escuchas?'] == "bueno") {
                let value = array[e].get('En general, ¿Cómo describirías la calidad acústica del entorno que escuchas?')
                value[3] += VALUE;
            }else if (quiz_info[i][1][e]['En general, ¿Cómo describirías la calidad acústica del entorno que escuchas?'] == "muy_bueno") {
                let value = array[e].get('En general, ¿Cómo describirías la calidad acústica del entorno que escuchas?')
                value[4] += VALUE;
            }

            if (quiz_info[i][1][e]['¿Cuánto tiempo permanecerías en un lugar con un ambiente sonoro como este?'] == "insoportable") {
                let value = array[e].get('¿Cuánto tiempo permanecerías en un lugar con un ambiente sonoro como este?')
                value[0] += VALUE;
            }else if (quiz_info[i][1][e]['¿Cuánto tiempo permanecerías en un lugar con un ambiente sonoro como este?'] == "molesto") {
                let value = array[e].get('¿Cuánto tiempo permanecerías en un lugar con un ambiente sonoro como este?')
                value[1] += VALUE;
            }else if (quiz_info[i][1][e]['¿Cuánto tiempo permanecerías en un lugar con un ambiente sonoro como este?'] == "bien") {
                let value = array[e].get('¿Cuánto tiempo permanecerías en un lugar con un ambiente sonoro como este?')
                value[2] += VALUE;                
            }else if (quiz_info[i][1][e]['¿Cuánto tiempo permanecerías en un lugar con un ambiente sonoro como este?'] == "bastante") {
                let value = array[e].get('¿Cuánto tiempo permanecerías en un lugar con un ambiente sonoro como este?')
                value[3] += VALUE;
            }else if (quiz_info[i][1][e]['¿Cuánto tiempo permanecerías en un lugar con un ambiente sonoro como este?'] == "encanta") {
                let value = array[e].get('¿Cuánto tiempo permanecerías en un lugar con un ambiente sonoro como este?')
                value[4] += VALUE;
            }

            if (quiz_info[i][1][e]['¿Para cuál de los siguientes contextos urbanos crees que es adecuado el entorno acústico que escuchas?'] == "comercial") {
                let value = array[e].get('¿Para cuál de los siguientes contextos urbanos crees que es adecuado el entorno acústico que escuchas?')
                value[0] += VALUE;
            }else if (quiz_info[i][1][e]['¿Para cuál de los siguientes contextos urbanos crees que es adecuado el entorno acústico que escuchas?'] == "residencial") {
                let value = array[e].get('¿Para cuál de los siguientes contextos urbanos crees que es adecuado el entorno acústico que escuchas?')
                value[1] += VALUE;
            }else if (quiz_info[i][1][e]['¿Para cuál de los siguientes contextos urbanos crees que es adecuado el entorno acústico que escuchas?'] == "recreativo") {
                let value = array[e].get('¿Para cuál de los siguientes contextos urbanos crees que es adecuado el entorno acústico que escuchas?')
                value[2] += VALUE;                
            }else if (quiz_info[i][1][e]['¿Para cuál de los siguientes contextos urbanos crees que es adecuado el entorno acústico que escuchas?'] == "otro") {
                let value = array[e].get('¿Para cuál de los siguientes contextos urbanos crees que es adecuado el entorno acústico que escuchas?')
                value[3] += VALUE;                
            }

            if (quiz_info[i][1][e]['¿A qué período del año crees que se corresponde el entorno sonoro que escuchas?'] == "invierno") {
                let value = array[e].get('¿A qué período del año crees que se corresponde el entorno sonoro que escuchas?')
                value[0] += VALUE;
            }else if (quiz_info[i][1][e]['¿A qué período del año crees que se corresponde el entorno sonoro que escuchas?'] == "verano") {
                let value = array[e].get('¿A qué período del año crees que se corresponde el entorno sonoro que escuchas?')
                value[1] += VALUE;
            }else if (quiz_info[i][1][e]['¿A qué período del año crees que se corresponde el entorno sonoro que escuchas?'] == "otro") {
                let value = array[e].get('¿A qué período del año crees que se corresponde el entorno sonoro que escuchas?')
                value[2] += VALUE;                
            }

        }
    }
    string += "<h3> Preguntas sobre los Escenarios </h3>"
    var preguntas = array[0].keys();
    // Crearemos tantas tablas como preguntas 
    for (let i = 0; i < array[0].size; i++) {
        string +='<table class="table_global_results">';
        let pregunta_actual = preguntas.next().value
        string += '<caption id="caption_table"><h3>'+pregunta_actual+'</h3></caption>\n';
        string += '<tr><th scope="col" rowspan="2">Posibles Respuestas</th>';
        for (let e = 0; e < name_Scenaries.length; e++) {
            string += '<th colspan="2" style="font-size:large;">'+name_Scenaries[e] +'</th>';        
        }
        string += '</tr>';
        string += '<tr>\n';
        for (let e = 0; e < name_Scenaries.length; e++) {
            string += '<th>Número</th><th>Porcentaje</th>';
        }
        string += '</tr>';
        if (pregunta_actual == "En general, ¿Cómo describirías la calidad acústica del entorno que escuchas?") {
            string += '<tr>';
            string +='<th>Muy Malo</th>'
            for (let index = 0; index < number_places*number_recordings; index++) {
                let number = array[index].get('En general, ¿Cómo describirías la calidad acústica del entorno que escuchas?')[0]

                string += '<td id="value_table">'+(Math.round(number*number_people))+'</td><td id="value_table">'+((Math.round(number*10000))/100)+'%</td>'
            }
            string += '</tr>';

            string +='<th>Malo</th>'
            for (let index = 0; index < number_places*number_recordings; index++) {
                let number = array[index].get('En general, ¿Cómo describirías la calidad acústica del entorno que escuchas?')[1]
                
                string += '<td id="value_table">'+(Math.round(number*number_people))+'</td><td id="value_table">'+((Math.round(number*10000))/100)+'%</td>'
            }
            string += '</tr>';

            string +='<th>Ni bueno ni malo</th>'
            for (let index = 0; index < number_places*number_recordings; index++) {
                let number = array[index].get('En general, ¿Cómo describirías la calidad acústica del entorno que escuchas?')[2]
                
                string += '<td id="value_table">'+(Math.round(number*number_people))+'</td><td id="value_table">'+((Math.round(number*10000))/100)+'%</td>'
            }
            string += '</tr>';

            string +='<th>Bueno</th>'
            for (let index = 0; index < number_places*number_recordings; index++) {
                let number = array[index].get('En general, ¿Cómo describirías la calidad acústica del entorno que escuchas?')[3]
                
                string += '<td id="value_table">'+(Math.round(number*number_people))+'</td><td id="value_table">'+((Math.round(number*10000))/100)+'%</td>'
            }
            string += '</tr>';

            string +='<th>Muy bueno</th>'
            for (let index = 0; index < number_places*number_recordings; index++) {
                let number = array[index].get('En general, ¿Cómo describirías la calidad acústica del entorno que escuchas?')[4]
                string += '<td id="value_table">'+(Math.round(number*number_people))+'</td><td id="value_table">'+((Math.round(number*10000))/100)+'%</td>'
            }
            string += '</tr>'; 
        }else if(pregunta_actual == "¿Cuánto tiempo permanecerías en un lugar con un ambiente sonoro como este?"){
            string += '<tr>';
            string +='<th>Me parece insoportable y no aguantaría ni 10 minutos.</th>'
            for (let index = 0; index < number_places*number_recordings; index++) {
                let number = array[index].get('¿Cuánto tiempo permanecerías en un lugar con un ambiente sonoro como este?')[0]
                string += '<td id="value_table">'+(Math.round(number*number_people))+'</td><td id="value_table">'+((Math.round(number*10000))/100)+'%</td>'
            }
            string += '</tr>';

            string +='<th>Me molesta un poco y no permanecería mucho tiempo ahí.</th>'
            for (let index = 0; index < number_places*number_recordings; index++) {
                let number = array[index].get('¿Cuánto tiempo permanecerías en un lugar con un ambiente sonoro como este?')[1]
                
                string += '<td id="value_table">'+(Math.round(number*number_people))+'</td><td id="value_table">'+((Math.round(number*10000))/100)+'%</td>'
            }
            string += '</tr>';

            string +='<th>Para un rato está bien, pero sin más.</th>'
            for (let index = 0; index < number_places*number_recordings; index++) {
                let number = array[index].get('¿Cuánto tiempo permanecerías en un lugar con un ambiente sonoro como este?')[2]
                
                string += '<td id="value_table">'+(Math.round(number*number_people))+'</td><td id="value_table">'+((Math.round(number*10000))/100)+'%</td>'
            }
            string += '</tr>';

            string +='<th>Pasaría bastante tiempo en un lugar como este.</th>'
            for (let index = 0; index < number_places*number_recordings; index++) {
                let number = array[index].get('¿Cuánto tiempo permanecerías en un lugar con un ambiente sonoro como este?')[3]
                
                string += '<td id="value_table">'+(Math.round(number*number_people))+'</td><td id="value_table">'+((Math.round(number*10000))/100)+'%</td>'
            }
            string += '</tr>';

            string +='<th>Me encanta y pasaría el resto de mi vida en este lugar.</th>'
            for (let index = 0; index < number_places*number_recordings; index++) {
                let number = array[index].get('¿Cuánto tiempo permanecerías en un lugar con un ambiente sonoro como este?')[4]
                
                string += '<td id="value_table">'+(Math.round(number*number_people))+'</td><td id="value_table">'+((Math.round(number*10000))/100)+'%</td>'
            }
            string += '</tr>';
        }else if(pregunta_actual == "¿Para cuál de los siguientes contextos urbanos crees que es adecuado el entorno acústico que escuchas?"){
            string += '<tr>';
            string +='<th>Comercial</th>'
            for (let index = 0; index < number_places*number_recordings; index++) {
                let number = array[index].get('¿Para cuál de los siguientes contextos urbanos crees que es adecuado el entorno acústico que escuchas?')[0]
                
                string += '<td id="value_table">'+(Math.round(number*number_people))+'</td><td id="value_table">'+((Math.round(number*10000))/100)+'%</td>'
            }
            string += '</tr>';

            string +='<th>Residencial</th>'
            for (let index = 0; index < number_places*number_recordings; index++) {
                let number = array[index].get('¿Para cuál de los siguientes contextos urbanos crees que es adecuado el entorno acústico que escuchas?')[1]
                
                string += '<td id="value_table">'+(Math.round(number*number_people))+'</td><td id="value_table">'+((Math.round(number*10000))/100)+'%</td>'
            }
            string += '</tr>';

            string +='<th>Recreativo</th>'
            for (let index = 0; index < number_places*number_recordings; index++) {
                let number = array[index].get('¿Para cuál de los siguientes contextos urbanos crees que es adecuado el entorno acústico que escuchas?')[2]
                
                string += '<td id="value_table">'+(Math.round(number*number_people))+'</td><td id="value_table">'+((Math.round(number*10000))/100)+'%</td>'
            }
            string += '</tr>';

            string +='<th>Otro</th>'
            for (let index = 0; index < number_places*number_recordings; index++) {
                let number = array[index].get('¿Para cuál de los siguientes contextos urbanos crees que es adecuado el entorno acústico que escuchas?')[3]
                
                string += '<td id="value_table">'+(Math.round(number*number_people))+'</td><td id="value_table">'+((Math.round(number*10000))/100)+'%</td>'
            }
            string += '</tr>';
        }else if(pregunta_actual == "¿A qué período del año crees que se corresponde el entorno sonoro que escuchas?"){
            string += '<tr>';
            string +='<th>Invierno</th>'
            for (let index = 0; index < number_places*number_recordings; index++) {
                let number = array[index].get('¿A qué período del año crees que se corresponde el entorno sonoro que escuchas?')[0]
                
                string += '<td id="value_table">'+(Math.round(number*number_people))+'</td><td id="value_table">'+((Math.round(number*10000))/100)+'%</td>'
            }
            string += '</tr>';

            string +='<th>Verano</th>'
            for (let index = 0; index < number_places*number_recordings; index++) {
                let number = array[index].get('¿A qué período del año crees que se corresponde el entorno sonoro que escuchas?')[1]
                
                string += '<td id="value_table">'+(Math.round(number*number_people))+'</td><td id="value_table">'+((Math.round(number*10000))/100)+'%</td>'
            }
            string += '</tr>';

            string +='<th>Otro</th>'
            for (let index = 0; index < number_places*number_recordings; index++) {
                let number = array[index].get('¿A qué período del año crees que se corresponde el entorno sonoro que escuchas?')[2]
                
                string += '<td id="value_table">'+(Math.round(number*number_people))+'</td><td id="value_table">'+((Math.round(number*10000))/100)+'%</td>'
            }
            string += '</tr>';
        }else{
            string += '<tr>';
            string +='<th>Muy en Desacuerdo</th>'
            for (let index = 0; index < number_places*number_recordings; index++) {
                let number = array[index].get(pregunta_actual)[0]
                string += '<td id="value_table">'+(Math.round(number*number_people))+'</td><td id="value_table">'+((Math.round(number*10000))/100)+'%</td>'
            }
            string += '</tr>';

            string += '<tr>';
            string +='<th>En Desacuerdo</th>'
            for (let index = 0; index < number_places*number_recordings; index++) {
                let number = array[index].get(pregunta_actual)[1]
                
                string += '<td id="value_table">'+(Math.round(number*number_people))+'</td><td id="value_table">'+((Math.round(number*10000))/100)+'%</td>'
            }
            string += '</tr>';

            string += '<tr>';
            string +='<th>Neutral</th>'
            for (let index = 0; index < number_places*number_recordings; index++) {
                let number = array[index].get(pregunta_actual)[2]
                
                string += '<td id="value_table">'+(Math.round(number*number_people))+'</td><td id="value_table">'+((Math.round(number*10000))/100)+'%</td>'
            }
            string += '</tr>';

            string += '<tr>';
            string +='<th>De acuerdo</th>'
            for (let index = 0; index < number_places*number_recordings; index++) {
                let number = array[index].get(pregunta_actual)[3]
                
                string += '<td id="value_table">'+(Math.round(number*number_people))+'</td><td id="value_table">'+((Math.round(number*10000))/100)+'%</td>'
            }
            string += '</tr>';

            string += '<tr>';
            string +='<th>Muy de acuerdo</th>'
            for (let index = 0; index < number_places*number_recordings; index++) {
                let number = array[index].get(pregunta_actual)[4]
                
                string += '<td id="value_table">'+(Math.round(number*number_people))+'</td><td id="value_table">'+((Math.round(number*10000))/100)+'%</td>'
            }
            string += '</tr>';
        }
        string +='</table>\n\n';    
    }
    return string;
}

function last_user_results() {
    const number_people = quiz_info.length;
    const number_questions = quiz_info[0][2].length;
    const VALUE = 1/number_people;

    /* Crearemos un array que contendrá las partes de las preguntas.*/

    var array = new Array()
    let keys = Object.keys(quiz_info[0][2][0]);
    let questionChanged = Object.entries(keys)[0][1]
    array.push(create_map_last_user_questions(questionChanged))
    string = "";
    for (let i = 0; i < number_people; i++) {
        if (quiz_info[i][2][0][questionChanged] == "no") {
            let value = array[0].get("¿Conoces Menorca?¿En qué grado estás familiarizado/a o relacionado/a con la isla?")
            value[0] += VALUE;
        }else if(quiz_info[i][2][0][questionChanged] == "si_poco"){
            let value = array[0].get("¿Conoces Menorca?¿En qué grado estás familiarizado/a o relacionado/a con la isla?")
            value[1] += VALUE;
        }else if(quiz_info[i][2][0][questionChanged] == "si_neutro"){
            let value = array[0].get("¿Conoces Menorca?¿En qué grado estás familiarizado/a o relacionado/a con la isla?")
            value[2] += VALUE;
        }else if(quiz_info[i][2][0][questionChanged] == "si_mucho"){
            let value = array[0].get("¿Conoces Menorca?¿En qué grado estás familiarizado/a o relacionado/a con la isla?")
            value[3] += VALUE;
        }

        if (quiz_info[i][2][0]['¿Tienes algún tipo de conocimiento o formación en Acústica?'] == "no") {
            let value = array[0].get('¿Tienes algún tipo de conocimiento o formación en Acústica?')
            value[0] += VALUE;
        }else if (quiz_info[i][2][0]['¿Tienes algún tipo de conocimiento o formación en Acústica?'] == "si_poco") {
            let value = array[0].get('¿Tienes algún tipo de conocimiento o formación en Acústica?')
            value[1] += VALUE;
        }else if (quiz_info[i][2][0]['¿Tienes algún tipo de conocimiento o formación en Acústica?'] == "si_mucho") {
            let value = array[0].get('¿Tienes algún tipo de conocimiento o formación en Acústica?')
            value[2] += VALUE;                
        }
    }
    string += "<h3> Preguntas sobre la relación del Participante con el Escenario </h3>"
    var preguntas = array[0].keys();
    // Crearemos tantas tablas como preguntas 
    for (let i = 0; i < array[0].size; i++) {
        string +='<table class="table_global_results">';
        let pregunta_actual = preguntas.next().value
        string += '<caption id="caption_table"><h3>'+pregunta_actual+'</h3></caption>\n';
        string += '<tr><th scope="col">Posibles Respuestas</th>';
        string += '<th>Número</th><th>Porcentaje</th>';
        string += '</tr>';

        if (pregunta_actual == "¿Tienes algún tipo de conocimiento o formación en Acústica?") {
            string += '<tr>';
            string +='<th>No, no tengo ningún conocimiento sobre Acústica.</th>';
            let number = array[0].get('¿Tienes algún tipo de conocimiento o formación en Acústica?')[0]
            string += '<td id="value_table">'+(Math.round(number*number_people))+'</td><td id="value_table">'+((Math.round(number*10000))/100)+'%</td>'
            string += '</tr>';

            string +='<th>Sí, soy/he sido estudiante de materias relacionadas con la Acústica.</th>'
            number = array[0].get('¿Tienes algún tipo de conocimiento o formación en Acústica?')[1]
            string += '<td id="value_table">'+(Math.round(number*number_people))+'</td><td id="value_table">'+((Math.round(number*10000))/100)+'%</td>'
            string += '</tr>';

            string +='<th>Sí, tengo conocimientos sólidos sobre Acústica.</th>'
            number = array[0].get('¿Tienes algún tipo de conocimiento o formación en Acústica?')[2]
            string += '<td id="value_table">'+(Math.round(number*number_people))+'</td><td id="value_table">'+((Math.round(number*10000))/100)+'%</td>'
            string += '</tr>';
        }else{
            string += '<tr>';
            string +='<th>No, no he ido nunca.</th>';
            let number = array[0].get(questionChanged)[0]
            string += '<td id="value_table">'+(Math.round(number*number_people))+'</td><td id="value_table">'+((Math.round(number*10000))/100)+'%</td>'
            string += '</tr>';

            string +='<th>Sí, he estado una o dos veces.</th>'
            number = array[0].get(questionChanged)[1]
            string += '<td id="value_table">'+(Math.round(number*number_people))+'</td><td id="value_table">'+((Math.round(number*10000))/100)+'%</td>'
            string += '</tr>';

            string +='<th>Sí, la visito regularmente cada año.</th>'
            number = array[0].get(questionChanged)[2]
            string += '<td id="value_table">'+(Math.round(number*number_people))+'</td><td id="value_table">'+((Math.round(number*10000))/100)+'%</td>'
            string += '</tr>';

            string +='<th>Sí, soy residente en la isla.</th>'
            number = array[0].get(questionChanged)[3]
            string += '<td id="value_table">'+(Math.round(number*number_people))+'</td><td id="value_table">'+((Math.round(number*10000))/100)+'%</td>'
            string += '</tr>';
        }
        string +='</table>\n\n';    
    }
    return string
}

function normalize(array,number_people) {
    for (let i = 0; i < array.length; i++) {
        array[i]= array[i]/number_people;   
    }
    return array;
}

function split_lists(array,recordings_system,number_places) {
    let start = 0;
    let end = recordings_system;
    let array_list = [];
    for (let i = 0; i < number_places; i++) {
        array_list[i]=array.slice(start,end);
        start = end;
        end += recordings_system;    
   }
   return array_list;
}

function create_Array(array) {
    for (let i = 0; i < quiz_info[0][2].length; i++) {
        array.push(0)
    }
}

function get_names_places() {
    let array = [];
    for (let i = 0; i < quiz_info[0][1].length; i++) {
        array.push(quiz_info[0][1][i]["Name_Scenary"])        
    }
    return array;
}

// Esta función sirve para crear un mapa con las preguntas.
function create_map() {
    let new_map = new Map();
    new_map.set("Agradable/Placentero",[0,0,0,0,0]);
    new_map.set("Sin Actividad/Estático",[0,0,0,0,0]);
    new_map.set("Desagradable/Molesto",[0,0,0,0,0]);
    new_map.set("Con Actividad/Dinámico",[0,0,0,0,0]);
    new_map.set("En general, ¿Cómo describirías la calidad acústica del entorno que escuchas?",[0,0,0,0,0]);
    new_map.set("¿Cuánto tiempo permanecerías en un lugar con un ambiente sonoro como este?",[0,0,0,0,0]);
    new_map.set("¿Para cuál de los siguientes contextos urbanos crees que es adecuado el entorno acústico que escuchas?",[0,0,0,0]);
    new_map.set("¿A qué período del año crees que se corresponde el entorno sonoro que escuchas?",[0,0,0]);
    return new_map;
}
function create_map_last_user_questions(questionChanged) {
    let new_map = new Map();
    new_map.set(questionChanged,[0,0,0,0]);
    new_map.set("¿Tienes algún tipo de conocimiento o formación en Acústica?",[0,0,0]);
    return new_map;
}

/*--------------------------CANVAS---------------------------------- */

var xCoordinates = new Array;
var yCoordinates = new Array;

var placesCoordinates = new Array;

var numberTotalPlaces;
var numberTotalRecordings;
var numberTotalPeople;

const MAX_VALUE = 300;
const MAX_OPTIONS_VALUE = 4;
const MAX_OPTIONS = 8;

function GetDescriptorNumber(number_questions,descriptor) {
    let arrayDescriptorGeneral = new Array;
    numberTotalPlaces = quiz_info[0][0]["Places_Number"];
    numberTotalRecordings = quiz_info[0][0]["Recordings_Number"];
    const arrayOptions = ["muy_acuerdo","acuerdo","neutro","desacuerdo","muy_desacuerdo"]
    numberTotalPeople = quiz_info.length;
    for (let i = 0; i < number_questions; i++) {
        
        let arrayDescriptorPoint = new Array;
        for (let e = 0; e < numberTotalPeople; e++) {
            let number;
            if (quiz_info[e][1][i][descriptor] == arrayOptions[0]) {
                number = 4;
            }else if(quiz_info[e][1][i][[descriptor]] == arrayOptions[1]){
                number = 3;
            }else if(quiz_info[e][1][i][[descriptor]] == arrayOptions[2]){
                number = 2;
            }else if(quiz_info[e][1][i][[descriptor]] == arrayOptions[3]){
                number = 1;
            }else if(quiz_info[e][1][i][[descriptor]] == arrayOptions[4]){
                number = 0;
            }  
            arrayDescriptorPoint.push(number);       
        }        
        arrayDescriptorGeneral.push(arrayDescriptorPoint);
    }
    let array = new Array;
    for (let index = 0; index < numberTotalPlaces; index++) {
        let inicio = index * numberTotalRecordings;
        let final = inicio + numberTotalRecordings;
        array[index] =  arrayDescriptorGeneral.slice(inicio,final);     
    }
    arrayDescriptorGeneral = array;
    return arrayDescriptorGeneral;
}

function fillVerticalText(ctx,texto,positionX,positionY) {
    let arr = [...texto];
    let intervalo = 12;
    for (let index = 0; index < arr.length; index++) {
        ctx.fillText(arr[index],positionX,positionY);
        positionY += intervalo;       
    }
}

function DrawArrow(ctx,direction,positionInitialX,positionInitialY) {
    switch (direction) {
        case 'Up':
            ctx.moveTo(positionInitialX,positionInitialY);
            ctx.lineTo(positionInitialX-3,positionInitialY+3)
            ctx.moveTo(positionInitialX,positionInitialY)
            ctx.lineTo(positionInitialX+3,positionInitialY+3)
            break;
        case 'Bottom':
            ctx.moveTo(positionInitialX,positionInitialY);
            ctx.lineTo(positionInitialX-3,positionInitialY-3)
            ctx.moveTo(positionInitialX,positionInitialY)
            ctx.lineTo(positionInitialX+3,positionInitialY-3)
            break;
        case 'Left':
            ctx.moveTo(positionInitialX,positionInitialY);
            ctx.lineTo(positionInitialX+3,positionInitialY-3)
            ctx.moveTo(positionInitialX,positionInitialY)
            ctx.lineTo(positionInitialX+3,positionInitialY+3)
            break;
        case 'Right':
            ctx.moveTo(positionInitialX,positionInitialY);
            ctx.lineTo(positionInitialX-3,positionInitialY-3)
            ctx.moveTo(positionInitialX,positionInitialY)
            ctx.lineTo(positionInitialX-3,positionInitialY+3)
            break;
        default:
            break;
    }
}

function DrawBase() {
    for (let index = 1; index <= numberTotalPlaces; index++) {

        document.getElementById("tableScenary"+index).style.display = "block";
        for (let graph = 1; graph <= numberTotalRecordings; graph++) {
            document.getElementById("canvasGraph"+index+graph).style.display = "block";
            var c = document.getElementById("myCanvas"+index+graph);
            var ctx = c.getContext("2d");
            // Limpiamos el lienzo.
            ctx.fillStyle = "white";
            ctx.fillRect(0, 0, 300, 300);



            ctx.fillStyle = "black";
            ctx.strokeStyle = "black";
            ctx.lineWidth = 1;
            ctx.moveTo(150, 10);
            ctx.lineWidth = 0.5;
            ctx.lineTo(150, 140);
            ctx.lineWidth = 1;
            DrawArrow(ctx,'Up',150,10)
            DrawArrow(ctx,'Bottom',150,140)
            DrawArrow(ctx,'Left',10,75)
            DrawArrow(ctx,'Right',290,75)

            ctx.moveTo(10, 75);
            ctx.lineTo(290, 75);
            
            ctx.stroke();
            ctx.font = "11.5px Arial";
            //Añadimos la etiqueta Agradable.
            ctx.fillText("Agradable", 125, 9);
            //Añadimos la etiqueta Molesto.
            ctx.fillText("Molesto", 130, 149);
            //Añadimos la etiqueta Dinámico.
            fillVerticalText(ctx,"Dinámico",3,37)
            //Añadimos la etiqueta Estático.
            fillVerticalText(ctx,"Estático",292,30)
            ctx.stroke();            
        }
    }

}

function DrawRectangulo(numberPlace,numberRecordings,pointX,pointY,grosor) {
    var c = document.getElementById("myCanvas"+(numberPlace + 1)+(numberRecordings+1));
    var ctx = c.getContext("2d");
    ctx.beginPath();
    let color;
    switch (numberRecordings) {
        case 0:
            color = 'red';
            break;
        case 1:
            color = 'green';
            break;    
        default:
            color = 'blue';
            break;
    }
    ctx.fillStyle = color;
    ctx.fillRect(pointX-grosor,pointY-grosor,grosor*2,grosor*2)
    ctx.fill();
    ctx.lineWidth = 1;
    ctx.strokeStyle = color;
    ctx.stroke();
}

function DrawCruz(numberPlace,numberRecordings,pointX,pointY,grosor) {
    var c = document.getElementById("myCanvas"+(numberPlace + 1)+(numberRecordings+1));
    var ctx = c.getContext("2d");
    ctx.beginPath();
    ctx.moveTo(pointX-grosor,pointY-grosor)
    ctx.lineTo(pointX+grosor,pointY+grosor);

    ctx.moveTo(pointX-grosor,pointY+grosor)
    ctx.lineTo(pointX+grosor,pointY-grosor);

    let color;
    switch (numberRecordings) {
        case 0:
            color = 'red';
            break;
        case 1:
            color = 'green';
            break;    
        default:
            color = 'blue';
            break;
    }
    ctx.fillStyle = color;
    ctx.fill();
    ctx.lineWidth = 3;
    ctx.strokeStyle = color;
    ctx.stroke();
}

function DrawPoint(numberPlace,numberRecordings,pointX,pointY,grosor) {
    var c = document.getElementById("myCanvas"+(numberPlace + 1)+(numberRecordings+1));
    var ctx = c.getContext("2d");
    ctx.beginPath();

    ctx.arc(pointX,pointY,grosor,0,2*Math.PI,true);
    let color;
    switch (numberRecordings) {
        case 0:
            color = 'red';
            break;
        case 1:
            color = 'green';
            break;    
        default:
            color = 'blue';
            break;
    }
    ctx.fillStyle = color;
    ctx.fill();
    ctx.lineWidth = 1;
    ctx.strokeStyle = color;
    ctx.stroke();
}

function WriteCount(numberPlace,numberRecording,pointX,pointY,grosor) {
    let lienzo = "myCanvas"+(numberPlace+1)+(numberRecording + 1);
    console.info(lienzo)
    var c = document.getElementById(lienzo);
    var ctx = c.getContext("2d");
    ctx.fillStyle = "black";
    if (pointX > 280) {
        ctx.fillText("x"+grosor, pointX-grosor, pointY-grosor);
    }else{
        ctx.fillText("x"+grosor, pointX+grosor, pointY+grosor);
    }
    
    ctx.stroke();  
}

function DrawScenary(numberPlace,numberRecording) {
    let numberTotalPlaces = quiz_info[0][0]["Places_Number"];
    let numberTotalRecordings = quiz_info[0][0]["Recordings_Number"];
    let numberTotal = numberTotalPlaces * numberTotalRecordings;
    let numberScenary = (numberPlace*numberTotalPlaces)+numberRecording;
    document.getElementById("placeName"+(numberPlace+1)).innerHTML = quiz_info[0][1][numberScenary]["Name_Scenary"];
    for (let index = 0; index < quiz_info.length; index++) {
        let pointX = placesCoordinates[numberPlace][numberRecording][0][index];
        let pointY = placesCoordinates[numberPlace][numberRecording][1][index];
        let grosor = placesCoordinates[numberPlace][numberRecording][2][index];
        if (grosor > 1) {
            WriteCount(numberPlace,numberRecording,pointX,pointY,grosor);
        }
        if (grosor > 4) {
            grosor = grosor/2;
        }else{
            grosor = 2;
        }
        if (grosor > 10) {
            grosor = 10;
        }
        if (numberRecording == 0) {
            DrawPoint(numberPlace,numberRecording,pointX,pointY,grosor);
        }else if (numberRecording == 1) {
            DrawCruz(numberPlace,numberRecording,pointX,pointY,grosor);
        } else {
            DrawRectangulo(numberPlace,numberRecording,pointX,pointY,grosor);
        }
        
    }
}
function GetCoordinates(eje,lowRangePoints,highRangePoints) {
    var resultsPoints = [];
    for (let placeNumber = 0; placeNumber < numberTotalPlaces; placeNumber++) {
       for (let recordingNumber = 0; recordingNumber < numberTotalRecordings; recordingNumber++) {            
            let longitud = lowRangePoints[placeNumber][recordingNumber].length;
            for (let index = 0; index < longitud; index++) {
                let value;
                if (lowRangePoints[placeNumber][recordingNumber][index] > highRangePoints[placeNumber][recordingNumber][index]) {                    
                    value = (lowRangePoints[placeNumber][recordingNumber][index]-MAX_OPTIONS_VALUE)*(-1); 
                    if (eje == 1) {
                        value = ((MAX_VALUE/2) * value)/MAX_OPTIONS;
                    }else{
                        value = ((MAX_VALUE) * value)/MAX_OPTIONS;
                    }
                    if (MAX_VALUE == value || (MAX_VALUE/2) == value || value == 0) {
                        value += 10;
                    }else{
                        value += 5;
                    }
                                         
                }else if (lowRangePoints[placeNumber][recordingNumber][index] < highRangePoints[placeNumber][recordingNumber][index]) {
                    value = (highRangePoints[placeNumber][recordingNumber][index] + MAX_OPTIONS_VALUE)
                    if (eje == 1) {
                        value = (value*((MAX_VALUE)/2))/MAX_OPTIONS;
                    }else{
                        value = (value*((MAX_VALUE)))/MAX_OPTIONS;
                    }
                    if (MAX_VALUE == value || (MAX_VALUE/2) == value) {
                        value -= 10;
                    }else{
                        value -= 5;
                    }
                } else {
                    if (eje == 1) {
                        value =  MAX_VALUE/4;
                    }else{
                        value = MAX_VALUE/2;
                    }  
                    
                }

                resultsPoints.push(value);        
            }
       }        
    }
    let placeNumber = 0;
    let recordingNumber = 0;
    let indice = 0;
    for (let index = 0; index < resultsPoints.length; index++) {
        placesCoordinates[placeNumber][recordingNumber][eje][indice] = resultsPoints[index];
        placesCoordinates[placeNumber][recordingNumber][2][indice] = 0;
        recordingNumber +=1;
        if (recordingNumber == (numberTotalRecordings)) {
            if (placeNumber == (numberTotalPlaces-1)) {
                placeNumber = 0;
                recordingNumber = 0;
                indice +=1;
                if (indice > quiz_info.length) {
                    indice = 0;
                } 
            }else{
                placeNumber +=1;
                recordingNumber = 0;
            }            
            
        } 
              
    }
}

function GetGrosorCoordinates() {
    for (let placesPosition = 0; placesPosition < placesCoordinates.length; placesPosition++) {
        for (let recordingPosition = 0; recordingPosition < placesCoordinates[placesPosition].length; recordingPosition++) {
            for (let point = 0; point < placesCoordinates[placesPosition][recordingPosition][0].length; point++) {                
                for (let index = 0; index < placesCoordinates[placesPosition][recordingPosition][0].length; index++) {
                    console.log(point,index)
                    if (placesCoordinates[placesPosition][recordingPosition][0][point] == placesCoordinates[placesPosition][recordingPosition][0][index]
                        && placesCoordinates[placesPosition][recordingPosition][1][point] == placesCoordinates[placesPosition][recordingPosition][1][index])
                    {
                        placesCoordinates[placesPosition][recordingPosition][2][point] += 1;      
                    }
                    console.info(placesCoordinates[placesPosition][recordingPosition][0][point],placesCoordinates[placesPosition][recordingPosition][0][index],placesCoordinates[placesPosition][recordingPosition][2][point])
                }
                
            }
        }
    }
    console.table(placesCoordinates)
}

function Draw() {
    console.info("Dentro Canvas")

    numberTotalPlaces = quiz_info[0][0]["Places_Number"];
    numberTotalRecordings = quiz_info[0][0]["Recordings_Number"];
    numberTotalReplies = numberTotalPlaces*numberTotalRecordings;

    var scenaryCoordinates = new Array;
    for (let index = 0; index < numberTotalRecordings; index++) {
        let coordinatesX = new Array;
        let coordinatesY = new Array;
        let grosor = new Array(quiz_info.length);
        for (let pos = 0; pos < grosor.length; pos++) {
           grosor[pos] = 0;           
        }
        scenaryCoordinates.push([coordinatesX,coordinatesY,grosor])        
    }

    //-- Creamos el array que guardará las coordenadas.
    for (let index = 0; index < numberTotalPlaces; index++) {
        placesCoordinates.push(scenaryCoordinates)        
    }
    console.table(placesCoordinates)
    placesCoordinates = new Array(numberTotalPlaces);
    for (let index = 0; index < placesCoordinates.length; index++) {
        placesCoordinates[index] = new Array(numberTotalRecordings);
        for (let indice = 0; indice < placesCoordinates[index].length; indice++) {
            placesCoordinates[index][indice] = new Array(3);
            placesCoordinates[index][indice][0] = [];
            placesCoordinates[index][indice][1] = [];
            placesCoordinates[index][indice][2] = [0]           
        }        
    }
    console.table(placesCoordinates)
    var arrayPleasantPoints = GetDescriptorNumber(numberTotalReplies,'Agradable/Placentero')
    var arrayAnnoyingPoints = GetDescriptorNumber(numberTotalReplies,'Desagradable/Molesto')
    var arrayDinamicPoints = GetDescriptorNumber(numberTotalReplies,'Con Actividad/Dinámico')
    var arrayStaticPoints = GetDescriptorNumber(numberTotalReplies,'Sin Actividad/Estático')

    GetCoordinates(1,arrayPleasantPoints,arrayAnnoyingPoints);
    GetCoordinates(0,arrayDinamicPoints,arrayStaticPoints);
    GetGrosorCoordinates();

/*  xCoordinates = GetCoordinates(arrayPleasantPoints,arrayAnnoyingPoints);
    yCoordinates = GetCoordinates(arrayDinamicPoints,arrayStaticPoints);
    console.info(xCoordinates,yCoordinates)*/
    DrawBase();

    for (let index = 0; index < numberTotalPlaces; index++) {
        for (let e = 0; e < numberTotalRecordings; e++) {
            DrawScenary(index,e);
        }    
    }
}   