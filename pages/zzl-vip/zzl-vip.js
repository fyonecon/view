
// 产生旋转效果
function show_trans(last_num){
    let trans_times = view.js_rand(3, 5); // 随机循环次数
    view.log([trans_num, trans_times, has_trans_times]);
    $(".zzl-last-start-num-span").html(last_num);
    let len = $(".lucky-item-select").length;
    $(".luck-select").find(".lucky-item-select").removeClass("hide");
    $(".tran-"+trans_num).addClass("hide");
    $(".tran-btn").removeClass("hide");
    trans_num++;
    if (trans_num < len){
        setTimeout(function () {
            show_trans(last_num);
        }, has_trans_times*50);
    }else {
        view.log("跳过="+trans_num+"="+len);
        has_trans_times++;
        if (has_trans_times <= trans_times){
            trans_num = 0;
            show_trans(last_num);
        }else {
            view.log("暂停");
            // 初始化
            trans_num = 0;

            // 计算奖品-概率法
            //show_reward_res();
            // view.alert_txt("正在计算抽奖结果...", 2000);
            choose_reward_div(view.js_rand(0, 7));

        }
    }
}

// 选中抽奖区块
function choose_reward_div(index){
    let user_phone = view.get_cookie("user_phone");

    save_reward(user_phone);
}

// 点击抽奖按钮
$(document).on("click", ".luck-btn", function () {
    view.log("==");

    show_trans(last_click_num);
});

// 动态计算样式
function init_style() {
    view.log("init");
    // 重新计算样式
    let height = 0;
    let _salt = 393/320;
    if (window.innerWidth > 640){
        height = 640*_salt;
    }else if (window.innerWidth < 320){
        height = 320*_salt;
    }else{
        height = window.innerWidth*_salt;
    }

    $(".zzl-box").css({"height": height+"px"});
    view.log(height);

    let lucky_width = $(".zzl-lucky").width();
    $(".zzl-lucky").css({"height": lucky_width+"px"});

    let luck_item_width = lucky_width/3-12;
    $(".lucky-item").css({"width": luck_item_width+"px", "height": luck_item_width + "px"});

}
window.onresize = function () {
    init_style();
};

let trans_num = 0;
let has_trans_times = 1;
let last_click_num = 0;

//
$(document).on("click", ".check-btn", function () {
    let that = $(this);

    let user_phone = $(".input-phone").val();
    if (view.check_phone(user_phone) === false){
        view.alert_txt("手机号格式错误", 1500);
    }else {
        check_user_phone(user_phone);
    }

});
//
$(document).on("click", ".reward-alert-close-img", function () {
    let that = $(this);
    $(".reward-alert").addClass("hide");
});
//
// $(document).on("click", ".lucky-item-btn", function () {
//     let that = $(this);
//     $(".reward-alert").removeClass("hide");
// });


// 计算抽奖
function save_reward(user_phone) { // play_1210zzl_save_reward
    // view.alert_txt("正在计算抽奖结果...", "long");

    /*请求数据*/
    $.ajax({
        url: the_api + "app/play_1210zzl_save_reward",
        type: "POST",
        dataType: "json",
        async: true,
        data: { // 字典数据
            user_token: app_token,
            user_phone: user_phone,
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
            view.log("类型：" + typeof back + "\n数据：" + text +"\n状态：" + status + "。");

            // 解析json
            if (data.state === 0){
                view.alert_txt(data.msg, 2000, "clear");

                $(".zzl_alert_txt").html(data.msg);

            }else if (data.state === 1){
                view.log(data.msg);
                $(".zzl_alert_txt").html(data.msg);
                // view.alert_txt(data.msg, 3000, "clear");

                let index = data.content.index;
                let reward = data.content.reward;
                let cover = data.content.cover;

                // 渲染选中奖品
                $(".tran-" + index).addClass("hide");
                view.set_cookie("index", index);
                view.set_cookie("reward", reward);
                view.set_cookie("cover", cover);

                // 得奖提示
                $(".reward-alert").removeClass("hide");
                $(".reward-alert-title-txt").html("恭喜中奖！");
                $(".show-reward-alert-cover").attr("src", cover);
                $(".show-reward-alert-title").html(reward);

                $(".zzl_alert_txt2").html("已中奖品："+reward);

                // 刷新中奖名单
                get_reward_list();

            }else {
                let txt = data.msg+"("+ data.state +")";
                view.alert_txt(txt, 2000, "clear");
            }
        },
        error: function (xhr) {
            console.log(xhr);
            view.alert_txt("接口请求错误或者网络不通", 2500);
        }
    });

}

function check_user_phone(user_phone) {
    view.log(user_phone);
    // view.alert_txt("正在验证手机号...", "long");

    /*请求数据*/
    $.ajax({
        url: the_api + "app/play_1210zzl_check_phone",
        type: "POST",
        dataType: "json",
        async: true,
        data: { // 字典数据
            user_token: app_token,
            user_phone: user_phone,
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
            view.log("类型：" + typeof back + "\n数据：" + text +"\n状态：" + status + "。");

            // 解析json
            if (data.state === 0){
                view.alert_txt(data.msg, 2000, "clear");

            }else if (data.state === 1){
                view.log(data.msg);
                view.alert_txt(data.msg, 2000, "clear");

                view.set_cookie("user_phone", user_phone);

                //
                $(".user-phone-div").addClass("hide");
                $(".zzl-bg").addClass("hide");

            }else {
                let txt = data.msg+"("+ data.state +")";
                view.alert_txt(txt, 2000, "clear");
            }
        },
        error: function (xhr) {
            console.log(xhr);
            view.alert_txt("接口请求错误或者网络不通", 2500);
        }
    });

}


function get_reward_list() {

    /*请求数据*/
    $.ajax({
        url: the_api + "app/get_reward_list",
        type: "POST",
        dataType: "json",
        async: true,
        data: { // 字典数据
            user_token: app_token,
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
            view.log("类型：" + typeof back + "\n数据：" + text +"\n状态：" + status + "。");

            // 解析json
            if (data.state === 0){
                view.alert_txt(data.msg, 2000, "clear");

            }else if (data.state === 1){
                view.log(data.msg);

                let string = '<marquee direction="down" scrolldelay="120" >';
                for (let i=0; i<data.content.length; i++){
                    let info = data.content[i];
                    let phone = info.phone;
                    let reward = info.reward;
                    let create_time = info.create_time;
                    let li = '<div class="reward-li">手机号'+phone+'，奖品：'+reward+'</div>';

                    string = string + li;

                    if (i+1 === data.content.length){
                        string = string + '</marquee>';
                        $(".reward-ul-div").html(string);
                    }
                }

            }else {
                let txt = data.msg+"("+ data.state +")";
                view.alert_txt(txt, 2000, "clear");
            }
        },
        error: function (xhr) {
            console.log(xhr);
            view.alert_txt("接口请求错误或者网络不通", 2500);
        }
    });

}


//
function get_dom() {

    /*请求数据*/
    $.ajax({
        url: the_api + "app/play_1210zzl_dom",
        type: "POST",
        dataType: "json",
        async: true,
        data: { // 字典数据
            user_token: app_token,
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
            view.log("类型：" + typeof back + "\n数据：" + text +"\n状态：" + status + "。");

            // 解析json
            if (data.state === 0){
                view.alert_txt(data.msg, 2000, "clear");

            }else if (data.state === 1){
                view.log(data.msg);
                view.alert_txt("完成", 500, "clear");

                let tran_dom = data.content.tran_dom;
                $(".zzl-lucky").html(tran_dom);

                // 其他操作
                // 检测是否有手机号
                let user_phone = view.get_cookie("user_phone");
                if (!user_phone){
                    $(".input-phone").focus();
                    $(".user-phone-div").removeClass("hide");
                    $(".zzl-bg").removeClass("hide");
                }else {
                    $(".zzl_alert_txt").html("参与手机号："+user_phone);
                }

                let timer = 0;
                interval = setInterval(function () {
                    init_style();
                    timer +=1;
                    if (timer > 10){
                        clearInterval(interval);
                    }
                }, 500);

                let index = view.get_cookie("index");
                let reward = view.get_cookie("reward");
                let cover = view.get_cookie("cover");
                if (reward){
                    $(".zzl_alert_txt2").html("已中奖品：" + reward);
                }
                if (index){
                    $(".lucky-item-select").removeClass("hide");
                    $(".tran-" + index).addClass("hide");
                }

            }else {
                let txt = data.msg+"("+ data.state +")";
                view.alert_txt(txt, 2000, "clear");
            }
        },
        error: function (xhr) {
            console.log(xhr);
            view.alert_txt("接口请求错误或者网络不通", 2500);
        }
    });

}


function get_app_token() {

    let page_url = window.location.href;
    let app_class = "h5";

    // 获取接口验证的token
    if (!app_class || !page_url){
        view.alert_txt("参数不全，无法继续访问", "long");
        return;
    }else {

        // 开始-Fetch-请求数据-ES6
        const post_api = the_api + "app/get_app_token"; // 接口
        const map = new Map([ // 要提交数据
            ["app_name", "zzl1210"],
            ["app_class", app_class],
            ["url", page_url],
        ]);
        let body = "";
        for (let [k, v] of map) { body += k+"="+v+"&"; } // 拼装数据，限制2MB最佳
        fetch(post_api, {
            method: "post",     // get/post
            mode: "cors",       // same-origin/no-cors/cors
            cache: "no-cache",
            headers: {
                "Content-type": "application/x-www-form-urlencoded; charset=UTF-8",
            },
            body: body,         // body示例格式："key1=val1&key2=val2"
        }).then(function (response){
            if (response.status === 200){return response;}
        }).then(function (data) {
            return data.text();
        }).then(function(text){ // 返回接口数据
            // 统一格式校验
            let back = null;
            let res = null;
            if (typeof text === "string"){
                back = text;
                res = JSON.parse(text);
            }else if (typeof text === "object"){
                back = JSON.stringify(text);
                res = text;
            }else {console.log("未知类型=" + typeof text)}
            view.log("类型：\n" + typeof text + "\n数据：\n" + back);

            // 解析与渲染数据 res
            if (res.state === 0){
                view.log(res.msg);
                view.alert_txt(res.msg, 5000);
            }else if (res.state === 1){
                app_token = res.content.user_token;

                // 其他操作
                get_dom();
                get_reward_list();

            }else{
                console.log("超范围的state(state="+ res.state +")");
                view.alert_txt("超范围的state(state="+ res.state +")", 5000, "clear");
            }

        }).catch(function(error){
            let error_info = "Fetch遇到错误：" + error;
            console.log("%c"+error_info, "color:red;font-weight:bold;font-size:20px;");
            view.alert_txt(error_info, 3000, "clear");
        });
        // 结束-Fetch

    }

}


let interval = 0;
const the_api = "https://api.cswendu.com/cswd/public/index.php/api/";
function start_this_page(info) { // 此页面模块起始
    view.log(info);

    view.alert_txt("请稍后...", "long");

    let tag = view.get_url_param("", "tag");
    if (!tag){
        view.log(tag);
        tag = view.time()*2;
        window.location.replace("./?route=zzl-vip&out=none&tag=" + tag);
    }else {
        let now_time = view.time()*2;
        if (now_time - tag*1 < 10*60*2*1000){ // 10分钟之内则不跳转到新参数
            view.log("进入token");
            get_app_token();
        }else {
            view.log(now_time);
            window.location.replace("./?route=zzl-vip&out=timeout&tag=" + now_time);
        }
    }

}

