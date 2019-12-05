/*
* 局部模块js
* */


function run_vue(info) {
    view.log(info);
    view.log("开始使用vue框架。");

    new Vue({
        el: '#vue-div',
        data: {
            message: '<h3>基于CDN的vue.js加载正常。</h3>',
            msg: '123456',
        }
    })


    view.class_write_html("ok", view.get_url_param("", "p1"))

}



function page_data_init() { // 此页面模块起始
    view.log("主框架解析完成，开始渲染模块页面 > >");

    run_vue();
}
