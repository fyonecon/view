/*
* 局部模块js
* */


function run_time() {
    document.getElementsByClassName("time")[0].innerHTML = Date();

}



function start_this_page(info) {
    view.log(info);

    run_time();
}
