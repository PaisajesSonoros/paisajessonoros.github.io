

function show_hide_content(show_hide_content_situation) {
    switch (show_hide_content_situation) {
        case "show":
            show_content();
            break;
    
        default:
            hide_content()
            break;
    }
}

function show_content() {
    document.getElementById("text_fill_quiz").style.display = "block";
    document.getElementById("arrow_fill_id").innerHTML = '<img src="./styles/images/up-arrow.png" id="arrow_fill" onclick="show_hide_content('+"'hide'"+')" alt="Ocultar información">';
    document.getElementById("msg_fill_id").innerHTML = '<button id="msg_fill" onclick="show_hide_content('+"'hide'"+')"><b>Mostar</b></button>';
}
function hide_content(){
    document.getElementById("text_fill_quiz").style.display = "none";
    document.getElementById("arrow_fill_id").innerHTML = '<img src="./styles/images/down-arrow.png" id="arrow_fill" onclick="show_hide_content('+"'show'"+')" alt="Mostar información">';
    document.getElementById("msg_fill_id").innerHTML = '<button id="msg_fill" onclick="show_hide_content('+"'show'"+')"><b>Mostar</b></button>';
}