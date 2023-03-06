function show_audio(value) {

    var text_id = "";

    switch (value) {
        case 0:
            text_id = "support_pleasant";
            img_id = "img_pleasant";
            break;
        case 1:
            text_id = "support_uneventful";
            img_id = "img_uneventful";
            break;
        case 2:
            text_id = "support_annoying";
            img_id = "img_annoying";
            break;    
        default:
            text_id = "support_eventful";
            img_id = "img_eventful";
            break;
    }
    if (document.getElementById(text_id).style.visibility == "visible") {
        document.getElementById(text_id).style.visibility = "hidden";
        document.getElementById(img_id).src = "images/down-arrow.png"
    }else{
        document.getElementById("support_pleasant").style.visibility = "hidden";
        document.getElementById("img_pleasant").src = "styles/images/down-arrow.png";
        document.getElementById("support_uneventful").style.visibility = "hidden";
        document.getElementById("img_uneventful").src = "styles/images/down-arrow.png";
        document.getElementById("support_annoying").style.visibility = "hidden";
        document.getElementById("img_annoying").src = "styles/images/down-arrow.png";
        document.getElementById("support_eventful").style.visibility = "hidden";
        document.getElementById("img_annoying").src = "styles/images/down-arrow.png";

        document.getElementById(text_id).style.visibility = "visible";
        document.getElementById(img_id).src = "images/up-arrow.png"
    }
    console.log(document.getElementById(text_id).style.visibility)

}