

function mix_json() {

    /*请求数据*/
    $.ajax({
        url: api_url+"app/now_mix_ag",
        type: "POST",
        dataType: "json",
        async: true,
        data: { // 字典数据
            app_class: app_class,
            user_token: user_token,

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
            // 解析json
            if (data.state === 0){
                view.log(data.msg);

            }else if (data.state === 1){
                view.log(data.msg);
                try {
                    let info = data.content[0]["data"][0];
                    read_api(info);
                }catch (e) {
                    view.log("数据格式发生变化，不能解析")
                }
            }else {
                if (!data.msg){
                    let info = "类型：" + typeof back + "\n数据：" + text +"\n状态：" + status + "。";
                    view.error("=接口返回未知规格的参数=\n" + info);
                }else {
                    view.log(data.msg);
                }
            }
        },
        error: function (xhr) {
            console.error(xhr);
        }
    });

}

// 解析价格
function read_api(info) {
    view.log(info);
    try{
        let now_q = info.quote;

        let name = now_q.q67; // 当前交易名
        let price = (now_q.q63 * 100).toFixed(2); // 当前买入价
        let time = now_q.q59; // 价格时间

        let day_min_price = (now_q.q1 * 100).toFixed(2); // 今日最低价
        let day_max_price = (now_q.q3 * 100).toFixed(2); // 今日最高价
        view.log([name, price, time]);

        // 朗读
        // voice_text(name + "，现" + price + "，低" + day_min_price + "，高" + day_max_price, time);

        view.voice(name + "，现" + price + "，低" + day_min_price + "，高" + day_max_price);

    }catch (e) {
        view.log("quot_str参数未定义");
    }

}


function web_login() {
    view.log("web_login成功");

    setInterval(function () {
        mix_json();
    }, 110000);
    mix_json();

}


function start_this_page() {
    view.log("主框架解析完成，开始渲染模块页面 > >");

    must_app_token(web_login);
}
