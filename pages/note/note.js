

// 组件起始函数
function run_parts(text, data){
    //
    if (view.get_url_param("", "route") === "note"){ // 单页
        $(".back-div").removeClass("hide");
        $(".page-content-choose").addClass("page-content");
        $(".tools-right-content-part").addClass("tools-right-content-part-style");
    }else { // 组件
        $(".page-content-choose").addClass("run-tools-content");
    }
}

function start_page(){
    //
    if (view.get_url_param("", "route") === "note"){ // 单页
        run_parts("记事本", []);
    }else { // 组件
        view.log("跳过");
    }
}
