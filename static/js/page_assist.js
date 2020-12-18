/*框架辅助功能，帮助框架可以在多种苛刻条件下正常使用*/

/*
* 全局清除页面被广告劫持
* 一般添加ad元素在页面尾部
* */
let ad_time = 0;
function clear_wifi_ad() {
    let wifi_ad_script =  $("#depend-css").prevAll("script");
    let wifi_ad_div =  $("#wifi-ad").nextAll();
    // view.log("WiFi广告劫持检测器：script="+wifi_ad_script.length + "。为0时说明无广告。");
    wifi_ad_script.remove();
    wifi_ad_div.remove();
    if (wifi_ad_script.length === 0 && wifi_ad_div.length === 0){
        clearInterval(ad_time);
    }
}
(function () {
    ad_time = setInterval(function () {
        clear_wifi_ad();
    },2000);
    clear_wifi_ad();
})();

// 全局变量初始赋值
app_token = view.get_data("app_token");
user_token = view.get_data("user_token");
user_id = view.get_data("user_id");

// 获取页面的app_token
function must_app_token(cal_func) {
    /*开始-请求数据*/
    $.ajax({
        url: api_url + "app/get_app_token",
        type: "POST",
        dataType: "json",
        async: true,
        data: { // 字典数据
            app_class: app_class,
            url: window.location.href,
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
                    view.log(data.msg);
                }else if (data.state === 1){ // 接口数据成功
                    view.log(data.msg);
                    // 其他
                    app_token = data.content.app_token;
                    try{
                        cal_func(data);
                    }catch (e) {
                        view.error("请求user_token时，回调函数为必选，否则会造成同步时差问题。");
                    }
                }else if (data.state === 302){ // 需要重新登录或初始化数据
                    view.log(data.msg);
                    // 其他
                }else if (data.state === 403){ // 拒绝访问
                    view.log(data.msg);
                }else {
                    let txt = data.msg+"("+ data.state +")";
                    console.error(txt);
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

// 用户登录，获取的user_token
function must_user_login(url, cal_func, phone, phone_code, father_user_id) {

    /*开始-请求数据*/
    $.ajax({
        url: api_url + "user/user_login",
        type: "POST",
        dataType: "json",
        async: true,
        data: { // 字典数据
            app_class: app_class,
            url: window.location.href,

            app_version: app_version,
            app_name: app_name,
            app_platform: app_platform,
            phone: phone,
            phone_code: phone_code,
            father_user_id: father_user_id,

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
                    view.log(data.msg);
                }else if (data.state === 1){ // 接口数据成功
                    view.log(data.msg);
                    // 其他
                    user_id = data.content.user_id;
                    user_token = data.content.user_token;
                    view.set_data("user_id", user_id);
                    view.set_data("user_token", user_token);
                    view.set_data("phone", view.md5(phone));
                    try{
                        cal_func(data);
                    }catch (e) {
                        view.error("请求user_token时，回调函数为必选，否则会造成同步时差问题。");
                    }
                }else if (data.state === 302){ // 需要重新登录或初始化数据
                    view.log(data.msg);
                    // 其他
                }else if (data.state === 403){ // 拒绝访问
                    view.log(data.msg);
                }else {
                    let txt = data.msg+"("+ data.state +")";
                    console.error(txt);
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

