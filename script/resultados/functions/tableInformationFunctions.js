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