/*
* 局部模块js
* */
"use strict";

function start_page(info) {
    view.log(info);

    view.load_img("img-404", cdn_page_file+"static/img/");
    $(".body").addClass("bg-white");
}
