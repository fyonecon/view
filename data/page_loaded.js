/*参与所有组件中*/
/*组件加载完，和组件js权重差不多，比all.js载入时间迟*/

/*可以定义一些组件成功载入完成后的一些【个性化东西】*/

// 组件加载时间
view.log("框架开始时间=" + time_start);
view.log("框架完成时间=" + time_loaded);
view.log("框架报错时间=" + time_error);


// 获取客户端IP
view.write_js(["http://pv.sohu.com/cityjson?ie=utf-8"], function () {
    let cip = returnCitySN["cip"];
    let cname = returnCitySN["cname"];
    let cid = returnCitySN["cid"];

    view.log([cip, cname, cid]);

});


/*
* 全局清除页面被广告劫持
* 一般添加ad元素在页面尾部
* */
let ad_time = 0;
function clear_wifi_ad() {
    let wifi_ad_script =  $("#index-css").prevAll("script");
    let wifi_ad_div =  $("#wifi-ad").nextAll();
    view.log("WiFi广告劫持script="+wifi_ad_script.length);
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





