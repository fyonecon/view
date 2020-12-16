/*
* 局部模块js
* */



let page = {
    "func1": function (){
        $(".other-txt").append("<span>系统缓慢开发中..</span>");
    },

};



function start_this_page() {
    view.log("主框架解析完成，开始渲染模块页面 > >");

    page.func1();

}


