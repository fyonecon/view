/*
* 局部模块js
* */


function run_vue() {
    console_log("开始使用vue框架。");

    new Vue({
        el: '#vue-div',
        data: {
            message: '<h3>基于CDN的vue.js加载正常。</h3>',
            msg: '123456',
        }
    })

    document.getElementsByClassName("ok")[0].innerHTML = getThisUrlParam("", "p1");

}



function start_this_page() {
    console_log("主框架解析完成，开始渲染模块页面 > >");

    run_vue();
}
