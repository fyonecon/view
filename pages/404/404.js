/*
* 局部模块js
* */


function run_time() {
    document.getElementsByClassName("time")[0].innerHTML = Date();

}



function page_data_init(info) { // 此页面模块起始
    view.log(info);

    run_time();
}
