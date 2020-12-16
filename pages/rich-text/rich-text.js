/*
* 局部模块js
* */



let page = {
    "show_text": function (){
        let id = view.get_url_param("", "id");
        view.log(id);
        if (!id){
            view.alert_txt("id不能为空", "long");
            setTimeout(function () {
                window.history.go(-1);
            }, 2000);
            return;
        }

        // 请求数据



    },


};



function start_this_page() {
    view.log("主框架解析完成，开始渲染模块页面 > >");

    page.show_text();

}


