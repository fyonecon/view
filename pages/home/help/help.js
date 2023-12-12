
$(document).on("click", ".clear_all_data", function (){
    clear_all_data();
});

$(document).on("click", ".window_close-app", function (){
    let that = $(this);
    view.window_close();
});

function test_api(){
    /*开始-请求数据*/
    $.ajax({
        url: api_url + "app/show_text",
        type: "POST",
        dataType: "json",
        async: true,
        data: { // 字典数据
            app_class: app_class,
            app_version: app_version,
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
                    //
                }else if (data.state === 302){ // 需要重新登录或初始化数据
                    //
                } else {
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
            view.alert_txt("接口请求错误或访问被限制", 2500, "clear");
        }
    });
    /*结束-请求数据*/
}

function start_page(e){
    $(".back-div").removeClass("hide");

    // 仅在平板或笔记本设备展示
    if (window.screen.width < 1500 && window.screen.width > 640){
        $(".download-div").removeClass("hide");
    }

    // 复制文字
    let clipboard = new Clipboard('.copy-txt-btn');
    clipboard.on('success', function(e) {
        view.info('Action:', e.action);
        view.info('Text:', e.text);
        view.info('Trigger:', e.trigger);
        view.notice_txt("已复制");
        e.clearSelection();
    });
    clipboard.on('error', function(e) {
        view.error('Action:', e.action);
        view.error('Trigger:', e.trigger);
        view.notice_txt("复制失败！");
        try {call_func();}catch (e){}
    });

}