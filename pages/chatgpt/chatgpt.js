

function chat_frame(){
    let id = "chatgpt-div";
    let url = "https://xc.com/";
    // view.xss_iframe(id, url, function (){
    //     view.log([id, url, "loaded"]);
    //     $(".iframe-content-xss").css("width", "100%");
    // });
    window.open(url, "_self");
}

function start_page(){
    chat_frame();
}
