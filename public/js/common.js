
/*
* create: 2018-06-00 update: 2018-09-18 unicode: UTF-8
* 2652335796@qq.com
* author: fyonecon
*
* js兼容性：Android 5.0+，iOS 10.3+，IE 10+，主要面向移动设备
* ES6(逻辑) + jQ(dom)，但是可以不引入jQ，因为jQ会自动检测并自动引入CDN
*
* */

/*
* 使用方法：
        1. 直接引用方法函数即可，无Block函数那种繁琐引用；
        2. 注意一些自带的全局变量，避免一些坑；
        3. 场景值可以解决多个或者多次调用同一函数的冲突，注意区分。
*
* common.js函数调用表（主要已列出，次要的未列出）：

        common.css自动引入，初始化了一些必要样式

        animated.css自动引入，预增加页面动画

        无刷新更改页面地址，请参照
        http://cdnaliyun.oss-cn-hangzhou.aliyuncs.com/js/js_extent_push.js

        批量写入css CDN链接
        var cdn_css = ["", ""];
        add_css(cdn_css)

        字典转数组，return
        dictionary_to_array(input_data)

        扩展js数据类型的判断，return
        js_typeof(input_data)

        图片展示插件
        show_img(img_url, txt, refresh, display_btn)

        获取url的参数的值，return
        getThisUrlParam(url, key)

        单个替换参数url里面的老参数，输出新url，return
        changeUrlParam(url, key, new_value)

        批量替换参数url里面的老参数，输出新url，return
        changeAllUrlParam(str, arr)

        过滤字符串特殊符号，return
        getPureStr(str)

        用于显示[多文字Toast]提示
        alert_txt(txt, time, call_func)

        用于显示[多文字确定]提示
        alert_msg(title, content, btn_txt, this_func)

        设置和更新cookie，return
        setCookie(key, value, expiredays)

        读取cookie，return
        getCookie(key)

        时间戳转日期，return
        timestampToTime(timestamp)

        生成二维码，回调函数返回二维码地址
        make_qr(content, width, call_func)

        求范围内的值[min, max]，return
        js_rand(min, max)

        判断是否是小数（最多可到小数点后15位）或者整数
        js_float(number)

        获取当前时间的 日期、星期、时间戳(秒)、时间戳(毫秒)，return
        getNowDate()

        获取任意一天的日期
        getBeforeDate(n)

        时间戳(毫秒)转日期，输入时间统一用秒，然后将毫秒转换成秒，return
        formatDateTime(inputTime)

        浏览器设备运动事件（摇一摇、加速运动等）
        device_motion(call_func, during)

        处理触摸手势
        调用swipe_touch(document.getElementById("test"));开启该区域触摸事件
        使用function touch_data(data){console.log(data);}取出该区域触摸参数

        base64编码解密加密，return
        js_base64_decode(result)
        js_base64_encode(string)

        处理图片
        在img标签中加入class="img-select-cell"即可完成

        md5加密，return
        js_md5(string, toUpperCase, call_func)

        判断是否是微信浏览器的函数
        user_weixin(status, jump_url, call_func, data)

        判断设备类型，Android、iOS、PC
        user_device(device_func, data)

        获取用户的地址和IP，回调函数返回信息数组，return
        user_address(call_func)

        页面刷新次数安全校验，利用cookie
        refresh_check(max_num, common_cookie_pre, jump_url)

        基于jQ的get方法请求
        get_func(get_api_url, call_func)

        基于jQ的post方法请求
        post_func(post_api_url, obj, call_func)

        原生get请求
        get_api(get_api_url, call_func)

        原生Fetch的post方法请求
        post_api(post_api_url, obj, call_func)

        //页面加载的百分比 [0~1]，直接调用loading_percent(show_load)将使用默认加载效果
        //loading_percent(show_load)

        遮蔽层的开启和删除
        show_layer(tag, bg_color, z_index)
        delete_layer(tag);

        实现自定义的多次点击
        many_click(_click_num, call_func)
        或者直接调用
        双击 two_click(call_func)
        三击 three_click(call_func)

        // js数组去重
        js_array_unique(array)

        // 鼠标悬浮文字提醒
        // mouse_txt("class_name", "txt");


*
* */

// 'use strict'; // 暂不开启这个功能

/*
* 处理调试模式
* */
//var common_debug = true; // bool： true时打开调试
if(typeof common_debug === "undefined"){
    //console.info("%c"+"'common_debug=false'，console默认关闭", "color:blue;font-size:13px;");
    common_debug = false;
}else {
    if (common_debug === true){
        console.info("%c"+"'common_debug=true'，console打开，unicode: UTF-8，2018-09-04", "color:green;font-size:13px;");
    }else {
        //console.info("%c"+"'common_debug=false'，console已经关闭", "color:blue;font-size:13px;");
    }
}

var common_debug_num = 1; // 参照
function console_info_func(txt) { // 日志分流
    if(common_debug_num === 1){
        console.info("%c"+txt, "color:grey;font-size:12px;");
        common_debug_num++;
    }else {
        //console.info(common_debug_num);
        common_debug_num++;
    }
}

/*
*  重写日志输出格式
* */
function common_log(txt) { // 日志函数，注意，已经将其他数据类型强制转化成了string
    common_debug === true ? console.info("%c" + txt, "color:#A0A0A0;font-size:12px;") : "";
}

/*
* 扩展js框架
* */
const kd_jq = "http://cdnaliyun.oss-cn-hangzhou.aliyuncs.com/js/jquery-1.11.3.min.js"   +'?'+time_milli(); // jq框架
const md5_url = "http://cdnaliyun.oss-cn-hangzhou.aliyuncs.com/js/md5.js"               +'?'+time_milli(); // 引用md5.js
const common_css = "http://cdnaliyun.oss-cn-hangzhou.aliyuncs.com/css/common.css"                        ; // 公共样式
const qr_js= "http://cdnaliyun.oss-cn-hangzhou.aliyuncs.com/js/qrcode.js"               +'?'+time_milli(); // js生成二维码库
const js_push = "http://cdnaliyun.oss-cn-hangzhou.aliyuncs.com/js/js_extent_push.js"    +'?'+time_milli(); // 无刷新更改页面地址
const souhu_address = "http://pv.sohu.com/cityjson?ie=utf-8";                                              // 搜狐获取用户IP、城市统计
const animated_css = "http://cdnaliyun.oss-cn-hangzhou.aliyuncs.com/css/animate.min.css"                 ; // 动画css3



(function (e) {

    var jq_check_num = 0;
    function run_jq_check(jq_check_num){
        try {
            //document.write('<link rel="stylesheet" class="common-css"   href="'+common_css   +'?'+time_milli()+'" />');
            //document.write('<link rel="stylesheet" class="animated-css" href="'+animated_css +'?'+time_milli()+'" />');

            $("body").addClass("jQ-check1");

            common_log("公共js加载正常"+jq_check_num);
            common_log("jQ文件检测正常"+jq_check_num);
            common_log("Cookies启用否: "+navigator.cookieEnabled);
            var kd_jq_num = jq_check_num-1;
            for (let kd_i = 0; kd_i<kd_jq_num; kd_i++){
                $(".kd-jq-num-"+kd_jq_num).remove();
            }
        }
        catch(err){
            common_log("公共js加载正常c_"+jq_check_num);
            common_log(err);
            var promise = new Promise(function(resolve, reject) {
                common_log("正在自动加入jQ框架...");
                new_jQ=document.createElement("script");
                new_jQ.setAttribute("type", "text/javascript");
                new_jQ.setAttribute("class", "kd-jq-num-"+jq_check_num);
                new_jQ.setAttribute("src", kd_jq);
                document.head.appendChild(new_jQ);
                jq_check_num++;
                resolve();
            });
            promise.then(function() {
                common_log("正在检测jQ...");
                if (jq_check_num< 1){ // 检测200 x 15 = 3s，超时不再检测
                    run_jq_check(jq_check_num);
                }else {
                    //$("body").addClass("jQ-check2");
                    common_log("jQ加入成功");
                }

            });
        }
    }
    run_jq_check(0);

})("自检");


/*
* 这是一个遮蔽层，可能会用到。有了遮蔽层，可以防止譬如动画期间的乱点击。
* tag 标识（指的是哪个标识，用于区分是哪个标识），bg_color 背景色， z_index fixed的轴
* */
function show_layer(tag, bg_color, z_index) {
    !tag ? _tag = 0 : _tag = tag;
    !bg_color ? _bg_color = "rgba(0,0,0,0)" : _bg_color = bg_color;
    !z_index ? _z_index = 80 : _z_index = z_index;

    $("body").append('<div class="bg-layer bg-layer-'+ _tag +'" style="position: fixed;width: 100%;height: 100%;background: '+ _bg_color +';top: 0;left: 0;z-index: '+ _z_index +';"></div>');

    common_log("遮蔽层tag="+_tag+"已经创建，请及时删除（请调用delete_layer(tag)）");
}

/*
* 清除遮蔽层
* tag 标识（指的是要删除哪个或者全部的遮蔽层）
* */
function delete_layer(tag) {
    if (tag === "all"){
        _tag = "all";
        $(".bg-layer").remove();
    }else {
        !tag ? _tag = 0 : _tag = tag;
        $(".bg-layer-"+_tag).remove();
    }
    common_log("已经执行删除tag="+_tag+"的删除");
}

/*
* 404
* */
function jump_404(url) {
    if (url){
        window.location.replace(url);
    }else {
        window.location.replace("https://m.sogou.com/404");
    }
}


/*
* 基础函数
* 毫秒时间戳
* */
function time_milli() {
    var timestamp = Date.parse(new Date()); // 000毫秒时间戳
    var milli = (new Date()).getMilliseconds(); // 纯毫秒毫秒
    var time_milli_res = timestamp + milli;
    //common_log(time_milli_res);
    return time_milli_res;
}


/*
* 基础函数
* 字典转数组
* */
function dictionary_to_array(input_data) {
    // 字典转数组
    var new_arr = [];
    for (let i in input_data) {
        new_arr.push(input_data[i]); // 取value，不能取到key
    }
    //new_arr = Array.from(input_data); // es6
    //console.log(new_arr);
    common_log("字典转数组："+new_arr); // 已经强制array转string
    return new_arr;
}



/*
* 基础函数
* js 具体的数据类型判断，输出准确的数据类型
* array dictionary null number  string  boolean  undefined  function
* */
function js_typeof(input_data) {
    var this_type = typeof input_data;
    if (this_type === "object"){ // null {} []

        if (input_data === null){
            input_data = "null";
            that_type = "null";
        }else {
            if(input_data.constructor === Array){ // 数组
                that_type = "array for object";
            }else if (input_data.constructor === Object){ // 字典类型，或者叫json
                input_data = dictionary_to_array(input_data); // 字典转数组
                that_type = "dictionary(json) for object";
            }else if(input_data.constructor === Date){
                that_type = "date";
            }else {
                that_type = this_type;
            }
        }

    }else{ // number  string  boolean  undefined  function
        that_type = this_type;
    }
    //console.log(input_data);
    common_log("数据类型："+that_type+""+"；值："+input_data);
    return that_type;
}



/*
 * 预览单个大图功能：直接引用：show_img(img_url, "", "", "hide")
 * 可以判断图片地址是空或者404。
 * 
 * img_url：图片地址或者图片base64编码
 * txt：提示语
 * refresh："refresh"  关闭图片预览时刷新，
 * display_btn： "hide" 关闭按钮和图层背景不显示
 * */
function show_img(img_url, txt, refresh, display_btn){
    $("body").append('<div onclick="kd_layer_bg('+refresh+')" class="kd-layer-bg" style="position: fixed;width: 100%;height: 100%;top: 0;left: 0;z-index: 99980;background: rgba(0,0,0,0.5);"></div><img src="" onerror="kd_img_error()" class="kd-picture" id="kd-picture" alt="结果图" style="position: absolute;top: 0;bottom: 0;width: 100%;left: 0;right: 0;margin: auto;z-index: 99988;padding-top: 30px;padding-bottom: 30px;min-height: 30px;max-width: 580px;display: block;"/>');

    $(".kd-picture").attr("src", img_url);

    if(!img_url){
        alert_txt("图片地址为空！<br>无法预览大图", 3000);
        return;
    }
    $(".kd-layer-bg").show(300);
    $(".kd-picture").show(300).attr("src", img_url);

    if(!txt){ // 提示语
        //alert_txt("长按可以保存图片哦~", 3000);
    }else{
        alert_txt(txt, 3000);
    }

    if (display_btn === "hide"){ // 是否展示关闭按钮
        $(".kd-close-show_img").remove();
        common_log("隐藏了-关闭-按钮");
    }else if(display_btn === "show"){
        common_log("关闭-按钮默认显示1");
    }else {
        common_log("关闭-按钮默认显示2");
    }


    //  图片高度超过一定范围，操作背景按钮不方便，即显示一个另外的关闭图片按钮
    var _img_url = img_url + "?" + Date.parse(new Date());
    var img = new Image();

    var patt = new RegExp("data:image/");
    var res_base = patt.test(_img_url);
    if(res_base){ // 是base64

        common_log("base64："+res_base);

        $("body").append('<div class="kd-close-show_img" onclick="kd_layer_bg('+refresh+')" style="height: 32px;width: 55px;border-radius: 36px;text-align: center;line-height: 32px;border:2px solid #EEEEEE;font-size: 14px;color: antiquewhite;text-shadow: 0px 0px 10px #14727E;position: fixed;z-index: 99989;right: 20px;top: 25px;background: rgba(0,0,0,0.2);">关闭</div>');

    }else{ // 不是base64

        img.src = _img_url;
        img.onload = function(){
            //alert('width:'+img.width+',height:'+img.height);
            var img_height = (img.height/img.width)*window.innerWidth; // 计算图片的动态高度
            common_log(img_height);
            if(Math.abs(img_height-window.innerHeight) < 60 || img_height-window.innerHeight>=60){
                common_log("为特别高度图提供关闭按钮");
                $("body").append('<div class="kd-close-show_img" onclick="kd_layer_bg('+refresh+')" style="height: 36px;width: 55px;border-radius: 36px;text-align: center;line-height: 36px;border:2px solid #EEEEEE;font-size: 14px;color: antiquewhite;text-shadow: 0px 0px 10px #14727E;position: fixed;z-index: 99989;right: 20px;top: 25px;background: rgba(0,0,0,0.1);">关闭</div>');
            }
        };

    }

}

// 图片地址无效时
function kd_img_error(){
    alert_txt("图片地址无效！图片404", 5000);
    setTimeout(function(){
        kd_layer_bg();
    }, 2000);
    // 抛出图片地址
    common_log("图片404地址："+$(".kd-picture").attr("src"));

}
// 删除图片预览节点
function kd_layer_bg(refresh){

    $(".kd-layer-bg").remove();
    $(".kd-picture").remove();
    $(".kd-close-show_img").remove();

    if(refresh === "refresh"){
        window.location.reload();
    }else if(!refresh){
        //common_log("关闭图层不刷新页面");
        return;
    }else{
        //common_log("关闭图层不刷新页面");
        return;
    }
    common_log("处理了图片浏览图层节点");
}





/*
 * return string
 * js获取 url后的参数值，如果存在键，则返回键的值，如果不存在则返回null
 * string key: 键名，调用getUrlParam("sex")则返回0
 * */
function getThisUrlParam(url, key) { // 返回值
    // 兼容模式url地址，例如：poop.html?page=3&ok=222#p=2#name=kd
    var url_str = "";
    if(!url){
        url_str = window.location.href;
    }else {
        url_str = url;
    }
    // 正则匹配url中的参数，如果存在键，则返回键的值，如果不存在则返回null
    var regExp = new RegExp("([?]|&|#)" + key + "=([^&|^#]*)(&|$|#)");
    var result = url_str.match(regExp);
    if (result) {
        return decodeURIComponent(result[2]); // 转义还原参数
    } else {
        return null; // 没有匹配的键即返回null
    }

}

/*
*  return
*  单个替换参数url里面的老参数，输出新url
*  string url：网址或取他
*  string key：键
*  string new_value：新值
* */
function changeUrlParam(url, key, new_value) { // 返回新url
    var url_str = url;
    var regExp = new RegExp("([?]|&|#)" + key + "=([^&|^#]*)(&|$|#)");
    var result = url_str.match(regExp);
    if (result) {
        var old_value = decodeURIComponent(result[2]);
        var old_str = key+"="+old_value;
        url_str = url_str.replace(new RegExp(old_str, "g"), key+"="+new_value); // 全局替换
        common_log("单个替换结果="+url_str);
        return url_str;
    } else {
        common_log("'"+url_str+"'中没有匹配到key="+key+"，new_value="+new_value);
        return url; // 没有匹配的键即返回原始url
    }
}

/*
*  return
*  批量替换参数url里面的老参数，输出新url
*  string str：网址或取他
*  array arr： [[键, 新值], [key, new_value], [key, new_value]];
*
* */
function changeAllUrlParam(str, arr) { // 返回新被替换过的url
    common_log("批量替换url中的键的值");
    var url_str = str;
    var old_str = str;
    var array = arr;
    common_log(array);
    if(arr.length<=0 && typeof arr !== "object"){
        common_log("arr参数错误："+typeof arr+"=="+arr);
        return "arr is null";
    }
    for(let kd= 0; kd<array.length; kd++){
        var key = array[kd][0];
        var new_value = array[kd][1];
        url_str = changeUrlParam(url_str, key, new_value);
    }
    common_log("旧url="+old_str);
    common_log("新url="+url_str);
    return url_str;
}

/*
* return
* 过滤字符串特殊符号：    & | \\ * ^ % $ # @ . -
* string str：要匹配的字符串
* */
function getPureStr(str) {
    var pure_str=str.replace(/[&\|\\\*^%$#@.\-]/g, ""); // 去除特殊符号
    return pure_str;
}


// 直接调用方法：alert_txt("提醒文字", time)
// 用于显示[多文字Toast]提示
// txt 文本字：最多几十个字
// time 显示时间：ms，long时为长时间（30分钟）留存显示
// function   call_func 调用的函数名
function alert_txt(txt, time, call_func) {

    clearTimeout(kd_ST); // 清除老的定时器
    clearTimeout(long_time); // 清除老的定时器
    clearTimeout(long_time_self); // 清除老的定时器

    $("body").append('<div class="kd-alert-txt select-none" style="padding-left:15px;padding-right:15px;padding-bottom:10px;margin:auto;position: fixed;z-index: 9999900;left: 0;right: 0;width: 250px;line-height: 24px;text-align: center;top: 0;bottom: 0;font-size: 13px;color: white;height: 140px;background: transparent;overflow-y: hidden;"><div class="kd-toast-txt" id="kd-toast-txt" style="padding-top:7px;padding-bottom:8px;overflow:hidden;letter-spacing:2px;background: rgba(0,0,0,0.8);border: 1px solid grey;border-radius: 5px;max-height: 93px;color: white !important;">&nbsp;</div></div><div class="kd-alert-bg" style="position: fixed;z-index: 9999099;left: 0;top: 0;width: 100%;height:100%;background: rgba(0,0,0,0.1);"></div>');

    if (!time){
        time = 4000;
    }
    if(time === "long"){ // 超长时间提示
        time = 1000*60*30;
        var long_time = setTimeout(function () { // 定时执行，但是微信环境中，链接可能会被封杀，所以暂时没有回调

            common_log("alert_txt()时间设置超时>'long 1000*60*30'，但是并没有设置超时时的回调函数");
        }, time);
    }
    if(time >= 1000*60*25){
        var time_self = 1000*60*30;
        var long_time_self = setTimeout(function () { // 定时执行，但是微信环境中，链接可能会被封杀，所以暂时没有回调

            common_log("alert_txt()时间设置超时>1000*60*30，但是并没有设置超时时的回调函数");
        }, time_self);
    }
    if ( txt.trim() === ""){ // 扔出错误
        clearTimeout(kd_ST);
        alert_txt("系统报错：txt文字为空<br>txt is null", 5000);
        return;
    }

    setTimeout(function () {
        $(".kd-toast-txt").html(txt);
        //document.getElementById("kd-toast-txt").innerHTML = txt;
    },80);

    var kd_ST = setTimeout(function () {
        $(".kd-alert-txt").fadeOut(700).remove();
        $(".kd-alert-bg").remove();
        //_div.remove();
    }, time);

    if(call_func){
        call_func(); // 直接异步调用
    }else {
        common_log("alert_txt()没有设置回调函数");
    }

}


// cookie前缀 var cookie_pre = "le_";
// 示例：expiredays = 30 * 24 * 60 * 60 * 1000，30天
// 设置和更新cookie
// function setCookie(key, value, expiredays){
//     common_log("设置或更新cookie="+key+"="+value);
//     var exdate=new Date();
//     exdate.setDate(exdate.getDate()+expiredays);
//     document.cookie=key+ "=" +escape(value) + ((expiredays==null) ? "" : ";expires="+exdate.toGMTString());
// }
// // 读取cookie
// function getCookie(key){
//     common_log("读取cookie="+key);
//     if (document.cookie.length>0) {
//         c_start=document.cookie.indexOf(key + "=");
//         if (c_start!==-1){
//             c_start=c_start + key.length+1;
//             c_end=document.cookie.indexOf(";",c_start);
//             if (c_end===-1) c_end=document.cookie.length;
//             return unescape(document.cookie.substring(c_start,c_end));
//         }
//     }
//     return "";
// }

//写入cookies
// time = 1*24*60*60*1000;
function setCookie(name, value, time) {
    if (!time){
        time = 1*24*60*60*1000; // 默认1天
    }
    var exp = new Date();
    exp.setTime(exp.getTime() + time);
    document.cookie = name + "="+ escape (value) + ";expires=" + exp.toGMTString();
}
//读取cookies
function getCookie(name) {
    var arr,reg=new RegExp("(^| )"+name+"=([^;]*)(;|$)");
    if(arr=document.cookie.match(reg)){
        return unescape(arr[2]);
    } else{
        return null;
    }
}
//删除cookies
function delCookie(name) {
    var exp = new Date();
    exp.setTime(exp.getTime() - 1);
    var cval=getCookie(name);
    if(cval!=null) {
        document.cookie = name + "=" + cval + ";expires=" + exp.toGMTString();
    }
}




// 时间戳转日期
function timestampToTime(timestamp) {
    var date = new Date(timestamp * 1000);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
    Y = date.getFullYear() + '-';
    M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
    D = date.getDate() + ' ';
    h = date.getHours() + ':';
    m = date.getMinutes() + ':';
    s = date.getSeconds();
    return Y+M+D+h+m+s;
}


// 生成二维码，回调函数返回二维码地址，必要文件qrcode.js
function make_qr(content, width, call_func) {

    var _width = 200;

    if (!width){
        common_log("make_qr()没有设置宽，将默认200px");
    }else {
        _width = width;
    }
    if (!content){
        alert_txt("没有设置二维码内容");
    }
    var _height = _width;

    $.getScript(qr_js, function (e) {
        common_log("生成二维码");
        // 生成二维码
        // 二维码图位置<img class="qr-img" id="qr-img" />
        $("body").append('<div id="qrcode" class="qrcode" style="display: none;"></div>');
        var qrcode = new QRCode("qrcode", {
            text: content,
            width: _width,
            height: _height,
            colorDark : "#000000",
            colorLight : '#ffffff',
            correctLevel : QRCode.CorrectLevel.L
        });
        var qr_img_url = $(".qr-img").attr("src");
        if (!call_func){
            common_log("make_qr()无回调函数");
        }else {
            call_func(qr_img_url);
        }

    });

}


/*
* 求范围内的值，
*/
function js_rand(min, max) { // [min, max]
    var this_rand = Math.floor(Math.random()*(max-min+1)+min);
    common_log("范围内的随机值="+this_rand);
    return this_rand;
}



/*
* 将各个位数数字单独取出，范围[百亿--百分位]
*/
function select_number(number) {
    var _number = [];
    if (typeof number === "number"){

        // 正则方法
        // var num = 123456;
        // var numArr = num.split('');
        // //个位
        // var a = numArr[numArr.length-1];
        // //十位
        // var b = numArr[numArr.length-2];
        // //百位
        // var c = numArr[numArr.length-3];
        // //...以此类推

        var _eleven = Math.floor(number/10000000000     % 10); // 百亿
        var _ten    = Math.floor(number/1000000000      % 10); // 十亿
        var _nine   = Math.floor(number/100000000       % 10); // 亿
        var _eight  = Math.floor(number/10000000        % 10); // 千万
        var _seven  = Math.floor(number/1000000         % 10); // 百万
        var _six    = Math.floor(number/100000          % 10); // 十万
        var _five   = Math.floor(number/10000           % 10); // 万
        var _four   = Math.floor(number/1000            % 10); // 千
        var _three  = Math.floor(number/100             % 10); // 百
        var _two    = Math.floor(number/10              % 10); // 十
        var _one    = Math.floor(number                 % 10); // 个
        var __one   = Math.floor(number/0.1             % 10); // 十分位
        var __two   = Math.floor(number/0.01            % 10); // 百分位

        _number = [number,_eleven,_ten,_nine,_eight,_seven,_six,_five,_four,_three,_two,_one,__one,__two];
        common_log("范围[原数0-百亿1-个位11-百分位13]=="+_number+"=="+typeof _number+"==示例：个位[11]="+_number[11]);
        return _number;
    }else {
        common_log(typeof number);
        _number = [number,0,0,0,0,0,0,0,0,0,0,0,0,0];
        common_log("数据类型错误，不可解析，各个位默认返回=="+_number);
        return _number;
    }

}



/*
*
* num  要匹配的数
* dot  是否循环出小数点后dot位，dot=2取到个位，dot=1取到十分位，dot=0取到百分位
*
* */
function select_num(num, dot) {

    var num_array = select_number(num);

    if ( dot>2 || dot<0){ // dot取值异常时
        common_log("取小数点位数异常，dot范围：[0,2]");

        return;
    }else if(typeof dot !== "number"){
        common_log("将默认低位取到个位，dot=2");
        dot = 2;
    }

    var j_num_max = 0;
    for (let j=0;j<num_array.length;j++){

        var new_num_array = ["原数："+num, "取小数dot[dot=2个位，dot=1十分位，dot=0百分位]："+dot]; // 数组第一个位原数

        if(num_array[j+1]===0){
            common_log("从左到右，改位位0，跳过");
        }else { // 返回最高位
            j_num_max = j+1; // 返回最高位

            for (let m=j_num_max; m<num_array.length-dot; m++){ // 是否取出小数部分
                //common_log("各个位数="+num_array[m]);
                new_num_array.push(num_array[m]); // 向数组中添加新元素
            }
            common_log("匹配值="+new_num_array);
            return new_num_array;

            break; // 找到最高位即刻跳出循环
        }

    }

}




/*
* 获取当前时间的 日期、星期、时间戳(秒)、时间戳（毫秒）
* */
function getNowDate() {
    var timestamp = Date.parse(new Date())/1000; // 精确到秒的时间戳
    var date = new Date();
    var sign1 = "-";
    var sign2 = ":";
    var sign3 = "";
    var year = date.getFullYear();      // 年
    var month = date.getMonth() + 1;    // 月
    var day  = date.getDate();          // 日
    var hour = date.getHours();         // 时
    var minutes = date.getMinutes();    // 分
    var seconds = date.getSeconds();    // 秒
    var milli = date.getMilliseconds(); // 毫秒
    var weekArr = ['星期一', '星期二', '星期三', '星期四', '星期五', '星期六', '星期日'];
    var week = weekArr[date.getDay()-1];
    // 给一位数数据前面加 “0”
    if (month >= 1 && month <= 9) {
        month = "0" + month;
    }
    if (day >= 0 && day <= 9) {
        day = "0" + day;
    }
    if (hour >= 0 && hour <= 9) {
        hour = "0" + hour;
    }
    if (minutes >= 0 && minutes <= 9) {
        minutes = "0" + minutes;
    }
    if (seconds >= 0 && seconds <= 9) {
        seconds = "0" + seconds;
    }
    var currentdate = [
        year + sign3 + month + sign3 + day,
        hour + sign2 + minutes + sign2 + seconds,
        week,
        timestamp,
        time_milli(),
        year + sign3 + month + sign3 + day,
        year + sign1 + month + sign1 + day,
    ];
    common_log("当前时间[日期、星期、时间戳(秒)]数组："+currentdate);
    return currentdate;
}

/*
* 获取前几天的年月日
* n=0是今天，n=-1是昨天
* */
function getBeforeDate(n){
    var d = new Date();
    var year = d.getFullYear();
    var mon=d.getMonth()+1;
    var day=d.getDate();
    if(day <= n){
        if(mon>1) {
            mon=mon-1;
        }
        else {
            year = year-1;
            mon = 12;
        }
    }
    d.setDate(d.getDate()-n);
    year = d.getFullYear();
    mon=d.getMonth()+1;
    day=d.getDate();
    s = year+""+(mon<10?('0'+mon):mon)+""+(day<10?('0'+day):day);
    m = year+"-"+(mon<10?('0'+mon):mon)+"-"+(day<10?('0'+day):day);
    return [m, s];
}



/*
* 时间戳(毫秒)转日期，输入时间统一用秒，然后将毫秒转换成秒
* */
function formatDateTime(inputTime) {
    var s_time = inputTime*1000;
    var number = new Number(s_time); // 数字转字符串，以便计算长度
    if (number.toString().length < 10 || number.toString().length > 14){
        common_log("输入时间戳单位为秒，特此提醒。当前数字长度："+number.toString().length);
    }

    var date = new Date(s_time);
    var y = date.getFullYear();
    var m = date.getMonth() + 1;
    m = m < 10 ? ('0' + m) : m;
    var d = date.getDate();
    d = d < 10 ? ('0' + d) : d;
    var h = date.getHours();
    h = h < 10 ? ('0' + h) : h;
    var minute = date.getMinutes();
    var second = date.getSeconds();
    minute = minute < 10 ? ('0' + minute) : minute;
    second = second < 10 ? ('0' + second) : second;

    var currentdate = [y+'-'+m+'-'+d, h+':'+minute+':'+second];
    common_log("时间戳 转 日期数组："+currentdate);
    return  currentdate;
}




/*
*
* 浏览器设备运动事件（摇一摇、加速运动等）
* 浏览器兼容性：Android（全）、iOS（全）运行正常
* 文档：https://developer.mozilla.org/zh-CN/docs/Web/API/DeviceMotionEvent
*
* call_func  回调函数，此回调函数不能携带参数，提前写带参数会造成device函数不能运行
* during  范围[20ms, 3000ms] 。设置默认时间段内回调一次，单位xx ms/次，默认500ms。
*
* 例：function kd_func() { // 回调函数
        common_log("123");
        alert_txt("123");
     }
     device_motion(kd_func, 500); // 调用主函数
*
* */
var SHAKE_THRESHOLD = 1000; // 默认动作时间差
var last_update = 0;
var last_time = 0;
var x;
var y;
var z;
var last_x;
var last_y;
var last_z;
var curTime;
var isShakeble = true; // 调试
function device_motion(call_func, during) {

    if(!during){
        during = 500;
    }else if(during<20){
        during = 20;
    }else if(during>3000){
        during = 3000;
    }
    var first_time = new Date().getTime();

    if (window.DeviceMotionEvent) {
        window.addEventListener('devicemotion', function (ev) {

            curTime = new Date().getTime();
            var diffTime = curTime - last_update;
            if (diffTime > 100) {
                var acceleration = ev.accelerationIncludingGravity;
                last_update = curTime;
                x = acceleration.x;
                y = acceleration.y;
                z = acceleration.z;
                var speed = Math.abs(x + y + z - last_x - last_y - last_z) / diffTime * 10000;

                if (speed > SHAKE_THRESHOLD && curTime - last_time > 1100 && isShakeble) {
                    common_log("该设备有加速事件，开始执行回调函数");
                    // 处理回调函数
                    if(call_func){
                        var cur_time = new Date().getTime();
                        if(Math.abs(first_time-cur_time) >= during){
                            common_log("调用了回调函数");
                            first_time = new Date().getTime(); // 初始化
                            call_func(); // 调用函数。此回调函数不能携带参数，提前写带参数会造成device函数不能运行
                        }else {
                            common_log("由于时间段限制，跳过了回调函数");
                        }

                    }else {
                        common_log("该设备加速有效，但是没有指定回调函数。");
                    }
                }
                last_x = x;
                last_y = y;
                last_z = z;
            }

        }, false);
        common_log("该设备支持位置和方向改变的速度，下一步，请让设备（浏览器）加速运动（摇一下设备）起来。");
    } else {
        common_log("该设备（浏览器）不支持运动属性");
        alert_txt("该设备（浏览器）不支持加速运动属性");
    }

}

/*
    * msg_func_ok(函数操作标识)，需要coder使用时拿出来
    * msg_func_close(函数操作标识)，不需要自定义
    * alert_msg(标题，内容描述或其它标签内容，按钮文字，函数操作标识[多个msg时区分各自操作])，不需要自定义
    * 注意：this_func参数指的是标识数字或者标识字符串，并不是函数
    * */

/*
function msg_func_ok(this_func) { // msg确定按钮 ，示例
    common_log("msg_ok标识="+this_func);

    switch(this_func){
        case 1:
            run_test1();
            break;
        case 8:
            run_test8();
            break;
        default:
            common_log("发现未知操作标识="+this_func);
    }

}
function  msg_func_close_call(this_func){
    common_log("关闭msg的回调函数，如果没有，报错可以忽略。");

}
*/

function msg_func_close(this_func) { // 关闭msg提示
    common_log("msg_close标识="+this_func);

    $(".kd-alert-msg-div-"+this_func).remove();
    $(".kd-alert-msg-bg-"+this_func).remove();

    msg_func_close_call(this_func);

}
function alert_msg(title, content, btn_txt, this_func) { // 渲染msg

    // 校验msg_func_ok()函数方法是否存在，因为这个是自定义函数
    try {

        if(typeof msg_func_ok === "function") { //是函数 ，其中 msg_func_ok 为函数名称
            common_log("msg_func_ok(this_func)函数方法存在");
        } else { //不是函数
            common_log("msg_func_ok(this_func)函数方法不存在，将无法完成msg_func_ok按钮的调用");
            //alert_txt("msg_func_ok(this_func)函数方法不存在，将无法完成msg_func_ok按钮的调用");
        }

        if(typeof msg_func_close_call === "function") { //是函数 ，其中 msg_func_ok 为函数名称
            common_log("msg_func_close_call(this_func)函数方法存在");
        } else { //不是函数
            common_log("msg_func_close_call(this_func)函数方法不存在，不过这只是一个回调函数，可以忽略报错");
            //alert_txt("msg_func_ok(this_func)函数方法不存在，将无法完成msg_func_ok按钮的调用");
        }

    } catch(e) {
        common_log("alert_msg(title, content, btn_txt, this_func)未知异常="+e);
    }

    // 校验出现多个alert_msg()函数调用时，实现各自控制各自
    if(!this_func){
        var timestamp = Date.parse(new Date())/1000; // 精确到秒的时间戳
        this_func = timestamp;
        common_log("没有设置this_func的区别标识，将默认为="+this_func);
    }

    // 校验必要参数
    if(!title || !content || !btn_txt){
        common_log("alert_msg参数不完整，this_func="+this_func);
        //alert_txt("alert_msg参数不完整，this_func="+this_func);
        return;
    }

    $("body").append('<div id="kd-alert-msg-bg select-none" class="kd-alert-msg-bg kd-alert-msg-bg-'+this_func+'" style="position: fixed;z-index: 9998000;width: 100%;height: 100%;background: rgba(0,0,0,0.6);top: 0;left: 0;"></div><div id="kd-alert-msg-div select-none" class="kd-alert-msg-div kd-alert-msg-div-'+this_func+'" style="width: 80%;max-width: 420px !important;position: fixed;z-index: 9999000;left: 0;right: 0;top: 0;bottom: 0;height: 360px;margin: auto;"><div id="kd-alert-msg" class="kd-alert-msg kd-alert-msg-'+this_func+'" style="padding-bottom: 10px;background: rgba(255,255,255,0.9);border:2px solid #EED5D2;border-radius: 3px;"><div style="padding: 8px 0 0 0;position: relative;padding-left: 10px;padding-right: 10px;"><div id="alert-msg-title" class="alert-msg-title alert-msg-title-'+this_func+'" style="width: 100%;font-size: 16px;color: #2F4F4F;border-bottom: 1px solid #EED5D2;padding-bottom: 10px;"><div id="alert-msg-title-text" class="alert-msg-title-text alert-msg-title-text-'+this_func+' " style="width: calc(100% - 40px);overflow-x: hidden;letter-spacing: 1px;overflow-y: hidden;white-space: nowrap;font-weight: 700;">提示</div></div><div id="alert-msg-title-close" class="alert-msg-title-close alert-msg-title-close-'+this_func+' click" style="position: absolute;right: 0;top: 0;font-size: 16px;padding-right: 15px;padding-top: -10px;padding-left: 20px;line-height: 38px;cursor: pointer;" onclick="msg_func_close('+this_func+')">X</div></div><div class="alert-msg-content alert-msg-content-'+this_func+'" style="padding-left: 15px;padding-right: 15px;padding-top: 2px;padding-bottom: 10px;line-height: 24px;font-size: 14px;letter-spacing: 1px;color: black;font-weight: 600;max-height: 200px;overflow-y: scroll;overflow-x: hidden;;min-height:50px">······</div><div style="padding-top: 10px;padding-bottom: 1px;text-align: center;"><div id="alert-msg-btn-ok" class=" alert-msg-btn-ok  alert-msg-btn-ok-'+this_func+'" style="padding: 8px 25px;border-radius: 5px;background: #009ACD;color: white;font-size: 14px;display: inline-block;letter-spacing: 2px;cursor: pointer;" onclick="msg_func_ok('+this_func+')">···</div></div></div></div>');

    $(".alert-msg-title-text-"+this_func).html(title);
    $(".alert-msg-content-"+this_func).html(content);
    $(".alert-msg-btn-ok-"+this_func).html(btn_txt)

}

var alert_msg_border = 1;
try{
    //kd-alert-msg-div
    $(document).on("click", ".kd-alert-msg-bg", function (e) {
        common_log("on");
        if(alert_msg_border === 1){
            $(".kd-alert-msg").css("border", "2px solid #7B68EE");
            alert_msg_border = 2;
        }else {
            $(".kd-alert-msg").css("border", "2px solid #3CB371");
            alert_msg_border = 1;
        }
    });

    $(document).on("click", ".kd-alert-msg-div", function (e) {
        common_log("on");
        if(alert_msg_border === 1){
            $(".kd-alert-msg").css("border", "2px solid #CDCD00");
            alert_msg_border = 2;
        }else {
            $(".kd-alert-msg").css("border", "2px solid #CD3700");
            alert_msg_border = 1;
        }
    });

    //alert_msg("提示", "这是内容1", "确定", 1);
    //alert_msg("提示", "这是内容2","确定", 8);
    //alert_msg("提示", "这是内容3","确定");
    //alert_msg("提示", "这是内容4","确定");

}catch (err){
    common_log(err);
}






/*
* 基于jQ
* get请求封装
* void
* get_api_url get接口
* call_func 回调函数
*
* */
function get_func(get_api_url, call_func) {

    $.getJSON(get_api_url, function(data, status){
        common_log("get返回数据：" + data+"；status："+status+"；返回数据的类型："+typeof data);

        if(status === "success"){

            if(!call_func){
                common_log("回调函数为必填！否则无法异步返回结果");
            }else {
                call_func(data); // 异步得到结果
            }

        }else{
            common_log("请求错误，检查后台get方法");
            alert_txt("请求错误或者网络不通");
        }

    });

}

/*
* 基于jQ
* post请求封装
* void
* post_url_api 接口
* dataObj 数据
* call_func 回调函数
* */
function post_func(post_url_api, dataObj, call_func) {

    var post_url = post_url_api;
    var obj = dataObj;

    // 请求数据
    $.ajax({
        url: post_url,
        type: "POST",
        dataType: "json", // 已经默认json
        async: true, // 已经默认true
        data: obj, // dataObj为Object类型: {nickname: "name",}
        success: function(data, status){
            common_log("post返回数据：" + data+"；status："+status+"；返回数据的类型："+typeof data);

            // 确保返回数据是object类型
            if(typeof data === "string"){
                datas = JSON.parse(data); // json字符串转换成json对象
            }else {
                datas = data;
            }

            if(!call_func){
                common_log("回调函数为必填！否则无法异步返回结果");
            }else {
                call_func(datas); // 异步得到结果
            }
        },
        error: function (xhr) {
            console.log(xhr);
            alert_txt("接口请求错误或者网络不通");
        }

    });

}



/*
*
* 基于ES，或者原生js
* get请求封装
*
* */
function get_api(get_api_url, call_func) {
    //请求数据库存在的用户信息
    var url = get_api_url;
    var ajax_get = function(url) {
        return new Promise(function(resolve2, reject) {
            var r = new XMLHttpRequest();
            r.open("GET", url, true);
            r.onreadystatechange = function () {
                if (r.readyState !== 4 || r.status !== 200) return;

                var data = r.responseText;
                resolve2(data);

                // 确保返回数据是object类型
                if(typeof data === "string"){
                    datas = JSON.parse(data); // json字符串转换成json对象
                }else{
                    datas = data;
                }

                if(!call_func){
                    common_log("回调函数为必填！否则无法异步返回结果");
                }else {
                    call_func(datas); // 异步得到结果
                }

            };
            r.send();
        })
    };

    ajax_get(url);

}


/*
*
* 基于ES，或者原生js
* post请求封装
* 貌似不能上传大于2M的base64，原因未知
*
* */
function post_api(post_api_url, dataObj, call_func) {

    var url = post_api_url;
    var obj = dataObj; // object类型: {nickname: "name",}

    fetch(url,{
        method:"POST",
        mode: "cors", // 允许跨域
        headers:{
            "Content-type":"application/x-www-form-urlencoded; charset=UTF-8"
        },
        body: JSON.stringify(obj)
    })
        .then(function (response){
            common_log(response);
        })
        .then(function(data){
            common_log("fetch请求成功，响应数据为:", data);

            // 确保返回数据是object类型
            if(typeof data === "string"){
                datas = JSON.parse(data); // json字符串转换成json对象
            }else{
                datas = data;
            }

            if(!call_func){
                common_log("回调函数为必填！否则无法异步返回结果");
            }else {
                call_func(datas); // 异步得到结果
            }
        })
        .catch(function(err){
            common_log("Fetch错误:"+err);
            alert_txt("接口请求错误或者网络不通");
        });

}


/*
 *
 * base64编码语解码
 *  Base64 encode / decode
 *  文档：https://blog.csdn.net/u011127019/article/details/51673230
 *
 */

function Base64() {

    // private property
    _keyStr = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";

    // public method for encoding
    this.encode = function (input) {
        var output = "";
        var chr1, chr2, chr3, enc1, enc2, enc3, enc4;
        var i = 0;
        input = _utf8_encode(input);
        while (i < input.length) {
            chr1 = input.charCodeAt(i++);
            chr2 = input.charCodeAt(i++);
            chr3 = input.charCodeAt(i++);
            enc1 = chr1 >> 2;
            enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
            enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
            enc4 = chr3 & 63;
            if (isNaN(chr2)) {
                enc3 = enc4 = 64;
            } else if (isNaN(chr3)) {
                enc4 = 64;
            }
            output = output +
                _keyStr.charAt(enc1) + _keyStr.charAt(enc2) +
                _keyStr.charAt(enc3) + _keyStr.charAt(enc4);
        }
        return output;
    }

    // public method for decoding
    this.decode = function (input) {
        var output = "";
        var chr1, chr2, chr3;
        var enc1, enc2, enc3, enc4;
        var i = 0;
        input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");
        while (i < input.length) {
            enc1 = _keyStr.indexOf(input.charAt(i++));
            enc2 = _keyStr.indexOf(input.charAt(i++));
            enc3 = _keyStr.indexOf(input.charAt(i++));
            enc4 = _keyStr.indexOf(input.charAt(i++));
            chr1 = (enc1 << 2) | (enc2 >> 4);
            chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
            chr3 = ((enc3 & 3) << 6) | enc4;
            output = output + String.fromCharCode(chr1);
            if (enc3 != 64) {
                output = output + String.fromCharCode(chr2);
            }
            if (enc4 != 64) {
                output = output + String.fromCharCode(chr3);
            }
        }
        output = _utf8_decode(output);
        return output;
    }

    // private method for UTF-8 encoding
    _utf8_encode = function (string) {
        string = string.replace(/\r\n/g,"\n");
        var utftext = "";
        for (let n = 0; n < string.length; n++) {
            var c = string.charCodeAt(n);
            if (c < 128) {
                utftext += String.fromCharCode(c);
            } else if((c > 127) && (c < 2048)) {
                utftext += String.fromCharCode((c >> 6) | 192);
                utftext += String.fromCharCode((c & 63) | 128);
            } else {
                utftext += String.fromCharCode((c >> 12) | 224);
                utftext += String.fromCharCode(((c >> 6) & 63) | 128);
                utftext += String.fromCharCode((c & 63) | 128);
            }

        }
        return utftext;
    }

    // private method for UTF-8 decoding
    _utf8_decode = function (utftext) {
        var string = "";
        var i = 0;
        var c = c1 = c2 = 0;
        while ( i < utftext.length ) {
            c = utftext.charCodeAt(i);
            if (c < 128) {
                string += String.fromCharCode(c);
                i++;
            } else if((c > 191) && (c < 224)) {
                c2 = utftext.charCodeAt(i+1);
                string += String.fromCharCode(((c & 31) << 6) | (c2 & 63));
                i += 2;
            } else {
                c2 = utftext.charCodeAt(i+1);
                c3 = utftext.charCodeAt(i+2);
                string += String.fromCharCode(((c & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));
                i += 3;
            }
        }
        return string;
    }
}
var base = new Base64();
//1.加密
// var str = '124内容';
// var result = base.encode(str);
// //2.解密
// var result2 = base.decode(result);

// base64加密
function js_base64_encode(string) {
    var result = base.encode(string);
    common_log("js_base64加密结果="+result);
    return result;
}
// base64解密，默认1次解密
var js_base64_j = 1;
function js_base64_decode(result){
    var string = base.decode(result);
    common_log("js_base64解密（第"+js_base64_j+"次解密）="+string);
    js_base64_j++;
    return string;
}



/*
*
* 处理图片
* 在img标签中加入class="img-select-cell"即可完成
*
* */
var img_src = ""; // 当前图片地址
try {

    $(document).on("click", ".img-select-cell", function (e) { // 消除append()带来的不可点击
        var that = $(this);
        img_src = that.attr("src");
        var timestamp = Date.parse(new Date())/1000; // 精确到秒的时间戳

        $("body").append('<div class="select-none img-select-cell-bg" onclick="img_select_bg(1)" style="position: fixed;left: 0;top: 0; z-index: 998500;background: rgba(0,0,0,0.5);width: 100%;height: 100%;"></div>' +
            '<div class="img-select-cell-div pc-width-780 select-none" style="width: 280px;margin-left: auto;margin-right: auto;position: fixed;z-index: 998700;left: 0;right: 0;bottom: 0;min-height: 100px;"><div style="margin-bottom: 10px;">' +
            '<div class="img-select-cell-item-show" style="height: 45px;line-height: 45px;text-align: center;font-size: 14px;white-space: nowrap;overflow: hidden;letter-spacing: 1px;color: #363636;font-weight: 600;margin-bottom: 1px;background: white;border-radius: 3px;">查看大图</div>' +
            '<div class="img-select-cell-item img-select-down" style="height: 45px;line-height: 45px;text-align: center;font-size: 14px;white-space: nowrap;overflow: hidden;letter-spacing: 1px;color: #363636;font-weight: 600;margin-bottom: 1px;background: white;border-radius: 3px;">截取图片</div>' +
            '<div class="img-select-cell-item img-select-download-this" style="height: 45px;line-height: 45px;text-align: center;font-size: 14px;white-space: nowrap;overflow: hidden;letter-spacing: 1px;color: #363636;font-weight: 600;margin-bottom: 1px;background: white;border-radius: 3px;">保存图片</div>' +
            '</div><div class="img-select-cell-close click hover" style="height: 45px;line-height: 45px;text-align: center;font-size: 14px;white-space: nowrap;overflow: hidden;letter-spacing: 3px;color: #4876FF;font-weight: 600;margin-bottom: 70px;background: white;border-radius: 5px;" onclick="img_select_bg(2)">取消</div></div>');

    });
    $(document).on("click", ".img-select-down", function (e) {
        //common_log("down");
        if(!img_src){
            alert_txt("没有图片地址，不能下载");
            return;
        }
        // window.open(img_src);
        window.location.href=img_src;
        setTimeout(function () {
            img_select_bg(4);
        }, 500)
    });

    $(document).on("click", ".img-select-download-this", function (e) {
        //common_log("down");
        if(!img_src){
            alert_txt("没有图片地址，不能下载");
            return;
        }
        downloadIamge(".img-select-download-this", "img-name", img_src);
        setTimeout(function () {
            img_select_bg(4);
        }, 500)
    });

    $(document).on("click", ".img-select-cell-item-show", function (e) {
        if(!img_src){
            alert_txt("没有图片地址，不能查看大图");
            return;
        }
        show_img(img_src, "", "", "hide");

        img_select_bg(5);

    });


} catch (err){
    common_log(err);
}

function img_select_bg(num) { // 关闭图层操作
    common_log("关闭select-cell="+num);
    $(".img-select-cell-div").remove();
    $(".img-select-cell-bg").slideUp(50);
    setTimeout(function () {
        // $(".img-select-cell-div").remove();
        $(".img-select-cell-bg").remove();
    }, 50)

}

// 下载图片
function downloadIamge(selector, name, url) {
    alert_txt("正在保存");
    // 通过选择器获取img元素，
    var img = document.querySelector(selector);
    // 将图片的src属性作为URL地址
    var _url = url;
    var a = document.createElement("a");
    var event = new MouseEvent('click');

    a.download = name;
    a.href = _url;

    a.dispatchEvent(event);
}


/*
*
* md5加密:
* js_md5(要加密的字符串； 输出是否为大写，A或者1)
* string 要加密的
* toUpperCase 是否大小写
* call_func 回调函数
* */
var md5_res = "";
function js_md5(string, toUpperCase, call_func) {

    $.getScript(md5_url,function (e) {
        //common_log("md5.js自动引用成功");
        md5_res = hex_md5(string);
        if(toUpperCase === "A" || toUpperCase === 1){ // 大写转换
            md5_res = md5_res.toUpperCase();
        }

        common_log("js_md5方法加密结果="+md5_res);

        if(!call_func){
            common_log("js_md5()无回调函数");
        }else {
            call_func(md5_res);
        }
    });
}

// function md5_log(this_md5){
//     console.log(this_md5);
// }
// js_md5("123", "", md5_log);



/*
* 判断是否是微信浏览器的函数
* status: "on"，"off"
* jump_url: 跳转的url，为空值时执行回调函数，不为空时执行跳转操作
* call_func: 回调函数
* 传递参数：提示语
* 场景值weixin_res：
*   1  是微信浏览器，然后执行任何操作；
*   0   不是微信浏览器但不执行任何操作；
*   -1  不是微信浏览器，要执行某个操作；
*   2   不是微信浏览器，错误操作，要执行某个操作。
*
* */
function user_weixin(status, jump_url, call_func, data){

    var ua = window.navigator.userAgent.toLowerCase();
    var weixin_res = 0; // 场景值
    //通过正则表达式匹配ua中是否含有MicroMessenger字符串
    if(ua.match(/MicroMessenger/i) === "micromessenger"){
        common_log("is weixin");
        weixin_res = 1;
    }else{

        if(jump_url === ""){

            if (status === "on"){
                common_log("not weixin，on");
                weixin_res = -1;
            }else if (status === "off"){
                common_log("not weixin，off");
                weixin_res = 0;
            }else{
                common_log("user_weixin()约定参数不正确1");
                weixin_res = 2;
            }

            if(!call_func){
                common_log("call_func参数为空");
            }else {
                call_func(weixin_res, data);
            }

        }else{ // 有jump_url代表需要立即执行跳转操作，并不需要任何回调
            if (status === "on"){
                common_log("not weixin，on");

            }else if (status === "off"){
                common_log("not weixin，off");
                return;
            }else{
                common_log("user_weixin()约定参数不正确2");
                return;
            }
            window.location.replace(jump_url);
        }

    }

}


/*
*
* 判断设备类型
* Android、iOS、PC
*   android_func(1)  android回调函数
*   ios_func(2)   ios回调函数
*   pc_func(3)   pc回调函数
*   data  传入参数
*
* */
function user_device(device_func, data){

    var datas = data; // 携参

    var u = navigator.userAgent;
    var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
    var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
    if (isAndroid === true || isiOS === false){ // android
        console.log("Android");

        device_func(1, datas);
    }else if(isAndroid === false || isiOS === true){ // ios
        console.log("iOS");

        device_func(2, datas);
    }else { // pc
        console.log("PC");

        device_func(3, datas);
    }

}


/*
* void
* 获取用户的地址和IP，回调函数返回信息数组
* 使用方法：
*   call_func(user_addr); // 成功时的回调函数，将参数返回window，解决一部问题
*   页面载入时就要引用user_address()，请调用全局变量user_addr=，若出现数组为空，请使用window.onload = function(e){ user_addr= };
* */
var user_addr = [];
function user_address(call_func) {
    $.getScript(souhu_address, function (e) {
        var user_ip = returnCitySN["cip"]; // ip
        var user_city = returnCitySN["cname"]; // 省市
        var user_time = Date.parse(new Date())/1000; // 精确到秒的时间戳
        user_addr = [user_ip, user_city, user_time];

        js_typeof(user_addr); // 显示数据类型
        common_log("页面载入时就要引用user_address()，请调用全局变量user_addr="+user_addr);
        //return user_addr;

        if(!call_func){
            common_log("无回调函数将结果转发出来，请注意异步问题");
        }else {
            call_func(user_addr); // 成功时的回调函数，将参数返回window，解决一部问题
        }

    });
}
// function user_address_log(this_addr){
//     console.log(this_addr);
// }
// user_address(user_address_log);



/*
*
* 页面刷新次数安全校验，利用cookie
* max_num最大刷新次数
* jump_url超过最大刷新次数时的跳转地址，一般为404页
* */
//var common_cookie_pre = "refresh_page_number_";

function refresh_check(max_num, common_cookie_pre, jump_url) {

    var _jump_url = jump_url;
    var _max_num = max_num;
    var _common_cookie_pre = common_cookie_pre;
    if(!_common_cookie_pre){
        _common_cookie_pre = "refresh_page_number_";
    }
    if(!_jump_url){
        _jump_url = "https://m.sogou.com/404";
    }
    if(_max_num < 3){
        common_log("页面最大访问数有误，不能<=2");
        _max_num = 3;
    }

    var _time = 2*24*3600000;

    var max_num_i = getCookie(_common_cookie_pre+"jump_num")*1; // string 转 number

    if(!max_num_i){
        max_num_i = 1;
    }else {
        max_num_i +=1;
    }

    if(navigator.cookieEnabled !== true){ // 不支持cookie时直接跳转走
        window.location.replace(_jump_url);
    }else {

        if(max_num_i > _max_num){

            setTimeout(function () {
                window.location.replace(_jump_url);
            }, 2000);

        }else {
            setCookie(common_cookie_pre+"jump_num", max_num_i, _time);
        }
    }

}
//refresh_check(1000, "kd_", "");


/*
* 批量写入css CDN链接
* 利用时间戳自动消除css缓存
* */
function add_css(_cdn_css){
    var html_css = _cdn_css;
    if (typeof(_cdn_css) === "undefined"){
        common_log("css的CDN，_cdn_css=[];未定义");
        return;
    }
    if(js_typeof(html_css) === "array"){
        for (let css_i=0; css_i < html_css.length; css_i++) {
            if (!html_css[css_i]){
                common_log("css_null");
                break; // 遇到错误，直接跳出，不用再执行
            }else{$("head").append('<link rel="stylesheet" class="html-css"   href="'+ html_css[css_i] +'?'+time_milli()+'" />'); }
        }
    }else{
        common_log(js_typeof(html_css));
    }
}
// var cdn_css = [ // css CDN
//     "",
// ];
//add_css(cdn_css);


function show_loading() { // 显示加载动画
    $(".content").append('<div id="app-loading" class="app-loading flex-center"><div class="loading-icon"></div></div>')
    $(".app-loading").css("background", "rgba(0, 0, 0, 0.1)");
}

function delete_loading() { // 删除加载动画
    $(".app-loading").remove();
}

/*
* 长按事件
* long_press(_id, call_func)
* */
function long_press(_id, call_func){
    let timer = null;
    _id.addEventListener("touchstart",function(){
        timer = setTimeout(function () {
            call_func(_id);
        },1200); // 定义长按时间
    });
    _id.addEventListener("touchend",function(){
        clearTimeout(timer);
    });
}
// long_press(_id, test_func);
// function  test_func(){
//
// }


/*
* 处理触摸手势
* swipe_touch(_id)
* 调用swipe_touch(document.getElementById("test"));开启该区域触摸事件
* 使用function touch_data(data){console.log(data);}取出该区域触摸参数
* */
function swipe_touch(_id, call_func, long){

    if (long === "long"){
        long_press(_id, call_func);
        return;
    }

    let startx;
    let endx;
    let starty;
    let endy;
    function _touch_cons(){
        let dir_x = "center_x";
        let dir_y = "center_y";
        if(startx > endx){dir_x = "left";}else if(startx < endx){dir_x = "right";}
        if(starty > endy){dir_y = "up";}else if(starty < endy){dir_y = "down";}
        let _data = {
            "dir_x": dir_x,
            "x1" : Math.floor(startx),
            "x2" : Math.floor(endx),
            "dir_y": dir_y,
            "y1" : Math.floor(starty),
            "y2" : Math.floor(endy),
            "id" : _id,
        };
        if (!call_func){
            try{
                touch_data(_data);
            }catch (e) {
                // 必选日志打印
                console.info("请使用function touch_data(data){console.log(data);}取出该区域触摸参数");
            }
        }else {
            call_func(_data);
        }
    }
    _id.addEventListener("touchstart",function(e){
        let touch=e.changedTouches;
        startx=touch[0].clientX;
        starty=touch[0].clientY;
    });
    _id.addEventListener("touchend",function(e){
        let touch=e.changedTouches;
        endx=touch[0].clientX;
        endy=touch[0].clientY;
        _touch_cons();
    });
}
// function touch_data(data) {
//     console.log(data);
//
// }



/*
* 实现自定义的N次连续点击
* many_click(_click_num, call_func)
* 必填：_click_num 点击次数 [1, 10]
* 必填：call_func 回调函数
* 选填：_id 是长按手势传入的目标标签id
* */
let click_before_time = 0;
let click_num = 0;
function many_click(_click_num, call_func, _id){
    if (!call_func){console.info("many_click(_click_num, call_func)无回调函数"); return;}
    if (_click_num === "long"){ /*实现长按*/
        if(!_id){console.info("_id为必填。many_click('long', call_func, _id)"); return;}
        long_press(_id, call_func);
        return;
    }
    // 安全校验
    if (typeof _click_num !== "number"){ console.info("many_click(_click_num, call_func)的点击次数为number类型"); return; }
    // 处理click_num的新值情况
    if(click_num === 0){
        click_num = _click_num;
    }else {
        if (click_num < 1 || click_num > 10){ click_num = 1; } /*只准1击至10击，其他情况默认1击*/
    }
    // 处理点击之时差
    let click_time = Date.parse(new Date())+(new Date()).getMilliseconds(); // 毫秒时间戳
    if( (click_time - click_before_time) < 400 ){ // 下一次点击是否成功
        click_before_time = Date.parse(new Date())+(new Date()).getMilliseconds(); click_num--;
    }else{ // 第一次点击
        click_before_time = Date.parse(new Date())+(new Date()).getMilliseconds();
        if(click_num < _click_num){ /*清除历史不成功点击的参数*/
            click_num = _click_num;
        }
    }
    // N次成功点击后启用回调函数，并初始化click_num
    if (click_num === 1){
        call_func(_id, "回调函数不需要传参"); click_num = 0; /*初始化点击次数*/
    }
}

/*
* 双击
* */
function two_click(call_func) {
    many_click(2, call_func);
}
/*
* 三击
* */
function three_click(call_func) {
    many_click(3, call_func);
}


/*
* 判断是否是小数（最多可到小数点后15位）或者整数
* */
function js_float(_number){
    number = _number*1;
    var patten = /^-?\d+\.?\d{0,15}$/; // 最多保留到小数点后15位
    if (patten.test(number) === false){
        return false; // 不是小数或小数后面超15位
    }else{
        if (Math.round(number) === number){
            return 1; // 是整数
        }else {
            return true; // 是小数
        }
    }
}



// js数组去重
function js_array_unique(array) {
    var temp = [];
    for(var i = 0; i < array.length; i++){
        if(temp.indexOf(array[i]) == -1){
            temp.push(array[i]);
        }
    }
    return temp;
}


// 鼠标悬浮文字提醒
// (选择器，描述文字， 消失时间s)
// mouse_txt("selector", "txt", 3000);
function mouse_txt(selector, txt, time) {

    let that_selector = selector; // 需要悬浮提醒的标签的class
    let hover_txt = txt; // 提示文字
    let hide_time = time; // 提示消失时间

    if($( that_selector).length === 0){
        //console.log("selector='"+ that_selector+"'的标签未发现，请添加该selector");
        return;
    }

    if (hide_time === ""){
        hide_time = "long"; // 无时间则不消失
    }

    let time_num = 0;

    let e_x = 0; // 鼠标x坐标
    let e_y = 0; // 鼠标y坐标
    $(document).on("mouseenter", that_selector, function (e) {
        // 鼠标x坐标e.pageX
        // 鼠标y坐标e.pageY
        let that = $(this);
        let that_width = that.width();
        let that_height = that.height();
        let w_width = window.innerWidth;
        e_x = e.pageX + 20;
        e_y = e.pageY + 20;

        console_log([e_x, e_y]);

        that.append('<div class="hover-txt-div mouse-hover" style="position: fixed;top: 50px;z-index: 9999000;display: inline-block;background: rgba(0, 0, 0, 0.6);height: 27px;line-height: 27px;padding: 0 10px;font-size: 13px !important; font-weight: 500 !important;border: 1px solid grey;border-radius: 3px;letter-spacing: 1px;color: white;word-wrap: break-word;overflow: hidden;">'+ hover_txt +'</div>');
        // that.css({"position": "relative", "z-index": "9990000"});

        // 处理tip在最右边显示不全的问题
        let tip_width = $(".hover-txt-div").width();
        common_log([e_x, tip_width, w_width]);
        if (tip_width-100 < w_width){
            if (e_x+tip_width > w_width){
                e_x = e_x-tip_width-50;
            }
        }

        $(".hover-txt-div").css({"left": e_x+"px", "top": e_y+"px"});

        if (typeof hide_time === "number") {
            clearTimeout(time_num);
            time_num = setTimeout(function () {
                $(".hover-txt-div").hide(300);
                setTimeout(function () {
                    $(".hover-txt-div").remove();
                },300);
            }, hide_time);
        }

    });

    $(document).on("mouseleave", that_selector, function (e) {
        let that = $(this);
        e_x = 0;
        e_y = 0;

        // that.css({"position": "initial", "z-index": "initial"});
        $(".hover-txt-div").remove();
    });

}



function make_notice(_json, _show_time) {


    if (document.getElementsByClassName("kd-notice-div").length === 0) {
        $("body").append('<div class="kd-notice-div"><div class="kd-notice-content"></div></div>');
    }

    let json = _json;
    let show_time = _show_time?_show_time:3000; // ms

    for (let i=0; i<json.length; i++){
        let time = i*1500;
        setTimeout(function () {
            let clear = new Date().getTime(); // 微秒时间戳标记不同的div
            $(".kd-notice-content").before('<div class="kd-notice-cell clear-'+ clear +'">' +
                json[i]["msg"] +
                '<div class="kd-notice-close">X</div>' +
                '</div>');
            $(".clear-"+clear).animate({marginTop: 0}, 800, function () {
                setTimeout(function () {
                    $(".clear-"+clear).animate({marginTop: -($(".clear-"+clear).height()+16)}, 800, function () {
                        $(".clear-"+clear).remove();
                    });
                }, show_time);
            });
        }, time);
    }
}
$(document).on("click", ".kd-notice-close", function () {
    let that = $(this);
    that.parent().slideUp(300);
});

// (function () {
//     mouse_txt(".hover-test1", "hover-test1");
//     mouse_txt("td", "hover-test2", 3000);
// })();





/*
* 利用js将上万条数据导出到Excel，解决数据量大卡顿和导不出的问题
*
* 1. html标签：<table id="backViewTable">（thead、tbody、th、tr、td等内容）</table>
* 2. 调用：mix_excel("测试生成Excel", "backViewTable");
*
* */
let excel_blob;
function make_excel_html(table_id) { // 生成Excel-html节点
    console.log("table_id="+ table_id +"，正在生成Excel-html节点..");

    let _table = document.getElementById(table_id);

    // 设置边框
    _table.setAttribute("border", "1");
    _table.setAttribute("cellspacing", "0");
    _table.setAttribute("cellpadding", "0");

    // 使用outerHTML属性获取整个table元素的HTML代码（包括<table>标签），然后包装成一个完整的HTML文档
    // 设置charset为urf-8以防止中文乱码
    let html = '<html><head><meta charset="utf-8" /></head><body>' + document.getElementById(table_id).outerHTML + '</body></html>';
    // 实例化一个Blob对象，其构造函数的第一个参数是包含文件内容的数组，第二个参数是包含文件类型属性的对象
    excel_blob = new Blob([html], { type: "application/vnd.ms-excel" });

    // 生成a标签
    let _a = '<a class="out-excel-a" id="out-excel-a" style="display: none;">点击导出表格</a>';
    let _div = document.createElement("div");
    _div.innerHTML = _a;
    _table.insertBefore(_div, null);

    console.log(excel_blob);
}
function download_excel_file(name, call_func) { // 下载
    console.log("正在下载Excel...");

    if (name === ""){
        name = "导出Excel";
    }
    let time = Math.round(new Date().getTime()/100000)*100; // 确保100s内不重复下载
    let a = document.getElementById("out-excel-a"); // 利用a标签下载
    a.href = URL.createObjectURL(excel_blob); // 利用URL.createObjectURL()方法为a元素生成blob URL
    a.download = name+"_"+ time +".xls";

    a.click(); // 模拟点击，开始下载

    console.log("Excel生成完成，保存即可。");
    if (call_func) {
        call_func();
    }else {
        console.log("Excel生成完成的可选回调函数未设置。");
    }
}
function mix_excel(excel_name, table_id, call_func) {
    if (table_id === "" && !table_id){
        console.log("未知明table对应的id");
        return;
    }
    make_excel_html(table_id);
    setTimeout(function () {
        console.log("table_id="+ table_id +"，正在生成Excel-html节点...");
        setTimeout(function () {
            download_excel_file(excel_name, call_func);
        }, 2000); // 加长时间确保可以正常输出
    }, 2000);
}

//mix_excel("测试生成Excel", "backViewTable");





