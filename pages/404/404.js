/*
* 局部模块js
* */


function run_time() {
    document.getElementsByClassName("time")[0].innerHTML = Date();

}



function start_this_page() {
    console_log("主框架解析完成，开始渲染模块页面 > >");

    run_time();
}
