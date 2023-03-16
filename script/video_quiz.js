const btn = document.getElementById('button');

const number_places = 2;
const number_recordings = 3;
const id_quiz = 1672007570;
const quiz_name_actual = "Online-Video";

var user_object = new Object;
var all_places_replies = [];
var last_user_replies = [];


function go_to_questions() {
    let date_start_quiz = Date().split("00 (")[0];
    user_object["Date"] = date_start_quiz;
    let hearing_score = document.getElementById("score");
    user_object["Introduce aquí tu puntuación auditiva obtenida en el test hearWHO"] = hearing_score.value;
    user_object["Places_Number"] = number_places;
    user_object["Recordings_Number"] = number_recordings;
    user_object["ID_Quiz"] = id_quiz;
    user_object["Name_Quiz"] = quiz_name_actual;
    document.getElementById("wrapper2").style.display = "none";
    document.getElementById("question1").style.display = "flex";
}
function hideOptions() {
  document.getElementById("question1").style.display = "none";
  document.getElementById("question2").style.display = "none";
  document.getElementById("question3").style.display = "none";
  document.getElementById("question4").style.display = "none";
  document.getElementById("question5").style.display = "none";
  document.getElementById("question6").style.display = "none";
}
function addInfo(number) {
  var places_replies = new Object;
  if (number > 3) {
    name_actual_scenary = "Ciutadella";
    number_places_questions_replied = 0;
  }else{
    name_actual_scenary = "Maó";
    number_places_questions_replied = 1;
  }
  places_replies["Name_Scenary"] = name_actual_scenary;
  places_replies["Places_Number"] = number_places_questions_replied;
  places_replies["Recording_Number"] = number;
  places_replies["Agradable/Placentero"] = document.getElementById("places0"+number).value;
  places_replies["Sin Actividad/Estático"] = document.getElementById("places1"+number).value;
  places_replies["Desagradable/Molesto"] = document.getElementById("places2"+number).value;
  places_replies["Con Actividad/Dinámico"] = document.getElementById("places3"+number).value;
  places_replies["En general, ¿Cómo describirías la calidad acústica del entorno que escuchas?"] = document.getElementById("places4"+number).value;
  places_replies["¿Cuánto tiempo permanecerías en un lugar con un ambiente sonoro como este?"] = document.getElementById("places5"+number).value;
  places_replies["¿Para cuál de los siguientes contextos urbanos crees que es adecuado el entorno acústico que escuchas?"] = document.getElementById("places6"+number).value;
  places_replies["¿A qué período del año crees que se corresponde el entorno sonoro que escuchas?"] = document.getElementById("places7"+number).value;

  all_places_replies.push(places_replies);
  console.table(all_places_replies)
  document.getElementById("wrapper_files"+(question_wrapper_number-1)).innerHTML = "";
}
function addLastQuestions() {
  var user_replies = new Object;
  user_replies["¿Conoces Menorca?¿En qué grado estás familiarizado/a o relacionado/a con la isla?"] = document.getElementById("last_0").value;
  user_replies["¿Tienes algún tipo de conocimiento o formación en Acústica?"] = document.getElementById("last_1").value;
  last_user_replies.push(user_replies);
}
function next_option(question_wrapper_number) {
    hideOptions();
    document.getElementById("question"+question_wrapper_number).style.display = "flex";
    document.getElementById("question_final").style.display = "none";
    console.info(question_wrapper_number-1)
    addInfo((question_wrapper_number-1));
}

function last_question() {
    hideOptions();    
    document.getElementById("question_final").style.display = "flex";
}

function end_quiz() {
  var completed_quiz = new Object;
  addLastQuestions();
  completed_quiz[0] = user_object;
  completed_quiz[1] = all_places_replies;
  completed_quiz[2] = last_user_replies;
  let newMessage = JSON.stringify(completed_quiz);
  document.getElementById("message").value = newMessage;
  document.getElementById("type").value = "Video";
  document.getElementById("reply_to").value = "paisajessonorosTFG@gmail.com";
}
document.getElementById('form')
 .addEventListener('submit', function(event) {
  end_quiz();
   event.preventDefault();

   btn.value = 'Enviando...';

   const serviceID = 'default_service';
   const templateID = 'template_725jgok';

   emailjs.sendForm(serviceID, templateID, this)
    .then(() => {
      btn.value = 'Enviar Cuestionario';
      alert('Enviado! Ya puede salir de la página');
    }, (err) => {
      btn.value = 'Send Email';
      alert(JSON.stringify(err));
    });
});