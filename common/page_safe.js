"use strict";

// 推出所有设备
function all_layout(){
    view.alert_txt("正在退出全部设备..", "long", "clear");

    /*开始-请求数据*/
    $.ajax({
        url: api_url + "admin/admin_all_layout",
        type: "POST",
        dataType: "json",
        async: true,
        data: { // 字典数据
            app_class: app_class,
            app_version: app_version,
            login_name: login_name,
            login_token: login_token,
            login_id: login_id,
            login_level: login_level,
        },
        success: function(back, status){
            // 数据转换为json
            let data = "";
            let text = "";
            if(typeof back === "string"){
                data = JSON.parse(back);
                text = back;
            } else {
                data = back;
                text = JSON.stringify(back);
            }
            // 校验数据规格
            if (typeof data.state !== "undefined" && typeof data.msg !== "undefined"){
                // 解析json
                if (data.state === 0){ // 无数据或参数不全
                    view.alert_txt(data.msg, 2000, "clear");
                }else if (data.state === 1){ // 接口数据成功
                    view.alert_txt(data.msg, 500, "clear");
                    must_login();
                }else if (data.state === 302){ // 需要重新登录或初始化数据
                    must_login(data.msg);
                }else if (data.state === 403){ // 拒绝访问
                    must_login(data.msg);
                }else {
                    let txt = data.msg+"("+ data.state +")";
                    console.error(txt);
                    must_login(data.msg);
                }
            }else {
                let info = "类型：" + typeof back + "\n数据：" + text +"\n状态：" + status + "。";
                view.error("=接口返回未知规格的参数=\n" + info);
            }
        },
        error: function (xhr) {
            console.error(xhr);
        }
    });
    /*结束-请求数据*/

}

// 退出本设备
function that_layout(){
    view.alert_txt("正在退出本设备..", "long", "clear");
    must_login();
}

// 跳转到登录页
function must_login(msg){
    if (!msg){msg="请先登录..";}
    view.alert_txt(msg, "long");

    view.del_data("login_name");
    view.del_data("login_id");
    view.del_data("login_token");
    view.del_data("login_level");

    setTimeout(function (){
        window.location.replace("./?route=login&back_url=" + encodeURIComponent(window.location.href));
    }, 500);
}

//
// 检查admin_token
function check_admin_token(e, route){

    // start_page(e);
    // return;

    /*开始-请求数据*/
    $.ajax({
        url: api_url + "admin/check_admin_login",
        type: "POST",
        dataType: "json",
        async: true,
        data: { // 字典数据
            app_class: app_class,
            app_version: app_version,
            url: window.location.href,
            login_name: login_name,
            login_token: login_token,
            login_id: login_id,
            login_level: login_level,
        },
        success: function(back, status){
            // 数据转换为json
            let data = "";
            let text = "";
            if(typeof back === "string"){
                data = JSON.parse(back);
                text = back;
            } else {
                data = back;
                text = JSON.stringify(back);
            }
            // 校验数据规格
            if (typeof data.state !== "undefined" && typeof data.msg !== "undefined"){
                // 解析json
                if (data.state === 0){ // 无数据或参数不全
                    view.alert_txt(data.msg, 2000, "clear");
                }else if (data.state === 1){ // 接口数据成功
                    let the_level = data.content.level;
                    let the_level_name = data.content.level_name;
                    view.log([the_level, the_level_name]);

                    login_level_name = the_level_name;

                    // 1超级管理员，2组管理员，3普通管理员，4仅查看数据
                    level_dom(the_level); // s
                    if (the_level === 1){
                        start_page(the_level);
                        // try {start_foot();}catch (e){view.error(e);}
                    }
                    else if (the_level === 2){
                        start_page(the_level);
                        // try {start_foot();}catch (e){view.error(e);}
                    }
                    else if (the_level === 3){
                        start_page(the_level);
                        // try {start_foot();}catch (e){view.error(e);}
                    }
                    else if (the_level === 4){
                        start_page(the_level);
                        // try {start_foot();}catch (e){view.error(e);}
                    }
                    else {
                        view.alert_txt(data.msg, "long", "clear");
                    }

                }else if (data.state === 302){ // 需要重新登录或初始化数据
                    must_login(data.msg);
                }else if (data.state === 403){ // 拒绝访问
                    must_login(data.msg);
                }else {
                    let txt = data.msg+"("+ data.state +")";
                    console.error(txt);
                    must_login(data.msg);
                }
            }else {
                let info = "类型：" + typeof back + "\n数据：" + text +"\n状态：" + status + "。";
                view.error("=接口返回未知规格的参数=\n" + info);
            }
        },
        error: function (xhr) {
            console.error(xhr);
            view.alert_txt("接口请求错误或访问被限制", 2500, "clear");
        }
    });
    /*结束-请求数据*/

}


//
function level_dom(level){
    // level-dom hide level-2 level-3
    let level_hide_txt = "";
    if (level === 1){
        $(".level-dom").removeClass("hide");
        $(".level-"+level+"-hide").html(level_hide_txt).addClass("hide");
    }else if (level === 2){
        $(".level-dom").removeClass("hide");
        $(".level-"+level+"-hide").html(level_hide_txt).addClass("hide");
    }else if (level === 3){
        $(".level-dom").removeClass("hide");
        $(".level-"+level+"-hide").html(level_hide_txt).addClass("hide");
    } else if (level === 4){
        $(".level-dom").removeClass("hide");
        $(".level-"+level+"-hide").html(level_hide_txt).addClass("hide");
    }else {
        $(".level-dom").html("<h3>null-level</h3>");
    }

}
