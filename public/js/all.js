/*自定义全局函数，公用js*/
/*建议放公共函数*/


/*
* 验证码生成器
* 先放标签 <div id="verify_box" class="select-none verify_box"></div>
* 然后直接调用make_code_verify(data)即可
* */
function make_code_verify(data) {
    let div = '<div class="verify-num-box"><div class="show-check" id="show-check" onclick="verify_make_num()">12+23=</div><input class="input-check" value="" id="input-check" placeholder="输入计算结果" maxlength="9" type="text" /><div class="clear"></div></div> <div class="verify-num-div"><div class="verify-btn-style verify-close" onclick="verify_cancel()">取消</div><div class="verify-btn-style verify-ok" onclick="verify_ok()">确定</div><div class="clear"></div></div>';
    let style = '<style>.verify_box{width:280px;position:relative;top:calc(30%);left:0;right:0;margin:auto;box-shadow:0 0 8px lightgray;padding:10px 10px;}.show-check{width:calc(150px - 8px);padding:0 4px;font-size:16px;line-height:32px;display:inline-block;float:left;overflow:hidden;cursor:pointer;letter-spacing: 4px}.show-check:active{opacity:0.8;}.input-check{width:110px;height:30px;font-size:15px;letter-spacing:2px;float:left;padding:0 4px;margin-left:8px;text-align:center;}.verify-num-box{width:100%;line-height:32px;}.verify-num-div{height:34px;padding-top:30px;}.verify-btn-style{width:80px;float:left;letter-spacing:5px;border-radius:3px;font-size:16px;text-align:center;height:32px;line-height:32px;font-weight:600;margin-left:45px;cursor:pointer;}.verify-close{background:white;box-shadow:0 0 4px lightgray;color:black;}.verify-close:active{opacity:0.8;}.verify-ok{background:#4185FF;box-shadow:0 0 4px lightgray;color:white;}.verify-ok:active{opacity:0.8;}.clear{clear:both;}.select-none{-moz-user-select:none;-webkit-user-select:none;-ms-user-select:none;user-select:none;}</style>';
    var box=document.getElementById('verify_box');
    if (box){
        box.innerHTML = div+style;
        verify_data_res = data;
        verify_make_num();
    }else {
        console.log('标签<div id="verify_box" class="select-none verify_box"></div>不存在，请提前声明或创建');
    }
}
function _js_rand(min, max) { // [min, max]
    let this_rand = Math.floor(Math.random()*(max-min+1)+min);
    return this_rand;
}
let verify_num_res = 0;
let verify_data_res = 0;
function verify_make_num() {
    let num1= _js_rand(0, 99);
    let num2= _js_rand(1, 11);
    let num0 = _js_rand(1, 3); // 加减乘除
    let mark = "";
    switch (num0) {
        case 1:
            verify_num_res = num1-num2;
            mark = "减";
            break;
        case 2:
            verify_num_res = num1+num2;
            mark = "加";
            break;
        case 3:
            verify_num_res = num1*num2;
            mark = "乘";
            break;
        default:
            verify_num_res = num1*num2;
            mark = "乘";
            break;
    }
    let _div = num1+mark+num2+"&nbsp;"+"等于";
    document.getElementById("show-check").innerHTML = _div;
}
function verify_cancel() {
    console.log("cancel");
    try {
        verify_close(verify_data_res);
    }catch (e) {
        console.log("关闭验证的回调函数verify_close(data)不存在，请注意。");
    }
}
function verify_ok() {
    let num = document.getElementById("input-check").value*1;
    console.log([num, verify_num_res]);
    if (!num || num !== verify_num_res){
        verify_make_num();
        try {
            verify_continue(verify_data_res);
        }catch (e) {
            console.log("验证不成功的回调函数verify_continue(data)不存在，但可忽略。");
        }
    }else {
        try {
            verify_run(verify_data_res);
        }catch (e) {
            console.log("验证成功后的回调函数verify_run(data)不存在，请注意。");
        }
    }
}



function fetch_request() {

    // 开始-Fetch-请求数据
    const post_api = config.api_url + "admin/login_check";
    const map_body = new Map([ // 要提交数据
        // ["login_token", login_token],


    ]);
    let body = "";
    for (let [k, v] of map_body) { body += k+"="+v+"&"; } // 拼装数据，限制2MB最佳
    fetch(post_api, {
        method: "post",     // get/post
        mode: "cors",       // same-origin/no-cors/cors
        cache: "no-cache",
        headers: {
            "Content-type": "application/x-www-form-urlencoded; charset=UTF-8",
        },
        body: body,         // 格式要求：body:"key1=val1&key2=val2"
    }).then(function (response){
        if (response.status === 200){return response;}
    }).then(function (data) {
        return data.text();
    }).then(function(text){
        // 统一格式转换
        let back = null;
        let res = null;
        if (typeof text === "string"){
            back = text;
            res = JSON.parse(text);
        }else if (typeof text === "object"){
            back = JSON.stringify(text);
            res = text;
        }else {console.log("Unknown Typeof = " + typeof text)}
        view.log("Typeof：\n" + typeof text + "\n Api_data：\n" + back);

        // 解析
        if (res.state === 0){
            view.log(res.msg);
            alert_txt(res.msg, 2000);

        }else if (res.state === 1) {
            view.log(res.msg);




        }else{
            console.log("超范围的state(state="+ res.state +")");
            alert_txt(res.msg, 2000);
        }

    }).catch(function(error){
        let error_info = "Fetch遇到错误：" + error;
        console.log("%c"+error_info, "color:red;font-weight:bold;font-size:18px;");
    });
    // 结束-Fetch

}


