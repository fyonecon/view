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





